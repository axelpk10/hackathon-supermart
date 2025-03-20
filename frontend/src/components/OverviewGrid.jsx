import React, { useEffect, useState } from "react";
import {
  fetchMonthlyRevenue,
  fetchTopStoresRevenue,
  fetchCategoryShare,
  fetchTransactionsPerMonth,
  fetchTransactionsByPaymentMethod,
} from "../utils/overviewApis";
import MonthlyRevenueChart from "./charts/overview/MonthlyRevenueChart";
import TopStoresRevenueChart from "./charts/overview/TopStoresRevenueChart";
import CategoryShareChart from "./charts/overview/CategoryShareChart";
import TransactionsPerMonthChart from "./charts/overview/TransactionsPerMonthChart";
import TransactionsByPaymentMethodChart from "./charts/overview/TransactionsByPaymentMethodChart";

const OverviewGrid = ({ selectedYear, selectedQuarter }) => {
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [topStoresRevenue, setTopStoresRevenue] = useState([]);
  const [categoryShare, setCategoryShare] = useState([]);
  const [transactionsPerMonth, setTransactionsPerMonth] = useState([]);
  const [transactionsByPaymentMethod, setTransactionsByPaymentMethod] =
    useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedYear || !selectedQuarter) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [
          monthlyData,
          storesData,
          categoryData,
          transactionsData,
          paymentMethodData,
        ] = await Promise.all([
          fetchMonthlyRevenue(selectedYear, selectedQuarter),
          fetchTopStoresRevenue(selectedYear, selectedQuarter),
          fetchCategoryShare(selectedYear, selectedQuarter),
          fetchTransactionsPerMonth(selectedYear, selectedQuarter),
          fetchTransactionsByPaymentMethod(selectedYear),
        ]);

        setMonthlyRevenue(monthlyData);
        setTopStoresRevenue(storesData);
        setCategoryShare(categoryData);
        setTransactionsPerMonth(transactionsData);
        setTransactionsByPaymentMethod(paymentMethodData);
      } catch (err) {
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedYear, selectedQuarter]);

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
            <MonthlyRevenueChart data={monthlyRevenue} />
          </div>

          {/* 📊 Category Share (Pie Chart) */}
          <div className="bg-white p-4 rounded-lg shadow">
            <CategoryShareChart data={categoryShare} />
          </div>

          {/* 🏬 Top 5 Stores Revenue */}
          <div className="bg-white p-2 rounded-lg shadow">
            <TopStoresRevenueChart data={topStoresRevenue} />
          </div>

          {/* 💳 Transactions By Payment Method (Pie Chart) */}
          <div className="bg-white p-4 rounded-lg shadow">
            <TransactionsByPaymentMethodChart
              data={transactionsByPaymentMethod}
            />
          </div>

          {/* 📈 Transactions Per Month (Bar Chart) */}
          <div className="bg-white p-4 rounded-lg shadow ">
            <TransactionsPerMonthChart data={transactionsPerMonth} />
          </div>
        </div>
      )}
    </div>
  );
};

export default OverviewGrid;
