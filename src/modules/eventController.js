import gameManager from "./gameManager";

const eventController = (() => {
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

  return { init };
})();

export default eventController;
