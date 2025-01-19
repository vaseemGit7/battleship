import eventController from "./eventController";

const displayManager = (() => {
  const boards = document.querySelectorAll(".player-board");
  const playerOneBoard = document.querySelector("#playerOneBoard");
  const playerTwoBoard = document.querySelector("#playerTwoBoard");

  boards.forEach(
    (board) =>
      (board.style.cssText =
        "border: 2px solid black; max-width: 400px; display: grid; grid-template-rows: repeat(10,1fr); margin: 20px;"),
  );

  const renderBoard = (player, playerBoard) => {
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
        : playerTwoBoard.appendChild(gridRow);
    }
  };

  const initializeEventListeners = () => {
    eventController.init();
  };

  return {
    renderBoard,
    initializeEventListeners,
  };
})();

export default displayManager;
