const db = require("../../db");

// List all the boards in the Database
const getBoards = () => {
  return db("boards");
};

// Returns a board by the given ID
const getBoardById = id => {
  return db("boards")
    .where({ id })
    .first();
};

// Updates a board's information where the ID matches
const updateBoard = (id, changes) => {
  return db("boards")
    .where({ id })
    .update(changes);
};

// Deletes a Board from the Database
const deleteBoard = id => {
  return db("boards")
    .where({ id })
    .del();
};

// Inserts a new Board into the Database
const postBoard = board => {
  return db("boards").insert(board);
};

module.exports = {
  getBoards,
  getBoardById,
  updateBoard,
  deleteBoard,
  postBoard
};
