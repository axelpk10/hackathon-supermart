import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatNumber, formatKNumber } from "../../../utils/formatNumber"; // Import format utilities

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg border border-gray-300 rounded">
        <p className="text-2xl font-bold text-gray-800">
          {payload[0].payload.month}
        </p>
        <p className="text-lg text-blue-600 mt-2">
          {formatNumber(payload[0].value)} transactions
        </p>
      </div>
    );
  }
  return null;
};

const TransactionsPerMonthChart = ({ data }) => {
  return (
    <div className="chart-container">
      <h2 className="text-center text-2xl font-bold mb-4">
        Transactions Per Month
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ bottom: 5, left: 10, right: 10, top: 10 }} // Extra space for labels
        >
          {/* 🏷 X-Axis (Ensure All Months are Visible) */}
          <XAxis
            dataKey="month"
            tick={{ fontSize: 16 }}
            angle={-45}
            textAnchor="end"
            interval={0}
            height={70}
            tickMargin={10}
          />
          {/* 🔢 Y-Axis (Formatted Numbers + Label "in K") */}
          <YAxis
            tickFormatter={(value) => formatKNumber(value)}
            label={{
              value: "Transactions (in K)",
              angle: -90,
              position: "insideLeft",
              style: {
                textAnchor: "middle",
                fontWeight: "bold",
                fontSize: "20px",
                fill: "#333",
              },
            }}
          />
          
          <Tooltip content={<CustomTooltip />} />;
          <Bar dataKey="transactionCount"  fill="#0088FE" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionsPerMonthChart;
