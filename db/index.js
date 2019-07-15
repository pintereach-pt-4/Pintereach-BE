const knex = require("knex");
const config = require("../knexfile");

const environment = process.env.DB_ENV || "test";

module.exports = knex(config[environment]);
