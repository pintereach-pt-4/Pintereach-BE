const server = require("../../api");
const request = require("supertest");
const boards = require("../../models/boardModel");
const db = require("../../db");

let token;

beforeEach(async () => {
  const data = await request(server)
    .post("/api/login")
    .send({ username: "america", password: "testpass123" });
  token = data.body.token;
});

afterEach(async () => {
  await db("boards").truncate();
  await boards.addBoard({
    title: "Sleep Research",
    url:
      "https://elemental.medium.com/the-dawning-truth-about-night-owls-650d8ed12206",
    description:
      " I have a paper to write and the negative effects of not sleeping well",
    category: "Health",
    created_by_id: 1,
    created_by: "therock"
  });
});

describe("Test for Board Routes", () => {
  describe("GET /api/boards", () => {
    it("Should return authorization error", async () => {
      const data = await request(server).get("/api/boards");
      expect(data.status).toBe(401);
      expect(data.text).toMatch(/no token provided. please authenticate/i);
    });

    it("Should return a list of boards and Status code 200", async () => {
      const data = await request(server)
        .get("/api/boards")
        .set({ token: token });
      expect(data.body).toHaveLength(1);
      expect(data.status).toBe(200);
    });
  });

  describe("GET /api/boards/:id", () => {
    it("Should return authorization error", async () => {
      const data = await request(server).get("/api/boards/1");
      expect(data.status).toBe(401);
      expect(data.text).toMatch(/no token provided. please authenticate/i);
    });

    it("Should return a specific board and Status code 200", async () => {
      const data = await request(server)
        .get("/api/boards/1")
        .set({ token: token });
      expect(data.body.id).toBe(1);
      expect(data.body.title).toMatch(/sleep research/i);
      expect(data.status).toBe(200);
    });
  });

  describe("PUT /api/boards/:id", () => {
    it("Should return authorization error", async () => {
      const data = await request(server).put("/api/boards/1");
      expect(data.status).toBe(401);
      expect(data.text).toMatch(/no token provided. please authenticate/i);
    });

    it("Should return an internal server error and  Status code 500", async () => {
      const data = await request(server)
        .put("/api/boards/1")
        .set({ token: token });
      expect(data.serverError).toBe(true);
      expect(data.text).toMatch(/internal server error/i);
      expect(data.status).toBe(500);
    });

    it("Should return the updated item and status code 202", async () => {
      const data = await request(server)
        .put("/api/boards/1")
        .set({ token: token })
        .send({ category: "Science" });
      expect(data.body).toBe(1);
      expect(data.status).toBe(202);
    });
  });

  describe("DELETE /api/boards/:id", () => {
    it("Should return authorization error", async () => {
      const data = await request(server).delete("/api/boards/1");
      expect(data.status).toBe(401);
      expect(data.text).toMatch(/no token provided. please authenticate/i);
    });

    it("Should return the updated item and status code 204", async () => {
      const data = await request(server)
        .delete("/api/boards/1")
        .set({ token: token });
      expect(data.body).toMatchObject({});
      expect(data.status).toBe(204);
    });
  });

  describe("POST /api/boards/", () => {
    it("Should return authorization error", async () => {
      const data = await request(server).post("/api/boards/");
      expect(data.status).toBe(401);
      expect(data.text).toMatch(/no token provided. please authenticate/i);
    });

    it("Should add a new board to the database", async () => {
      const data = await request(server)
        .post("/api/boards/")
        .set({ token: token })
        .send({
          title: "I need to be more Productive",
          url:
            "https://medium.com/swlh/the-ivy-lee-method-a-100-year-old-routine-for-stress-free-productivity-242f1151b22e",
          description:
            "I've gotten better at time management, but I need to achieve more.",
          category: "Productivity",
          created_by_id: 1,
          created_by: "therock"
        });
      expect(data.text).toMatch(/2/);
      expect(data.status).toBe(201);
    });
  });
});
