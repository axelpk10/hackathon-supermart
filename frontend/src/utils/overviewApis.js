export const fetchMonthlyRevenue = async (year, quarter) => {
  try {
    const response = await fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetMonthlyRevenue($year: String!, $quarter: String!) {
            monthlyRevenue(year: $year, quarter: $quarter) {
              month
              totalRevenue
            }
          }
        `,
        variables: { year, quarter },
      }),
    });

    const result = await response.json();

    if (!response.ok || result.errors) {
      console.error("GraphQL Error:", result.errors || "Unknown error");
      return [];
    }

    return result.data?.monthlyRevenue || [];
  } catch (error) {
    console.error("Error fetching monthly revenue:", error);
    return [];
  }
};

export const fetchTopStoresRevenue = async (year, quarter) => {
  try {
    const response = await fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetTopStoresRevenue($year: String!, $quarter: String!) {
            topStoresRevenue(year: $year, quarter: $quarter) {
              storename
              quarter
              totalrevenue
            }
          }
        `,
        variables: { year, quarter },
      }),
    });

    const result = await response.json();

    if (!response.ok || result.errors) {
      console.error("GraphQL Error:", result.errors || "Unknown error");
      return [];
    }

    return result.data?.topStoresRevenue || [];
  } catch (error) {
    console.error("Error fetching top stores revenue:", error);
    return [];
  }
};

export const fetchCategoryShare = async (year, quarter) => {
  try {
    const response = await fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetCategoryShare($year: String!, $quarter: String!) {
            categoryShare(year: $year, quarter: $quarter) {
              product_category
              transaction_count
            }
          }
        `,
        variables: { year, quarter },
      }),
    });

    const result = await response.json();

    if (!response.ok || result.errors) {
      console.error("GraphQL Error:", result.errors || "Unknown error");
      return [];
    }

    return result.data?.categoryShare || [];
  } catch (error) {
    console.error("Error fetching category share:", error);
    return [];
  }
};

export const fetchTransactionsPerMonth = async (year, quarter) => {
  try {
    const response = await fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetTransactionsPerMonth($year: String!, $quarter: String!) {
            transactionsPerMonth(year: $year, quarter: $quarter) {
              month
              transactionCount
            }
          }
        `,
        variables: { year, quarter },
      }),
    });

    const result = await response.json();

    if (!response.ok || result.errors) {
      console.error("GraphQL Error:", result.errors || "Unknown error");
      return [];
    }

    return result.data?.transactionsPerMonth || [];
  } catch (error) {
    console.error("Error fetching transactions per month:", error);
    return [];
  }
};

export const fetchTransactionsByPaymentMethod = async (year) => {
  try {
    const response = await fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetTransactionsByPaymentMethod($year: String!) {
            transactionsByPaymentMethod(year: $year) {
              paymentmethod
              transactioncount
            }
          }
        `,
        variables: { year },
      }),
    });

    const result = await response.json();

    if (!response.ok || result.errors) {
      console.error("GraphQL Error:", result.errors || "Unknown error");
      return [];
    }

    return result.data?.transactionsByPaymentMethod || [];
  } catch (error) {
    console.error("Error fetching transactions by payment method:", error);
    return [];
  }
};



