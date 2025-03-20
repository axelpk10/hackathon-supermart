const axios = require("axios");

const FLASK_API_URL = "http://127.0.0.1:5000"; // Flask backend URL

const demandForecastResolver = {
  Query: {
    // 📌 Fetch Store Forecast (Runs script if no data is in Redis)
    storeForecast: async () => {
      try {
        let response = await axios.get(`${FLASK_API_URL}/forecast/store`);

        // If no forecast data exists, trigger the script
        if (response.status === 400 || !response.data.store_forecast) {
          console.log("No store forecast found. Running forecast script...");
          await axios.post(`${FLASK_API_URL}/forecast`);
          response = await axios.get(`${FLASK_API_URL}/forecast/store`); // Fetch again
        }

        const data = response.data.store_forecast;
        return Object.entries(data).map(([date, forecast]) => ({
          date,
          forecast,
        }));
      } catch (error) {
        throw new Error("Error fetching store forecast: " + error.message);
      }
    },

    // 📌 Fetch Category Forecast (Runs script if no data is in Redis)
    categoryForecast: async () => {
      try {
        let response = await axios.get(`${FLASK_API_URL}/forecast/category`);

        // If no forecast data exists, trigger the script
        if (response.status === 400 || !response.data.category_forecast) {
          console.log("No category forecast found. Running forecast script...");
          await axios.post(`${FLASK_API_URL}/forecast`);
          response = await axios.get(`${FLASK_API_URL}/forecast/category`); // Fetch again
        }

        const data = response.data.category_forecast;
        return Object.entries(data).map(([date, forecast]) => ({
          date,
          forecast,
        }));
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
