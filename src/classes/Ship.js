export default class Ship {
  constructor(size) {
    this.size = size;
    this.hits = 0;
    this.isSunk = false;
  }

  hit() {
    this.hits++;
    if (this.hits === this.size) {
      this.isSunk = true;
    }
  }
}
