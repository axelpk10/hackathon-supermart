const { gql } = require("apollo-server-express");

const shoppingBehaviourSchema = gql`
  scalar BigInt

  type ItemsSoldPerCategory {
    category: String!
    total_items_sold: BigInt!
  }

  type ItemsSoldPerBrand {
    brand: String!
    total_items_sold: BigInt!
  }

  type TransactionsByDay {
    transaction_day: String!
    transaction_count: BigInt!
  }

  type TransactionsByHour {
    transaction_hour: String!
    transaction_count: BigInt!
  }

  type Query {
    itemsSoldPerCategory(year: Int!): [ItemsSoldPerCategory]
    itemsSoldPerBrand(year: Int!): [ItemsSoldPerBrand]
    transactionsByDay(year: Int!): [TransactionsByDay]
    transactionsByHour(year: Int!): [TransactionsByHour]
  }
`;

module.exports = shoppingBehaviourSchema;
