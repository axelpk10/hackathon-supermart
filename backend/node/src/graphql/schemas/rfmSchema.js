const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    getRFMData: [RFMMetric]
  }

  
  type RFMMetric {
    customer_id: ID!
    recency: Float!
    frequency: Int!
    monetary: Float!
    label: String!
  }
`;

module.exports = typeDefs;
