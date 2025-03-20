const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    getAssociationRules: [AssociationRule]
  }

  type AssociationRule {
    antecedents: String!
    consequents: String!
  }
`;

module.exports = typeDefs;