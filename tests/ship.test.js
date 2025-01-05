import Ship from "../src/classes/Ship.js";

test("Ship class is initialized", () => {
  const newShip = new Ship();
  expect(newShip).toBeInstanceOf(Ship);
});

test("A Ship of size 5 is created", () => {
  const newShip = new Ship(5);
  expect(newShip.size).toBe(5);
});

test("should initialize hit property with zero", () => {
  const newShip = new Ship(5);
  expect(newShip.hits).toBe(0);
});

test("should initialize isSunk property with false", () => {
  const newShip = new Ship(5);
  expect(newShip.isSunk).toBe(false);
});
