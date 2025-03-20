const supabase = require("../../config/supaBaseClient");
const redisClient = require("../../config/redisClient");

const customerInsightsResolvers = {
  Query: {
    // ✅ Gender Count Resolver
    genderCount: async () => {
      try {
        console.log("Fetching gender count...");

        const cacheKey = "genderCount";
        let cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
          console.log("Cache hit - Returning cached data");
          return JSON.parse(cachedData);
        }

        console.log("Cache miss - Fetching from Supabase");
        const { data, error } = await supabase.rpc("get_gender_count");

        if (error) {
          console.error(`Supabase Query Failed: ${error.message}`);
          throw new Error(`Query Failed: genderCount - ${error.message}`);
        }

        console.log("Supabase Data Fetched:", data);
        await redisClient.setex(cacheKey, 86400, JSON.stringify(data));

        return data;
      } catch (error) {
        console.error(`Resolver Error: genderCount - ${error.message}`);
        throw new Error(`Resolver Error: genderCount - ${error.message}`);
      }
    },

    // ✅ Age Group Count Resolver
    ageGroupCount: async () => {
      try {
        console.log("Fetching age group count...");

        const cacheKey = "ageGroupCount";
        let cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
          console.log("Cache hit - Returning cached data");
          return JSON.parse(cachedData);
        }

        console.log("Cache miss - Fetching from Supabase");
        const { data, error } = await supabase.rpc("get_age_group_count");

        if (error) {
          console.error(`Supabase Query Failed: ${error.message}`);
          throw new Error(`Query Failed: ageGroupCount - ${error.message}`);
        }

        console.log("Supabase Data Fetched:", data);
        await redisClient.setex(cacheKey, 86400, JSON.stringify(data));

        return data;
      } catch (error) {
        console.error(`Resolver Error: ageGroupCount - ${error.message}`);
        throw new Error(`Resolver Error: ageGroupCount - ${error.message}`);
      }
    },

    // ✅ Customer Count by City Resolver
    customerCountByCity: async () => {
      try {
        console.log("Fetching customer count by city...");

        const cacheKey = "customerCountByCity";
        let cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
          console.log("Cache hit - Returning cached data");
          return JSON.parse(cachedData);
        }

        console.log("Cache miss - Fetching from Supabase");
        const { data, error } = await supabase.rpc(
          "get_customer_count_by_city"
        );

        if (error) {
          console.error(`Supabase Query Failed: ${error.message}`);
          throw new Error(
            `Query Failed: customerCountByCity - ${error.message}`
          );
        }

        console.log("Supabase Data Fetched:", data);
        await redisClient.setex(cacheKey, 86400, JSON.stringify(data));

        return data;
      } catch (error) {
        console.error(`Resolver Error: customerCountByCity - ${error.message}`);
        throw new Error(
          `Resolver Error: customerCountByCity - ${error.message}`
        );
      }
    },
  },
};

module.exports = customerInsightsResolvers;