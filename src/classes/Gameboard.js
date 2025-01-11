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
      for (let i = coords; i < size; i++) {
        this.board[i][coords] = size;
      }
    }
  }
}
