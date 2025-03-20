import React from "react";
import CustomersByAgeGroupChart from "../components/charts/marketing/CustomerByAgeGroupChart";
import TopPerformingCampaignTypeChart from "../components/charts/marketing/TopPerformingCampaignTypeChart";
import TopCampaignsByRevenueChart from "../components/charts/marketing/TopCampaignsByRevenueChart";
import CTRConversionTrendsChart from "../components/charts/marketing/CTRConversionTrendsChart";
import BudgetVsRevenueChart from "../components/charts/marketing/BudgetVsRevenueChart";
import CTRByCampaignType from "../components/charts/marketing/CTRByCampaignType";
import ConversionRateByCampaignType from "../components/charts/marketing/ConversionRateByCampaignType";

const Marketing = () => {
  return (
    <div className="p-4">
      {/* 4x2 Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <CustomersByAgeGroupChart />
        <TopCampaignsByRevenueChart />
        <TopPerformingCampaignTypeChart />
        <CTRConversionTrendsChart />
        <CTRByCampaignType />
        <ConversionRateByCampaignType />
      </div>

      {/* Budget vs Revenue Chart (Placed Separately) */}
      <div className="mt-8">
        <BudgetVsRevenueChart />
      </div>
    </div>
  );
};

export default Marketing;
