const API_URL = "http://localhost:5000/graphql";
const YEAR = 2024; // Hardcoded year

//  Fetch Items Sold Per Category
export const fetchItemsSoldPerCategory = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetItemsSoldPerCategory {
            itemsSoldPerCategory(year: ${YEAR}) {
              category
              total_items_sold
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

    return result.data?.itemsSoldPerCategory || [];
  } catch (error) {
    console.error("Error fetching items sold per category:", error);
    return [];
  }
};

// 🏷 Fetch Items Sold Per Brand
export const fetchItemsSoldPerBrand = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetItemsSoldPerBrand {
            itemsSoldPerBrand(year: ${YEAR}) {
              brand
              total_items_sold
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

    return result.data?.itemsSoldPerBrand || [];
  } catch (error) {
    console.error("Error fetching items sold per brand:", error);
    return [];
  }
};

//  Fetch Transactions By Day
export const fetchTransactionsByDay = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetTransactionsByDay {
            transactionsByDay(year: ${YEAR}) {
              transaction_day
              transaction_count
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

    return result.data?.transactionsByDay || [];
  } catch (error) {
    console.error("Error fetching transactions by day:", error);
    return [];
  }
};

//  Fetch Transactions By Hour
export const fetchTransactionsByHour = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetTransactionsByHour {
            transactionsByHour(year: ${YEAR}) {
              transaction_hour
              transaction_count
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

    return result.data?.transactionsByHour || [];
  } catch (error) {
    console.error("Error fetching transactions by hour:", error);
    return [];
  }
};

//  Fetch Market Basket Analysis (MBA) Association Rules
export const fetchAssociationRules = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetAssociationRules {
            getAssociationRules {
              antecedents
              consequents
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

    return result.data?.getAssociationRules || [];
  } catch (error) {
    console.error("Error fetching association rules:", error);
    return [];
  }
};
