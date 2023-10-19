function generateGameGrid(gridDiv, lineDiv) {
    const grid = document.querySelector(gridDiv)
    for (let i = 0; i < 23; i++) {
        const line = document.createElement("div")
        line.classList.add(lineDiv)
        grid.appendChild(line)
    }
}

function insertEmptyCells(cellsNumber) {
    const board = document.querySelector('.board')
    for (let i = 0; i < cellsNumber; i++) {
        const cell = document.createElement('div')
        cell.classList.add('cell')
        board.appendChild(cell)
    }
}

function fillBoard(ratio, board) {
    for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 24; j++) {
            board[i][j] = Math.random() < ratio / 10
            board[i][j] && setAsLiving(i, j)
        }
    }
}

function setAsLiving(i, j) {
    cells[i * 24 + j].classList.add('living')
}

function setAsDead(i, j) {
    cells[i * 24 + j].classList.add('dead')
}

function findCells() {
    return document.querySelectorAll('.board .cell')
}

function makeEmptyBoard(size) {
    return new Array(size).fill(null).map(() => new Array(size).fill(null))
}

// Генерируем игровую сетку
generateGameGrid(".grid-x", "line-x")

generateGameGrid(".grid-y", "line-y")

insertEmptyCells(576) // Заполняем игровое пространство пустыми клетками

const board = makeEmptyBoard(24) // Создаем пустой массив размера x * x и заполняем null

const cells = findCells() // Находим все элементы .cell внутри .board

fillBoard(1, board) // Случайным образом заполняем игровое пространство клетками
