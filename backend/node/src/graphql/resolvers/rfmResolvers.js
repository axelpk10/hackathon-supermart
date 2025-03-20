const redisClient = require("../../config/redisClient");
const supabase = require("../../config/supaBaseClient");

const rfmMetricsResolvers = {
  Query: {
    // ✅ Fetch RFM Metrics from Redis
    getRFMData: async () => {
      try {
        console.log("Fetching RFM metrics...");

        const cacheKey = "rfm_metrics";
        let cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
          console.log("Cache hit - Returning cached data");
          return JSON.parse(cachedData);
        }

        console.log("Cache miss - No RFM data found in Redis");
        throw new Error("No RFM metrics available");
      } catch (error) {
        console.error(`Resolver Error: rfmMetrics - ${error.message}`);
        throw new Error(`Resolver Error: rfmMetrics - ${error.message}`);
      }
    },
  },
};

module.exports = rfmMetricsResolvers;
