const state = {};
state.move = 1;
state.playerMoveRef = document.querySelector(".game__player-move--js");
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
let gameState = ["", "", "", "", "", "", "", "", ""];

export const startGame = (event) => {
  if (
    event.target.classList.contains("table") ||
    event.target.classList.contains("table__cell--cross") ||
    event.target.classList.contains("table__cell--zero")
  )
    return;
  if (state.move === 9) setTimeout(() => endGame("draw", 0), 500);
  if (state.move % 2 === 1) {
    state.move++;
    state.playerMoveRef.textContent = 1;
    event.target.classList.add("table__cell--cross");
    gameState[event.target.dataset.index] = "1";
  } else {
    state.playerMoveRef.textContent = 2;
    state.move++;
    event.target.classList.add("table__cell--zero");
    gameState[event.target.dataset.index] = "2";
  }
  handleResultValidation();
};
state.tableRef = document.querySelector(".table");

export const drawTable = () => {
  state.tableRef.innerHTML = "";
  state.move = 1;
  gameState = ["", "", "", "", "", "", "", "", ""];
  for (let i = 0; i < 9; i += 1) {
    state.string = `<li data-index="${i}" class="table__cell"></li>`;
    state.tableRef.insertAdjacentHTML("beforeend", state.string);
  }
  state.tableRef.addEventListener("click", startGame);
};

const handleResultValidation = () => {
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      endGame("win", a);
      break;
    }
  }
};
const endGame = (result, winner) => {
  if (result === "win") {
    alert(`Player-${winner} win`);
    drawTable();
  }
  if (result === "draw") {
    alert("draw");
    drawTable();
  }
};

state.roundRef = 0;

export const getOverRounds = () => {
   if(state.roundRef) {
      state.roundRef = prompt('sorry write another number');
   }
   else{
      state.roundRef = prompt("Write amount of rounds 1-9");
   }
  localStorage.setItem("round", +state.roundRef);
  if (+state.roundRef >= 9 || +state.roundRef <= 0) {
    return getOverRounds();
  }
  drawTable()
};
