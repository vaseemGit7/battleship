export default class Gameboard {
  constructor(size) {
    this.size = size;
    this.board = Array(size)
      .fill()
      .map(() => Array(size).fill(null));
  }

  placeShip(size, coords, orientation) {
    if (orientation === "horizontal") {
      for (let i = coords; i < size; i++) {
        this.board[coords][i] = size;
      }
    }
  }
}
