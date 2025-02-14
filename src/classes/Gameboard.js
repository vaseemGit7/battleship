export default class Gameboard {
  constructor(size) {
    this.size = size;
    this.board = Array(size)
      .fill()
      .map(() => Array(size).fill(null));
    this.shipsSunk = 0;
  }

  getCellState(coords) {
    if (
      coords.x >= 0 &&
      coords.x < this.size &&
      coords.y >= 0 &&
      coords.y < this.size
    ) {
      return this.board[coords.x][coords.y];
    }
    return false;
  }

  placeShip(ship, coords, orientation) {
    for (let i = 0; i < ship.size; i++) {
      if (orientation === "horizontal") {
        if (
          coords.y + i >= this.size ||
          this.board[coords.x][coords.y + i] !== null
        ) {
          return false;
        }
      }
      if (orientation === "vertical") {
        if (
          coords.x + i >= this.size ||
          this.board[coords.x + i][coords.y] !== null
        ) {
          return false;
        }
      }
    }

    if (orientation === "horizontal") {
      if (coords.y + ship.size > this.size) {
        return false;
      }
      for (let i = coords.y; i < coords.y + ship.size; i++) {
        this.board[coords.x][i] = {
          ship,
          status: "intact",
          origin: coords,
          orientation: orientation,
        };
      }
    }

    if (orientation === "vertical") {
      if (coords.x + ship.size > this.size) {
        return false;
      }
      for (let i = coords.x; i < coords.x + ship.size; i++) {
        this.board[i][coords.y] = {
          ship,
          status: "intact",
          origin: coords,
          orientation: orientation,
        };
      }
    }
  }

  receiveAttack(coords) {
    if (
      coords.x < 0 ||
      coords.x >= this.size ||
      coords.y < 0 ||
      coords.y >= this.size
    ) {
      throw new Error("Coordinates out of bounds");
    }

    if (
      this.board[coords.x][coords.y] !== null &&
      (this.board[coords.x][coords.y].status === "miss" ||
        this.board[coords.x][coords.y].status === "hit")
    ) {
      throw new Error("This spot has already been attacked");
    }

    if (this.board[coords.x][coords.y] === null) {
      this.board[coords.x][coords.y] = { status: "miss" };
      return;
    }

    if (this.board[coords.x][coords.y] !== null) {
      let ship = this.board[coords.x][coords.y].ship;
      ship.hit();
      this.board[coords.x][coords.y].status = "hit";

      if (ship.isSunk()) {
        this.shipsSunk++;
      }
    }
  }

  isFleetSunk() {
    if (this.shipsSunk === 5) {
      return true;
    }
    return false;
  }
}
