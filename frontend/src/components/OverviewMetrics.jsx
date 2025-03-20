import React from "react";
import { ChevronDown } from "lucide-react";
import { formatNumber } from "../utils/formatNumber"; 

const OverviewMetrics = ({
  selectedYear,
  setSelectedYear,
  selectedQuarter,
  setSelectedQuarter,
}) => {
  const years = ["2024", "2025"];

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleQuarterClick = (quarter) => {
    setSelectedQuarter(quarter);
  };

  const isSelected = (quarter) => selectedQuarter === quarter;

  return (
    <div className="max-w mx-auto px-4">
      <div className="flex flex-wrap items-center justify-around gap-4 mb-6">
        {/* 🔍 Search Bar */}
        <div className="flex-grow max-w-md">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-3 rounded-full bg-red-100 text-gray-700 outline-none"
          />
        </div>

        {/* 📅 Year Selector */}
        <div className="relative w-40">
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="w-full px-4 py-3 pr-10 text-center rounded-xl border border-gray-300 bg-white text-gray-700 outline-none appearance-none cursor-pointer"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>

        {/* 📊 Quarter Selector */}
        <div className="flex rounded-full border border-gray-300 overflow-hidden">
          {["Q1", "Q2", "Q3", "Q4"].map((q) => (
            <button
              key={q}
              className={`px-6 py-2 ${
                isSelected(q)
                  ? "bg-orange-100 text-orange-600 rounded-2xl"
                  : "bg-white"
              }`}
              onClick={() => handleQuarterClick(q)}
            >
              {q}
            </button>
          ))}

          <button
            className={`px-6 py-2 border-gray-300 ${
              isSelected("fullYear")
                ? "bg-orange-100 text-orange-600 font-medium rounded-2xl "
                : "bg-white"
            }`}
            onClick={() => handleQuarterClick("fullYear")}
          >
            Select all
          </button>
        </div>
      </div>

      {/* 📈 Overview Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard title="Total Revenue" value={68423857} />
        <MetricCard title="Total Profit" value={31713419} />
        <MetricCard title="Total Transactions" value={98271} />
        <MetricCard title="Unique Customers" value={50000} />
      </div>
    </div>
  );
};

const MetricCard = ({ title, value }) => (
  <div className="bg-[#f7f7f7] p-6 rounded-lg flex flex-col items-center justify-center">
    <h2 className="text-3xl font-bold text-black-700">{formatNumber(value)}</h2>
    <p className="text-gray-600">{title}</p>
  </div>
);

export default OverviewMetrics;
