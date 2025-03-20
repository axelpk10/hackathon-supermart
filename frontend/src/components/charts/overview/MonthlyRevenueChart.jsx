import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { formatCrNumber, formatNumber } from "../../../utils/formatNumber"; // Import formatters

// 🛠 Custom Tooltip Component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md border border-gray-300 rounded-lg">
        <p className="text-xl font-bold text-gray-800">
          {payload[0].payload.month}
        </p>
        <p className="text-lg text-blue-600">
          ₹ {formatNumber(payload[0].value)} 
        </p>
      </div>
    );
  }
  return null;
};

const MonthlyRevenueChart = ({ data }) => {
  return (
    <div className="text-center">
      {/* 📌 Graph Title */}
      <h2 className="text-center text-2xl font-bold mb-2">Monthly Revenue</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          {/* 📅 Month Names on X-Axis */}
          <XAxis dataKey="month" />

          {/* 💰 Revenue on Y-Axis (formatted in Cr) */}
          <YAxis
            tickFormatter={formatCrNumber}
            domain={[0, "auto"]}
            label={{
              value: "(in Cr)",
              position: "left",
              angle: -90,
              offset: -10,
              style: { fontWeight: "bold", fontSize: "16px", fill: "#333" },
            }}
          />

          {/* 🛠 Custom Tooltip */}
          <Tooltip content={<CustomTooltip />} />

          <Line
            type="monotone"
            dataKey="totalRevenue"
            stroke="#8884d8"
            strokeWidth={2}
            name="Revenue (Cr)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyRevenueChart;
