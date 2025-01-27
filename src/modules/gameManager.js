import Player from "../classes/Player";
import Ship from "../classes/Ship";
import displayManager from "./displayManager";
import eventController from "./eventController";
import opponentAI from "./opponentAI";

const gameManager = (() => {
  let playerOne, playerTwo;
  let currentPlayer, opponentPlayer;
  let playerFaux;

  playerFaux = new Player("setup");

  let fleet = {
    1: { name: "carrier", size: 5 },
    2: { name: "battleship", size: 4 },
    3: { name: "cruiser", size: 3 },
    4: { name: "submarine", size: 3 },
    5: { name: "destroyer", size: 2 },
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
    playerOne.board.placeShip(ship, coords, orientation);

    currentVessel++;
  };

  const _setupAIShipPlacement = () => {
    for (const vesselIndex in fleet) {
      let vesselName = fleet[vesselIndex].name;
      let vesselSize = fleet[vesselIndex].size;

      let placementData = opponentAI.generateRandomPlacement(
        playerTwo.board,
        vesselSize,
      );

      const ship = new Ship(vesselSize, vesselName);

      playerTwo.board.placeShip(
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
    _setupAIShipPlacement();
  };

  const initializeBattle = () => {
    currentPlayer = playerOne;
    opponentPlayer = playerTwo;

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

  const checkFleetPlaced = () => {
    return currentVessel > Object.keys(fleet).length;
  };

  return {
    setupShipPlacement,
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
