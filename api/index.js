const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { userRoutes, boardRoutes, authRoutes } = require("../routes");
const mw = require("../middlewares");

const server = express();

// Middleware
server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json("Server is Live!");
});

// Route configuration
server.use("/api/users", mw.protectedRoute, userRoutes);
server.use("/api/boards", mw.protectedRoute, boardRoutes);
server.use("/api/", authRoutes);

module.exports = server;
