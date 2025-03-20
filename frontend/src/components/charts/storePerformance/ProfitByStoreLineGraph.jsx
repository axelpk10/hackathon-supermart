import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

// Custom tooltip for better readability
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded shadow-md text-sm">
        <p className="font-semibold">{payload[0].payload.month}</p>
        <p className="text-green-600">
          Profit: ₹{payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const ProfitByStoreLineGraph = ({ data }) => {
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-center mb-4">
        Monthly Profit Trend
      </h2>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => `₹${value.toLocaleString()}`} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Line
            type="monotone"
            dataKey="total_profit"
            stroke="#16A34A"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProfitByStoreLineGraph;
