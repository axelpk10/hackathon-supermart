const { ApolloServer } = require("@apollo/server");
const { mergeTypeDefs } = require("@graphql-tools/merge");
const { mergeResolvers } = require("@graphql-tools/merge");

const overviewSchema = require("./schemas/overviewSchema");
const overviewResolvers = require("./resolvers/overviewResolvers");
const customerInsightsSchema = require("./schemas/customerInsightsSchema");
const customerInsightsResolvers = require("./resolvers/customerInsightsResolvers");
const storeMetricsSchema = require("./schemas/storeMetricsSchema");
const storeMetricsResolvers = require("./resolvers/storeMetricsResolvers");
const rfmSchema = require("./schemas/rfmSchema");
const rfmResolvers = require("./resolvers/rfmResolvers");
const demandForecastSchema = require("./schemas/demandForecastSchema");
const demandForecastResolver = require("./resolvers/demandForecastResolver");
const marketBasketSchema = require("./schemas/marketBasketSchema");
const marketBasketResolvers = require("./resolvers/marketBasketResolvers");
const shoppingBehaviourResolvers = require("./resolvers/shoppingBehaviourResolvers");
const shoppingBehaviourSchema = require("./schemas/shoppingBehaviourSchema");
const marketingCampaignAnalysisSchema = require("./schemas/marketingCampaignAnalysisSchema");
const marketingCampaignAnalysisResolvers = require("./resolvers/marketingCampaignAnalysisResolver");

const typeDefs = mergeTypeDefs([
  overviewSchema,
  customerInsightsSchema,
  storeMetricsSchema,
  rfmSchema,
  demandForecastSchema,
  marketBasketSchema,
  shoppingBehaviourSchema,
  marketingCampaignAnalysisSchema
]);
const resolvers = mergeResolvers([
  overviewResolvers,
  customerInsightsResolvers,
  storeMetricsResolvers,
  rfmResolvers,
  demandForecastResolver,
  marketBasketResolvers,
  shoppingBehaviourResolvers,
  marketingCampaignAnalysisResolvers
]);

const apolloServer = new ApolloServer({ typeDefs, resolvers });

module.exports = apolloServer;
