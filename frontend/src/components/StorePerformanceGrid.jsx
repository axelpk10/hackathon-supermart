import React from "react";
import { useState, useEffect } from "react";
import MonthlyRevenueGraph from "./charts/storePerformance/MonthlyRevenueGraph";
import { formatNumber } from "../utils/formatNumber";
import {
  fetchMonthlyRevenueByStore,
  fetchProfitByStorePerMonth,
  fetchStoreProfitMargin,
  fetchTotalItemsSoldPerStorePerMonth,
  fetchYearlyProfitByStore,
} from "../utils/storePerformanceApi";
import ProfitByStoreLineGraph from "./charts/storePerformance/ProfitByStoreLineGraph";
import ItemsSoldAreaGraph from "./charts/storePerformance/ItemsSoldPieGraph";
import storeForecast from "../assets/hac-assets/storeForecast.jpg"; // Ensure the correct path

const StorePerformanceGrid = ({
  selectedYear,
  selectedQuarter,
  selectedStore,
}) => {
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [profitData, setProfitData] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const [profitMargin, setProfitMargin] = useState([]);
  const [yearlyProfit, setYearlyProfit] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedYear || !selectedQuarter) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [monthlyData, profitData, itemsData, profitMargin] =
          await Promise.all([
            fetchMonthlyRevenueByStore(
              selectedYear,
              selectedStore,
              selectedQuarter
            ),
            fetchProfitByStorePerMonth(
              selectedYear,
              selectedStore,
              selectedQuarter
            ),
            fetchTotalItemsSoldPerStorePerMonth(
              selectedYear,
              selectedStore,
              selectedQuarter
            ),
            fetchStoreProfitMargin(selectedYear, selectedStore),
            fetchYearlyProfitByStore(selectedYear, selectedStore),
          ]);

        setMonthlyRevenue(monthlyData);
        setProfitData(profitData);
        setItemsData(itemsData);
        setProfitMargin(profitMargin);
        setYearlyProfit(yearlyProfit);

        console.log("Profit Margin Data:", profitMargin);
      } catch (err) {
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedYear, selectedStore, selectedQuarter]);

  return (
    <div className="max-w mx-auto px-4 py-6">
      {loading ? (
        <p className="text-center text-gray-500">Loading data...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 📊 Monthly Revenue Graph - Spanning 2 columns */}
          <div className="bg-white p-4 rounded-lg shadow sm:col-span-2">
            <MonthlyRevenueGraph data={monthlyRevenue} />
          </div>
          <div>
            <ProfitByStoreLineGraph data={profitData} />
          </div>
          <div>
            <ItemsSoldAreaGraph data={itemsData} />
          </div>

          {/* 📸 Store Forecast Image - Spanning 2 columns */}
          <div className="bg-white p-4 rounded-lg shadow sm:col-span-2 flex flex-col justify-center items-center">
            <h2 className="text-lg font-semibold mb-2 text-center">
              Store Forecast
            </h2>
            <img
              src={storeForecast}
              alt="Store Forecast"
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* 💰 Store Profit Margin */}
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <h2 className="text-lg font-semibold">Store Profit Margin</h2>
            <p className="text-2xl font-bold text-amber-600">
              {profitMargin !== null
                ? `${profitMargin[0].profit_margin}%`
                : "Loading..."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StorePerformanceGrid;
