const server = require("../../api");
const request = require("supertest");
const bcrypt = require("bcryptjs");
const users = require("../../models/userModel");
const db = require("../../db");

let token;

beforeEach(async () => {
  await users.addUser({
    first_name: "Dwayne",
    last_name: "Johnson",
    email: "rock@example.com",
    username: "therock",
    password: bcrypt.hashSync("testpass123", 14)
  });
  const data = await request(server)
    .post("/api/login")
    .send({ username: "therock", password: "testpass123" });
  token = data.body.token;
});

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

describe("Test for User Routes", () => {
  describe("GET /api/users", () => {
    it("Should return authorization error", async () => {
      const data = await request(server).get("/api/users");
      expect(data.status).toBe(401);
      expect(data.text).toMatch(/no token provided. please authenticate/i);
    });

    it("Should return a list of users and Status code 200", async () => {
      const data = await request(server)
        .get("/api/users")
        .set({ token: token });
      expect(data.body).toHaveLength(2);
      expect(data.status).toBe(200);
    });
  });

  describe("GET /api/users/:id", () => {
    it("Should return authorization error", async () => {
      const data = await request(server).get("/api/users/1");
      expect(data.status).toBe(401);
      expect(data.text).toMatch(/no token provided. please authenticate/i);
    });

    it("Should return a specific board and Status code 200", async () => {
      const data = await request(server)
        .get("/api/users/1")
        .set({ token: token });
      expect(data.body.id).toBe(1);
      expect(data.body.username).toMatch(/america/i);
      expect(data.status).toBe(200);
    });
  });

  describe("PUT /api/users/:id", () => {
    it("Should return authorization error", async () => {
      const data = await request(server).put("/api/users/1");
      expect(data.status).toBe(401);
      expect(data.text).toMatch(/no token provided. please authenticate/i);
    });

    it("Should return an internal server error and  Status code 500", async () => {
      const data = await request(server)
        .put("/api/users/1")
        .set({ token: token });
      expect(data.serverError).toBe(true);
      expect(data.text).toMatch(/internal server error/i);
      expect(data.status).toBe(500);
    });

    it("Should return the updated item and status code 202", async () => {
      const data = await request(server)
        .put("/api/users/1")
        .set({ token: token })
        .send({ first_name: "gold" });
      expect(data.body).toBe(1);
      expect(data.status).toBe(202);
    });
  });

  describe("DELETE /api/users/:id", () => {
    it("Should return authorization error", async () => {
      const data = await request(server).delete("/api/users/2");
      expect(data.status).toBe(401);
      expect(data.text).toMatch(/no token provided. please authenticate/i);
    });

    it("Should return the updated item and status code 204", async () => {
      const data = await request(server)
        .delete("/api/users/2")
        .set({ token: token });
      expect(data.body).toMatchObject({});
      expect(data.status).toBe(204);
    });
  });

  describe("POST /api/users/", () => {
    it("Should return authorization error", async () => {
      const data = await request(server).post("/api/users/");
      expect(data.status).toBe(401);
      expect(data.text).toMatch(/no token provided. please authenticate/i);
    });
  });
});
