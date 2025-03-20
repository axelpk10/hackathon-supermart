import React, { useEffect, useState } from "react";
import { fetchTopCampaignsByRevenue } from "../../../utils/marketingApi";
import { formatNumber } from "../../../utils/formatNumber";

const TopCampaignsByRevenueTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchTopCampaignsByRevenue().then((response) => {
      // Sort campaigns by revenue in descending order
      const sortedData = response.sort(
        (a, b) => b.revenue_generated - a.revenue_generated
      );
      setData(sortedData);
    });
  }, []);

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      {/*  Table Title */}
      <h2 className="text-2xl font-bold mb-4 text-center">
        Top Campaigns by Revenue
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Campaign Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-right">
                Revenue (₹)
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((campaign, index) => (
              <tr
                key={index}
                className="border-b border-gray-300 hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {campaign.campaign_name}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right text-green-600">
                  ₹{formatNumber(campaign.revenue_generated)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopCampaignsByRevenueTable;
