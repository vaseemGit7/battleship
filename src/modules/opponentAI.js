const opponentAI = (() => {
  let pivotHit = null;
  let searchQueue = [];

  const getRandomAttack = (board) => {
    let isValid = false;
    let coords;

    console.log("queue", searchQueue);
    console.log("pivot", pivotHit);

    while (searchQueue.length > 0) {
      console.log("queue while");
      let guessCoord = searchQueue.shift();
      if (_validateAdjacent(guessCoord, board)) {
        console.log("Coord", guessCoord);
        processAttack(guessCoord, board);
        return guessCoord;
      }
    }

    while (!isValid) {
      console.log("random while");

      let x = Math.floor(Math.random() * 10);
      let y = Math.floor(Math.random() * 10);
      if (
        board.getCellState({ x: x, y: y }) === null ||
        board.getCellState({ x: x, y: y }).status === "intact"
      ) {
        console.log("within if: ", x, y, board.getCellState({ x: x, y: y }));
        processAttack({ x: x, y: y }, board);
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
            playerBoard,
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
    playerBoard,
    board,
    boardSize,
    coords,
    shipSize,
    orientation,
  ) => {
    if (orientation === "horizontal" && coords.y + shipSize > boardSize)
      return false;
    if (orientation === "vertical" && coords.x + shipSize > boardSize)
      return false;

    for (let i = 0; i < shipSize; i++) {
      let x = coords.x + (orientation === "vertical" ? i : 0);
      let y = coords.y + (orientation === "horizontal" ? i : 0);

      console.log(x, y, orientation);

      if (playerBoard.getCellState({ x, y }) !== null) {
        return false;
      }

      const directions = [
        { dx: -1, dy: 0 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
        { dx: 0, dy: 1 },
        { dx: -1, dy: -1 },
        { dx: -1, dy: 1 },
        { dx: 1, dy: -1 },
        { dx: 1, dy: 1 },
      ];

      for (let { dx, dy } of directions) {
        let adjX = x + dx;
        let adjY = y + dy;

        if (adjX >= 0 && adjX < boardSize && adjY >= 0 && adjY < boardSize) {
          if (playerBoard.getCellState({ x: adjX, y: adjY }) !== null) {
            return false;
          }
        }
      }
    }

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

  const _validateAdjacent = (coords, board) => {
    console.log(coords, coords.x, coords.y);
    if (
      coords.x >= 0 &&
      coords.x < board.size &&
      coords.y >= 0 &&
      coords.y < board.size
    ) {
      console.log(coords, " : true");
      const cell = board.getCellState(coords);
      return cell === null || (cell && cell.status === "intact");
    }
    console.log(coords, " : false");
    return false;
  };

  const processAttack = (coords, board) => {
    let left, right, top, bottom;
    console.log("process attack");
    if (
      board.getCellState(coords) !== null &&
      board.getCellState(coords).status === "intact"
    ) {
      pivotHit = coords;

      left = { x: pivotHit.x, y: pivotHit.y - 1 };
      right = { x: pivotHit.x, y: pivotHit.y + 1 };
      top = { x: pivotHit.x - 1, y: pivotHit.y };
      bottom = { x: pivotHit.x + 1, y: pivotHit.y };

      if (
        (board.getCellState(left) &&
          board.getCellState(left).status === "hit") ||
        (board.getCellState(right) &&
          board.getCellState(right).status === "hit")
      ) {
        searchQueue.push(left, right);
      } else if (
        (board.getCellState(top) && board.getCellState(top).status === "hit") ||
        (board.getCellState(bottom) &&
          board.getCellState(bottom).status === "hit")
      ) {
        searchQueue.push(top, bottom);
      } else {
        searchQueue = [left, right, top, bottom];
      }
    } else if (searchQueue.length === 0) {
      pivotHit = null;
    }
  };

  return { getRandomAttack, generateRandomPlacement };
})();

export default opponentAI;
