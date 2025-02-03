import displayManager from "./displayManager";
import gameManager from "./gameManager";

const eventController = (() => {
  const handlePlayerInput = () => {
    const confirmBtn = document.querySelector("#confirmNameBtn");

    confirmBtn.addEventListener("click", () => {
      const playerNameInput = document.querySelector("#playerName").value;
      displayManager.loadPlacementScreen(playerNameInput);
      console.log("Name:", playerNameInput);
    });
  };

  const handleResetPlacement = () => {
    const resetBtn = document.querySelector("#resetBtn");
    const proceedBtn = document.querySelector("#proceedBtn");

    resetBtn.addEventListener("click", () => {
      proceedBtn.disabled = true;
      proceedBtn.classList.add("disabled-btn");
      gameManager.resetShipPlacement();
    });
  };

  const handleRandomizePlacement = () => {
    const randomBtn = document.querySelector("#randomBtn");

    randomBtn.addEventListener("click", () => {
      gameManager.randomizeShipPlacement();
      _enableDeployBtn();
    });
  };

  const handlePlayAgain = () => {
    const playAgainBtn = document.querySelector("#playAgainBtn");
    const proceedBtn = document.querySelector("#proceedBtn");

    proceedBtn.disabled = true;
    proceedBtn.classList.add("disabled-btn");

    playAgainBtn.addEventListener("click", () =>
      displayManager.loadPlayAgain(),
    );
  };

  const _handleDeployFleet = () => {
    const proceedBtn = document.querySelector("#proceedBtn");
    proceedBtn.addEventListener("click", displayManager.loadBattleScreen);
  };

  const _enableDeployBtn = () => {
    const proceedBtn = document.querySelector("#proceedBtn");
    proceedBtn.disabled = false;
    proceedBtn.classList.remove("disabled-btn");
  };

  const _handleOrientationAction = (vessel) => {
    const orientationBtn = document.querySelector("#orientationBtn");

    orientationBtn.addEventListener("click", () => {
      vessel.classList.toggle("rotate");

      let currentOrientation = vessel.getAttribute("data-orientation");
      let newOrientation =
        currentOrientation === "horizontal" ? "vertical" : "horizontal";
      vessel.setAttribute("data-orientation", newOrientation);
    });
  };

  const initializeDragEvents = (playerBoard) => {
    const vessel = document.querySelector(".vessel");
    const gameboardCells = document.querySelectorAll(".gameboard-cell");

    _handleOrientationAction(vessel);

    vessel.addEventListener("dragstart", () => {
      console.log("Drag Started");
    });

    gameboardCells.forEach((cell) =>
      cell.addEventListener("dragover", (e) => {
        e.preventDefault();
      }),
    );

    gameboardCells.forEach((cell) =>
      cell.addEventListener("drop", (e) => {
        e.preventDefault();

        let x = parseInt(cell.getAttribute("data-index-x"));
        let y = parseInt(cell.getAttribute("data-index-y"));

        console.log("Dropped at", "x :", x, " y :", y);

        let currentVessel = gameManager.getCurrentVessel();
        let orientation = vessel.getAttribute("data-orientation");

        if (
          _validatePlacement(
            playerBoard.board,
            { x: x, y: y },
            currentVessel.size,
            orientation,
          )
        ) {
          gameManager.updateShipPlacement({ x: x, y: y }, orientation);
          displayManager.renderBoard("setup", playerBoard);

          if (!gameManager.checkFleetPlaced()) {
            console.log("triggered");
            displayManager.renderVessel();
            initializeDragEvents(playerBoard);
          } else {
            console.log("All ships placed!");
            _enableDeployBtn();
          }
        } else {
          console.log("Invalid placement");
        }
      }),
    );
  };

  const init = () => {
    const gameboardCells = document.querySelectorAll(".gameboard-cell");

    gameboardCells.forEach((cell) =>
      cell.addEventListener("click", () => {
        let x = cell.getAttribute("data-index-x");
        let y = cell.getAttribute("data-index-y");

        _handleAttack({ x: x, y: y });
      }),
    );
  };

  const _handleAttack = (coords) => {
    let opponentBoard = gameManager.getOpponentPlayer().board;
    gameManager.playTurn(coords);

    console.log("hit");
    console.log(opponentBoard);
  };

  const _validatePlacement = (board, coords, size, orientation) => {
    if (orientation === "horizontal" && coords.x + size > board.size)
      return false;
    if (orientation === "vertical" && coords.y + size > board.size)
      return false;

    for (let i = 0; i < size; i++) {
      if (
        (orientation === "horizontal" &&
          (board[coords.x][coords.y + i] >= board.size ||
            board[coords.x][coords.y + i] !== null)) ||
        (orientation === "vertical" &&
          (board[coords.x + i][coords.y] >= board.size ||
            board[coords.x + i][coords.y] !== null))
      ) {
        return false;
      }
    }
    return true;
  };

  _handleDeployFleet();

  return {
    init,
    initializeDragEvents,
    handlePlayerInput,
    handleResetPlacement,
    handleRandomizePlacement,
    handlePlayAgain,
  };
})();

export default eventController;
