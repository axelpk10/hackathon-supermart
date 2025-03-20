const { gql } = require("apollo-server-express");

const marketingCampaignAnalysisSchema = gql`
  type AgeGroupEngagement {
    age_group: String
    engagement_count: Int
  }

  type CampaignTypeRevenue {
    campaign_type: String
    total_revenue: Float
  }

  type TopCampaign {
    campaign_id: String
    campaign_name: String
    revenue_generated: Float
  }

  type CTRConversionTrends {
    month: String
    avg_ctr: Float
    avg_conversion_rate: Float
  }

  type BudgetVsRevenue {
    campaign_name: String
    budget: Float
    revenue_generated: Float
  }

  type CampaignTypeCTR {
    campaign_type: String
    avg_ctr: Float
  }

  type CampaignTypeConversionRate {
    campaign_type: String
    avg_conversion_rate: Float
  }

  type Query {
    getCustomersByAgeGroup(year: Int!): [AgeGroupEngagement]
    getTopPerformingCampaignType(year: Int!): [CampaignTypeRevenue]
    getTopCampaignsByRevenue(year: Int!): [TopCampaign]
    getCTRConversionTrends(year: Int!): [CTRConversionTrends]
    getBudgetVsRevenue(year: Int!): [BudgetVsRevenue]
    getCTRByCampaignType(year: Int!): [CampaignTypeCTR]
    getConversionRateByCampaignType(year: Int!): [CampaignTypeConversionRate]
  }
`;

module.exports = marketingCampaignAnalysisSchema;
