import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import axios from "axios";

const StorePerformanceHeader = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedQuarter, setSelectedQuarter] = useState("Q1");
  const [selectedCity, setSelectedCity] = useState("All Stores");
  const [selectedBranch, setSelectedBranch] = useState("All Branches");

  const [cities, setCities] = useState([]);
  const [branches, setBranches] = useState([]);

  const years = [ "2024", "2025"];
  const quarters = ["Q1", "Q2", "Q3", "Q4", "fullYear"];

  // Fetch cities on mount
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("/api/cities");
        setCities(response.data); 
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, []);

  // Fetch branches when city changes
  useEffect(() => {
    const fetchBranches = async () => {
      if (selectedCity === "All Stores") {
        setBranches([]);
        setSelectedBranch("All Branches");
        return;
      }

      try {
        const response = await axios.get(`/api/branches?city=${selectedCity}`);
        setBranches(response.data); // Assumes response.data is an array of branch names
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };
    fetchBranches();
  }, [selectedCity]);

  const handleYearChange = (e) => setSelectedYear(e.target.value);
  const handleCityChange = (e) => setSelectedCity(e.target.value);
  const handleBranchChange = (e) => setSelectedBranch(e.target.value);
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

        {/* City Dropdown */}
        <div className="relative w-40">
          <select
            value={selectedCity}
            onChange={handleCityChange}
            className="w-full px-4 py-3 pr-10 text-center rounded-xl border border-gray-300 bg-white text-gray-700 outline-none appearance-none cursor-pointer"
          >
            <option value="All Stores">All Stores</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>

        {/* Branch Dropdown (Only if city is selected) */}
        {selectedCity !== "All Stores" && (
          <div className="relative w-40">
            <select
              value={selectedBranch}
              onChange={handleBranchChange}
              className="w-full px-4 py-3 pr-10 text-center rounded-xl border border-gray-300 bg-white text-gray-700 outline-none appearance-none cursor-pointer"
            >
              <option value="All Branches">All Branches</option>
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        )}

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
