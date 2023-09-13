const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const muteAllButton = document.getElementById("mute-buttons");
const muteToggleButton = document.getElementById("music-on-off");
const drawSound = document.getElementById("drawsound");
const winSound = document.getElementById("winsound");
const backgroundMusic = document.getElementById("background-music");
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const alien1Element = document.getElementById("alien1");
const userOrComputerElement = document.getElementById("userOrComputer");
const userVsComButton = document.getElementById("userVsCom");
const userVsUserButton = document.getElementById("userVsUser");
const mainMenuButtonClick = document.getElementById("mainMenuButton");
const restartButton = document.getElementById("restartButton");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
let circleTurn = false;
let computerMode = false;
let isSoundMuted = false;

const fullscreenButton = document.getElementById("fullscreen-button");

fullscreenButton.addEventListener("click", () => {
  if (document.fullscreenElement) {
    // Exit fullscreen mode
    document.exitFullscreen().catch((err) => {
      console.error("Error exiting fullscreen:", err);
    });
  } else {
    // Enter fullscreen mode
    document.documentElement.requestFullscreen().catch((err) => {
      console.error("Error entering fullscreen:", err);
    });
  }
});

// Function to toggle borders for cell elements
function toggleBorders() {
  const cellElements = document.querySelectorAll(".cell[data-cell]");

  cellElements.forEach((element) => {
    // Check if the element already has the 'with-border' class
    if (element.classList.contains("with-border")) {
      // If it has the class, remove it to turn off the border
      element.classList.remove("with-border");
    } else {
      // If it doesn't have the class, add it to turn on the border
      element.classList.add("with-border");
    }
  });
}

// Function to toggle warning styles for cell elements
function toggleWarningStyles() {
  const cellElements = document.querySelectorAll(".cell[data-cell]");

  cellElements.forEach((element) => {
    // Check if the element already has the 'with-warning-styles' class
    if (element.classList.contains("with-warning-styles")) {
      // If it has the class, remove it to turn off the warning styles
      element.classList.remove("with-warning-styles");
    } else {
      // If it doesn't have the class, add it to turn on the warning styles
      element.classList.add("with-warning-styles");
    }
  });
}

function toggleShadow() {
  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell) => {
    cell.classList.toggle("fx");
  });
}

// Initialize a variable to keep track of the filter state
let isFilterApplied = false;

function changeFilter() {
  const salienElement = document.querySelector("#salien");

  if (salienElement) {
    if (isFilterApplied) {
      // Remove the filter
      salienElement.style.filter = "none";
    } else {
      // Apply the filter
      salienElement.style.filter = "drop-shadow(0 0 0.65vmin #abfd1d)";
    }

    // Toggle the filter state
    isFilterApplied = !isFilterApplied;
  }
}

// JavaScript function to play the click sound
function playClickSound() {
  const clickSound = document.getElementById("click-sound7");
  clickSound.play();
}

function playClickSound2() {
  const clickSound2 = document.getElementById("click-sound6");
  clickSound2.play();
}

function playClickSound3() {
  const clickSound3 = document.getElementById("click-sound8");
  clickSound3.play();
}

const imgElement2 = document.getElementById("warning");
imgElement2.addEventListener("click", toggleWarningStyles);
const imgElement = document.getElementById("glas");
imgElement.addEventListener("click", toggleBorders);

restartButton.addEventListener("click", function () {
  // Hide the restart button
  restartButton.style.display = "none";

  // Add your other logic here
  alien1Element.classList.add("show");
  changeIdTemporarily();
  restartGame();
});

userOrComputerElement.classList.add("show");
userVsComButton.addEventListener("click", userVsCom);
userVsUserButton.addEventListener("click", userVsUser);
mainMenuButtonClick.addEventListener("click", mainMenu);
muteAllButton.addEventListener("click", toggleSound);

muteToggleButton.addEventListener("click", () => {
  backgroundMusic.muted = !backgroundMusic.muted;

  // Check if backgroundMusic is muted and apply opacity changes to "off" and "on" elements accordingly
  const offElement = document.getElementById("off");
  const onElement = document.getElementById("on");

  if (backgroundMusic.muted) {
    // Apply opacity changes when not muted (for example, set "on" to lower opacity and reset "off" to full opacity)
    offElement.style.opacity = "1"; // Reset to full opacity for "off"
    onElement.style.opacity = "0.5"; // Adjust the opacity value as needed
  } else {
    // Apply opacity changes when muted (for example, set "off" to lower opacity and reset "on" to full opacity)
    offElement.style.opacity = "0.5"; // Adjust the opacity value as needed
    onElement.style.opacity = "1"; // Reset to full opacity for "on"
  }
});

function toggleSound() {
  isSoundMuted = !isSoundMuted;
  const muteSound = document.getElementById("click-sound2");
  muteSound.pause();
  muteSound.currentTime = 0;
  muteSound.play();

  // Toggle individual sounds
  const oTurnSound = document.getElementById("o-turn-sound");
  const xTurnSound = document.getElementById("x-turn-sound");
  const clickSound = document.getElementById("click-sound");

  oTurnSound.muted = isSoundMuted;
  xTurnSound.muted = isSoundMuted;
  clickSound.muted = isSoundMuted;

  // Toggle draw and win sounds independently
  const drawSound = document.getElementById("drawsound");
  const winSound = document.getElementById("winsound");
  drawSound.muted = isSoundMuted;
  winSound.muted = isSoundMuted;

  // Toggle the additional sounds
  const sound4 = document.getElementById("click-sound4");
  const sound6 = document.getElementById("click-sound6");
  const sound7 = document.getElementById("click-sound7");
  const sound8 = document.getElementById("click-sound8");

  sound4.muted = isSoundMuted;
  sound6.muted = isSoundMuted;
  sound7.muted = isSoundMuted;
  sound8.muted = isSoundMuted;

  // Toggle other elements as needed

  muteAllButton.innerHTML = isSoundMuted ? "📍" : "🕹️";
}

// Now, you can play the draw and win sounds independently
function endGame(draw) {
  if (draw) {
    drawSound.play(); // Play draw sound
    // Rest of your code
  } else {
    winSound.play(); // Play win sound
    // Rest of your code
  }

  // Rest of your endGame function
}

function playBackgroundMusic() {
  backgroundMusic.play();
}

function playRandomSound() {
  // Create an array with the IDs of the audio elements
  const audioIds = ["humans1", "humans2", "humans3", "humans4", "humans5"];

  // Get a random index from the array
  const randomIndex = Math.floor(Math.random() * audioIds.length);

  // Get the selected audio element based on the random index
  const selectedAudio = document.getElementById(audioIds[randomIndex]);

  // Play the selected audio
  if (selectedAudio) {
    selectedAudio.play();
  }
}

function changeIdTemporarily() {
  // Get the element by its ID
  let element = document.getElementById("purple3");

  // Change the ID to "purple4res"
  element.id = "purple4res";

  // After 3 seconds, change the ID back to "purple3"
  setTimeout(function () {
    element.id = "purple3";
  }, 3000);
}

function userVsCom() {
  const buttonSound = document.getElementById("vsComSound");
  buttonSound.pause();
  buttonSound.currentTime = 0;
  buttonSound.play();
  computerMode = true;
  userOrComputerElement.classList.remove("show");
  startUserVsComGame();
}

function isValidMove(cell) {
  return (
    !cell.classList.contains(X_CLASS) && !cell.classList.contains(CIRCLE_CLASS)
  );
}

function userVsUser() {
  const buttonSound = document.getElementById("vsUserSound");
  buttonSound.pause();
  buttonSound.currentTime = 0;
  buttonSound.play();
  computerMode = false;
  userOrComputerElement.classList.remove("show");
  startGame();
}

function restartGame() {
  if (computerMode) {
    startUserVsComGame();
  } else {
    startGame();
  }

  resetMatrix(); // Call the resetMatrix function here

  if (isFinalRound) {
    // Play the final round sound
    const restartSoundFinal = document.getElementById("click-sound");
    restartSoundFinal.play();
  } else {
    // Play the sound after a regular win
    const restartSoundRound = document.getElementById("click-sound4");
    restartSoundRound.pause();
    restartSoundRound.currentTime = 0;
    restartSoundRound.play();
  }
}

function mainMenu() {
  const menuSound = document.getElementById("click-sound5");
  menuSound.pause();
  menuSound.currentTime = 0;
  menuSound.play();

  // When the sound ends, reload the page
  menuSound.addEventListener("ended", () => {
    location.reload();
  });
}

function startUserVsComGame() {
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
  if (computerMode && circleTurn) {
    setTimeout(computerMove, 500);
  }
}

function startGame() {
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  if (!isValidMove(cell)) return;
  console.log(e.target.id);

  let myindex = parseInt(e.target.id[e.target.id.length - 1]);

  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);

  // Play the appropriate turn sound
  if (currentClass === CIRCLE_CLASS) {
    // It's O's turn, play O's turn sound
    const oTurnSound = document.getElementById("o-turn-sound");
    oTurnSound.pause();
    oTurnSound.currentTime = 0;
    oTurnSound.play();
    matrix[myindex] = "O";
  } else {
    // It's X's turn, play X's turn sound
    const xTurnSound = document.getElementById("x-turn-sound");
    xTurnSound.pause();
    xTurnSound.currentTime = 0;
    xTurnSound.play();
    matrix[myindex] = "X";
  }
  console.log(matrix);
  if (checkWin(currentClass)) {
    endGame(false);
    return;
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
    if (computerMode && circleTurn) {
      setTimeout(computerMove, 500);
    }
  }
}

let matrix = ["", "", "", "", "", "", "", "", ""];

function resetMatrix() {
  matrix = ["", "", "", "", "", "", "", "", ""]; // Reassign the matrix
}

// 1
function computerMove() {
  const blocking = check4moves();
  const emptyCells = [...cellElements].filter(
    (cell) =>
      !cell.classList.contains(X_CLASS) &&
      !cell.classList.contains(CIRCLE_CLASS)
  );

  if (emptyCells.length === 0) return;

  let randomIndex;
  let randomCell;

  if (blocking) {
    // Block the player's winning move
    randomCell = blocking;
  } else {
    // Otherwise, make a random move
    randomIndex = Math.floor(Math.random() * emptyCells.length);
    randomCell = emptyCells[randomIndex];
  }

  // Play the computer's turn sound
  const computerTurnSound = document.getElementById("o-turn-sound");
  computerTurnSound.pause();
  computerTurnSound.currentTime = 0;
  computerTurnSound.play();

  const myindex = parseInt(randomCell.id[randomCell.id.length - 1]);

  matrix[myindex] = "O";

  placeMark(randomCell, CIRCLE_CLASS);
  if (checkWin(CIRCLE_CLASS)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function check4moves() {
  let once = true;
  let move = undefined;
  let winningMove = undefined;

  WINNING_COMBINATIONS.forEach((arr) => {
    const playerCount = arr.filter((index) => matrix[index] === "X").length;
    const computerCount = arr.filter((index) => matrix[index] === "O").length;
    const emptyCount = arr.filter((index) => matrix[index] === "").length;

    if (playerCount === 2 && emptyCount === 1 && once) {
      // Find the empty cell to block the player
      const emptyIndex = arr.find((index) => matrix[index] === "");
      move = cellElements[emptyIndex];
      once = false;
    }

    if (computerCount === 2 && emptyCount === 1 && once) {
      // Find the empty cell for a winning move
      const emptyIndex = arr.find((index) => matrix[index] === "");
      winningMove = cellElements[emptyIndex];
      once = false;
    }
  });

  if (winningMove) {
    return winningMove; // Prioritize winning move
  }

  return move; // If no winning move found, return blocking move (if any)
}

alien1Element.classList.add("show");

let currentRound = 1; // Initialize the current round to 1
let xRoundsWon = 0;
let oRoundsWon = 0;
const TOTAL_ROUNDS = 3; // Total number of rounds

function updateScores() {
  const scoreXElement = document.getElementById("score-x");
  const scoreOElement = document.getElementById("score-o");

  scoreXElement.textContent = `⎆X⇢ ${xRoundsWon}`;
  scoreOElement.textContent = `✦O⇢ ${oRoundsWon}`;
}

const drawsound = document.getElementById("drawsound");
const winsound = document.getElementById("winsound");

let isFinalRound = false;

updateScores();

function endGame(draw) {
  if (draw) {
    setTimeout(() => {
      drawsound.play(); // Play draw sound after a delay
    }, 1000);
    const drawCell = "draw-cell";
    cellElements.forEach((cell) => {
      cell.classList.add(drawCell);
    });
    winningMessageTextElement.innerText = "⚛︎DRAW⚛︎";
    alien1Element.classList.remove("show");
    setTimeout(() => {
      cellElements.forEach((cell) => {
        cell.classList.remove(drawCell);
      });
    }, 1000);
    if (xRoundsWon !== 3 || oRoundsWon !== 3) {
      isFinalRound = false;
    }
    endCurrentRound();
  } else {
    setTimeout(() => {
      winsound.play(); // Play win sound after a delay
    }, 1000);
    currentRound++;
    circleTurn ? oRoundsWon++ : xRoundsWon++;
    updateScores();
    winningMessageTextElement.innerText = `${
      circleTurn ? "O's" : "X's"
    } Round☄︎`;
    if (circleTurn && computerMode) {
      // X's wins, so add the "show" class to #alien1
      alien1Element.classList.remove("show");
    }
  }

  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  const winningCellClass = circleTurn ? "winning-cell-o" : "winning-cell-x";

  // מוצא את הקומבינציה המנצחת
  const winningCombination = WINNING_COMBINATIONS.find((combinations) => {
    return combinations.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });

  // משנה את המחלקות של התאים בקומבינציה המנצחת
  if (winningCombination) {
    winningCombination.forEach((index) => {
      cellElements[index].classList.add(winningCellClass);
    });
  }

  // השהיית הצגת ההודעה על הניצחון בזמן שהסגנון משתנה
  setTimeout(() => {
    // הסר את הסגנון של התאים בקומבינציה המנצחת
    if (winningCombination) {
      winningCombination.forEach((index) => {
        cellElements[index].classList.remove(winningCellClass);
      });
    }
    winningMessageElement.classList.add("show");
    endCurrentRound();
    if (xRoundsWon === 3 || oRoundsWon === 3) {
      winningMessageTextElement.innerText = `${
        circleTurn ? "X's" : "O's"
      } Final Winner!!`;
      // Show the winning message only when it's the third round
      // הוסף את השורה הבאה רק אם זה הסיבוב האחרון
      winningMessageElement.classList.add("show");
      restartButton.style.display = "block";
      currentRound = 1; // Initialize the current round to 1
      xRoundsWon = 0;
      oRoundsWon = 0;
      isFinalRound = true;
      updateScores();
    }

    // Add a delay for showing the restart button after winning message appears
    setTimeout(() => {
      restartButton.style.display = "block";
    }, 1800); // Adjust the delay time as needed
  }, 1300);
}

function endCurrentRound() {
  // נגדיר פונקציה שתסיים את הסיבוב הנוכחי
  // נאפס את הלוח, את מערך המטריצה, ונשנה את התור למעבר לשחקן הראשון
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  resetMatrix();
  circleTurn = !circleTurn;
  setBoardHoverClass();
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
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
  return WINNING_COMBINATIONS.some((combinations) => {
    return combinations.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

startGame();

playBackgroundMusic();
