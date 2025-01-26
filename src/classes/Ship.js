export default class Ship {
  constructor(size, name) {
    this.name = name;
    this.size = size;
    this.hits = 0;
  }

  hit() {
    this.hits++;
  }

  isSunk() {
    return this.hits === this.size;
  }
}
