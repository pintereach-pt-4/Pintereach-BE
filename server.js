const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { userRoutes, boardRoutes } = require("./routes");

const server = express();

// Middleware
server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json("Server is Live!");
});

// Route configuration
server.use("/api/users", userRoutes);
server.use("/api/boards", boardRoutes);

module.exports = server;
