const supabase = require("../../config/supaBaseClient");
const redisClient = require("../../config/redisClient");

const shoppingBehaviourResolvers = {
  Query: {
    // Items Sold Per Category Resolver
    itemsSoldPerCategory: async (_, { year }) => {
      try {
        console.log(`Fetching Items Sold Per Category for year: ${year}`);

        const cacheKey = `itemsSoldPerCategory:${year}`;
        let cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
          console.log("Cache hit - Returning cached data");
          return JSON.parse(cachedData);
        }

        console.log("Cache miss - Fetching from Supabase");
        const { data, error } = await supabase.rpc(
          "get_items_sold_per_category",
          { year_param: year }
        );

        if (error) {
          console.error(`Supabase Query Failed: ${error.message}`);
          throw new Error(
            `Query Failed: get_items_sold_per_category - ${error.message}`
          );
        }

        console.log("Supabase Data Fetched:", data);

        await redisClient.setex(cacheKey, 86400, JSON.stringify(data));

        return data;
      } catch (error) {
        console.error(
          `Resolver Error: itemsSoldPerCategory - ${error.message}`
        );
        throw new Error(
          `Resolver Error: itemsSoldPerCategory - ${error.message}`
        );
      }
    },

    // Items Sold Per Brand Resolver
    itemsSoldPerBrand: async (_, { year }) => {
      try {
        console.log(`Fetching Items Sold Per Brand for year: ${year}`);

        const cacheKey = `itemsSoldPerBrand:${year}`;
        let cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
          console.log("Cache hit - Returning cached data");
          return JSON.parse(cachedData);
        }

        console.log("Cache miss - Fetching from Supabase");
        const { data, error } = await supabase.rpc("get_items_sold_per_brand", {
          year_param: year,
        });

        if (error) {
          console.error(`Supabase Query Failed: ${error.message}`);
          throw new Error(
            `Query Failed: get_items_sold_per_brand - ${error.message}`
          );
        }

        console.log("Supabase Data Fetched:", data);

        await redisClient.setex(cacheKey, 86400, JSON.stringify(data));

        return data;
      } catch (error) {
        console.error(`Resolver Error: itemsSoldPerBrand - ${error.message}`);
        throw new Error(`Resolver Error: itemsSoldPerBrand - ${error.message}`);
      }
    },

    // Transactions By Day Resolver
    transactionsByDay: async (_, { year }) => {
      try {
        console.log(`Fetching Transactions By Day for year: ${year}`);

        const cacheKey = `transactionsByDay:${year}`;
        let cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
          console.log("Cache hit - Returning cached data");
          return JSON.parse(cachedData);
        }

        console.log("Cache miss - Fetching from Supabase");
        const { data, error } = await supabase.rpc("get_transactions_by_day", {
          year_param: year,
        });

        if (error) {
          console.error(`Supabase Query Failed: ${error.message}`);
          throw new Error(
            `Query Failed: get_transactions_by_day - ${error.message}`
          );
        }

        console.log("Supabase Data Fetched:", data);

        await redisClient.setex(cacheKey, 86400, JSON.stringify(data));

        return data;
      } catch (error) {
        console.error(`Resolver Error: transactionsByDay - ${error.message}`);
        throw new Error(`Resolver Error: transactionsByDay - ${error.message}`);
      }
    },

    // Transactions By Hour Resolver
    transactionsByHour: async (_, { year }) => {
      try {
        console.log(`Fetching Transactions By Hour for year: ${year}`);

        const cacheKey = `transactionsByHour:${year}`;
        let cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
          console.log("Cache hit - Returning cached data");
          return JSON.parse(cachedData);
        }
        console.log("Cache miss - Fetching from Supabase");
        const { data, error } = await supabase.rpc("get_transactions_by_hour", {
          year_param: year,
        });

        if (error) {
          console.error(`Supabase Query Failed: ${error.message}`);
          throw new Error(
            `Query Failed: get_transactions_by_hour - ${error.message}`
          );
        }

        console.log("Supabase Data Fetched:", data);

        await redisClient.setex(cacheKey, 86400, JSON.stringify(data));

        return data;
      } catch (error) {
        console.error(`Resolver Error: transactionsByHour - ${error.message}`);
        throw new Error(
          `Resolver Error: transactionsByHour - ${error.message}`
        );
      }
    },
  },
};

module.exports = shoppingBehaviourResolvers;
