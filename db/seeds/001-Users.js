exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          first_name: "Dwayne",
          last_name: "Johnson",
          email: "rock@example.com",
          username: "therock",
          password: "testpass123"
        },
        {
          id: 2,
          first_name: "Matt",
          last_name: "Damon",
          email: "mattd@example.com",
          username: "mattd",
          password: "testpass123"
        },
        {
          id: 3,
          first_name: "Steve",
          last_name: "Rogers",
          email: "srogers@example.com",
          username: "america",
          password: "testpass123"
        }
      ]);
    });
};
