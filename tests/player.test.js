import Player from "../src/classes/Player";

test("should initialize a player instance", () => {
  const player = new Player();
  expect(player).toBeInstanceOf(Player);
});
