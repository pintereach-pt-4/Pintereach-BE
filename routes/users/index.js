const express = require("express");
const router = express.Router();
const db = require("../../models/userModel");

router.get("/", (req, res) => {
  res.status(200).json("From Users Router");
});

module.exports = router;
