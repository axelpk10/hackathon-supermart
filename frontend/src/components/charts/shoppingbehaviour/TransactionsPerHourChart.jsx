import React from "react";
import { useState,useEffect } from "react";
import { fetchTransactionsByHour } from "../../../utils/shoppingBehaviourApi";
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
          Hour {payload[0].payload.transaction_hour}:00
        </p>
        <p className="text-lg text-green-600">
          Transactions: {formatNumber(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

const TransactionsPerHourChart = () => {
  const [data, setData] = useState([]);
    
      useEffect(() => {
        fetchTransactionsByHour().then(setData);
      }, []);

  return (
    <div className="text-center">
      {/* 📌 Graph Title */}
      <h2 className="text-center text-2xl font-bold mb-2">
        Transactions Per Hour
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          {/* ⏰ Hours on X-Axis */}
          <XAxis dataKey="transaction_hour" />

          {/* 🔢 Transaction count on Y-Axis */}
          <YAxis
            tickFormatter={formatNumber}
            
          />

          {/* 🛠 Custom Tooltip */}
          <Tooltip content={<CustomTooltip />} />

          {/* 📈 Smooth Area Representation */}
          <Area
            type="monotone"
            dataKey="transaction_count"
            stroke="#34D399"
            fill="#A7F3D0"
            strokeWidth={2}
            name="Transactions"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionsPerHourChart;
