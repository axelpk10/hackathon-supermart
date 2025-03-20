const http = require("http");
const dotenv = require("dotenv");
const { app, startApolloServer } = require("./app"); // Import app & Apollo startup

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// Ensure Apollo Server is started before Express
startApolloServer()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to start server:", error.message);
  });
