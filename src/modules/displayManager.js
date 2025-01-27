import eventController from "./eventController";
import gameManager from "./gameManager";

const displayManager = (() => {
  const boards = document.querySelectorAll(".player-board");
  const playerOneBoard = document.querySelector("#playerOneBoard");
  const playerTwoBoard = document.querySelector("#playerTwoBoard");

  const shipPlacementBoard = document.querySelector("#shipPlacementBoard");

  boards.forEach(
    (board) =>
      (board.style.cssText =
        "border: 2px solid black; max-width: 400px; display: grid; grid-template-rows: repeat(10,1fr); margin: 20px;"),
  );

  const renderBoard = (player, playerBoard) => {
    shipPlacementBoard.innerHTML = "";

    for (let x = 0; x < playerBoard.size; x++) {
      const gridRow = document.createElement("div");
      gridRow.style.cssText =
        "display: grid; grid-template-columns: repeat(10,1fr)";
      for (let y = 0; y < playerBoard.size; y++) {
        const gridCol = document.createElement("div");
        gridCol.setAttribute("data-index-x", x);
        gridCol.setAttribute("data-index-y", y);
        gridCol.classList.add("gameboard-cell");
        gridCol.style.cssText = "border: 1px solid black; height: 40px";

        if (playerBoard.getCellState({ x: x, y: y }) !== null) {
          if (playerBoard.getCellState({ x: x, y: y }).status === "intact") {
            gridCol.style.cssText = "background-color: #0284c7";
          } else if (
            playerBoard.getCellState({ x: x, y: y }).status === "hit"
          ) {
            gridCol.style.cssText = "background-color: #dc2626";
          } else {
            gridCol.style.cssText = "background-color: #cbd5e1";
          }
        }

        gridRow.appendChild(gridCol);
      }
      player === "playerOne"
        ? playerOneBoard.appendChild(gridRow)
        : player === "playerTwo"
          ? playerTwoBoard.appendChild(gridRow)
          : shipPlacementBoard.appendChild(gridRow);
    }
  };

  const renderVessel = () => {
    const vesselContainer = document.querySelector("#vesselContainer");
    vesselContainer.innerHTML = "";

    const vesselName = document.createElement("p");
    const vesselEle = document.createElement("div");

    const vessel = gameManager.getCurrentVessel();
    vesselName.textContent = vessel.name;

    vesselEle.classList.add("vessel");
    vesselEle.style.cssText = `height: 40px; width: ${vessel.size * 40}px; background-color: blue`;
    vesselEle.draggable = "true";
    vesselEle.setAttribute("data-orientation", "horizontal");

    vesselContainer.appendChild(vesselName);
    vesselContainer.appendChild(vesselEle);
  };

  const updateCell = (targetPlayer, coords) => {
    let playerBoard =
      targetPlayer.type === "human" ? playerOneBoard : playerTwoBoard;

    let cell = playerBoard.querySelector(
      `[data-index-x = "${coords.x}"][data-index-y = "${coords.y}"]`,
    );

    if (targetPlayer.board.getCellState(coords) !== null) {
      if (targetPlayer.board.getCellState(coords).status === "intact") {
        cell.style.cssText = "background-color: #0284c7";
      } else if (targetPlayer.board.getCellState(coords).status === "hit") {
        cell.style.cssText = "background-color: #dc2626";
      } else {
        cell.style.cssText = "background-color: #cbd5e1";
      }
    }
  };

  const switchBoardFocus = (targetPlayer) => {
    playerOneBoard.style.borderColor = "black";
    playerTwoBoard.style.borderColor = "black";

    let playerBoard =
      targetPlayer.type === "human" ? playerOneBoard : playerTwoBoard;

    playerBoard.style.borderColor = "red";
  };

  const initializeEventListeners = () => {
    eventController.init();
  };

  const loadPlacementScreen = (playerName) => {
    const gameIntroScreen = document.querySelector(".game-intro-section");
    const shipPlacementScreen = document.querySelector(
      ".ship-placement-section",
    );

    gameIntroScreen.classList.add("screen-hidden");
    shipPlacementScreen.classList.remove("screen-hidden");

    gameManager.updatePlayerOneName(playerName);
    gameManager.setupShipPlacement();
  };

  const loadBattleScreen = () => {
    const shipPlacementScreen = document.querySelector(
      ".ship-placement-section",
    );
    const battleScreen = document.querySelector(".battle-section");

    shipPlacementScreen.classList.add("screen-hidden");
    battleScreen.classList.remove("screen-hidden");

    gameManager.initializeBattle();
  };

  return {
    renderBoard,
    renderVessel,
    initializeEventListeners,
    updateCell,
    switchBoardFocus,
    loadPlacementScreen,
    loadBattleScreen,
  };
})();

export default displayManager;
