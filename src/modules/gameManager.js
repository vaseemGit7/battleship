import Player from "../classes/Player";

export default gameManager = (() => {
  let playerOne, playerTwo;

  const initializeGame = () => {
    playerOne = new Player("human");
    playerTwo = new Player("computer");
  };
})();
