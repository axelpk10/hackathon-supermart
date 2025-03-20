const { gql } = require("apollo-server-express");

const storeMetricsSchema = gql`
  scalar BigInt
  type MonthlyRevenue {
    store_id: Int
    store_location: String
    city: String
    month: String
    total_revenue: Float
  }

  type ProfitByStore {
    store_id: Int
    store_location: String
    city: String
    month: String
    total_profit: Float
  }

  type ItemsSoldPerStoreMonth {
    store_id: Int
    store_location: String
    city: String
    month: String
    total_items_sold: BigInt
  }

  type CogsPerStore {
    store_id: Int
    year: Int
    total_cogs: Float
  }

  type YearlyProfitByStore {
    store_id: Int
    store_location: String
    city: String
    total_profit: Float
  }

  type Query {
    monthlyRevenueByStore(
      store_id: Int!
      month: String!
      year: Int!
    ): [MonthlyRevenue]
    profitByStorePerMonth(
      store_id: Int!
      month: String!
      year: Int!
    ): [ProfitByStore]
    totalItemsSoldPerStorePerMonth(
      store_id: Int!
      month: String!
      year: Int!
    ): [ItemsSoldPerStoreMonth]
    cogsPerStorePerYear(store_id: Int!, year: Int!): [CogsPerStore]
    yearlyProfitByStore(store_id: Int!, year: Int!): [YearlyProfitByStore]
  }
`;

module.exports = storeMetricsSchema;
