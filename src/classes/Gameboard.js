export default class Gameboard {
  constructor(size) {
    this.size = size;
    this.board = Array(size)
      .fill()
      .map(() => Array(size).fill(null));
  }

  placeShip(size, coords, orientation) {
    for (let i = 0; i < size; i++) {
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
      if (coords.y + size > this.size) {
        return false;
      }
      for (let i = coords.y; i < size; i++) {
        this.board[coords.x][i] = size;
      }
    }

    if (orientation === "vertical") {
      if (coords.x + size > this.size) {
        return false;
      }
      for (let i = coords.x; i < coords.x + size; i++) {
        this.board[i][coords.y] = size;
      }
    }
  }

  recieveAttack(coords) {}
}
