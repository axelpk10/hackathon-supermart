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
    monthlyRevenueByStore(
      year: Int!
      storeId: Int
      quarter: String
    ): [MonthlyRevenue]
    profitByStorePerMonth(
      year: Int!
      storeId: Int
      quarter: String
    ): [ProfitByStore]

    totalItemsSoldPerStorePerMonth(
      year: Int!
      store_id: Int
      quarter: String
    ): [ItemsSoldPerStoreMonth]

    # COGS Per Store Per Year
    cogsPerStorePerYear(year: Int!, store_id: Int): [CogsPerStore]

    # Store Profit Margin
    storeProfitMargin(year: Int!, store_id: Int): [StoreProfitMargin]

    # Yearly Profit by Store
    yearlyProfitByStore(year: Int!, store_id: Int): [YearlyProfitByStore]
  }
`;

module.exports = storeMetricsSchema;
