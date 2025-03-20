import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { formatCrNumber, formatNumber } from "../../../utils/formatNumber"; // Import number formatter

const formatStoreName = (name) => name.split("-")[0].trim(); // Extract store name

// 🛠 Custom Tooltip Component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md border border-gray-300 rounded-lg">
        <p className="text-xl font-bold text-gray-800">
          {payload[0].payload.storename}
        </p>
        <p className="text-lg text-green-600">
          ₹ {formatNumber(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

const TopStoresRevenueChart = ({ data }) => {
  return (
    <div className="text-center">
      {/* 📌 Graph Title */}
      <h2 className="text-center text-2xl font-bold mb-2">
        Top Stores by Revenue
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ left: 10, right: 10, top: 20, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          {/* 🏬 Store Names on Y-Axis */}
          <YAxis
            dataKey="storename"
            type="category"
            tickFormatter={formatStoreName}
            width={100}
          />

          <XAxis
            type="number"
            tickFormatter={formatCrNumber}
            domain={[0, "auto"]}
            scale="linear"
            label={{
              value: "(in Cr)",
              position: "bottom",
              offset: 10,
              style: { fontWeight: "bold", fontSize: "20px", fill: "#333" },
            }}
          />

          {/* 🛠 Custom Tooltip */}
          <Tooltip content={<CustomTooltip />} />

          <Bar
            dataKey="totalrevenue"
            fill="#82ca9d"
            barSize={30}
            name="Revenue (Cr)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopStoresRevenueChart;
