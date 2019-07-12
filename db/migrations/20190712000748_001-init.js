exports.up = async function(knex) {
  await knex.schema.createTable("users", tbl => {
    tbl.increments("id");
    tbl.string("first_name").notNullable();
    tbl.string("last_name").notNullable();
    tbl
      .string("email")
      .notNullable()
      .unique();
    tbl
      .string("username")
      .notNullable()
      .unique();
    tbl.string("password").notNullable();
  });

  await knex.schema.createTable("boards", tbl => {
    tbl.increments("id");
    tbl.string("title").notNullable();
    tbl.string("url").notNullable();
    tbl.string("description").notNullable();
    tbl.string("category").notNullable();
    tbl
      .integer("created_by")
      .references("id")
      .inTable("users");
  });

  await knex.schema.createTable("users_boards", tbl => {
    tbl.increments("id");
    tbl
      .integer("created_by")
      .references("id")
      .inTable("users");
    tbl
      .integer("board_id")
      .references("id")
      .inTable("boards");
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("users_boards");
  await knex.schema.dropTableIfExists("boards");
  await knex.schema.dropTableIfExists("users");
};
