const redisClient = require("../../config/redisClient");

const associationRuleResolvers = {
  Query: {
    getAssociationRules: async () => {
      try {
        console.log("Fetching association rules...");

        const cacheKey = "association_rules";
        let cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
          console.log("Cache hit - Returning cached data");
          return JSON.parse(cachedData);
        }

        console.log("Cache miss - No association rules found in Redis");
        throw new Error("No association rules available");
      } catch (error) {
        console.error(`Resolver Error: Association Rules - ${error.message}`);
        throw new Error(`Resolver Error: Association Rules - ${error.message}`);
      }
    },
  },
};

module.exports = associationRuleResolvers;