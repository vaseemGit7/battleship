export default class Gameboard {
  constructor(size) {
    this.size = size;
    this.board = Array(size)
      .fill()
      .map(() => Array(size).fill(null));
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
        this.board[coords.x][i] = ship;
      }
    }

    if (orientation === "vertical") {
      if (coords.x + ship.size > this.size) {
        return false;
      }
      for (let i = coords.x; i < coords.x + ship.size; i++) {
        this.board[i][coords.y] = ship;
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

    if (this.board[coords.x][coords.y] === null) {
      this.board[coords.x][coords.y] = "miss";
    }
  }
}
