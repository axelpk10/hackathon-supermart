import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { formatNumber } from "../../../utils/formatNumber"; // Import formatNumber utility

const COLORS = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#FF33A1",
  "#FFD700",
  "#8A2BE2",
]; // Added new color

// 🎨 Payment Method Emoji Mapping
const PAYMENT_METHOD_EMOJIS = {
  Cash: "💵", // Cash
  "Debit Card": "💳", // Debit Card
  "Credit Card": "💳", // Credit Card (same emoji as Debit Card)
  UPI: "📲", // UPI (Mobile Payment)
  "Net Banking": "🏦", // Net Banking (Bank Icon)
  "Online Payment": "💻", // Online Payment (Computer Icon)
};

// 🛠 Custom Tooltip for Payment Methods
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    const emoji = PAYMENT_METHOD_EMOJIS[name] || "💰"; // Default icon for unknown methods

    return (
      <div className="bg-white p-2 shadow-md border border-gray-300 rounded text-sm">
        <p className="font-bold text-2xl">
          {emoji} {name}
        </p>
        <p className="text-lg mt-2">{formatNumber(value)} transactions</p>
      </div>
    );
  }
  return null;
};

const TransactionsByPaymentMethodChart = ({ data }) => {
  return (
    <div className="chart-container">
      <h2 className="text-center text-2xl font-bold mb-2">Payment Methods</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="transactioncount"
            nameKey="paymentmethod"
            cx="50%"
            cy="50%"
            outerRadius={130}
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

export default TransactionsByPaymentMethodChart;
