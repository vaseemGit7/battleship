import Ship from "../src/classes/Ship.js";

test("Ship class is initialized", () => {
  const newShip = new Ship();
  expect(newShip).toBeInstanceOf(Ship);
});

test("A Ship of size 5 is created", () => {
  const newShip = new Ship(5);
  expect(newShip.size).toBe(5);
});
