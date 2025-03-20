import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { fetchBudgetVsRevenue } from "../../../utils/marketingApi";
import { formatNumber } from "../../../utils/formatNumber";

//  Custom Tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white text-gray-900 text-sm p-3 shadow-md border border-gray-300 rounded-lg">
        <p className="font-bold text-lg">{payload[0].payload.campaign_name}</p>
        <p className="text-red-600 text-md font-semibold">
          Budget: ₹{formatNumber(payload[0].value)}
        </p>
        <p className="text-green-600 text-md font-semibold">
          Revenue: ₹{formatNumber(payload[1].value)}
        </p>
      </div>
    );
  }
  return null;
};

const BudgetVsRevenueChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchBudgetVsRevenue().then((response) => {
      // Sort campaigns by revenue for better visualization
      const sortedData = response.sort(
        (a, b) => b.revenue_generated - a.revenue_generated
      );
      setData(sortedData.slice(0, 50)); // Show only Top 10 campaigns
    });
  }, []);

  return (
    <div className="bg-white p-4 shadow-md rounded-lg text-center">
      {/*  Graph Title */}
      <h2 className="text-2xl font-bold mb-4">Budget vs Revenue</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="campaign_name" tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={formatNumber} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />

          {/* Budget Bar */}
          <Bar dataKey="budget" fill="#EF4444" name="Budget" />

          {/* Revenue Bar */}
          <Bar dataKey="revenue_generated" fill="#22C55E" name="Revenue" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetVsRevenueChart;
