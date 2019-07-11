const db = require("../../db");

// List all the users in the Database
const getUsers = () => {
  return db("users");
};

// Returns a user by the given ID
const getUserById = id => {
  return db("users")
    .where({ id })
    .first();
};

// Updates a user's information where the ID matches
const updateUser = (id, changes) => {
  return db("users")
    .where({ id })
    .update(changes);
};

// Deletes a user from the Database
const deleteUser = id => {
  return db("users")
    .where({ id })
    .del();
};

// Inserts a new user into the Database
const postUser = user => {
  return db("users").insert(user);
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  postUser
};
