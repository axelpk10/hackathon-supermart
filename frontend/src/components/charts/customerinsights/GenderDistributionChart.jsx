import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fetchGenderCount } from "../../../utils/customerInsightsApi";
import { formatNumber } from "../../../utils/formatNumber"; // ✅ Added formatter

const COLORS = ["#0088FE", "#FFBB28", "#FF5733"];

// ✅ Custom Tooltip with formatted number
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md border border-gray-300 rounded-lg">
        <p className="text-xl font-bold text-gray-800 capitalize">
          {payload[0].payload.gender}
        </p>
        <p className="text-lg text-blue-600">
          Customers: {formatNumber(payload[0].value)}{" "}
          {/* ✅ Number Formatting */}
        </p>
      </div>
    );
  }
  return null;
};

const GenderDistributionChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchGenderCount();
      setData(result);
    };
    loadData();
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* ✅ Centered Title */}
      <h3 className="text-2xl font-bold mb-2">Gender Distribution</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="gender_count"
            nameKey="gender"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label={false} // ✅ Removed Labels (No numbers on chart)
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} />

          {/* ✅ Legend Styling (Capitalized, Black Text) */}
          <Legend
            formatter={(value) => (
              <span className="text-black capitalize">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GenderDistributionChart;
