import Gameboard from "./Gameboard";

export default class Player {
  constructor(type) {
    this.type = type;
    this.board = new Gameboard(10);
  }
}
