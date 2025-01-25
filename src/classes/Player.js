import Gameboard from "./Gameboard";

export default class Player {
  constructor(type, name) {
    this.type = type;
    this.name = name;
    this.board = new Gameboard(10);
  }
}
