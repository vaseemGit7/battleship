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

  const generateRandomPlacement = (playerBoard, shipSize) => {
    let isValid = false;
    let orientation = ["horizontal", "vertical"];
    let validCoords;
    let validOrientation;

    while (!isValid) {
      let x = Math.floor(Math.random() * 10);
      let y = Math.floor(Math.random() * 10);
      let randomOrientation = orientation[Math.floor(Math.random() * 2)];

      if (playerBoard.getCellState({ x: x, y: y }) === null) {
        if (
          _validatePlacement(
            playerBoard.board,
            playerBoard.size,
            { x: x, y: y },
            shipSize,
            randomOrientation,
          )
        ) {
          validCoords = { x: x, y: y };
          validOrientation = randomOrientation;
          isValid = true;
        }
      }
    }

    return { coords: validCoords, orientation: validOrientation };
  };

  const _validatePlacement = (
    board,
    boardSize,
    coords,
    shipSize,
    orientation,
  ) => {
    if (orientation === "horizontal" && coords.x + shipSize > boardSize)
      return false;
    if (orientation === "vertical" && coords.y + shipSize > boardSize)
      return false;

    for (let i = 0; i < shipSize; i++) {
      if (
        (orientation === "horizontal" &&
          (coords.y + i >= boardSize ||
            board[coords.x][coords.y + i] !== null)) ||
        (orientation === "vertical" &&
          (coords.x + i >= boardSize || board[coords.x + i][coords.y] !== null))
      ) {
        return false;
      }
    }
    return true;
  };
  return { getRandomAttack, generateRandomPlacement };
})();

export default opponentAI;
