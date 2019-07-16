const db = require("../../db/index");
const users = require("../../models/userModel");
const bcrypt = require("bcryptjs");

describe("Test for the User Model", () => {
  beforeEach(async () => {
    await db("users").truncate();
    await users.addUser({
      first_name: "Steve",
      last_name: "Rogers",
      email: "srogers@example.com",
      username: "america",
      password: bcrypt.hashSync("testpass123", 14)
    });
  });
  describe("addUser database helper", () => {
    it("Should add a new user", async () => {
      const newUser = {
        first_name: "Bruce",
        last_name: "Banner",
        email: "hulk@example.com",
        username: "hulk",
        password: bcrypt.hashSync("testpass123", 14)
      };

      const data = await users.addUser(newUser);
      const user = await users.getUserById(2);
      expect(data.length).toBe(1);
      expect(user.first_name).toMatch(/bruce/i);
    });
  });

  describe("removeUser database helper", () => {
    it("Should remove a new user based by the id", async () => {
      const data = await users.deleteUser(1);
      const user = await users.getUsers();
      expect(data).toBe(1); //Represents the number of entries modified
      expect(user).toHaveLength(0);
    });
  });

  describe("getUsers database helper", () => {
    it("Should return an array of users", async () => {
      const data = await users.getUsers();
      expect(data).toHaveLength(1);
    });
  });

  describe("updateUsers database helper", () => {
    it("Should return an updated user from the database", async () => {
      const changes = { username: "srogers" };
      const data = await users.updateUser(1, changes);
      const user = await users.getUserById(1);
      expect(data).toBe(1);
      expect(user.username).toMatch(/srogers/i);
    });
  });

  describe("getUserName database helper", () => {
    it("Should return a user from the database with the specified name", async () => {
      const user = await users.getUserName("america");
      expect(user.username).toMatch(/america/i);
    });
  });
});
