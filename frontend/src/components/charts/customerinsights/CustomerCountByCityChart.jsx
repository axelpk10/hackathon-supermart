import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fetchCustomerCountByCity } from "../../../utils/customerInsightsApi";
import { formatKNumber,formatNumber } from "../../../utils/formatNumber";

const CustomerCountByCityChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchCustomerCountByCity();
      setData(result);
    };
    loadData();
  }, []);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md border border-gray-300 rounded-lg">
          <p className="text-xl font-semibold text-gray-800">
            {payload[0].payload.city}
          </p>
          <p className="text-lg text-orange-600">
            {formatNumber(payload[0].value)} Customers
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <h2 className="text-center text-2xl font-bold mb-4">
        Customer Count by City
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis
            dataKey="city"
            angle={-45}
            textAnchor="end"
            interval={0}
            height={70}
          />

          <YAxis
            tickFormatter={(value) => `${formatKNumber(value)}`}
            label={{
              value: "(in K)",
              position: "left",
              angle: -90,
              offset: -10,
              style: { fontWeight: "bold", fontSize: "20px", fill: "#333" },
            }}
          />
          <Tooltip content={<CustomTooltip />} />
    
          <Bar dataKey="customer_count" fill="#ff7300" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomerCountByCityChart;
