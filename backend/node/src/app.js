const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { expressMiddleware } = require("@apollo/server/express4");
const apolloServer = require("./graphql");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Start Apollo Server
async function startApolloServer() {
  try {
    await apolloServer.start();
    app.use("/graphql", expressMiddleware(apolloServer));
    console.log("🚀 GraphQL server is running at /graphql");
  } catch (error) {
    console.error("❌ Error starting Apollo Server:", error.message);
  }
}

module.exports = { app, startApolloServer };
