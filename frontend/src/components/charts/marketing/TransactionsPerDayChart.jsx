import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { formatNumber } from "../../../utils/formatNumber";

// 🛠 Custom Tooltip Component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md border border-gray-300 rounded-lg">
        <p className="text-xl font-bold text-gray-800">
          Day {payload[0].payload.transaction_day}
        </p>
        <p className="text-lg text-blue-600">
          Transactions: {formatNumber(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

const TransactionsPerDayChart = ({ data }) => {
  return (
    <div className="text-center bg-white p-4 shadow-md rounded-lg">
      {/* 📌 Graph Title */}
      <h2 className="text-3xl font-bold mb-4">Transactions Per Day</h2>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          {/* 📅 Days on X-Axis */}
          <XAxis dataKey="transaction_day" />

          {/* 🔢 Transaction count on Y-Axis */}
          <YAxis
            tickFormatter={formatNumber}
            label={{
              value: "Transactions",
              position: "left",
              angle: -90,
              offset: -10,
              style: { fontWeight: "bold", fontSize: "16px", fill: "#333" },
            }}
          />

          {/* 🛠 Custom Tooltip */}
          <Tooltip content={<CustomTooltip />} />

          {/* 📊 AreaChart instead of LineChart */}
          <Area
            type="monotone"
            dataKey="transaction_count"
            stroke="#F97316"
            fill="#FDBA74" // Light Orange Fill
            strokeWidth={2}
            name="Transactions"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionsPerDayChart;
