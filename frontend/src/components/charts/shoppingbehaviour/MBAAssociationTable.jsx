import React, { useEffect, useState } from "react";
import { fetchAssociationRules } from "../../../utils/shoppingBehaviourApi";

const MBAAssociationTable = () => {
  const [rules, setRules] = useState([]);

  useEffect(() => {
    fetchAssociationRules().then(setRules);
  }, []);

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      {/*  Table Title */}
      <h2 className="text-2xl font-bold mb-4 text-center">
        Market Basket Analysis (MBA) Rules
      </h2>

      {/*  Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="px-4 py-2 border">
                Antecedents (Bought Together)
              </th>
              <th className="px-4 py-2 border">Consequents (Suggested Item)</th>
            </tr>
          </thead>
          <tbody>
            {rules.length > 0 ? (
              rules.map((rule, index) => (
                <tr key={index} className="border">
                  <td className="px-4 py-2 border">{rule.antecedents}</td>
                  <td className="px-4 py-2 border">{rule.consequents}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="2"
                  className="text-center py-4 text-gray-500 font-semibold">
                  No association rules available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MBAAssociationTable;
