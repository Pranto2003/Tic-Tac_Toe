let turnAudio = new Audio("Musics/ting.mp3");
const boxes = document.querySelectorAll(".box");
const gameStatus = document.getElementById("game-status");
const restartButton = document.getElementById("restart");
let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleBoxClick(event) {
  const clickedBox = event.target;
  const clickedIndex = parseInt(clickedBox.getAttribute("data-index"));

  if (gameState[clickedIndex] !== "" || !gameActive) {
    return;
  }

  gameState[clickedIndex] = currentPlayer;
  clickedBox.innerText = currentPlayer;
  turnAudio.play();
  checkResult();
}

function checkResult() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    gameStatus.innerText = `Player ${currentPlayer} has won!`;
    document.getElementById("gameOver").style.display = "block";
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    gameStatus.innerText = "Game ended in a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  gameStatus.innerText = `It's ${currentPlayer}'s turn`;
}

function restartGame() {
  document.getElementById("gameOver").style.display = "none";
  currentPlayer = "X";
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameStatus.innerText = "Play your Turn by clicking the boxes";
  boxes.forEach((box) => (box.innerText = ""));
}

boxes.forEach((box) => box.addEventListener("click", handleBoxClick));
restartButton.addEventListener("click", restartGame);
