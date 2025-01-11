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

describe("Place ships at specific coordinates horizontally", () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard(10);
  });

  test("should there be function to place ship", () => {
    expect(typeof gameboard.placeShip).toBe("function");
  });

  test("should place ship at coordinate (0,0)", () => {
    gameboard.placeShip(1, { x: 0, y: 0 }, "horizontal");
    expect(gameboard.board[0][0]).toBe(1);
  });

  test("should place ship at coordinate(0,4) in horizontal orientation", () => {
    gameboard.placeShip(4, { x: 0, y: 0 }, "horizontal");
    expect(gameboard.board[0][0]).toBe(4);
    expect(gameboard.board[0][3]).toBe(4);
  });

  test("should not allow ship placement that exceeds board boundaries", () => {
    expect(gameboard.placeShip(5, { x: 3, y: 6 }, "horizontal")).toBe(false);
  });

  test("should prevent ship placement outside board boundaries", () => {
    expect(gameboard.placeShip(2, { x: 0, y: 11 }, "horizontal")).toBe(false);
  });
});

describe("Place ships at specific coordinates vertically", () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard(10);
  });

  test("should place ship at coordinate (0,0) in vertical orientation", () => {
    gameboard.placeShip(1, { x: 0, y: 0 }, "vertical");
    expect(gameboard.board[0][0]).toBe(1);
  });

  test("should place ship at coordinate (2,5) in vertical orientation", () => {
    gameboard.placeShip(5, { x: 2, y: 5 }, "vertical");
    expect(gameboard.board[2][5]).toBe(5);
    expect(gameboard.board[3][5]).toBe(5);
    expect(gameboard.board[4][5]).toBe(5);
    expect(gameboard.board[5][5]).toBe(5);
    expect(gameboard.board[6][5]).toBe(5);
  });

  test("should not allow vertical ship placement that exceeds board boundaries", () => {
    expect(gameboard.placeShip(3, { x: 8, y: 2 }, "vertical")).toBe(false);
  });

  test("should not allow vertical ship placement outside board boundaries", () => {
    expect(gameboard.placeShip(5, { x: 10, y: 0 }, "vertical")).toBe(false);
  });
});

test("should prevent overlap ship placement", () => {
  const gameboard = new Gameboard(10);
  gameboard.placeShip(2, { x: 0, y: 0 }, "horizontal");
  expect(gameboard.placeShip(3, { x: 0, y: 0 }, "vertical")).toBe(false);
});

describe("Recieve attack on ships", () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard(10);
  });

  test("should there be a function to recieve attack", () => {
    expect(typeof gameboard.recieveAttack).toBe("function");
  });
});
