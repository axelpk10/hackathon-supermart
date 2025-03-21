const redisClient = require("../../config/redisClient");
const rfmMetricsResolvers = {
  Query: {
    getRfmMetrics: async () => {
      try {
        console.log("Fetching RFM metrics...");

        const cacheKey = "rfm_metrics";
        let cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
          console.log("Cache hit - Returning cached RFM metrics data");
          return JSON.parse(cachedData);
        }

        console.log("Cache miss - No RFM metrics found in Redis");
        throw new Error(
          "No RFM metrics available. Please generate metrics first."
        );
      } catch (error) {
        console.error(`Resolver Error: RFM Metrics - ${error.message}`);
        throw new Error(`Resolver Error: RFM Metrics - ${error.message}`);
      }
    },

    getCustomerRfm: async (_, { customerId }) => {
      try {
        console.log(`Fetching RFM metrics for customer ${customerId}...`);

        const cacheKey = "rfm_metrics";
        let cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
          const metricsData = JSON.parse(cachedData);
          const customerMetrics = metricsData.find(
            (item) => String(item.customer_id) === String(customerId)
          );

          if (customerMetrics) {
            console.log(`Found metrics for customer ${customerId}`);
            return customerMetrics;
          } else {
            throw new Error(`Customer ID ${customerId} not found`);
          }
        }

        console.log("Cache miss - No RFM metrics found in Redis");
        throw new Error(
          "No RFM metrics available. Please generate metrics first."
        );
      } catch (error) {
        console.error(`Resolver Error: Customer RFM - ${error.message}`);
        throw new Error(`Resolver Error: Customer RFM - ${error.message}`);
      }
    },

    getSegmentSummary: async () => {
      try {
        console.log("Fetching segment summary...");

        const cacheKey = "rfm_metrics";
        let cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
          const metricsData = JSON.parse(cachedData);

          // Group by segment
          const segments = {};

          metricsData.forEach((item) => {
            const segment = item.segment;

            if (!segments[segment]) {
              segments[segment] = {
                segment: segment,
                customerCount: 0,
                totalAmount: 0,
                avgFrequency: 0,
                avgRecencyDays: 0,
                avgLifetimeDays: 0,
                customers: [],
              };
            }

            segments[segment].customerCount++;
            segments[segment].totalAmount += item.total_amount;
            segments[segment].avgFrequency += item.frequency;
            segments[segment].avgRecencyDays += item.recency_days;
            segments[segment].avgLifetimeDays +=
              item.customer_lifetime_days || 0;
            segments[segment].customers.push(item.customer_id);
          });

          // Calculate averages
          Object.values(segments).forEach((segment) => {
            segment.avgFrequency = segment.avgFrequency / segment.customerCount;
            segment.avgRecencyDays =
              segment.avgRecencyDays / segment.customerCount;
            segment.avgLifetimeDays =
              segment.avgLifetimeDays / segment.customerCount;
          });

          return Object.values(segments);
        }

        console.log("Cache miss - No RFM metrics found in Redis");
        throw new Error(
          "No RFM metrics available. Please generate metrics first."
        );
      } catch (error) {
        console.error(`Resolver Error: Segment Summary - ${error.message}`);
        throw new Error(`Resolver Error: Segment Summary - ${error.message}`);
      }
    },
  },

  Mutation: {
    generateRfmMetrics: async () => {
      try {
        console.log("Triggering RFM metrics generation...");

        // Make a request to the Flask API endpoint
        const response = await fetch(
          "http://localhost:5000/rfm/generate-rfm-metrics",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Failed to generate RFM metrics: ${errorData.error}`);
        }

        const result = await response.json();

        return {
          success: true,
          message: result.message,
          totalCustomers: result.total_customers,
        };
      } catch (error) {
        console.error(
          `Resolver Error: Generate RFM Metrics - ${error.message}`
        );
        return {
          success: false,
          message: `Failed to generate RFM metrics: ${error.message}`,
          totalCustomers: 0,
        };
      }
    },
  },
};

module.exports = rfmMetricsResolvers;
