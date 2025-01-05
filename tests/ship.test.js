import Ship from "../src/classes/Ship.js";

let newShip;

beforeEach(() => {
  newShip = new Ship(5);
});

test("Ship class is initialized", () => {
  expect(newShip).toBeInstanceOf(Ship);
});

test("A Ship of size 5 is created", () => {
  expect(newShip.size).toBe(5);
});

test("should initialize hit property with zero", () => {
  expect(newShip.hits).toBe(0);
});

test("should initialize isSunk property with false", () => {
  expect(newShip.isSunk).toBe(false);
});

test("should increase number of hits", () => {
  newShip.hit();
  newShip.hit();
  newShip.hit();
  expect(newShip.hits).toBe(3);
});
