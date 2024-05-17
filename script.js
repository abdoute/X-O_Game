let currentPlayer = 1;
const board = document.getElementById('board');
const currentPlayerSpan = document.getElementById('current-player');

const squares = Array(9).fill(null);

function createBoard() {
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const square = document.createElement('div');
        square.className = 'square';
        square.dataset.index = i;
        square.addEventListener('click', handleSquareClick);
        board.appendChild(square);
    }
}

function handleSquareClick(event) {
    const index = event.target.dataset.index;
    if (squares[index] !== null) return;

    squares[index] = currentPlayer;
    event.target.textContent = currentPlayer === 1 ? 'X' : 'O';

    if (checkWin()) {
        alert(`Player ${currentPlayer} Win!`);
        restartGame();
    } else if (squares.every(square => square !== null)) {
        alert('Draw!');
        restartGame();
    } else {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        currentPlayerSpan.textContent = currentPlayer;
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]            
    ];

    return winPatterns.some(pattern => 
        pattern.every(index => squares[index] === currentPlayer)
    );
}

function restartGame() {
    squares.fill(null);
    currentPlayer = 1;
    currentPlayerSpan.textContent = currentPlayer;
    createBoard();
}

createBoard();
