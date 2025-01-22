const opponentAI = (() => {
  const getRandomAttack = (board) => {
    let isValid = false;
    let coords;

    while (!isValid) {
      let x = Math.floor(Math.random() * 10);
      let y = Math.floor(Math.random() * 10);
      console.log(x, y, board.getCellState({ x: x, y: y }));
      if (
        board.getCellState({ x: x, y: y }) === null ||
        board.getCellState({ x: x, y: y }).status === "intact"
      ) {
        console.log("within if: ", x, y, board.getCellState({ x: x, y: y }));
        coords = { x: x, y: y };
        isValid = true;
      }
    }
    return coords;
  };

  return { getRandomAttack };
})();

export default opponentAI;
