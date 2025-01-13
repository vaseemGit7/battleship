import Player from "../src/classes/Player";

test("should initialize a player instance", () => {
  const player = new Player();
  expect(player).toBeInstanceOf(Player);
});

test("should initialize a player instance with type (human)", () => {
  const player = new Player("human");
  expect(player.type).toBe("human");
});
