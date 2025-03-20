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

  type ItemsSoldPerStoreYear {
    store_id: Int
    store_location: String
    city: String
    year: String
    total_items_sold: BigInt
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

  type TierRevenue {
    tier: Int
    total_revenue: Float
  }

  type StoreProfitByMonth {
    store_id: Int!
    store_location: String!
    city: String!
    month: String!
    total_profit: Float!
  }

  type StoreProfitMargin {
    store_id: Int!
    store_location: String!
    city: String!
    profit_margin: Float!
  }

  type YearlyProfitByStore {
    store_id: Int!
    store_location: String!
    city: String!
    total_profit: Float!
  }

  

  type Query {
    monthlyRevenueByStore(year: Int!): [MonthlyRevenue]
    profitByStorePerMonth(year: Int!): [ProfitByStore]
    totalItemsSoldPerStorePerYear(year: Int!): [ItemsSoldPerStoreYear]
    totalItemsSoldPerStorePerMonth(year: Int!): [ItemsSoldPerStoreMonth]
    cogsPerStorePerYear(year: Int!): [CogsPerStore]
    fetchTierWiseRevenue(year: Int!): [TierRevenue]
    storeProfitMargin(year: Int!): [StoreProfitMargin]
    yearlyProfitByStore(year: Int!): [YearlyProfitByStore]
  }
`;

module.exports = storeMetricsSchema;
