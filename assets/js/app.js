function generateGameGrid(gridDiv, lineDiv) {
    const grid = document.querySelector(gridDiv);

    for (let i = 0; i < 23; i++) {
        const line = document.createElement("div");
        line.classList.add(lineDiv);
        grid.appendChild(line);
    }
}

function insertEmptyCells(cellsNumber) {
    const board = document.querySelector('.board');
    board.style["filter"] = "0px";

    for (let i = 0; i < cellsNumber; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        board.appendChild(cell);
    }

    return board;
}

function setAsLiving(i, j, cells) {
    cells[i * 24 + j].classList.remove('dead');
    cells[i * 24 + j].classList.add('living');
}

function setAsDead(i, j, cells) {
    cells[i * 24 + j].classList.remove('living');
    cells[i * 24 + j].classList.add('dead');
}

function fillBoard(board, cells) {
    function getRatio() {
        return document.getElementById('customRange').value;
    }

    const ratio = getRatio();

    for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 24; j++) {
            cells[i * 24 + j].classList.remove('living');
            cells[i * 24 + j].classList.remove('dead');

            if (Math.random() < ratio / 10) {
                board[i][j] = true;
                setAsLiving(i, j, cells);
            } else {
                board[i][j] = null;
            }
        }
    }
}

function findCells() {
    return document.querySelectorAll('.board .cell');
}

function makeEmptyBoard(size) {
    return new Array(size).fill(null).map(() => new Array(size).fill(null));
}

function handleCells(cells, board) {
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            if (!board[Math.floor(index / 24)][index % 24]) {
                cell.classList.add('living');
                board[Math.floor(index / 24)][index % 24] = true;
            } else {
                cell.classList.remove('living');
                board[Math.floor(index / 24)][index % 24] = null;
            }
        });
    });
}

function countLivingNeighbors(board, x, y) {
    const offsets = [-1, 0, 1];
    let count = 0;

    offsets.forEach((dx) => {
        offsets.forEach((dy) => {
            if (dx === 0 && dy === 0) return;

            const newX = x + dx;
            const newY = y + dy;

            if (newX >= 0 && newX < 24 && newY >= 0 && newY < 24) {
                if (board[newX][newY]) {
                    count++;
                }
            }
        });
    });

    return count;
}

function calculateNextGeneration(board) {
    const newBoard = makeEmptyBoard(24);

    for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 24; j++) {
            const neighbors = countLivingNeighbors(board, i, j);

            if (board[i][j] === true) {
                newBoard[i][j] = !(neighbors < 2 || neighbors > 3);
            }

            if (board[i][j] === false) {
                if (neighbors === 3) {
                    newBoard[i][j] = true;
                }
            }
        }
    }

    return newBoard;
}

function displayNextGeneration(board, cells) {
    for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 24; j++) {
            if (board[i][j]) {
                setAsLiving(i, j, cells);
            }

            if (board[i][j] === false) {
                setAsDead(i, j, cells);
            }
        }
    }
}

function getBoardHash(board) {
    const cellStates = board.flat().map(cell => cell ? 1 : 0);
    return cellStates.join('');
}

let firstGeneration = true;
let boardArr;
let cells;

function generate() {
    const next = document.getElementById('nxt');
    next.classList.remove('disabled');

    if (firstGeneration) {
        let generation = document.getElementById('generation');
        generation.textContent = "1";

        insertEmptyCells(576);
        boardArr = makeEmptyBoard(24);

        generateGameGrid(".grid-x", "line-x");
        generateGameGrid(".grid-y", "line-y");

        const board = document.querySelector('.board');
        board.classList.remove('blur');

        cells = findCells();
        fillBoard(boardArr, cells);

        firstGeneration = false;
    } else {
        let generation = document.getElementById('generation');
        generation.textContent = "1";

        boardArr = makeEmptyBoard(24);
        cells = findCells();
        fillBoard(boardArr, cells);
    }

    handleCells(cells, boardArr);
}

function next() {
    const newBoard = calculateNextGeneration(boardArr);

    if (getBoardHash(boardArr) === getBoardHash(newBoard)) {
        const toast = document.getElementById('toast');
        new bootstrap.Toast(toast).show();

        const next = document.getElementById('nxt');
        next.classList.add('disabled');
    } else {
        const generation = document.getElementById('generation');
        generation.textContent = String(Number(generation.textContent) + 1);

        displayNextGeneration(newBoard, cells);
        handleCells(cells, newBoard);
        boardArr = newBoard;
    }
}
