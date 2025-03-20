const supabase = require("../../config/supaBaseClient");
const redisClient = require("../../config/redisClient");

const storeMetricsResolvers = {
  Query: {
    // Monthly Revenue By Store
    monthlyRevenueByStore: async (_, { store_id, month, year }) => {
      try {
        const cacheKey = monthlyRevenueByStore;
        let cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
          return JSON.parse(cachedData).filter(
            (entry) => 
              entry.store_id === store_id &&
              entry.month === month &&
              entry.year === year
          );
        }

        console.log("Fetching all monthly revenue from Supabase...");
        const { data, error } = await supabase.rpc("get_monthly_revenue_by_store");

        if (error) {
          throw new Error(`Query Failed: ${error.message}`);
        }

        await redisClient.setex(cacheKey, 86400, JSON.stringify(data));

        return data.filter(
          (entry) =>
            entry.store_id === store_id &&
            entry.month === month &&
            entry.year === year
        );
      } catch (error) {
        throw new Error(`Resolver Error: ${error.message}`);
      }
    },

    // Profit By Store Per Month
    profitByStorePerMonth: async (_, { store_id, month, year }) => {
      try {
        const cacheKey = profitByStorePerMonth;
        let cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
          return JSON.parse(cachedData).filter(
            (entry) =>
              entry.store_id === store_id &&
              entry.month === month &&
              entry.year === year
          );
        }

        console.log("Fetching all profit data from Supabase...");
        const { data, error } = await supabase.rpc("get_profit_by_store_per_month");

        if (error) {
          throw new Error(`Query Failed: ${error.message}`);
        }

        await redisClient.setex(cacheKey, 86400, JSON.stringify(data));

        return data.filter(
          (entry) =>
            entry.store_id === store_id &&
            entry.month === month &&
            entry.year === year
        );
      } catch (error) {
        throw new Error(`Resolver Error: ${error.message}`);
      }
    },

    // Total Items Sold Per Store Per Month
    totalItemsSoldPerStorePerMonth: async (_, { store_id, month, year }) => {
      try {
        const cacheKey = totalItemsSoldPerStorePerMonth;
        let cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
          return JSON.parse(cachedData).filter(
            (entry) =>
              entry.store_id === store_id &&
              entry.month === month &&
              entry.year === year
          );
        }

        console.log("Fetching all total items sold data from Supabase...");
        const { data, error } = await supabase.rpc("get_total_items_sold_per_store_per_month");

        if (error) {
          throw new Error(`Query Failed: ${error.message}`);
        }

        const formattedData = data.map((entry) => ({
          ...entry,
          total_items_sold: entry.total_items_sold ? entry.total_items_sold.toString() : "0",
        }));

        await redisClient.setex(cacheKey, 86400, JSON.stringify(formattedData));

        return formattedData.filter(
          (entry) =>
            entry.store_id === store_id &&
            entry.month === month &&
            entry.year === year
        );
      } catch (error) {
        throw new Error(`Resolver Error: ${error.message}`);
      }
    },

    // COGS Per Store Per Year
    cogsPerStorePerYear: async (_, { store_id, year }) => {
  try {
    const cacheKey = `cogsPerStorePerYear:${year}`;
    let cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      return parsedData.filter(row => row.storeId === store_id);
    }

    console.log(`Fetching COGS data for year ${year} from Supabase...`);
    const { data, error } = await supabase.rpc("get_cogs_per_store_per_year", {
      year_param: year,
    });

    if (error) {
      throw new Error(`Query Failed: ${error.message}`);
    }

    const formattedData = data.map((row) => ({
      storeId: row.store_id,
      year: row.year,
      totalCogs: row.total_cogs,
    }));

    // Store the full dataset in cache
    await redisClient.setex(cacheKey, 86400, JSON.stringify(formattedData));

    // Filter only for the requested store_id
    return formattedData.filter(row => row.storeId === store_id);
  } catch (error) {
    throw new Error(`Resolver Error: ${error.message}`);
  }
},
    // Yearly Profit By Store
    yearlyProfitByStore: async (_, { store_id, year }) => {
      try {
        const cacheKey = yearlyProfitByStore;
        let cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
          return JSON.parse(cachedData).filter(
            (entry) =>
              entry.store_id === store_id &&
              entry.year === year
          );
        }

        console.log("Fetching all yearly profit data from Supabase...");
        const { data, error } = await supabase.rpc("get_yearly_profit_by_store");

        if (error) {
          throw new Error(`Query Failed: ${error.message}`);
        }

        await redisClient.setex(cacheKey, 86400, JSON.stringify(data));

        return data.filter(
          (entry) =>
            entry.store_id === store_id &&
            entry.year === year
        );
      } catch (error) {
        throw new Error(`Resolver Error: ${error.message}`);
      }
    },
  },
};

module.exports = storeMetricsResolvers;