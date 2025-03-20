import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchItemsSoldPerBrand } from "../../../utils/shoppingBehaviourApi";
import { formatKNumber, formatNumber } from "../../../utils/formatNumber";

// 🎯 Custom Tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white text-gray-900 text-sm p-3 shadow-md border border-gray-300 rounded-lg">
        <p className="font-bold text-lg">{payload[0].payload.brand}</p>
        <p className="text-blue-600 text-md font-semibold">
          {formatNumber(payload[0].value)} items sold
        </p>
      </div>
    );
  }
  return null;
};

const ItemsSoldPerBrandChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchItemsSoldPerBrand().then(setData);
  }, []);

  return (
    <div className="bg-white p-4 shadow-md rounded-lg text-center">
      {/* 📌 Graph Title */}
      <h2 className="text-2xl font-bold mb-4">Items Sold Per Brand</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          {/* ❌ X-Axis Labels Removed */}
          <XAxis dataKey="brand" tick={false} />
          <YAxis tickFormatter={formatKNumber} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="total_items_sold" fill="#14B8A6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ItemsSoldPerBrandChart;
