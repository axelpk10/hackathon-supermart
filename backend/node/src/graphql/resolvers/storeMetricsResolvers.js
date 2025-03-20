const supabase = require("../../config/supaBaseClient");
const redisClient = require("../../config/redisClient");

const storeMetricsResolvers = {
  Query: {
    // Monthly Revenue By Store
    monthlyRevenueByStore: async (_, { year }) => {
      try {
        const cacheKey = `monthlyRevenueByStore:${year}`;
        let cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
          return JSON.parse(cachedData);
        }

        console.log("Fetching monthly revenue per store from Supabase...");
        const { data, error } = await supabase.rpc(
          "get_monthly_revenue_by_store",
          {
            year_param: year,
          }
        );

        if (error) {
          throw new Error(
            `Query Failed: monthlyRevenueByStore - ${error.message}`
          );
        }

        await redisClient.setex(cacheKey, 86400, JSON.stringify(data));

        return data;
      } catch (error) {
        throw new Error(
          `Resolver Error: monthlyRevenueByStore - ${error.message}`
        );
      }
    },

    // Profit By Store Per Month
    profitByStorePerMonth: async (_, { year }) => {
      try {
        const cacheKey = `profitByStorePerMonth:${year}`;
        let cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
          return JSON.parse(cachedData);
        }

        console.log("Fetching profit per store per month from Supabase...");
        const { data, error } = await supabase.rpc(
          "get_profit_by_store_per_month",
          {
            year_param: year,
          }
        );

        if (error) {
          throw new Error(
            `Query Failed: profitByStorePerMonth - ${error.message}`
          );
        }

        await redisClient.setex(cacheKey, 86400, JSON.stringify(data));

        return data;
      } catch (error) {
        throw new Error(
          `Resolver Error: profitByStorePerMonth - ${error.message}`
        );
      }
    },

    // Total Items Sold Per Store Per Year
    totalItemsSoldPerStorePerYear: async (_, { year }) => {
      try {
        const cacheKey = `totalItemsSoldPerStorePerYear:${year}`;
        let cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
          return JSON.parse(cachedData);
        }

        console.log(
          "Fetching total items sold per store per year from Supabase..."
        );
        const { data, error } = await supabase.rpc(
          "get_total_items_sold_per_store_per_year",
          {
            year_param: year,
          }
        );

        if (error) {
          throw new Error(
            `Query Failed: totalItemsSoldPerStorePerYear - ${error.message}`
          );
        }

        const formattedData = data.map((entry) => ({
          ...entry,
          total_items_sold: entry.total_items_sold
            ? entry.total_items_sold.toString()
            : "0",
        }));

        await redisClient.setex(cacheKey, 86400, JSON.stringify(formattedData));

        return formattedData;
      } catch (error) {
        throw new Error(
          `Resolver Error: totalItemsSoldPerStorePerYear - ${error.message}`
        );
      }
    },

    // Total Items Sold Per Store Per Month
    totalItemsSoldPerStorePerMonth: async (_, { year }) => {
      try {
        const cacheKey = `totalItemsSoldPerStorePerMonth:${year}`;
        let cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
          return JSON.parse(cachedData);
        }

        console.log(
          "Fetching total items sold per store per month from Supabase..."
        );
        const { data, error } = await supabase.rpc(
          "get_total_items_sold_per_store_per_month",
          {
            year_param: year,
          }
        );

        if (error) {
          throw new Error(
            `Query Failed: totalItemsSoldPerStorePerMonth - ${error.message}`
          );
        }

        const formattedData = data.map((entry) => ({
          ...entry,
          total_items_sold: entry.total_items_sold
            ? entry.total_items_sold.toString()
            : "0",
        }));

        await redisClient.setex(cacheKey, 86400, JSON.stringify(formattedData));

        return formattedData;
      } catch (error) {
        throw new Error(
          `Resolver Error: totalItemsSoldPerStorePerMonth - ${error.message}`
        );
      }
    },
    cogsPerStorePerYear: async (_, { year }) => {
      try {
        const cacheKey = `cogsPerStorePerYear:${year}`;
        let cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
          console.log("✅ Returning cached COGS data from Redis.");
          return JSON.parse(cachedData);
        }

        console.log(
          `🔄 Fetching COGS per store for year ${year} from Supabase...`
        );

        // Fetch from Supabase
        const { data, error } = await supabase.rpc(
          "get_cogs_per_store_per_year",
          { year_param: year }
        );

        console.log("🛠 Supabase Raw Response:", { data, error });

        if (error) {
          console.error(`❌ Supabase Query Failed: ${error.message}`);
          throw new Error(`Query Failed: ${error.message}`);
        }

        if (!data || data.length === 0) {
          console.warn("⚠️ No COGS data returned from Supabase!");
          return [];
        }

        // Cache the response
        await redisClient.setex(cacheKey, 86400, JSON.stringify(data));

        return data.map((row) => ({
          storeId: row.store_id,
          year: row.year,
          totalCogs: row.total_cogs,
        }));
      } catch (error) {
        console.error(`❌ Resolver Error: ${error.message}`);
        throw new Error(`Resolver Error: ${error.message}`);
      }
    },

    // Tier Wise Revenue
    fetchTierWiseRevenue: async (_, { year }) => {
      try {
        const cacheKey = `tierWiseRevenue:${year}`;
        let cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
          return JSON.parse(cachedData);
        }

        const { data, error } = await supabase.rpc("get_tier_wise_revenue", {
          year_param: year,
        });

        if (error) {
          throw new Error(`Query Failed: tierWiseRevenue - ${error.message}`);
        }

        await redisClient.setex(cacheKey, 86400, JSON.stringify(data));

        return data;
      } catch (error) {
        throw new Error(`Resolver Error: tierWiseRevenue - ${error.message}`);
      }
    },

    // Store Profit Margin Resolver
    storeProfitMargin: async (_, { year }) => {
      try {
        console.log(`Fetching Store Profit Margin for year: ${year}`);

        const cacheKey = `storeProfitMargin:${year}`;
        let cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
          console.log("Cache hit - Returning cached data");
          return JSON.parse(cachedData);
        }

        console.log("Cache miss - Fetching from Supabase");
        const { data, error } = await supabase.rpc("get_store_profit_margin", { year_param: year });

        if (error) {
          console.error(`Supabase Query Failed: ${error.message}`);
          throw new Error(`Query Failed: get_store_profit_margin - ${error.message}`);
        }

        console.log("Supabase Data Fetched:", data);

        await redisClient.setex(cacheKey, 86400, JSON.stringify(data));

        return data;
      } catch (error) {
        console.error(`Resolver Error: storeProfitMargin - ${error.message}`);
        throw new Error(`Resolver Error: storeProfitMargin - ${error.message}`);
      }
    },

    // Yearly Profit by Store Resolver
    yearlyProfitByStore: async (_, { year }) => {
      try {
        console.log(`Fetching Yearly Profit by Store for year: ${year}`);

        const cacheKey = `yearlyProfitByStore:${year}`;
        let cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
          console.log("Cache hit - Returning cached data");
          return JSON.parse(cachedData);
        }

        console.log("Cache miss - Fetching from Supabase");
        const { data, error } = await supabase.rpc("get_yearly_profit_by_store", { year_param: year });

        if (error) {
          console.error(`Supabase Query Failed: ${error.message}`);
          throw new Error(`Query Failed: get_yearly_profit_by_store - ${error.message}`);
        }

        console.log("Supabase Data Fetched:", data);

        await redisClient.setex(cacheKey, 86400, JSON.stringify(data));

        return data;
      } catch (error) {
        console.error(`Resolver Error: yearlyProfitByStore - ${error.message}`);
        throw new Error(`Resolver Error: yearlyProfitByStore - ${error.message}`);
      }
    },
  },
};

module.exports = storeMetricsResolvers;
