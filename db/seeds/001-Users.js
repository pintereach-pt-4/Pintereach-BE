const bcrypt = require("bcryptjs");
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          first_name: "John",
          last_name: "Doe",
          email: "JohnD@example.com",
          username: "john",
          password: bcrypt.hashSync("12345678", 10)
        },
        {
          id: 2,
          first_name: "Jane",
          last_name: "Roe",
          email: "JaneR@example.com",
          username: "jane",
          password: bcrypt.hashSync("12345678", 10)
        }
      ]);
    });
};
