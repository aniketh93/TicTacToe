// script.js
const board = document.getElementById('board');
const status = document.getElementById('status');
const restart = document.getElementById('restart');

let cells = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

function renderBoard() {
  board.innerHTML = '';
  cells.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.textContent = cell;
    cellElement.addEventListener('click', () => handleCellClick(index));
    board.appendChild(cellElement);
  });
}

function handleCellClick(index) {
  if (cells[index] !== '' || !gameActive) return;

  cells[index] = currentPlayer;
  checkWinner();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  renderBoard();
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  winPatterns.forEach(pattern => {
    const [a, b, c] = pattern;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      gameActive = false;
      status.textContent = `${cells[a]} wins!`;
    }
  });

  if (!cells.includes('') && gameActive) {
    gameActive = false;
    status.textContent = "It's a draw!";
  }
}

restart.addEventListener('click', () => {
  cells = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  status.textContent = '';
  renderBoard();
});

renderBoard();
