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

  return { init, handlePlayerInput };
})();

export default eventController;
