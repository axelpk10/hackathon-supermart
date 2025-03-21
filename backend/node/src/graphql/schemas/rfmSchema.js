const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    getRfmMetrics: [RfmMetric]
    getCustomerRfm(customerId: ID!): RfmMetric
    getSegmentSummary: [SegmentSummary]
  }

  type Mutation {
    generateRfmMetrics: GenerateRfmResponse
  }

  type RfmMetric {
    customer_id: ID!
    segment: String!
    frequency: Int!
    recency_days: Int!
    first_purchase_date: String
    last_purchase_date: String
    customer_lifetime_days: Int
    average_purchase_frequency: Float
    total_amount: Float!
  }

  type SegmentSummary {
    segment: String!
    customerCount: Int!
    totalAmount: Float!
    avgFrequency: Float!
    avgRecencyDays: Float!
    avgLifetimeDays: Float!
    customers: [ID!]!
  }

  type GenerateRfmResponse {
    success: Boolean!
    message: String!
    totalCustomers: Int!
  }
`;

module.exports = typeDefs;
