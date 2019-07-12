// Update with your config settings.

module.exports = {
  test: {
    client: "sqlite3",
    connection: {
      filename: "./db/test.sqlite3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds"
    }
  },

  development: {
    client: "postgresql",
    connection: {
      database: process.env.DB,
      user: process.env.USER,
      password: process.env.PW,
      host: process.env.HOST,
      port: process.env.PORT,
      uri: process.env.URI
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds"
    }
  }
};
