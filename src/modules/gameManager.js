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

      const ship = new Ship(vesselName, vesselSize);

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
