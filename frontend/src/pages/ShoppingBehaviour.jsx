import React from "react";
import ItemsSoldPerCategoryChart from "../components/charts/shoppingbehaviour/ItemsSoldPerCategoryGraph";
import ItemsSoldPerBrandChart from "../components/charts/shoppingbehaviour/ItemsSoldPerBrandChart";
import TransactionsByDayChart from "../components/charts/shoppingbehaviour/TransactionsPerDayChart";
import TransactionsByHourChart from "../components/charts/shoppingbehaviour/TransactionsPerHourChart";
import MBAAssociationTable from "../components/charts/shoppingbehaviour/MBAAssociationTable"; // Import MBA Table

const ShoppingBehaviour = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Shopping Behaviour Analytics
      </h1>

      <div className="grid grid-cols-3 gap-6">
        {/*  Items Sold Per Category */}
        <div>
          <ItemsSoldPerCategoryChart />
        </div>

        {/*  Items Sold Per Brand */}
        <div className="col-span-2">
          <ItemsSoldPerBrandChart />
        </div>

        {/*  Transactions Per Day */}
        <div className="col-span-2">
          <TransactionsByDayChart />
        </div>

        {/*  Transactions Per Hour */}
        <div>
          <TransactionsByHourChart />
        </div>

        {/*  Market Basket Analysis Table */}
        <div className="col-span-3">
          <MBAAssociationTable />
        </div>

        {/*  Placeholder for Future Analytics */}
        <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-center">
          <p className="text-gray-500 italic">Coming Soon</p>
        </div>
      </div>
    </div>
  );
};

export default ShoppingBehaviour;
