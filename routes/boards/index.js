const express = require("express");
const router = express.Router();
const db = require("../../models/boardModel");

router.get("/", async (req, res) => {
  // get board from db
  try {
    const boards = await db.getBoards();
    res.status(200).json(boards);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const board = await db.getBoardById(req.params.id);
    res.status(200).json(board);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const board = await db.addBoard({
      created_by_id: req.decoded.id,
      created_by: req.decoded.username,
      ...req.body
    });
    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const changedBoard = await db.updateBoard(req.params.id, req.body);
    res.status(202).json(changedBoard);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const board = await db.deleteBoard(req.params.id);
    res.status(204).json(board);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

module.exports = router;
