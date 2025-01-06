import Gameboard from "../src/classes/Gameboard";

test("should initialize a gameboard instance", () => {
  const gameboard = new Gameboard();
  expect(gameboard).toBeInstanceOf(Gameboard);
});
