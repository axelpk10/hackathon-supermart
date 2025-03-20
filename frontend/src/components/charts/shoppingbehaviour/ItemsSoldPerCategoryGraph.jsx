import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { fetchItemsSoldPerCategory } from "../../../utils/shoppingBehaviourApi";
import { formatNumber } from "../../../utils/formatNumber";

// 🎨 Expanded Colors for Better Differentiation
const COLORS = [
  "#6366F1",
  "#14B8A6",
  "#FACC15",
  "#F87171",
  "#8B5CF6",
  "#22C55E",
  "#EC4899",
  "#FF5733",
  "#795548",
  "#2E93FA",
  "#D7263D",
  "#FF914D",
  "#A52A2A",
  "#1E88E5",
  "#673AB7",
];

// 🎯 Custom Tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white text-gray-900 text-sm p-3 shadow-md border border-gray-300 rounded-lg">
        <p className="font-bold text-xl">{payload[0].payload.category}</p>
        <p className="text-blue-600 text-lg font-semibold">
          {formatNumber(payload[0].value)} items sold
        </p>
      </div>
    );
  }
  return null;
};

const ItemsSoldPerCategoryChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchItemsSoldPerCategory().then(setData);
  }, []);

  return (
    <div className="bg-white p-4 shadow-md rounded-lg text-center">
      {/* 📌 Graph Title */}
      <h2 className="text-3xl font-bold mb-4">Items Sold Per Category</h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="total_items_sold"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={false} // ❌ Labels Removed
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ItemsSoldPerCategoryChart;
