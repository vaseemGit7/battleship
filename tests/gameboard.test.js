import Gameboard from "../src/classes/Gameboard";

test("should initialize a gameboard instance", () => {
  const gameboard = new Gameboard();
  expect(gameboard).toBeInstanceOf(Gameboard);
});

test("should initialize a gameboard instance with size", () => {
  const gameboard = new Gameboard(10);
  expect(gameboard.size).toBe(10);
});

test("should have a board length of the specified size", () => {
  const gameboard = new Gameboard(10);
  expect(gameboard.board.length).toBe(10);
});
