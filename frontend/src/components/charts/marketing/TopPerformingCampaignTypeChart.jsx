import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchTopPerformingCampaignType } from "../../../utils/marketingApi";
import { formatKNumber, formatNumber } from "../../../utils/formatNumber";

//  Custom Tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white text-gray-900 text-sm p-3 shadow-md border border-gray-300 rounded-lg">
        <p className="font-bold text-lg">{payload[0].payload.campaign_type}</p>
        <p className="text-green-600 text-md font-semibold">
          {formatNumber(payload[0].value)} conversions
        </p>
      </div>
    );
  }
  return null;
};

const TopPerformingCampaignTypeChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchTopPerformingCampaignType().then(setData);
  }, []);

  return (
    <div className="bg-white p-4 shadow-md rounded-lg text-center">
      {/* Graph Title */}
      <h2 className="text-2xl font-bold mb-4">Top Performing Campaign Types</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="campaign_type" />
          <YAxis tickFormatter={formatKNumber} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="total_revenue" fill="#F59E0B" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopPerformingCampaignTypeChart;
