const server = require("../api");
const request = require("supertest");
const db = require("../db");
const users = require("../models/userModel");
const bcrypt = require("bcryptjs");

describe("Test for the Server", () => {
  afterEach(async () => {
    await db("users").truncate();
    await users.addUser({
      first_name: "Steve",
      last_name: "Rogers",
      email: "srogers@example.com",
      username: "america",
      password: bcrypt.hashSync("testpass123", 14)
    });
  });

  describe("GET /", () => {
    it("Should return status code of 200", async () => {
      const data = await request(server).get("/");
      expect(data.status).toBe(200);
    });

    it("Application type should be json and charset to be utf-8", async () => {
      const data = await request(server).get("/");
      expect(data.type).toBe("application/json");
      expect(data.charset).toBe("utf-8");
    });

    it("Should return json message 'Server is Live' ", async () => {
      const data = await request(server).get("/");
      expect(data.body).toBe("Server is Live!");
    });
  });

  describe("POST /login", () => {
    it("Should return status code 500 and Server Error", async () => {
      const data = await request(server).post("/api/login");
      expect(data.status).toBe(500);
      expect(data.serverError).toBe(true);
    });

    it("Should return a token & user info. Status should be 200", async () => {
      const user = { username: "america", password: "testpass123" };
      const data = await request(server)
        .post("/api/login/")
        .send(user);
      expect(data.body.token).toBeTruthy();
      expect(data.status).toBe(200);
      expect(data.body.user.username).toBe(user.username);
    });

    it("Should return Error with incorrect credentials.", async () => {
      const user = { username: "america", password: "testpass" };
      const data = await request(server)
        .post("/api/login/")
        .send(user);
      expect(data.status).toBe(404);
      expect(data.body.message).toBe("Invalid username or password!");
    });
  });

  describe("POST /register", () => {
    it("Should return status code 400 and a custom password error", async () => {
      const data = await request(server).post("/api/register/");
      expect(data.status).toBe(400);
      expect(data.text).toMatch(/password required/i);
    });

    it("Should return status code 400 and password length error", async () => {
      const user = {
        username: "ironman",
        password: "test",
        first_name: "Tony",
        last_name: "Stark",
        email: "iron@example.com"
      };
      const data = await request(server)
        .post("/api/register/")
        .send(user);
      expect(data.status).toBe(400);
      expect(data.text).toMatch(/password must be at least 8 characters long/i);
    });

    it("Should return status code 200 and success a success message", async () => {
      const user = {
        username: "ironman",
        password: "testpass123",
        first_name: "Tony",
        last_name: "Stark",
        email: "iron@example.com"
      };
      const data = await request(server)
        .post("/api/register/")
        .send(user);
      expect(data.status).toBe(201);
      expect(data.text).toMatch(/success/i);
    });
    it("Should return status code 500 & Server Error if user is already in the databae", async () => {
      const user = {
        username: "ironman",
        password: "testpass123",
        first_name: "Tony",
        last_name: "Stark",
        email: "iron@example.com"
      };
      await request(server)
        .post("/api/register/")
        .send(user);
      const data = await request(server)
        .post("/api/register/")
        .send(user);
      expect(data.status).toBe(500);
      expect(data.serverError).toBe(true);
      expect(data.text).toMatch(/error/i);
    });
  });
});
