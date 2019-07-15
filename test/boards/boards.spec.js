const server = require("../../api");
const request = require("supertest");
const db = require("../../db/index");
const boards = require("../../models/boardModel/index");

// var a = [{"category":
// "Health",
// "created_at": "2019-07-15 17:01:25",
// "created_by": "therock",
// "created_by_id": 1,
// "description": " I have a paper to write and the negative effects of not sleeping well",
// "id": 1,
// "title": "Sleep Research",
// "url": "https://elemental.medium.com/the-dawning-truth-about-night-owls-650d8ed12206"}, {"category": "Life", "created_at": "2019-07-15 17:01:25", "created_by": "mattd", "created_by_id": 2, "description": "I've been tasked to give a speech on what life means, and frankly I've got no clue", "id": 2, "title": "Trying to find the meaning of Life", "url": "https://medium.com/s/more-to-that/the-meaning-of-life-is-absurd-ecd870bfa3e6"}, {"category": "Computer Science", "created_at": "2019-07-15 17:01:25", "created_by": "america", "created_by_id": 3, "description": "A Beginners Guide to Big O", "id": 3, "title": "Big O For Beginners", "url": "https://hackernoon.com/big-o-for-beginners-622a64760e2"}, {"category": "Computer Science", "created_at": "2019-07-15 17:01:25", "created_by": "america", "created_by_id": 3, "description": "A Simple Guide To Understanding Recursion", "id": 4, "title": "Recursion Made Simple", "url": "https://medium.com/code-zen/recursion-demystified-24867f045c62"}, {"category": "Productivity", "created_at": "2019-07-15 17:01:25", "created_by": "therock", "created_by_id": 1, "description": "I've gotten better at time management, but I need to achieve more.", "id": 5, "title": "I need to be more Productive", "url": "https://medium.com/swlh/the-ivy-lee-method-a-100-year-old-routine-for-stress-free-productivity-242f1151b22e"}, {"category": "Computer Science", "created_at": "2019-07-15 17:26:12", "created_by": "", "created_by_id": 1, "description": "Basic Intro To Algorithms", "id": 6, "title": "Intro to Algorithms", "url": "https://medium.com/@jathmel/an-intro-to-algorithms-68bd0e9b6f07"}

// beforeEach(async () => {

// });

afterEach(async () => {
  await db("boards").truncate();
  const addBoards = await boards.addBoard({
    id: 1,
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

describe("board model", () => {
  describe("board models", () => {
    it("should add a board", async () => {
      await boards.addBoard({
        title: "Intro to Algorithms",
        url: "https://medium.com/@jathmel/an-intro-to-algorithms-68bd0e9b6f07",
        description: "Basic Intro To Algorithms",
        category: "Computer Science",
        created_by_id: 7,
        created_by: ""
      });
      const getBoards = await boards.getBoards();
      expect(getBoards).toHaveLength(2);
    });

    it("should update a board", async () => {
      const update = {
        title: "Surprise! This Monster Black Hole's Disk Shouldn't Exist",
        url: "https://www.space.com/black-hole-disk-should-not-exist.html",
        description:
          "Hubble observed this unexpected pairing at the center of a spiral galaxy.",
        category: "Science",
        created_by_id: 1,
        created_by: "therock"
      };
      const updates = await boards.updateBoard(1, update);
      const getIds = await boards.getBoardById(1);
      expect(getIds.category).toBe("Science");
      // console.log(updates.category);
    });

    it("should get board by id", async () => {
      const getId = await boards.getBoardById(1);
      console.log(getId);
      expect(getId.title).toBe("Sleep Research");
    });

    it("should delete a board", async () => {
      const data = await boards.deleteBoard(1);
      const find = await boards.getBoards();
      console.log(data);
      expect(find).toHaveLength(0);
    });
  });
});
