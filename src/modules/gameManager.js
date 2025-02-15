import Player from "../classes/Player";
import Ship from "../classes/Ship";
import displayManager from "./displayManager";
import eventController from "./eventController";
import opponentAI from "./opponentAI";

const gameManager = (() => {
  let playerOne, playerTwo;
  let currentPlayer, opponentPlayer;
  let playerFaux;
  let winner;

  playerFaux = new Player("setup");

  let fleet = {
    1: { name: "carrier", size: 5 },
    2: { name: "cruiser", size: 4 },
    3: { name: "destroyer", size: 3 },
    4: { name: "frigate", size: 3 },
    5: { name: "submarine", size: 2 },
  };
  let currentVessel = 1;

  playerOne = new Player("human");
  playerTwo = new Player("computer");

  const updatePlayerOneName = (name) => {
    playerOne.name = name;
  };

  const updateShipPlacement = (coords, orientation) => {
    console.log(fleet[currentVessel].name);
    console.log("recieved coords", coords);

    const vessel = fleet[currentVessel];
    const ship = new Ship(vessel.size, vessel.name);

    playerFaux.board.placeShip(ship, coords, orientation);
    currentVessel++;
  };

  const _setupAIShipPlacement = (playerBoard) => {
    for (const vesselIndex in fleet) {
      let vesselName = fleet[vesselIndex].name;
      let vesselSize = fleet[vesselIndex].size;

      let placementData = opponentAI.generateRandomPlacement(
        playerBoard,
        vesselSize,
      );

      const ship = new Ship(vesselSize, vesselName);

      playerBoard.placeShip(
        ship,
        placementData.coords,
        placementData.orientation,
      );

      console.log(
        "Ship Placed:",
        vesselSize,
        placementData.coords,
        placementData.orientation,
      );
    }
  };

  const setupShipPlacement = () => {
    displayManager.renderBoard("setup", playerFaux.board);
    displayManager.renderVessel();
    eventController.initializeDragEvents(playerFaux.board);
    _setupAIShipPlacement(playerTwo.board);
  };

  const resetShipPlacement = () => {
    playerFaux = new Player("setup");

    currentVessel = 1;
    displayManager.renderBoard("setup", playerFaux.board);
    displayManager.renderVessel();
    eventController.initializeDragEvents(playerFaux.board);
  };

  const randomizeShipPlacement = () => {
    resetShipPlacement();
    _setupAIShipPlacement(playerFaux.board);
    displayManager.renderBoard("setup", playerFaux.board);
  };

  const setupPlayAgain = () => {
    const playerName = playerOne.name;

    playerOne = new Player("human", playerName);
    playerTwo = new Player("computer");

    resetShipPlacement();
    setupShipPlacement();
  };

  const initializeBattle = () => {
    currentPlayer = playerOne;
    opponentPlayer = playerTwo;

    playerOne.board = playerFaux.board;

    displayManager.renderBoard("playerOne", playerOne.board);
    displayManager.renderBoard("playerTwo", playerTwo.board);
    displayManager.switchBoardFocus(opponentPlayer);

    displayManager.initializeEventListeners();
  };

  const playTurn = (coords) => {
    _attackOpponent(coords);
    displayManager.updateCell(opponentPlayer, coords);
    _checkGameOver();
    setTimeout(() => {
      _switchPlayer();
      displayManager.switchBoardFocus(opponentPlayer);
      _getComputerAttack();
    }, 1000);
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
      }, 1300);
    }
    return;
  };

  const _checkGameOver = () => {
    if (opponentPlayer.board.isFleetSunk()) {
      winner = currentPlayer;
      console.log("Game Over: ", currentPlayer.type, " is the winner");
      setTimeout(() => {
        displayManager.loadGameOverScreen();
      }, "1000");
      displayManager.updateWinner(winner);
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

  const checkFleetPlaced = () => {
    return currentVessel > Object.keys(fleet).length;
  };

  return {
    setupShipPlacement,
    setupPlayAgain,
    resetShipPlacement,
    randomizeShipPlacement,
    initializeBattle,
    playTurn,
    updatePlayerOneName,
    updateShipPlacement,
    getCurrentPlayer,
    getOpponentPlayer,
    getCurrentVessel,
    checkFleetPlaced,
  };
})();

export default gameManager;
