import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { formatNumber } from "../../../utils/formatNumber";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF4567",
  "#82ca9d",
  "#d62728",
  "#9467bd",
  "#8c564b",
];

// 🎨 Category Emoji Mapping
const CATEGORY_EMOJIS = {
  Snacks: "🍿",
  Grocery: "🛒",
  Dairy: "🥛",
  Bakery: "🥖",
  Beverages: "🥤",
  Cosmetics: "💄",
  "Personal Care": "🧴",
  "Cleaning & Household": "🧼",
  "Poultry, Meat & Seafood": "🥩",
};

// 🛠 Custom Tooltip with Emojis
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    const emoji = CATEGORY_EMOJIS[name] || "📦"; 

    return (
      <div className="bg-white p-2 shadow-md border border-gray-300 rounded text-sm">
        <p className="font-bold text-xl">
          {emoji} {name}
        </p>
        <p className="text-lg mt-2 font-medium">{formatNumber(value)} transactions</p>{" "}
        {/* 👈 Formatted Number */}
      </div>
    );
  }
  return null;
};

const CategoryShareChart = ({ data }) => {
  return (
    <div className="chart-container">
      <h2 className="text-center text-2xl font-bold mb-2">
        Category Share Distribution
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="transaction_count"
            nameKey="product_category"
            cx="50%"
            cy="50%"
            outerRadius={130} // Outer size
            innerRadius={70} // Donut effect
            fill="#8884d8"
          >
            {data.map((_, index) => (
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

export default CategoryShareChart;
