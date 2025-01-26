import displayManager from "./displayManager";
import gameManager from "./gameManager";

const eventController = (() => {
  const handlePlayerInput = () => {
    const playerNameInput = document.querySelector("#playerName").value;
    const confirmBtn = document.querySelector("#confirmNameBtn");

    confirmBtn.addEventListener("click", () => {
      displayManager.loadPlacementScreen(playerNameInput);
    });
  };

  const initializeDragEvents = (playerBoard) => {
    const vessel = document.querySelector(".vessel");
    const gameboardCells = document.querySelectorAll(".gameboard-cell");

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

        let vessel = gameManager.getCurrentVessel();

        if (
          _validatePlacement(
            playerBoard.board,
            { x: x, y: y },
            vessel.size,
            "horizontal",
          )
        ) {
          gameManager.updateShipPlacement({ x: x, y: y }, "horizontal");
          displayManager.renderBoard("setup", playerBoard);

          if (!gameManager.checkAllShipsPlaced()) {
            console.log("triggered");
            displayManager.renderVessel();
            initializeDragEvents(playerBoard);
          } else {
            console.log("All ships placed!");
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

  return { init, initializeDragEvents, handlePlayerInput };
})();

export default eventController;
