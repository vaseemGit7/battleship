import Gameboard from "../src/classes/Gameboard";
import Ship from "../src/classes/Ship";

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
  let gameboard, ship;

  beforeEach(() => {
    gameboard = new Gameboard(10);
  });

  test("should there be function to place ship", () => {
    expect(typeof gameboard.placeShip).toBe("function");
  });

  test("should place ship at coordinate (0,0)", () => {
    ship = new Ship(1);
    gameboard.placeShip(ship, { x: 0, y: 0 }, "horizontal");
    expect(gameboard.getCellState({ x: 0, y: 0 }).ship.size).toBe(1);
  });

  test("should place ship at coordinate(0,4) in horizontal orientation", () => {
    ship = new Ship(4);
    gameboard.placeShip(ship, { x: 0, y: 0 }, "horizontal");
    expect(gameboard.getCellState({ x: 0, y: 0 }).ship.size).toBe(4);
    expect(gameboard.getCellState({ x: 0, y: 3 }).ship.size).toBe(4);
  });

  test("should not allow ship placement that exceeds board boundaries", () => {
    ship = new Ship(5);
    expect(gameboard.placeShip(ship, { x: 3, y: 6 }, "horizontal")).toBe(false);
  });

  test("should prevent ship placement outside board boundaries", () => {
    ship = new Ship(2);
    expect(gameboard.placeShip(ship, { x: 0, y: 11 }, "horizontal")).toBe(
      false,
    );
  });
});

describe("Place ships at specific coordinates vertically", () => {
  let gameboard, ship;

  beforeEach(() => {
    gameboard = new Gameboard(10);
  });

  test("should place ship at coordinate (0,0) in vertical orientation", () => {
    ship = new Ship(1);
    gameboard.placeShip(ship, { x: 0, y: 0 }, "vertical");
    expect(gameboard.getCellState({ x: 0, y: 0 }).ship.size).toBe(1);
  });

  test("should place ship at coordinate (2,5) in vertical orientation", () => {
    ship = new Ship(5);
    gameboard.placeShip(ship, { x: 2, y: 5 }, "vertical");
    expect(gameboard.getCellState({ x: 2, y: 5 }).ship.size).toBe(5);
    expect(gameboard.getCellState({ x: 3, y: 5 }).ship.size).toBe(5);
    expect(gameboard.getCellState({ x: 4, y: 5 }).ship.size).toBe(5);
    expect(gameboard.getCellState({ x: 5, y: 5 }).ship.size).toBe(5);
    expect(gameboard.getCellState({ x: 6, y: 5 }).ship.size).toBe(5);
  });

  test("should not allow vertical ship placement that exceeds board boundaries", () => {
    ship = new Ship(3);
    expect(gameboard.placeShip(ship, { x: 8, y: 2 }, "vertical")).toBe(false);
  });

  test("should not allow vertical ship placement outside board boundaries", () => {
    ship = new Ship(5);
    expect(gameboard.placeShip(ship, { x: 10, y: 0 }, "vertical")).toBe(false);
  });
});

test("should prevent overlap ship placement", () => {
  const gameboard = new Gameboard(10);
  const shipOne = new Ship(2);
  const shipTwo = new Ship(3);
  gameboard.placeShip(shipOne, { x: 0, y: 0 }, "horizontal");
  expect(gameboard.placeShip(shipTwo, { x: 0, y: 0 }, "vertical")).toBe(false);
});

describe("Recieve attack on ships", () => {
  let gameboard, shipOne, shipTwo, shipThree, shipFour, shipFive;

  beforeEach(() => {
    gameboard = new Gameboard(10);
    shipOne = new Ship(2);
    shipTwo = new Ship(3);
    shipThree = new Ship(3);
    shipFour = new Ship(4);
    shipFive = new Ship(5);

    gameboard.placeShip(shipOne, { x: 1, y: 6 }, "horizontal");
    gameboard.placeShip(shipTwo, { x: 3, y: 0 }, "vertical");
    gameboard.placeShip(shipThree, { x: 0, y: 2 }, "horizontal");
    gameboard.placeShip(shipFour, { x: 6, y: 6 }, "vertical");
    gameboard.placeShip(shipFive, { x: 4, y: 4 }, "horizontal");
  });

  test("should there be a function to recieve attack", () => {
    expect(typeof gameboard.receiveAttack).toBe("function");
  });

  test("should record miss when no ship exits at the attacked spot", () => {
    gameboard.receiveAttack({ x: 3, y: 3 });
    expect(gameboard.getCellState({ x: 3, y: 3 }).status).toBe("miss");
  });

  test("should prevent attack outside board boundaries", () => {
    expect(() => gameboard.receiveAttack({ x: 10, y: 0 })).toThrowError(
      "Coordinates out of bounds",
    );
  });

  test("should hit ship when exists at the attacked spot", () => {
    gameboard.receiveAttack({ x: 1, y: 6 });
    expect(gameboard.getCellState({ x: 1, y: 6 }).ship.hits).toBe(1);
  });

  test("should sink ship after every spots of the ship got hit", () => {
    gameboard.receiveAttack({ x: 6, y: 6 });
    gameboard.receiveAttack({ x: 7, y: 6 });
    gameboard.receiveAttack({ x: 8, y: 6 });
    gameboard.receiveAttack({ x: 9, y: 6 });
    expect(gameboard.getCellState({ x: 6, y: 6 }).ship.isSunk()).toBe(true);
  });

  test("should count the number of ships sunk", () => {
    gameboard.receiveAttack({ x: 1, y: 6 });
    gameboard.receiveAttack({ x: 1, y: 7 });

    gameboard.receiveAttack({ x: 6, y: 6 });
    gameboard.receiveAttack({ x: 7, y: 6 });
    gameboard.receiveAttack({ x: 8, y: 6 });
    gameboard.receiveAttack({ x: 9, y: 6 });

    expect(gameboard.shipsSunk).toBe(2);
  });

  describe("Report fleet status", () => {
    test("should there be function to check fleet status", () => {
      expect(typeof gameboard.isFleetSunk).toBe("function");
    });

    test("should report false when not all the ships have sunk", () => {
      gameboard.receiveAttack({ x: 1, y: 6 });
      gameboard.receiveAttack({ x: 1, y: 7 });

      gameboard.receiveAttack({ x: 6, y: 6 });
      gameboard.receiveAttack({ x: 7, y: 6 });
      gameboard.receiveAttack({ x: 8, y: 6 });
      gameboard.receiveAttack({ x: 9, y: 6 });

      expect(gameboard.isFleetSunk()).toBe(false);
    });

    test("should report true when all ships have sunk", () => {
      gameboard.receiveAttack({ x: 1, y: 6 });
      gameboard.receiveAttack({ x: 1, y: 7 });

      gameboard.receiveAttack({ x: 0, y: 2 });
      gameboard.receiveAttack({ x: 0, y: 3 });
      gameboard.receiveAttack({ x: 0, y: 4 });

      gameboard.receiveAttack({ x: 3, y: 0 });
      gameboard.receiveAttack({ x: 4, y: 0 });
      gameboard.receiveAttack({ x: 5, y: 0 });

      gameboard.receiveAttack({ x: 6, y: 6 });
      gameboard.receiveAttack({ x: 7, y: 6 });
      gameboard.receiveAttack({ x: 8, y: 6 });
      gameboard.receiveAttack({ x: 9, y: 6 });

      gameboard.receiveAttack({ x: 4, y: 4 });
      gameboard.receiveAttack({ x: 4, y: 5 });
      gameboard.receiveAttack({ x: 4, y: 6 });
      gameboard.receiveAttack({ x: 4, y: 7 });
      gameboard.receiveAttack({ x: 4, y: 8 });

      expect(gameboard.isFleetSunk()).toBe(true);
    });
  });

  test("should prevent attack on already attacked spot", () => {
    gameboard.receiveAttack({ x: 4, y: 4 });
    expect(() => gameboard.receiveAttack({ x: 4, y: 4 })).toThrowError(
      "This spot has already been attacked",
    );
  });
});
