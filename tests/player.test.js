import Gameboard from "../src/classes/Gameboard";
import Player from "../src/classes/Player";

test("should initialize a player instance", () => {
  const player = new Player();
  expect(player).toBeInstanceOf(Player);
});

test("should initialize a player instance with type (human)", () => {
  const player = new Player("human");
  expect(player.type).toBe("human");
});

test("should initialize a player instance with type (computer)", () => {
  const player = new Player("computer");
  expect(player.type).toBe("computer");
});

test("should each player instance  have it's own gameboard", () => {
  const human = new Player("human");
  const computer = new Player("computer");

  expect(human.board).toBeInstanceOf(Gameboard);
  expect(computer.board).toBeInstanceOf(Gameboard);
});
