const express = require("express");
const router = express.Router();
const db = require("../../models/boardModel");

router.get("/", (req, res) => {
  res.status(200).json("From Boards Router");
});

module.exports = router;
