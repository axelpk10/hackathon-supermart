const { gql } = require("apollo-server-express");

const customerInsightsSchema = gql`
  type Query {
    genderCount: [GenderCount]
    ageGroupCount: [AgeGroupCount]
    customerCountByCity: [CustomerCountByCity] # ✅ New Query for City-wise Customer Count
  }

  type GenderCount {
    gender: String
    gender_count: Int
  }

  type AgeGroupCount {
    age_group: String
    customer_count: Int
  }

  type CustomerCountByCity { 
    city: String
    customer_count: Int
  }
`;

module.exports = customerInsightsSchema;
