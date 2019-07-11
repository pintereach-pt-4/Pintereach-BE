exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users_boards")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users_boards").insert([
        { id: 1, created_by: 1, board_id: 1 },
        { id: 2, created_by: 2, board_id: 2 },
        { id: 3, created_by: 3, board_id: 3 },
        { id: 4, created_by: 4, board_id: 3 },
        { id: 5, created_by: 1, board_id: 5 }
      ]);
    });
};
