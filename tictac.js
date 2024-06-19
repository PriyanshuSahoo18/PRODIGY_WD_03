document.addEventListener("DOMContentLoaded", function () {
  const cells = document.querySelectorAll(".cell");
  const restartBtn = document.getElementById("restartBtn");
  const gameModeToggle = document.getElementById("gameModeToggle");

  let currentPlayer = "X";
  let gameActive = true;
  let gameState = ["", "", "", "", "", "", "", "", ""];
  let gameMode = "playerVsPlayer";

  function handleCellClick(e) {
    const clickedCell = e.target;
    const cellIndex = parseInt(clickedCell.getAttribute("data-cell-index"));

    if (gameState[cellIndex] !== "" || !gameActive) {
      return;
    }

    gameState[cellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer);

    if (checkWin(currentPlayer)) {
      endGame(`${currentPlayer} wins!`);
    } else if (checkDraw()) {
      endGame("It's a draw!");
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }

  function endGame(message) {
    gameActive = false;
    alert(message);
  }

  function checkWin(player) {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winConditions.some((condition) => {
      return condition.every((index) => {
        return gameState[index] === player;
      });
    });
  }

  function checkDraw() {
    return gameState.every((cell) => {
      return cell !== "";
    });
  }

  function restartGame() {
    currentPlayer = "X";
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    cells.forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove("X", "O");
    });
  }

  function handleCellClickAI(e) {
    const clickedCell = e.target;
    const cellIndex = parseInt(clickedCell.getAttribute("data-cell-index"));

    if (gameState[cellIndex] !== "" || !gameActive) {
      return;
    }

    gameState[cellIndex] = "X";
    clickedCell.textContent = "X";
    clickedCell.classList.add("X");

    if (checkWin("X")) {
      endGame("You win!");
    } else if (checkDraw()) {
      endGame("It's a draw!");
    } else {
      makeAIMove();
    }
  }

  function makeAIMove() {
    const emptyCells = gameState.reduce((acc, cell, index) => {
      if (cell === "") acc.push(index);
      return acc;
    }, []);

    const randomIndex =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];
    gameState[randomIndex] = "O";
    cells[randomIndex].textContent = "O";
    cells[randomIndex].classList.add("O");

    if (checkWin("O")) {
      endGame("AI wins!");
    } else if (checkDraw()) {
      endGame("It's a draw!");
    }
  }

  function updateCellClickHandler() {
    cells.forEach((cell) => {
      cell.removeEventListener("click", handleCellClick);
      cell.removeEventListener("click", handleCellClickAI);
    });

    if (gameMode === "playerVsPlayer") {
      cells.forEach((cell) => {
        cell.addEventListener("click", handleCellClick);
      });
    } else if (gameMode === "playerVsAI") {
      cells.forEach((cell) => {
        cell.addEventListener("click", handleCellClickAI);
      });
    }
  }

  gameModeToggle.addEventListener("change", function () {
    gameMode = this.checked ? "playerVsAI" : "playerVsPlayer";
    restartGame();
    updateCellClickHandler();
  });

  restartBtn.addEventListener("click", restartGame);

  updateCellClickHandler();
});

// Restart game
function restartGame() {
  currentPlayer = "X";
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("X", "O");
  });

  if (gameMode === "playerVsAI" && currentPlayer === "O") {
    makeAIMove();
  }
}

function updateCellClickHandler() {
  cells.forEach((cell) => {
    cell.removeEventListener("click", handleCellClick);
    cell.removeEventListener("click", handleCellClickAI);
  });

  if (gameMode === "playerVsPlayer") {
    cells.forEach((cell) => {
      cell.addEventListener("click", handleCellClick);
    });
  } else if (gameMode === "playerVsAI") {
    cells.forEach((cell) => {
      cell.addEventListener("click", handleCellClickAI);
    });
  }
}

function checkDraw() {
  return gameState.every((cell) => {
    return cell !== "";
  });
}

function checkWin(player) {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winConditions.some((condition) => {
    return condition.every((index) => {
      return gameState[index] === player;
    });
  });
}

// Make AI move
function makeAIMove() {
  const emptyCells = gameState.reduce((acc, cell, index) => {
    if (cell === "") acc.push(index);
    return acc;
  }, []);

  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  gameState[randomIndex] = "O";
  cells[randomIndex].textContent = "O";
  cells[randomIndex].classList.add("O");

  if (checkWin("O")) {
    alert("AI wins!");
    gameActive = false;
  } else if (checkDraw()) {
    alert("It's a draw!");
    gameActive = false;
  }
}

// Event listeners
restartBtn.addEventListener("click", restartGame);
gameModeToggle.addEventListener("change", function () {
  gameMode = this.checked ? "playerVsAI" : "playerVsPlayer";
  restartGame();
  updateCellClickHandler();
});

// Initial setup
updateCellClickHandler();
restartGame();
