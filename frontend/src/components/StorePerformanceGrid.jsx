import React from "react";
import { useState, useEffect } from "react";
import MonthlyRevenueGraph from "./charts/storePerformance/MonthlyRevenueGraph";

import { fetchMonthlyRevenueByStore, fetchProfitByStorePerMonth, fetchTotalItemsSoldPerStorePerMonth } from "../utils/storePerformanceApi";
import ProfitByStoreLineGraph from "./charts/storePerformance/ProfitByStoreLineGraph";
import ItemsSoldAreaGraph from "./charts/storePerformance/ItemsSoldPieGraph";
const StorePerformanceGrid = ({
  selectedYear,
  selectedQuarter,
  selectedStore,
}) => {
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [profitData, setProfitData]=useState([]);
  const [itemsData,setItemsData]=useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedYear || !selectedQuarter) return;

    const fetchData = async () => {
        setLoading(true);
        setError(null);
      try {
        const [monthlyData,profitData,itemsData] = await Promise.all([
          fetchMonthlyRevenueByStore(selectedYear, selectedStore, selectedQuarter),
          fetchProfitByStorePerMonth(selectedYear,selectedStore,selectedQuarter),
          fetchTotalItemsSoldPerStorePerMonth(selectedYear,selectedStore,selectedQuarter)
        ]);

        setMonthlyRevenue(monthlyData);
        setProfitData(profitData);
        setItemsData(itemsData);
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

          
        </div>
      )}
    </div>
  );
};

export default StorePerformanceGrid;
