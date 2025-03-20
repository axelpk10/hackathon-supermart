const API_URL = "http://localhost:5000/graphql";
const YEAR = 2024; // Hardcoded year

//  Fetch Customers by Age Group
export const fetchCustomersByAgeGroup = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetCustomersByAgeGroup {
            getCustomersByAgeGroup(year: ${YEAR}) {
              age_group
              engagement_count
            }
          }
        `,
      }),
    });

    const result = await response.json();

    if (!response.ok || result.errors) {
      console.error("GraphQL Error:", result.errors || "Unknown error");
      return [];
    }

    return result.data?.getCustomersByAgeGroup || [];
  } catch (error) {
    console.error("Error fetching customers by age group:", error);
    return [];
  }
};

//  Fetch Top Performing Campaign Type
export const fetchTopPerformingCampaignType = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetTopPerformingCampaignType {
            getTopPerformingCampaignType(year: ${YEAR}) {
              campaign_type
              total_revenue
            }
          }
        `,
      }),
    });

    const result = await response.json();

    if (!response.ok || result.errors) {
      console.error("GraphQL Error:", result.errors || "Unknown error");
      return [];
    }

    return result.data?.getTopPerformingCampaignType || [];
  } catch (error) {
    console.error("Error fetching top performing campaign type:", error);
    return [];
  }
};

//  Fetch Top Campaigns by Revenue
export const fetchTopCampaignsByRevenue = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetTopCampaignsByRevenue {
            getTopCampaignsByRevenue(year: ${YEAR}) {
              campaign_id
              campaign_name
              revenue_generated
            }
          }
        `,
      }),
    });

    const result = await response.json();

    if (!response.ok || result.errors) {
      console.error("GraphQL Error:", result.errors || "Unknown error");
      return [];
    }

    return result.data?.getTopCampaignsByRevenue || [];
  } catch (error) {
    console.error("Error fetching top campaigns by revenue:", error);
    return [];
  }
};

//  Fetch CTR & Conversion Trends
export const fetchCTRConversionTrends = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetCTRConversionTrends {
            getCTRConversionTrends(year: ${YEAR}) {
              month
              avg_ctr
              avg_conversion_rate
            }
          }
        `,
      }),
    });

    const result = await response.json();

    if (!response.ok || result.errors) {
      console.error("GraphQL Error:", result.errors || "Unknown error");
      return [];
    }

    return result.data?.getCTRConversionTrends || [];
  } catch (error) {
    console.error("Error fetching CTR & Conversion Trends:", error);
    return [];
  }
};

//  Fetch Budget vs Revenue
export const fetchBudgetVsRevenue = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetBudgetVsRevenue {
            getBudgetVsRevenue(year: ${YEAR}) {
              campaign_name
              budget
              revenue_generated
            }
          }
        `,
      }),
    });

    const result = await response.json();

    if (!response.ok || result.errors) {
      console.error("GraphQL Error:", result.errors || "Unknown error");
      return [];
    }

    return result.data?.getBudgetVsRevenue || [];
  } catch (error) {
    console.error("Error fetching Budget vs Revenue:", error);
    return [];
  }
};

//  Fetch CTR by Campaign Type
export const fetchCTRByCampaignType = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetCTRByCampaignType {
            getCTRByCampaignType(year: ${YEAR}) {
              campaign_type
              avg_ctr
            }
          }
        `,
      }),
    });

    const result = await response.json();

    if (!response.ok || result.errors) {
      console.error("GraphQL Error:", result.errors || "Unknown error");
      return [];
    }

    return result.data?.getCTRByCampaignType || [];
  } catch (error) {
    console.error("Error fetching CTR by Campaign Type:", error);
    return [];
  }
};

//  Fetch Conversion Rate by Campaign Type
export const fetchConversionRateByCampaignType = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetConversionRateByCampaignType {
            getConversionRateByCampaignType(year: ${YEAR}) {
              campaign_type
              avg_conversion_rate
            }
          }
        `,
      }),
    });

    const result = await response.json();

    if (!response.ok || result.errors) {
      console.error("GraphQL Error:", result.errors || "Unknown error");
      return [];
    }

    return result.data?.getConversionRateByCampaignType || [];
  } catch (error) {
    console.error("Error fetching Conversion Rate by Campaign Type:", error);
    return [];
  }
};
