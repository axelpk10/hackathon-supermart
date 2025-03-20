const { gql } = require("apollo-server-express");

const overviewSchema = gql`
  type Query {
    monthlyRevenue(year: String!, quarter: String!): [MonthlyRevenue]
    topStoresRevenue(year: String!, quarter: String): [StoreRevenue]
    transactionsPerMonth(
      year: String!
      quarter: String!
    ): [TransactionsPerMonth]
    categoryShare(year: String!, quarter: String!): [CategoryShare]
    transactionsByPaymentMethod(year: String!): [PaymentMethodTransactions]
  }

  type MonthlyRevenue {
    month: String
    totalRevenue: Float
  }

  type StoreRevenue {
    storename: String
    quarter: String
    totalrevenue: Float
  }

  type TransactionsPerMonth {
    month: String
    transactionCount: Int
  }

  type CategoryShare {
    product_category: String
    transaction_count: Int
  }

  type PaymentMethodTransactions {
    paymentmethod: String
    transactioncount: Int
  }
`;

module.exports = overviewSchema;
