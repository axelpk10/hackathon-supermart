import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchCustomersByAgeGroup } from "../../../utils/marketingApi";
import { formatKNumber, formatNumber } from "../../../utils/formatNumber";

//  Custom Tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white text-gray-900 text-sm p-3 shadow-md border border-gray-300 rounded-lg">
        <p className="font-bold text-lg">
          Age Group: {payload[0].payload.age_group}
        </p>
        <p className="text-blue-600 text-md font-semibold">
          {formatNumber(payload[0].value)} customers
        </p>
      </div>
    );
  }
  return null;
};

const CustomersByAgeGroupChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchCustomersByAgeGroup().then(setData);
  }, []);

  return (
    <div className="bg-white p-4 shadow-md rounded-lg text-center">
      {/*  Graph Title */}
      <h2 className="text-2xl font-bold mb-4">Customers by Age Group</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="age_group" />
          <YAxis  />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="engagement_count" fill="#6366F1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomersByAgeGroupChart;
