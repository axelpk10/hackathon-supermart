// API functions for fetching store metrics data from GraphQL endpoint

/**
 * Fetches monthly revenue data by store
 * @param {number} year - The year to fetch data for
 * @param {number} [storeId] - Optional store ID to filter results
 * @param {string} [quarter] - Optional quarter to filter results (e.g. "Q1", "Q2")
 * @returns {Promise<Array>} - Array of monthly revenue data by store
 */
export const fetchMonthlyRevenueByStore = async (
  year,
  storeId = null,
  quarter = null
) => {
  try {
    const response = await fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetMonthlyRevenueByStore($year: Int!, $storeId: Int, $quarter: String) {
            monthlyRevenueByStore(year: $year, storeId: $storeId, quarter: $quarter) {
              store_id
              store_location
              city
              month
              total_revenue
            }
          }
        `,
        variables: { year, storeId, quarter },
      }),
    });

    const result = await response.json();

    if (!response.ok || result.errors) {
      console.error("GraphQL Error:", result.errors || "Unknown error");
      return [];
    }

    return result.data?.monthlyRevenueByStore || [];
  } catch (error) {
    console.error("Error fetching monthly revenue by store:", error);
    return [];
  }
};

/**
 * Fetches profit data by store per month
 * @param {number} year - The year to fetch data for
 * @param {number} [storeId] - Optional store ID to filter results
 * @param {string} [quarter] - Optional quarter to filter results (e.g. "Q1", "Q2")
 * @returns {Promise<Array>} - Array of profit data by store per month
 */
export const fetchProfitByStorePerMonth = async (
  year,
  storeId = null,
  quarter = null
) => {
  try {
    const response = await fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetProfitByStorePerMonth($year: Int!, $storeId: Int, $quarter: String) {
            profitByStorePerMonth(year: $year, storeId: $storeId, quarter: $quarter) {
              store_id
              store_location
              city
              month
              total_profit
            }
          }
        `,
        variables: { year, storeId, quarter },
      }),
    });

    const result = await response.json();

    if (!response.ok || result.errors) {
      console.error("GraphQL Error:", result.errors || "Unknown error");
      return [];
    }

    return result.data?.profitByStorePerMonth || [];
  } catch (error) {
    console.error("Error fetching profit by store per month:", error);
    return [];
  }
};

/**
 * Fetches total items sold per store per month
 * @param {number} year - The year to fetch data for
 * @param {string} [quarter] - Optional quarter to filter results (e.g. "Q1", "Q2")
 * @param {number} [storeId] - Optional store ID to filter results
 * @returns {Promise<Array>} - Array of total items sold per store per month
 */
export const fetchTotalItemsSoldPerStorePerMonth = async (
  year,
  storeId = 1,
  quarter = "fullYear"
  
) => {
  try {
    const response = await fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetTotalItemsSoldPerStorePerMonth($year: Int!, $storeId: Int, $quarter: String ) {
            totalItemsSoldPerStorePerMonth(year: $year, store_id: $storeId,quarter: $quarter) {
              store_id
              store_location
              city
              month
              total_items_sold
            }
          }
        `,
        variables: { year, storeId, quarter },
      }),
    });

    const result = await response.json();

    if (!response.ok || result.errors) {
      console.error("GraphQL Error:", result.errors || "Unknown error");
      return [];
    }

    return result.data?.totalItemsSoldPerStorePerMonth || [];
  } catch (error) {
    console.error(
      "Error fetching total items sold per store per month:",
      error
    );
    return [];
  }
};

/**
 * Fetches cost of goods sold (COGS) per store per year
 * @param {number} year - The year to fetch data for
 * @param {number} [storeId] - Optional store ID to filter results
 * @returns {Promise<Array>} - Array of COGS data per store
 */
export const fetchCogsPerStorePerYear = async (year, storeId = null) => {
  try {
    const response = await fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetCogsPerStorePerYear($year: Int!, $storeId: Int) {
            cogsPerStorePerYear(year: $year, store_id: $storeId) {
              storeId
              year
              totalCogs
            }
          }
        `,
        variables: { year, storeId },
      }),
    });

    const result = await response.json();

    if (!response.ok || result.errors) {
      console.error("GraphQL Error:", result.errors || "Unknown error");
      return [];
    }

    return result.data?.cogsPerStorePerYear || [];
  } catch (error) {
    console.error("Error fetching COGS per store per year:", error);
    return [];
  }
};

/**
 * Fetches profit margin data by store
 * @param {number} year - The year to fetch data for
 * @param {number} [storeId] - Optional store ID to filter results
 * @returns {Promise<Array>} - Array of profit margin data by store
 */
export const fetchStoreProfitMargin = async (year, storeId = null) => {
  try {
    const response = await fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetStoreProfitMargin($year: Int!, $storeId: Int) {
            storeProfitMargin(year: $year, store_id: $storeId) {
              store_id
              store_location
              city
              profit_margin
            }
          }
        `,
        variables: { year, storeId },
      }),
    });

    const result = await response.json();

    if (!response.ok || result.errors) {
      console.error("GraphQL Error:", result.errors || "Unknown error");
      return [];
    }

    return result.data?.storeProfitMargin || [];
  } catch (error) {
    console.error("Error fetching store profit margin:", error);
    return [];
  }
};

/**
 * Fetches yearly profit data by store
 * @param {number} year - The year to fetch data for
 * @param {number} [storeId] - Optional store ID to filter results
 * @returns {Promise<Array>} - Array of yearly profit data by store
 */
export const fetchYearlyProfitByStore = async (year, storeId = null) => {
  try {
    const response = await fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetYearlyProfitByStore($year: Int!, $storeId: Int) {
            yearlyProfitByStore(year: $year, store_id: $storeId) {
              store_id
              store_location
              city
              total_profit
            }
          }
        `,
        variables: { year, storeId },
      }),
    });

    const result = await response.json();

    if (!response.ok || result.errors) {
      console.error("GraphQL Error:", result.errors || "Unknown error");
      return [];
    }

    return result.data?.yearlyProfitByStore || [];
  } catch (error) {
    console.error("Error fetching yearly profit by store:", error);
    return [];
  }
};



