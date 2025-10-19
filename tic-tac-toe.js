window.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll("#board div");
  const status = document.querySelector("#status");
  const newGameBtn = document.querySelector(".btn");
  let currentPlayer = "X";
  let gameActive = true;

  const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  function checkWinner() {
    if (squares.length < 9) return; // Prevent checking before all squares are filled
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        squares[a].textContent &&
        squares[a].textContent === squares[b].textContent &&
        squares[a].textContent === squares[c].textContent
      ) {
        status.textContent = `Congratulations! ${squares[a].textContent} is the Winner!`;
        status.classList.add("you-won");
        gameActive = false;
      }
    }
  }

  squares.forEach(square => {
    square.classList.add("square");
    square.addEventListener("mouseover", () => square.classList.add("hover"));
    square.addEventListener("mouseout", () => square.classList.remove("hover"));
    square.addEventListener("click", () => {
      if (square.textContent === "" && gameActive) {
        square.textContent = currentPlayer;
        square.classList.add(currentPlayer);
        checkWinner();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    });
  });

  newGameBtn.addEventListener("click", () => {
    squares.forEach(square => {
      square.textContent = "";
      square.classList.remove("X", "O");
    });
    status.textContent = "Move your mouse over a square and click to play an X or an O.";
    status.classList.remove("you-won");
    currentPlayer = "X";
    gameActive = true;
  });
});
