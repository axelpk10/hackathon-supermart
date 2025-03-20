import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { fetchCTRConversionTrends } from "../../../utils/marketingApi";
import { formatNumber } from "../../../utils/formatNumber";

//  Custom Tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white text-gray-900 text-sm p-3 shadow-md border border-gray-300 rounded-lg">
        <p className="font-bold text-lg">{payload[0].payload.month}</p>
        <p className="text-blue-600 text-md font-semibold">
          CTR: {formatNumber(payload[0].payload.avg_ctr)}%
        </p>
        <p className="text-green-600 text-md font-semibold">
          Conversion Rate:{" "}
          {formatNumber(payload[1].payload.avg_conversion_rate)}%
        </p>
      </div>
    );
  }
  return null;
};

const CTRConversionTrendsChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchCTRConversionTrends().then(setData);
  }, []);

  return (
    <div className="bg-white p-4 shadow-md rounded-lg text-center">
      {/* Graph Title */}
      <h2 className="text-2xl font-bold mb-4">CTR & Conversion Rate Trends</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />

          {/* CTR Line */}
          <Line
            type="monotone"
            dataKey="avg_ctr"
            stroke="#6366F1"
            strokeWidth={3}
            dot={{ r: 4 }}
            name="Avg CTR (%)"
          />

          {/* Conversion Rate Line */}
          <Line
            type="monotone"
            dataKey="avg_conversion_rate"
            stroke="#22C55E"
            strokeWidth={3}
            dot={{ r: 4 }}
            name="Avg Conversion Rate (%)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export default CTRConversionTrendsChart;
