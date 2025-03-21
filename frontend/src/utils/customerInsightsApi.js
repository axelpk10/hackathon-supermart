export const fetchGenderCount = async () => {
  try {
    const response = await fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetGenderCount {
            genderCount {
              gender
              gender_count
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

    return result.data?.genderCount || [];
  } catch (error) {
    console.error("Error fetching gender count:", error);
    return [];
  }
};

export const fetchAgeGroupCount = async () => {
  try {
    const response = await fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetAgeGroupCount {
            ageGroupCount {
              age_group
              customer_count
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

    return result.data?.ageGroupCount || [];
  } catch (error) {
    console.error("Error fetching age group count:", error);
    return [];
  }
};

export const fetchCustomerCountByCity = async () => {
  try {
    const response = await fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetCustomerCountByCity {
            customerCountByCity {
              city
              customer_count
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

    return result.data?.customerCountByCity || [];
  } catch (error) {
    console.error("Error fetching customer count by city:", error);
    return [];
  }
};

export const fetchRFMData = async () => {
  try {
    const response = await fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetRFMData {
            getRFMData {
              customer_id
              recency
              frequency
              monetary
              label
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

    return result.data?.getRFMData || [];
  } catch (error) {
    console.error("Error fetching RFM data:", error);
    return [];
  }
};