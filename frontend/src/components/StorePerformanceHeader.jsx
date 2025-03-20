import React from "react";
import { ChevronDown } from "lucide-react";

const StorePerformanceHeader = ({selectedYear,setSelectedYear,selectedQuarter,setSelectedQuarter,selectedStore,setSelectedStore}) => {
  

  const years = ["2024"];
  const quarters = ["Q1", "Q2", "Q3", "Q4", "fullYear"];
  const stores = [
    "Pune - Koregaon Park",
    "Pune - Shivaji Nagar",
    "Pune - Hinjewadi",
    "Mumbai - Bandra",
    "Mumbai - Colaba",
    "Mumbai - Lower Parel",
    "Bangalore - MG Road",
    "Bangalore - Koramangala",
    "Bangalore - Indiranagar",
    "Ahmedabad - Navrangpura",
    "Ahmedabad - Satellite",
    "Ahmedabad - SG Highway",
    "Nagpur - Dharampeth",
    "Nagpur - Sitabuldi",
    "Surat - Adajan",
    "Surat - Varachha",
    "Mangalore - Kadri",
    "Mangalore - Hampankatta",
    "Mysore - Vijayanagar",
    "Mysore - Lakshmipuram",
    "Vadodara - Laxmi Vilas Palace",
    "Nashik - Indiranagar",
    "Hubli - Keshwapur",
  ];

  const handleYearChange = (e) => setSelectedYear(e.target.value);
  const handleStoreChange = (e) => {
    setSelectedStore(parseInt(e.target.value, 10)); 
  };
  const handleQuarterClick = (quarter) => setSelectedQuarter(quarter);
  const isSelected = (quarter) => selectedQuarter === quarter;

  return (
    <div className="max-w mx-auto px-4">
      <div className="flex flex-wrap items-center justify-around gap-4 mb-6">
        {/* Search Input */}
        <div className="flex-grow max-w-md">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-3 rounded-full bg-red-100 text-gray-700 outline-none"
          />
        </div>

        {/* Store Dropdown */}
        <div className="relative w-40">
          <select
            value={selectedStore}
            onChange={handleStoreChange}
            className="w-full px-4 py-3 pr-10 text-center rounded-xl border border-gray-300 bg-white text-gray-700 outline-none appearance-none cursor-pointer"
          >
            {stores.map((store, index) => (
              <option key={index} value={index + 1}>
                {store}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>

        {/* Year Dropdown */}
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

        {/* Quarter Selection */}
        <div className="flex rounded-full border border-gray-300 overflow-hidden">
          {quarters.map((q) => (
            <button
              key={q}
              className={`px-6 py-2 ${
                isSelected(q)
                  ? "bg-orange-100 text-orange-600 rounded-2xl"
                  : "bg-white text-gray-700"
              }`}
              onClick={() => handleQuarterClick(q)}
            >
              {q === "fullYear" ? "Full Year" : q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StorePerformanceHeader;
