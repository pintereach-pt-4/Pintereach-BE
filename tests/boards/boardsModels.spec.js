const db = require("../../db/index");
const boards = require("../../models/boardModel/index");

describe("Test for the Board Model", () => {
  afterEach(async () => {
    await db("boards").truncate();
    await boards.addBoard({
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
      await boards.updateBoard(1, update);
      const getIds = await boards.getBoardById(1);
      expect(getIds.category).toBe("Science");
    });

    it("should get board by id", async () => {
      const getId = await boards.getBoardById(1);
      expect(getId.title).toBe("Sleep Research");
    });

    it("should delete a board", async () => {
      await boards.deleteBoard(1);
      const find = await boards.getBoards();
      expect(find).toHaveLength(0);
    });
  });
});
