import Ship from "../src/classes/Ship.js";

test("Ship class is initialized", () => {
  const newShip = new Ship();
  expect(newShip).toBeInstanceOf(Ship);
});
