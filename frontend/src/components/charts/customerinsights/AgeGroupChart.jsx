import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchAgeGroupCount } from "../../../utils/customerInsightsApi";
import { formatKNumber, formatNumber } from "../../../utils/formatNumber"; // ✅ Number formatters

// ✅ Custom Tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md border border-gray-300 rounded-lg">
        <p className="text-xl font-bold text-gray-800">
          {payload[0].payload.age_group}
        </p>
        <p className="text-lg text-blue-600">
          Customers: {formatNumber(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

const AgeGroupChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchAgeGroupCount();
      setData(result);
    };
    loadData();
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* ✅ Centered Title */}
      <h3 className="text-2xl font-bold mb-2">Age Group Distribution</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="age_group" />
          <YAxis
            tickFormatter={formatKNumber}
            label={{
              value: "(in K)",
              position: "left",
              angle: -90,
              offset: -10,
              style: { fontWeight: "bold", fontSize: "20px", fill: "#333" },
            }}
          />{" "}
          {/* ✅ Applied K formatting */}
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="customer_count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AgeGroupChart;
