const server = require("../../api");
const request = require("supertest");
const db = require("../../db");

beforeEach(async () => {
  await db("users").truncate();
});
