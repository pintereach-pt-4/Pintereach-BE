exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("boards")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("boards").insert([
        {
          id: 1,
          title: "Sleep Research",
          url:
            "https://elemental.medium.com/the-dawning-truth-about-night-owls-650d8ed12206",
          description:
            " I have a paper to write and the negative effects of not sleeping well",
          category: "Health",
          created_by_id: 1,
          created_by: "therock"
        },
        {
          id: 2,
          title: "Trying to find the meaning of Life",
          url:
            "https://medium.com/s/more-to-that/the-meaning-of-life-is-absurd-ecd870bfa3e6",
          description:
            "I've been tasked to give a speech on what life means, and frankly I've got no clue",
          category: "Life",
          created_by_id: 2,
          created_by: "mattd"
        },
        {
          id: 3,
          title: "Big O For Beginners",
          url: "https://hackernoon.com/big-o-for-beginners-622a64760e2",
          description: "A Beginners Guide to Big O",
          category: "Computer Science",
          created_by_id: 3,
          created_by: "america"
        },
        {
          id: 4,
          title: "Recursion Made Simple",
          url: "https://medium.com/code-zen/recursion-demystified-24867f045c62",
          description: "A Simple Guide To Understanding Recursion",
          category: "Computer Science",
          created_by_id: 3,
          created_by: "america"
        },
        {
          id: 5,
          title: "I need to be more Productive",
          url:
            "https://medium.com/swlh/the-ivy-lee-method-a-100-year-old-routine-for-stress-free-productivity-242f1151b22e",
          description:
            "I've gotten better at time management, but I need to achieve more.",
          category: "Productivity",
          created_by_id: 1,
          created_by: "therock"
        }
      ]);
    });
};
