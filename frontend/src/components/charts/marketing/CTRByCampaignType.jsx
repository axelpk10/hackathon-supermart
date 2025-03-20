import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { fetchCTRByCampaignType } from "../../../utils/marketingApi";
import { formatNumber } from "../../../utils/formatNumber";

// 🎨 Color Palette for Different Campaigns
const COLORS = [
  "#14B8A6",
  "#F59E0B",
  "#6366F1",
  "#EF4444",
  "#22C55E",
  "#EAB308",
];

// Custom Tooltip for better readability
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white text-gray-900 text-sm p-3 shadow-md border border-gray-300 rounded-lg">
        <p className="font-bold text-lg">{payload[0].payload.campaign_type}</p>
        <p className="text-green-600 text-md font-semibold">
          {formatNumber(payload[0].value)}% CTR
        </p>
      </div>
    );
  }
  return null;
};

// Custom Label Function (Shows only campaign names around the chart)
const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, payload }) => {
  const RADIAN = Math.PI / 180;
  const x = cx + (outerRadius + 20) * Math.cos(-midAngle * RADIAN);
  const y = cy + (outerRadius + 20) * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central">
      {payload.campaign_type}
    </text>
  );
};

const CTRByCampaignType = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchCTRByCampaignType().then(setData);
  }, []);

  return (
    <div className="bg-white p-4 shadow-md rounded-lg text-center">
      {/*  Chart Title */}
      <h2 className="text-2xl font-bold mb-4">CTR by Campaign Type</h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="avg_ctr"
            nameKey="campaign_type"
            cx="50%"
            cy="50%"
            innerRadius={70} //  Creates the donut effect
            outerRadius={100}
            label={renderCustomLabel} // ✅ Shows only campaign names around the chart
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CTRByCampaignType;
