const supabase = require("../../config/supaBaseClient");
const redisClient = require("../../config/redisClient");
const { getMonthName, filterByQuarter } = require("../../utils/dateUtils");

const storeMetricsResolvers = {
  Query: {
    // Monthly Revenue By Store
    monthlyRevenueByStore: async (_, { year, storeId, quarter }) => {
      try {
        // Create a more specific cache key including all parameters
        const cacheKey = `monthlyRevenueByStore:${year}:${storeId || "all"}:${quarter || "fullYear"}`;
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

        // Transform month format from "YYYY-MM" to month name
        const transformedData = data.map((item) => ({
          ...item,
          month: getMonthName(item.month),
        }));

        // Apply store ID filtering if provided
        let filteredData = transformedData;
        if (storeId) {
          filteredData = filteredData.filter(
            (item) => item.store_id === storeId
          );
        }

        // Apply quarter filtering if provided
        if (quarter) {
          filteredData = filterByQuarter(filteredData, quarter);
        }

        // Cache the filtered results
        await redisClient.setex(cacheKey, 86400, JSON.stringify(filteredData));

        return filteredData;
      } catch (error) {
        throw new Error(
          `Resolver Error: monthlyRevenueByStore - ${error.message}`
        );
      }
    },

    // Profit By Store Per Month
    profitByStorePerMonth: async (_, { year, storeId, quarter }) => {
      try {
        // Create a more specific cache key including all parameters
        const cacheKey = `profitByStorePerMonth:${year}:${storeId || "all"}:${quarter || "fullYear"}`;
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

        // Transform month format from "YYYY-MM" to month name
        const transformedData = data.map((item) => ({
          ...item,
          month: getMonthName(item.month),
        }));

        // Apply store ID filtering if provided
        let filteredData = transformedData;
        if (storeId) {
          filteredData = filteredData.filter(
            (item) => item.store_id === storeId
          );
        }

        // Apply quarter filtering if provided
        if (quarter) {
          filteredData = filterByQuarter(filteredData, quarter);
        }

        // Cache the filtered results
        await redisClient.setex(cacheKey, 86400, JSON.stringify(filteredData));

        return filteredData;
      } catch (error) {
        throw new Error(
          `Resolver Error: profitByStorePerMonth - ${error.message}`
        );
      }
    },

    // Total Items Sold Per Store Per Year
    // Total Items Sold Per Store Per Month
    totalItemsSoldPerStorePerMonth: async (
      _,
      { year, quarter = "fullYear", store_id }
    ) => {
      try {
        const cacheKey = `totalItemsSoldPerStorePerMonth:${year}`;
        let cachedData = await redisClient.get(cacheKey);
        let data;

        if (cachedData) {
          data = JSON.parse(cachedData);
        } else {
          console.log(
            "Fetching total items sold per store per month from Supabase..."
          );
          const { data: supabaseData, error } = await supabase.rpc(
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

          data = supabaseData.map((entry) => ({
            ...entry,
            month: getMonthName(entry.month),
            total_items_sold: entry.total_items_sold
              ? entry.total_items_sold.toString()
              : "0",
          }));

          await redisClient.setex(cacheKey, 86400, JSON.stringify(data));
        }

        // Filter by store_id if provided
        if (store_id) {
          data = data.filter((item) => item.store_id === store_id);
        }

        // Filter by quarter
        data = filterByQuarter(data, quarter);

        return data;
      } catch (error) {
        throw new Error(
          `Resolver Error: totalItemsSoldPerStorePerMonth - ${error.message}`
        );
      }
    },

    cogsPerStorePerYear: async (_, { year, store_id }) => {
      try {
        const cacheKey = `cogsPerStorePerYear:${year}`;
        let cachedData = await redisClient.get(cacheKey);
        let data;

        if (cachedData) {
          console.log(" Returning cached COGS data from Redis.");
          data = JSON.parse(cachedData);
        } else {
          console.log(
            ` Fetching COGS per store for year ${year} from Supabase...`
          );

          // Fetch from Supabase
          const { data: supabaseData, error } = await supabase.rpc(
            "get_cogs_per_store_per_year",
            { year_param: year }
          );

          console.log("Supabase Raw Response:", {
            data: supabaseData,
            error,
          });

          if (error) {
            console.error(`Supabase Query Failed: ${error.message}`);
            throw new Error(`Query Failed: ${error.message}`);
          }

          if (!supabaseData || supabaseData.length === 0) {
            console.warn("No COGS data returned from Supabase!");
            return [];
          }

          data = supabaseData.map((row) => ({
            storeId: row.store_id,
            year: row.year,
            totalCogs: row.total_cogs,
          }));

          // Cache the response
          await redisClient.setex(cacheKey, 86400, JSON.stringify(data));
        }

        // Filter by store_id if provided
        if (store_id) {
          data = data.filter((item) => item.storeId === store_id);
        }

        return data;
      } catch (error) {
        console.error(` Resolver Error: ${error.message}`);
        throw new Error(`Resolver Error: ${error.message}`);
      }
    },

    // Store Profit Margin Resolver
    storeProfitMargin: async (_, { year, store_id }) => {
      try {
        console.log(`Fetching Store Profit Margin for year: ${year}`);

        const cacheKey = `storeProfitMargin:${year}`;
        let cachedData = await redisClient.get(cacheKey);
        let data;

        if (cachedData) {
          console.log("Cache hit - Returning cached data");
          data = JSON.parse(cachedData);
        } else {
          console.log("Cache miss - Fetching from Supabase");
          const { data: supabaseData, error } = await supabase.rpc(
            "get_store_profit_margin",
            {
              year_param: year,
            }
          );

          if (error) {
            console.error(`Supabase Query Failed: ${error.message}`);
            throw new Error(
              `Query Failed: get_store_profit_margin - ${error.message}`
            );
          }

          console.log("Supabase Data Fetched:", supabaseData);

          // Convert month format if needed
          data = supabaseData.map((entry) => ({
            ...entry,
            month: getMonthName(entry.month),
          }));

          await redisClient.setex(cacheKey, 86400, JSON.stringify(data));
        }

        // Filter by store_id if provided
        if (store_id) {
          data = data.filter((item) => item.store_id === store_id);
        }

        return data;
      } catch (error) {
        console.error(`Resolver Error: storeProfitMargin - ${error.message}`);
        throw new Error(`Resolver Error: storeProfitMargin - ${error.message}`);
      }
    },

    // Yearly Profit by Store Resolver
    yearlyProfitByStore: async (_, { year, store_id }) => {
      try {
        console.log(`Fetching Yearly Profit by Store for year: ${year}`);

        const cacheKey = `yearlyProfitByStore:${year}`;
        let cachedData = await redisClient.get(cacheKey);
        let data;

        if (cachedData) {
          console.log("Cache hit - Returning cached data");
          data = JSON.parse(cachedData);
        } else {
          console.log("Cache miss - Fetching from Supabase");
          const { data: supabaseData, error } = await supabase.rpc(
            "get_yearly_profit_by_store",
            { year_param: year }
          );

          if (error) {
            console.error(`Supabase Query Failed: ${error.message}`);
            throw new Error(
              `Query Failed: get_yearly_profit_by_store - ${error.message}`
            );
          }

          console.log("Supabase Data Fetched:", supabaseData);

          // Convert month format if needed
          data = supabaseData.map((entry) => ({
            ...entry,
            month: getMonthName(entry.month),
          }));

          await redisClient.setex(cacheKey, 86400, JSON.stringify(data));
        }

        // Filter by store_id if provided
        if (store_id) {
          data = data.filter((item) => item.store_id === store_id);
        }

        return data;
      } catch (error) {
        console.error(`Resolver Error: yearlyProfitByStore - ${error.message}`);
        throw new Error(
          `Resolver Error: yearlyProfitByStore - ${error.message}`
        );
      }
    },
  },
};

module.exports = storeMetricsResolvers;
