const express = require("express");
const router = express.Router();
const db = require("../../models/userModel");
const mw = require("../../middlewares");

router.post("/login", mw.auth, async (req, res) => {
  try {
    res
      .status(200)
      .json({ message: "logged in", token: req.token, id: req.decoded });
  } catch (err) {
    res.status(500).json(err, "Internal Server Error!");
  }
});

router.post("/register", mw.hashPass, async (req, res) => {
  try {
    const user = await db.addUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err, "Internal Server Error!");
  }
});
module.exports = router;
