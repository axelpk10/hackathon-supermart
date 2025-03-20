import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { fetchConversionRateByCampaignType } from "../../../utils/marketingApi";
import { formatNumber } from "../../../utils/formatNumber";

// 🎨 Colors
const COLORS = [
  "#14B8A6",
  "#F59E0B",
  "#6366F1",
  "#EF4444",
  "#22C55E",
  "#EAB308",
];

// Custom Tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white text-gray-900 text-sm p-3 shadow-md border border-gray-300 rounded-lg">
        <p className="font-bold text-lg">{payload[0].payload.campaign_type}</p>
        <p className="text-blue-600 text-md font-semibold">
          {formatNumber(payload[0].value)}% Conversion Rate
        </p>
      </div>
    );
  }
  return null;
};

const ConversionRateByCampaignType = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchConversionRateByCampaignType().then((res) => {
      // Multiply conversion rates by 100 to show as percentage
      const formattedData = res.map((item) => ({
        ...item,
        conversion_rate: item.conversion_rate * 100,
      }));
      setData(formattedData);
    });
  }, []);

  return (
    <div className="bg-white p-4 shadow-md rounded-lg text-center">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4">
        Conversion Rate by Campaign Type
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="campaign_type" tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={(value) => `${value}%`} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="avg_conversion_rate" fill="#6366F1" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ConversionRateByCampaignType;
