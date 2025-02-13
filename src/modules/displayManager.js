import eventController from "./eventController";
import gameManager from "./gameManager";

import carrierImg from "../assets/carrier.svg";
import cruiserImg from "../assets/cruiser.svg";
import destroyerImg from "../assets/destroyer.svg";
import frigateImg from "../assets/frigate.svg";
import submarineImg from "../assets/submarine.svg";

const displayManager = (() => {
  const winningPhrases = [
    "Total Annihilation! The enemy fleet is no more!",
    "Victory is yours! The seas bow to your command!",
    "The enemy is vanquished! Your legend will be told for centuries!",
    "Not a single enemy ship remains… This ocean belongs to you now!",
    "A masterstroke of strategy! The enemy never stood a chance!",
    "The last ship sinks beneath the waves… You have conquered the battlefield!",
    "Your name will be etched in history as the greatest admiral!",
  ];

  const losingPhrases = [
    "The sea claims your fleet… Defeat is absolute!",
    "Darkness falls upon your navy. Not a single ship remains…",
    "Your fleet lies in ruins… The enemy stands victorious!",
    "The ocean whispers your failure as your last ship goes under!",
    "Your forces fought bravely, but the enemy was merciless!",
    "Your command ends here. The enemy has crushed your fleet!",
    "A tragic loss… The battlefield is silent, save for the wreckage of your fleet!",
  ];

  const shipImages = {
    carrier: carrierImg,
    cruiser: cruiserImg,
    destroyer: destroyerImg,
    frigate: frigateImg,
    submarine: submarineImg,
  };

  const playerOneBoard = document.querySelector("#playerOneBoard");
  const playerTwoBoard = document.querySelector("#playerTwoBoard");

  const shipPlacementBoard = document.querySelector("#shipPlacementBoard");

  const renderBoard = (player, playerBoard) => {
    shipPlacementBoard.innerHTML = "";

    player === "playerOne"
      ? (playerOneBoard.innerHTML = "")
      : (playerTwoBoard.innerHTML = "");

    for (let x = 0; x < playerBoard.size; x++) {
      const gridRow = document.createElement("div");
      gridRow.classList.add("board-row");
      for (let y = 0; y < playerBoard.size; y++) {
        const gridCol = document.createElement("div");
        gridCol.setAttribute("data-index-x", x);
        gridCol.setAttribute("data-index-y", y);
        gridCol.classList.add("gameboard-cell");
        gridCol.classList.add("board-col");

        if (
          playerBoard.getCellState({ x: x, y: y }) !== null &&
          playerBoard.getCellState({ x: x, y: y }).origin.x === x &&
          playerBoard.getCellState({ x: x, y: y }).origin.y === y
        ) {
          const shipName = playerBoard.getCellState({ x: x, y: y }).ship.name;
          const orientation = playerBoard.getCellState({
            x: x,
            y: y,
          }).orientation;
          const shipSize = playerBoard.getCellState({ x: x, y: y }).ship.size;

          let shipImg = document.createElement("div");
          shipImg.classList.add("shipImg");
          shipImg.style.backgroundImage = `url(${shipImages[shipName]})`;

          if (orientation === "vertical") {
            shipImg.classList.add("rotate");
          }

          if (player === "playerTwo") {
            shipImg.classList.add("enemy-ship");
          }

          shipImg.style.width = `${shipSize * 100}%`;
          shipImg.style.height = "100%";

          gridCol.appendChild(shipImg);
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
    const vesselName = document.querySelector("#currentVessel");
    vesselContainer.innerHTML = "";

    const vesselEle = document.createElement("div");

    const vessel = gameManager.getCurrentVessel();
    vesselName.textContent = `PLACE YOUR ${vessel.name}`;

    vesselEle.classList.add("vessel");
    vesselEle.style.cssText = `height: 40px; width: ${vessel.size * 40}px; background-color: blue`;
    vesselEle.draggable = "true";
    vesselEle.setAttribute("data-orientation", "horizontal");

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
        cell.classList.add("cell-hit");
      } else {
        cell.classList.add("cell-miss");
      }
    }
  };

  const switchBoardFocus = (targetPlayer) => {
    const playerOnePanel = document.querySelector(".player-one-panel");
    const playerTwoPanel = document.querySelector(".player-two-panel");

    playerOnePanel.classList.remove("board-focus");
    playerTwoPanel.classList.remove("board-focus");

    let playerPanel =
      targetPlayer.type === "human" ? playerTwoPanel : playerOnePanel;

    playerPanel.classList.add("board-focus");
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
    eventController.handleResetPlacement();
    eventController.handleRandomizePlacement();
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

  const loadGameOverScreen = () => {
    const battleScreen = document.querySelector(".battle-section");
    const gameOverScreen = document.querySelector(".gameover-section");

    battleScreen.classList.add("screen-hidden");
    gameOverScreen.classList.remove("screen-hidden");
    eventController.handlePlayAgain();
  };

  const loadPlayAgain = () => {
    const gameOverScreen = document.querySelector(".gameover-section");
    const shipPlacementScreen = document.querySelector(
      ".ship-placement-section",
    );

    gameOverScreen.classList.add("screen-hidden");
    shipPlacementScreen.classList.remove("screen-hidden");

    gameManager.setupPlayAgain();
    eventController.handleResetPlacement();
    eventController.handleRandomizePlacement();
  };

  const updateWinner = (player) => {
    const winnerAnnouncement = document.querySelector("#winnerAnnouncement");
    const gameOverPhrase = document.querySelector("#gameOverPhrase");
    const playAgainBtn = document.querySelector("#playAgainBtn");

    let playerName, phrase, btnText;
    let randomNum = Math.floor(Math.random() * 7);

    if (player.type === "human") {
      playerName = player.name;
      phrase = winningPhrases[randomNum];
      btnText = "BATTLE AGAIN";
    } else {
      playerName = "Enemy";
      phrase = losingPhrases[randomNum];
      btnText = "RISE AGAIN";
    }

    winnerAnnouncement.textContent = `${playerName} conquered the sea`;
    gameOverPhrase.textContent = phrase;
    playAgainBtn.textContent = btnText;
  };

  return {
    renderBoard,
    renderVessel,
    initializeEventListeners,
    updateCell,
    updateWinner,
    switchBoardFocus,
    loadPlacementScreen,
    loadBattleScreen,
    loadGameOverScreen,
    loadPlayAgain,
  };
})();

export default displayManager;
