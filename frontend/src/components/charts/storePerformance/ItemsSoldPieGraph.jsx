import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

// Custom tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded shadow-md text-sm">
        <p className="font-semibold">{payload[0].payload.month}</p>
        <p className="text-blue-600">
          Total Items Sold: {payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const ItemsSoldAreaGraph = ({ data }) => {
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-center mb-4">
        Monthly Items Sold Distribution
      </h2>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => value.toLocaleString()} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Area
            type="monotone"
            dataKey="total_items_sold"
            stroke="#2563EB"
            fill="#BFDBFE"
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ItemsSoldAreaGraph;
