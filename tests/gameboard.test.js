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

describe("Place ships at specific coordinates", () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard(10);
  });

  test("should there be function to place ship", () => {
    expect(typeof gameboard.placeShip).toBe("function");
  });

  test("should place ship at coordinate (0,0)", () => {
    gameboard.placeShip(1, 0, "horizontal");
    expect(gameboard.board[0][0]).toBe(1);
  });

  test("should place ship at coordinate(0,4) in horizontal orientation", () => {
    gameboard.placeShip(4, 0, "horizontal");
    expect(gameboard.board[0][0]).toBe(4);
    expect(gameboard.board[0][3]).toBe(4);
  });

  test("should not allow ship placement that exceeds board boundaries", () => {
    expect(gameboard.placeShip(5, 6, "horizontal")).toBe(false);
  });

  test("should prevent ship placement outside board boundaries", () => {
    expect(gameboard.placeShip(2, 11, "horizontal")).toBe(false);
  });
});
