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

  const initializeDragEvents = () => {
    const vessel = document.querySelector(".vessel");
    const gameboardCells = document.querySelectorAll(".gameboard-cell");

    console.log(vessel, gameboardCells);

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

        let x = cell.getAttribute("data-index-x");
        let y = cell.getAttribute("data-index-y");

        console.log("Dropped at", "x :", x, " y :", y);
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

  return { init, initializeDragEvents, handlePlayerInput };
})();

export default eventController;
