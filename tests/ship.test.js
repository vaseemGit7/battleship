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

test("should there be function to update ship hits", () => {
  expect(typeof newShip.hit).toBe("function");
});

test("should there be function to check if ship sunk", () => {
  expect(typeof newShip.isSunk).toBe("function");
});

test("should increase number of hits", () => {
  newShip.hit();
  newShip.hit();
  newShip.hit();
  expect(newShip.hits).toBe(3);
});

test("should mark ship sunk when hits equals size", () => {
  newShip.hit();
  newShip.hit();
  newShip.hit();
  newShip.hit();
  newShip.hit();
  expect(newShip.isSunk()).toBe(true);
});
