const { gql } = require("apollo-server-express");

const demandForecastSchema = gql`
  type StoreForecast {
    date: String
    forecast: JSON
  }

  type CategoryForecast {
    date: String
    forecast: JSON
  }

  type Query {
    storeForecast(date: String): [StoreForecast]
    categoryForecast(date: String): [CategoryForecast]
  }

  type Mutation {
    runForecast: String
  }

  scalar JSON
`;

module.exports = demandForecastSchema;
