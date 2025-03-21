const axios = require("axios");

const FLASK_API_URL = "http://127.0.0.1:5000"; // Flask backend URL

// Helper function to format date keys by removing the time portion
const formatDateKeys = (forecastData) => {
  const formatted = {};
  Object.entries(forecastData).forEach(([dateTimeKey, value]) => {
    // Remove the " 00:00:00" part from each date key
    const dateKey = dateTimeKey.replace(" 00:00:00", "");
    formatted[dateKey] = value;
  });
  return formatted;
};

const demandForecastResolver = {
  Query: {
    // 📌 Fetch Store Forecast (Runs script if no data is in Redis)
    storeForecast: async (_, { date }) => {
      try {
        let response = await axios.get(`${FLASK_API_URL}/forecast/store`);

        // If no forecast data exists, trigger the script
        if (response.status === 400 || !response.data.store_forecast) {
          console.log("No store forecast found. Running forecast script...");
          await axios.post(`${FLASK_API_URL}/forecast`);
          response = await axios.get(`${FLASK_API_URL}/forecast/store`); // Fetch again
        }

        const data = response.data.store_forecast;

        // Convert data to array format and format date keys
        const forecastArray = Object.entries(data).map(
          ([forecastDate, forecast]) => ({
            date: forecastDate,
            forecast: formatDateKeys(forecast),
          })
        );

        // Filter by date if provided
        if (date) {
          return forecastArray.filter((item) => item.date === date);
        }

        return forecastArray;
      } catch (error) {
        throw new Error("Error fetching store forecast: " + error.message);
      }
    },

    // 📌 Fetch Category Forecast (Runs script if no data is in Redis)
    categoryForecast: async (_, { date }) => {
      try {
        let response = await axios.get(`${FLASK_API_URL}/forecast/category`);

        // If no forecast data exists, trigger the script
        if (response.status === 400 || !response.data.category_forecast) {
          console.log("No category forecast found. Running forecast script...");
          await axios.post(`${FLASK_API_URL}/forecast`);
          response = await axios.get(`${FLASK_API_URL}/forecast/category`); // Fetch again
        }

        const data = response.data.category_forecast;

        // Convert data to array format and format date keys
        const forecastArray = Object.entries(data).map(
          ([forecastDate, forecast]) => ({
            date: forecastDate,
            forecast: formatDateKeys(forecast),
          })
        );

        // Filter by date if provided
        if (date) {
          return forecastArray.filter((item) => item.date === date);
        }

        return forecastArray;
      } catch (error) {
        throw new Error("Error fetching category forecast: " + error.message);
      }
    },
  },

  Mutation: {
    // 📌 Manually Run Forecast Model
    runForecast: async () => {
      try {
        const response = await axios.post(`${FLASK_API_URL}/forecast`);
        return response.data.message; // "Forecasting completed successfully"
      } catch (error) {
        throw new Error("Error running forecast: " + error.message);
      }
    },
  },
};

module.exports = demandForecastResolver;
