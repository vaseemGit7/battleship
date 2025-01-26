import Player from "../classes/Player";
import Ship from "../classes/Ship";
import displayManager from "./displayManager";
import opponentAI from "./opponentAI";

const gameManager = (() => {
  let playerOne, playerTwo;
  let currentPlayer, opponentPlayer;
  let playerFaux;

  playerFaux = new Player("setup");

  let fleet = {
    1: { name: "carrier", details: { size: 5, coords: null } },
    2: { name: "battleship", details: { size: 4, coords: null } },
    3: { name: "cruiser", details: { size: 3, coords: null } },
    4: { name: "submarine", details: { size: 3, coords: null } },
    5: { name: "destroyer", details: { size: 2, coords: null } },
  };
  let currentVessel = 1;

  playerOne = new Player("human");
  playerTwo = new Player("computer");

  const updatePlayerOneName = (name) => {
    playerOne.name = name;
  };

  const setupShipPlacement = () => {
    displayManager.renderBoard("setup", playerFaux.board);
    displayManager.renderVessel();
  };

  const initializeGame = () => {
    currentPlayer = playerOne;
    opponentPlayer = playerTwo;

    let carrierOne = new Ship(5);
    let battleshipOne = new Ship(4);
    let cruiserOne = new Ship(3);
    let submarineOne = new Ship(3);
    let destroyerOne = new Ship(2);

    let carrierTwo = new Ship(5);
    let battleshipTwo = new Ship(4);
    let cruiserTwo = new Ship(3);
    let submarineTwo = new Ship(3);
    let destroyerTwo = new Ship(2);

    playerOne.board.placeShip(destroyerOne, { x: 1, y: 6 }, "horizontal");
    playerOne.board.placeShip(submarineOne, { x: 3, y: 0 }, "vertical");
    playerOne.board.placeShip(cruiserOne, { x: 0, y: 2 }, "horizontal");
    playerOne.board.placeShip(battleshipOne, { x: 6, y: 6 }, "vertical");
    playerOne.board.placeShip(carrierOne, { x: 4, y: 4 }, "horizontal");

    playerTwo.board.placeShip(destroyerTwo, { x: 3, y: 3 }, "horizontal");
    playerTwo.board.placeShip(submarineTwo, { x: 8, y: 4 }, "horizontal");
    playerTwo.board.placeShip(cruiserTwo, { x: 4, y: 6 }, "horizontal");
    playerTwo.board.placeShip(battleshipTwo, { x: 5, y: 1 }, "vertical");
    playerTwo.board.placeShip(carrierTwo, { x: 1, y: 1 }, "horizontal");

    displayManager.renderBoard("playerOne", playerOne.board);
    displayManager.renderBoard("playerTwo", playerTwo.board);
    displayManager.switchBoardFocus(opponentPlayer);

    displayManager.initializeEventListeners();
  };

  const playTurn = (coords) => {
    _attackOpponent(coords);
    displayManager.updateCell(opponentPlayer, coords);
    _checkGameOver();
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

  const _checkGameOver = () => {
    if (opponentPlayer.board.isFleetSunk()) {
      console.log("Game Over: ", currentPlayer.type, " is the winner");
      alert("Game Over: ", currentPlayer.type, " is the winner");
    }
    return;
  };

  const getCurrentPlayer = () => {
    return currentPlayer;
  };

  const getOpponentPlayer = () => {
    return opponentPlayer;
  };

  const getCurrentVessel = () => {
    return fleet[currentVessel];
  };

  return {
    setupShipPlacement,
    initializeGame,
    playTurn,
    updatePlayerOneName,
    getCurrentPlayer,
    getOpponentPlayer,
    getCurrentVessel,
  };
})();

export default gameManager;
