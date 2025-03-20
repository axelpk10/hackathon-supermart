import React from 'react'
import ItemsSoldPerCategoryChart from "../components/charts/marketing/ItemsSoldPerCategoryGraph";
import ItemsSoldPerBrandChart from "../components/charts/marketing/ItemsSoldPerBrandChart";
import TransactionsByDayChart from "../components/charts/marketing/TransactionsPerDayChart";
import TransactionsByHourChart from "../components/charts/marketing/TransactionsPerHourChart";

const ShoppingBehaviour = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Marketing Analytics
      </h1>

      <div className="grid grid-cols-3 gap-6">
        <div>
          <ItemsSoldPerCategoryChart />
        </div>

        <div className=" col-span-2">
          <ItemsSoldPerBrandChart />
        </div>

        <div className="col-span-2">
          <TransactionsByDayChart />
        </div>

        <div className="">
          <TransactionsByHourChart />
        </div>

        <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-center">
          <p className="text-gray-500 italic">Coming Soon</p>
        </div>
      </div>
    </div>
  );
}

export default ShoppingBehaviour