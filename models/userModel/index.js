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
// Returns a user by the given ID
const getUserName = name => {
  return db("users")
    .where({ username: name })
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
const addUser = user => {
  return db("users")
    .insert(user)
    .returning(["id", "username"]);
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  addUser,
  getUserName
};
