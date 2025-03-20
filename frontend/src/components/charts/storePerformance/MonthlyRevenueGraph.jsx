import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded shadow-md">
        <p className="text-sm font-semibold">
          Month: {payload[0].payload.month}
        </p>
        <p className="text-sm">Revenue: ${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const MonthlyRevenueGraph = ({ data }) => {
  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-center text-lg font-bold mb-4">
        Monthly Revenue by Store
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="total_revenue" fill="#4F46E5" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyRevenueGraph;
