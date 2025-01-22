import Player from "../classes/Player";
import Ship from "../classes/Ship";
import displayManager from "./displayManager";
import opponentAI from "./opponentAI";

const gameManager = (() => {
  let playerOne, playerTwo;
  let currentPlayer, opponentPlayer;

  const initializeGame = () => {
    playerOne = new Player("human");
    playerTwo = new Player("computer");

    currentPlayer = playerOne;
    opponentPlayer = playerTwo;

    let carrier = new Ship(5);
    let battleship = new Ship(4);
    let cruiser = new Ship(3);
    let submarine = new Ship(3);
    let destroyer = new Ship(2);

    playerOne.board.placeShip(destroyer, { x: 1, y: 6 }, "horizontal");
    playerOne.board.placeShip(submarine, { x: 3, y: 0 }, "vertical");
    playerOne.board.placeShip(cruiser, { x: 0, y: 2 }, "horizontal");
    playerOne.board.placeShip(battleship, { x: 6, y: 6 }, "vertical");
    playerOne.board.placeShip(carrier, { x: 4, y: 4 }, "horizontal");

    playerTwo.board.placeShip(destroyer, { x: 3, y: 3 }, "horizontal");
    playerTwo.board.placeShip(submarine, { x: 8, y: 4 }, "horizontal");
    playerTwo.board.placeShip(cruiser, { x: 4, y: 6 }, "horizontal");
    playerTwo.board.placeShip(battleship, { x: 5, y: 1 }, "vertical");
    playerTwo.board.placeShip(carrier, { x: 1, y: 1 }, "horizontal");

    displayManager.renderBoard("playerOne", playerOne.board);
    displayManager.renderBoard("playerTwo", playerTwo.board);
    displayManager.switchBoardFocus(opponentPlayer);

    displayManager.initializeEventListeners();
  };

  const playTurn = (coords) => {
    _attackOpponent(coords);
    displayManager.updateCell(opponentPlayer, coords);
    _switchPlayer();
    displayManager.switchBoardFocus(opponentPlayer);
    _getComputerAttack();
  };

  const _attackOpponent = (coords) => {
    opponentPlayer.board.receiveAttack(coords);
  };

  const _switchPlayer = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    opponentPlayer = opponentPlayer === playerTwo ? playerOne : playerTwo;
  };

  const _getComputerAttack = () => {
    if (currentPlayer.type === "computer") {
      const coords = opponentAI.getRandomAttack(opponentPlayer.board);
      setTimeout(() => {
        playTurn(coords);
      }, "500");
    }
    return;
  };

  const getCurrentPlayer = () => {
    return currentPlayer;
  };

  const getOpponentPlayer = () => {
    return opponentPlayer;
  };

  return {
    initializeGame,
    playTurn,
    getCurrentPlayer,
    getOpponentPlayer,
  };
})();

export default gameManager;
