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
          category: "Other",
          notes:"# The Dawning Truth about Night Owls...",
          created_by_id: 1,
          created_by: "john"
        },
        {
          id: 2,
          title: "Trying to find the meaning of Life",
          url:
            "https://medium.com/s/more-to-that/the-meaning-of-life-is-absurd-ecd870bfa3e6",
          description:
            "I've been tasked to give a speech on what life means, and frankly I've got no clue",
          category: "Other",
          notes:"# The Meaning of Life Is Absurd",
          created_by_id: 1,
          created_by: "john"
        },
        {
          id: 3,
          title: "League of Legends tonight",
          url: "https://www.leagueofgraphs.com/rankings/summoners/akali/na",
          description: "Akali is the best champion",
          category: "General",
          notes:"# Akali For Life! then maybe Ezreal",
          created_by_id: 1,
          created_by: "john"
        },
        {
          id: 4,
          title: "Recursion Made Simple",
          url: "https://medium.com/code-zen/recursion-demystified-24867f045c62",
          description: "A Simple Guide To Understanding Recursion",
          category: "Computer Science",
          notes:"",
          created_by_id: 1,
          created_by: "john"
        },
        {
          id: 5,
          title: "I need to be more Productive",
          url:
            "https://medium.com/swlh/the-ivy-lee-method-a-100-year-old-routine-for-stress-free-productivity-242f1151b22e",
          description:
            "I've gotten better at time management, but I need to achieve more.",
          category: "Productivity",
          notes:"",
          created_by_id: 1,
          created_by: "john"
        },
        {
          id: 6,
          title: "Overwatchers Unite",
          url:
            "https://playoverwatch.com/en-us/heroes/hanzo/",
          description:
            " I'm a Hanzo main... Fear Me!",
          category: "General",
          notes:"# I always put the team on my back!",
          created_by_id: 2,
          created_by: "jane"
        },
        {
          id: 7,
          title: "Ancient Greece",
          url:
            "https://medium.com/swlh/how-an-ancient-greek-philosophy-can-maximize-your-productivity-6fafdd1be174",
          description:
            "This article has some secrets from long ago. I think I'm on to something",
          category: "Life",
          notes:"",
          created_by_id: 2,
          created_by: "jane"
        },
        {
          id: 8,
          title: "Morning Routines",
          url:
            "https://medium.com/better-humans/this-morning-routine-will-save-you-20-hours-per-week-a05c68b8e73c",
          description:
            "I need to get my cousin to read this. Hopefully improve his day!",
          category: "General",
          notes:"",
          created_by_id: 2,
          created_by: "jane"
        },
        {
          id: 9,
          title: "Passion",
          url:
            "https://medium.com/darius-foroux/say-yes-to-your-passion-and-no-to-everything-else-25d37e09787b",
          description:
            "Be passionate about one thing, say no to everything else",
          category: "Life",
          notes:"# Human beings are quickly distracted by shiny objects. How often do you see that in your daily life?",
          created_by_id: 2,
          created_by: "jane"
        },
        {
          id: 10,
          title: "Clarity and Productivity",
          url:
            "https://medium.com/better-humans/this-10-minute-routine-will-increase-your-clarity-and-creativity-336cb82e3797",
          description: "How to increase your creativity",
          category: "Productivity",
          notes:"# This 10-Minute Routine Will Increase Your Clarity And Creativity",
          created_by_id: 2,
          created_by: "jane"
        },
      ]);
    });
};
