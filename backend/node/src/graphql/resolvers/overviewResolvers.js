const supabase = require("../../config/supaBaseClient");
const redisClient = require("../../config/redisClient");
const { getMonthName, filterByQuarter } = require("../../utils/dateUtils");

const overviewResolvers = {
  Query: {
    // Monthly Revenue Resolver
    monthlyRevenue: async (_, { year, quarter }) => {
      try {
        const cacheKey = `monthlyRevenue:${year}`;
        let cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
          return filterByQuarter(JSON.parse(cachedData), quarter);
        }

        const { data, error } = await supabase.rpc("get_monthly_revenue", {
          year_param: year,
        });

        if (error) {
          throw new Error(`Query Failed: monthlyRevenue - ${error.message}`);
        }

        const formattedData = data.map((entry) => ({
          month: getMonthName(entry.month),
          totalRevenue: entry.totalrevenue,
        }));

        await redisClient.setex(cacheKey, 86400, JSON.stringify(formattedData));

        return filterByQuarter(formattedData, quarter);
      } catch (error) {
        throw new Error(`Resolver Error: monthlyRevenue - ${error.message}`);
      }
    },

    // Top 5 Stores Revenue Resolver
    topStoresRevenue: async (_, { year, quarter = "fullYear" }) => {
      try {
        const cacheKey = `topStoresRevenue:${year}:${quarter}`;
        let cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
          return JSON.parse(cachedData);
        }

        let data;
        if (quarter === "fullYear") {
          const { data: fullYearData, error } = await supabase.rpc(
            "get_top_5_stores_by_full_year_revenue",
            { year_param: year }
          );

          if (error) {
            throw new Error(
              `Query Failed: topStoresRevenue (Full Year) - ${error.message}`
            );
          }

          data = fullYearData;
        } else {
          const { data: quarterData, error } = await supabase.rpc(
            "get_top_stores_revenue_by_quarter",
            { year_param: year, quarter_param: quarter }
          );

          if (error) {
            throw new Error(
              `Query Failed: topStoresRevenue (Quarter) - ${error.message}`
            );
          }

          data = quarterData;
        }

        await redisClient.setex(cacheKey, 86400, JSON.stringify(data));

        return data;
      } catch (error) {
        throw new Error(`Resolver Error: topStoresRevenue - ${error.message}`);
      }
    },

    // Transactions Per Month Resolver
    transactionsPerMonth: async (_, { year, quarter }) => {
      try {
        const cacheKey = `transactionsPerMonth:${year}`;
        let cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
          return filterByQuarter(JSON.parse(cachedData), quarter);
        }

        const { data, error } = await supabase.rpc(
          "get_transactions_per_month",
          {
            year_param: year,
          }
        );

        if (error) {
          throw new Error(
            `Query Failed: transactionsPerMonth - ${error.message}`
          );
        }

        const formattedData = data.map((entry) => ({
          month: getMonthName(entry.month),
          transactionCount: entry.transaction_count,
        }));

        await redisClient.setex(cacheKey, 86400, JSON.stringify(formattedData));

        return filterByQuarter(formattedData, quarter);
      } catch (error) {
        throw new Error(
          `Resolver Error: transactionsPerMonth - ${error.message}`
        );
      }
    },

    // Category Share Resolver
    categoryShare: async (_, { year, quarter }) => {
      try {
        const cacheKey = `categoryShare:${year}:${quarter}`;
        let cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
          return JSON.parse(cachedData);
        }

        const { data, error } = await supabase.rpc("get_category_share", {
          year_param: year,
          quarter_param: quarter,
        });

        if (error) {
          throw new Error(`Query Failed: categoryShare - ${error.message}`);
        }

        await redisClient.setex(cacheKey, 86400, JSON.stringify(data));

        return data;
      } catch (error) {
        throw new Error(`Resolver Error: categoryShare - ${error.message}`);
      }
    },

    // Transactions By Payment Method Resolver
    transactionsByPaymentMethod: async (_, { year }) => {
      try {
        const cacheKey = `transactionsByPaymentMethod:${year}`;
        let cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
          return JSON.parse(cachedData);
        }

        const { data, error } = await supabase.rpc(
          "get_transactions_by_payment_method",
          {
            year_param: year,
          }
        );

        if (error) {
          throw new Error(
            `Query Failed: transactionsByPaymentMethod - ${error.message}`
          );
        }

        const formattedData = data.map((entry) => ({
          paymentmethod: entry.payment_method,
          transactioncount: entry.transaction_count,
        }));

        await redisClient.setex(cacheKey, 86400, JSON.stringify(formattedData));

        return formattedData;
      } catch (error) {
        throw new Error(
          `Resolver Error: transactionsByPaymentMethod - ${error.message}`
        );
      }
    },
  },
};

module.exports = overviewResolvers;
