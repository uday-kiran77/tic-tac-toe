const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
let x_score = 0,
  o_score = 0;
const WINNING_COMBINATION = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const board = document.getElementById("board");
const cellElements = document.querySelectorAll("[data-cell]");

const winningMessage = document.getElementById("winning-message");
let circleTurn;
const x_score_holder = document.getElementById("x-score");
const o_score_holder = document.getElementById("o-score");

StartGame();

function StartGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.addEventListener("click", handleClick);
  });
  updateScores();
  setBoardHoverClass();
}

function handleClick(e) {
  const cell = e.target;

  if (
    cell.classList.contains(X_CLASS) ||
    cell.classList.contains(CIRCLE_CLASS)
  ) {
    return;
  }

  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endgame(false);
  } else if (isDraw()) {
    endgame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}
function swapTurns() {
  circleTurn = !circleTurn;
}
function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);

  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATION.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function endgame(draw) {
  if (draw) {
    winningMessage.innerText = "Draw!";
  } else {
    if (circleTurn) {
      winningMessage.innerText = "O Wins!";
      o_score++;
    } else {
      winningMessage.innerText = "X Wins!";
      x_score++;
    }
  }
  updateScores();
  board.classList.add("noActivity");
  winningMessage.classList.add("show");
}
function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}
function restart() {
  circleTurn = false;
  winningMessage.classList.remove("show");

  setBoardHoverClass();

  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
  });
  board.classList.remove("noActivity");
  // location.reload();
}

function updateScores() {
  if (localStorage.getItem("x-score") || localStorage.getItem("o-storage")) {
    localStorage.setItem("o-score", o_score);
    localStorage.setItem("x-score", x_score);
  } else {
    localStorage.setItem("o-score", 0);
    localStorage.setItem("x-score", 0);
  }

  o_score_holder.innerText = o_score;
  x_score_holder.innerText = x_score;
}
