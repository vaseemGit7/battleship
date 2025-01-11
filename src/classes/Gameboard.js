export default class Gameboard {
  constructor(size) {
    this.size = size;
    this.board = Array(size)
      .fill()
      .map(() => Array(size).fill(null));
  }

  placeShip(size, coords, orientation) {
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
}
