import React from "react";
import GenderDistributionChart from "../components/charts/customerinsights/GenderDistributionChart";
import AgeGroupDistributionChart from "../components/charts/customerinsights/AgeGroupChart";
import CustomerCountByCityChart from "../components/charts/customerinsights/CustomerCountByCityChart";
import rfm from "../assets/hac-assets/rfm.jpg";
import frequencyMonetary from "../assets/hac-assets/frequencyMonetary.jpg"; // Ensure file extension

const CustomerInsights = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Customer Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 shadow rounded">
          <GenderDistributionChart />
        </div>
        <div className="bg-white p-4 shadow rounded col-span-2">
          <CustomerCountByCityChart />
        </div>
        <div className="bg-white p-4 shadow rounded">
          <AgeGroupDistributionChart />
        </div>
        <div className="bg-white p-4 shadow rounded flex flex-col justify-center items-center">
          <h2 className="text-lg font-semibold mb-2 text-center">
            RFM Analysis
          </h2>
          <img
            src={rfm}
            alt="RFM Analysis"
            className="w-full h-auto rounded-lg"
          />
        </div>

        <div className="bg-white p-4 shadow rounded flex flex-col justify-center items-center">
          <h2 className="text-lg font-semibold mb-2 text-center">
            Frequency vs. Monetary
          </h2>
          <img
            src={frequencyMonetary}
            alt="Frequency vs. Monetary"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerInsights;
