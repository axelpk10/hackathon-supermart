const supabase = require("../../config/supaBaseClient");
const redisClient = require("../../config/redisClient");

const marketingCampaignAnalysisResolver = {
  Query: {
    getCustomersByAgeGroup: async (_, { year }) => {
      try {
        console.log(`Fetching Customers by Age Group for year: ${year}`);

        const cacheKey = `getCustomersByAgeGroup:${year}`;
        let cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
          console.log("Cache hit - Returning cached data");
          return JSON.parse(cachedData);
        }

        console.log("Cache miss - Fetching from Supabase");
        const { data, error } = await supabase.rpc("get_customers_by_age_group", { year_param: year });

        if (error) {
          console.error(`Supabase Query Failed: ${error.message}`);
          throw new Error(`Query Failed: get_customers_by_age_group - ${error.message}`);
        }

        console.log("Supabase Data Fetched:", data);

        await redisClient.setex(cacheKey, 86400, JSON.stringify(data));

        return data;
      } catch (error) {
        console.error(`Resolver Error: getCustomersByAgeGroup - ${error.message}`);
        throw new Error(`Resolver Error: getCustomersByAgeGroup - ${error.message}`);
      }
    },

    // Get Top Performing Campaign Type Resolver
    getTopPerformingCampaignType: async (_, { year }) => {
      try {
        console.log(`Fetching Top Performing Campaign Type for year: ${year}`);

        const cacheKey = `getTopPerformingCampaignType:${year}`;
        let cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
          console.log("Cache hit - Returning cached data");
          return JSON.parse(cachedData);
        }

        console.log("Cache miss - Fetching from Supabase");
        const { data, error } = await supabase.rpc("get_top_performing_campaign_type", { year_param: year });

        if (error) {
          console.error(`Supabase Query Failed: ${error.message}`);
          throw new Error(`Query Failed: get_top_performing_campaign_type - ${error.message}`);
        }

        console.log("Supabase Data Fetched:", data);

        await redisClient.setex(cacheKey, 86400, JSON.stringify(data));

        return data;
      } catch (error) {
        console.error(`Resolver Error: getTopPerformingCampaignType - ${error.message}`);
        throw new Error(`Resolver Error: getTopPerformingCampaignType - ${error.message}`);
      }
    },

    // Get Top Campaigns by Revenue Resolver
    getTopCampaignsByRevenue: async (_, { year }) => {
      try {
        console.log(`Fetching Top Campaigns by Revenue for year: ${year}`);

        const cacheKey = `getTopCampaignsByRevenue:${year}`;
        let cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
          console.log("Cache hit - Returning cached data");
          return JSON.parse(cachedData);
        }

        console.log("Cache miss - Fetching from Supabase");
        const { data, error } = await supabase.rpc("get_top_campaigns_by_revenue", { year_param: year });

        if (error) {
          console.error(`Supabase Query Failed: ${error.message}`);
          throw new Error(`Query Failed: get_top_campaigns_by_revenue - ${error.message}`);
        }

        console.log("Supabase Data Fetched:", data);

        await redisClient.setex(cacheKey, 86400, JSON.stringify(data));

        return data;
      } catch (error) {
        console.error(`Resolver Error: getTopCampaignsByRevenue - ${error.message}`);
        throw new Error(`Resolver Error: getTopCampaignsByRevenue - ${error.message}`);
      }
    },

    // Get CTR Conversion Trends Resolver
    getCTRConversionTrends: async (_, { year }) => {
      try {
        console.log(`Fetching CTR Conversion Trends for year: ${year}`);

        const cacheKey = `getCTRConversionTrends:${year}`;
        let cachedData = await redisClient.get(cacheKey);
if (cachedData) {
          console.log("Cache hit - Returning cached data");
          return JSON.parse(cachedData);
        }

        console.log("Cache miss - Fetching from Supabase");
        const { data, error } = await supabase.rpc("get_ctr_conversion_trends", { year_param: year });

        if (error) {
          console.error(`Supabase Query Failed: ${error.message}`);
          throw new Error(`Query Failed: get_ctr_conversion_trends - ${error.message}`);
        }

        console.log("Supabase Data Fetched:", data);

        await redisClient.setex(cacheKey, 86400, JSON.stringify(data));

        return data;
      } catch (error) {
        console.error(`Resolver Error: getCTRConversionTrends - ${error.message}`);
        throw new Error(`Resolver Error: getCTRConversionTrends - ${error.message}`);
      }
    },

    // Get Budget vs Revenue Resolver
    getBudgetVsRevenue: async (_, { year }) => {
      try {
        console.log(`Fetching Budget vs Revenue for year: ${year}`);

        const cacheKey = `getBudgetVsRevenue:${year}`;
        let cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
          console.log("Cache hit - Returning cached data");
          return JSON.parse(cachedData);
        }

        console.log("Cache miss - Fetching from Supabase");
        const { data, error } = await supabase.rpc("get_budget_vs_revenue", { year_param: year });

        if (error) {
          console.error(`Supabase Query Failed: ${error.message}`);
          throw new Error(`Query Failed: get_budget_vs_revenue - ${error.message}`);
        }

        console.log("Supabase Data Fetched:", data);

        await redisClient.setex(cacheKey, 86400, JSON.stringify(data));

        return data;
      } catch (error) {
        console.error(`Resolver Error: getBudgetVsRevenue - ${error.message}`);
        throw new Error(`Resolver Error: getBudgetVsRevenue - ${error.message}`);
      }
    },

    // Get CTR by Campaign Type Resolver
    getCTRByCampaignType: async (_, { year }) => {
      try {
        console.log(`Fetching CTR by Campaign Type for year: ${year}`);

        const cacheKey = `getCTRByCampaignType:${year}`;
        let cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
          console.log("Cache hit - Returning cached data");
          return JSON.parse(cachedData);
        }

        console.log("Cache miss - Fetching from Supabase");
        const { data, error } = await supabase.rpc("get_ctr_by_campaign_type", { year_param: year });

        if (error) {
          console.error(`Supabase Query Failed: ${error.message}`);
          throw new Error(`Query Failed: get_ctr_by_campaign_type - ${error.message}`);
        }

        console.log("Supabase Data Fetched:", data);

        await redisClient.setex(cacheKey, 86400, JSON.stringify(data));

        return data;
      } catch (error) {
        console.error(`Resolver Error: getCTRByCampaignType - ${error.message}`);
        throw new Error(`Resolver Error: getCTRByCampaignType - ${error.message}`);
      }
    },

    // Get Conversion Rate by Campaign Type Resolver
    getConversionRateByCampaignType: async (_, { year }) => {
      try {
        console.log(`Fetching Conversion Rate by Campaign Type for year: ${year}`);

        const cacheKey = `getConversionRateByCampaignType:${year}`;
        let cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
          console.log("Cache hit - Returning cached data");
          return JSON.parse(cachedData);
        }

        console.log("Cache miss - Fetching from Supabase");
        const { data, error } = await supabase.rpc("get_conversion_rate_by_campaign_type", { year_param: year });

        if (error) {
          console.error(`Supabase Query Failed: ${error.message}`);
          throw new Error(`Query Failed: get_conversion_rate_by_campaign_type - ${error.message}`);
        }

        console.log("Supabase Data Fetched:", data);

        await redisClient.setex(cacheKey, 86400, JSON.stringify(data));
return data;
      } catch (error) {
        console.error(`Resolver Error: getConversionRateByCampaignType - ${error.message}`);
        throw new Error(`Resolver Error: getConversionRateByCampaignType - ${error.message}`);
      }
    },
  },
};

module.exports = marketingCampaignAnalysisResolver;