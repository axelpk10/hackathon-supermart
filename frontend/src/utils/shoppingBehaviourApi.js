const API_URL = "http://localhost:5000/graphql";

const fetchGraphQLData = async (query, variables) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });

    const result = await response.json();

    if (!response.ok || result.errors) {
      console.error("GraphQL Error:", result.errors || "Unknown error");
      return [];
    }

    return result.data || [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

// Fetch items sold per category
export const fetchItemsSoldPerCategory = async (year) => {
  const query = `
    query GetItemsSoldPerCategory($year: Int!) {
      itemsSoldPerCategory(year: $year) {
        category
        total_items_sold
      }
    }
  `;
  return fetchGraphQLData(query, { year }).then(
    (data) => data.itemsSoldPerCategory || []
  );
};

// Fetch items sold per brand
export const fetchItemsSoldPerBrand = async (year) => {
  const query = `
    query GetItemsSoldPerBrand($year: Int!) {
      itemsSoldPerBrand(year: $year) {
        brand
        total_items_sold
      }
    }
  `;
  return fetchGraphQLData(query, { year }).then(
    (data) => data.itemsSoldPerBrand || []
  );
};

// Fetch transactions by day
export const fetchTransactionsByDay = async (year) => {
  const query = `
    query GetTransactionsByDay($year: Int!) {
      transactionsByDay(year: $year) {
        transaction_day
        transaction_count
      }
    }
  `;
  return fetchGraphQLData(query, { year }).then(
    (data) => data.transactionsByDay || []
  );
};

export const fetchTransactionsByHour = async (year) => {
  const query = `
    query GetTransactionsByHour($year: Int!) {
      transactionsByHour(year: $year) {
        transaction_hour
        transaction_count
      }
    }
  `;
  return fetchGraphQLData(query, { year }).then(
    (data) => data.transactionsByHour || []
  );
};
