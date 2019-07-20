const express = require("express");
const router = express.Router();
const db = require("../../models/userModel");

// get users from db
router.get("/", async (req, res) => {
  try {
    const users = await db.getUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await db.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const user = await db.updateUser(req.params.id, req.body);
    res.status(202).json(user);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await db.deleteUser(req.params.id);
    res.status(204).json(user);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

module.exports = router;
