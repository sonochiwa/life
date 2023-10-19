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
    board.style["filter"] = "0px"
    for (let i = 0; i < cellsNumber; i++) {
        const cell = document.createElement('div')
        cell.classList.add('cell')
        board.appendChild(cell)
    }
    return board
}

function setAsLiving(i, j, cells) {
    return cells[i * 24 + j].classList.add('living')
}

function setAsDead(i, j, cells) {
    return cells[i * 24 + j].classList.add('dead')
}

function fillBoard(board, cells) {
    function getRatio() {
        return document.getElementById('customRange').value
    }

    const ratio = getRatio()

    for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 24; j++) {
            cells[i * 24 + j].classList.remove('living')
            cells[i * 24 + j].classList.remove('dead')
            board[i][j] = Math.random() < ratio / 10
            board[i][j] && setAsLiving(i, j, cells)
        }
    }
}

function findCells() {
    return document.querySelectorAll('.board .cell')
}

function makeEmptyBoard(size) {
    return new Array(size).fill(null).map(() => new Array(size).fill(null))
}

function handleCells(cells, board) {
    // Добавляем обработчик клика для каждой клетки
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            if (!board[Math.floor(index / 24)][index % 24]) {
                // Если клетка не активна (значение в массиве равно false), делаем её активной
                cell.classList.add('living');
                board[Math.floor(index / 24)][index % 24] = true;
            } else {
                cell.classList.remove('living');
                board[Math.floor(index / 24)][index % 24] = null;
            }
        });
    });
}

let firstGeneration = true

function generate() {
    const start = document.getElementById('st')
    start.classList.remove('disabled')

    let cells
    let boardArr

    if (firstGeneration) {
        let generation = document.getElementById('generation');
        generation.textContent = String(Number(generation.textContent) + 1)

        insertEmptyCells(576) // Заполняем игровое пространство пустыми клетками
        boardArr = makeEmptyBoard(24) // Создаем пустой массив размера x * x и заполняем null

        generateGameGrid(".grid-x", "line-x") // Генерируем игровую сетку
        generateGameGrid(".grid-y", "line-y")

        const board = document.querySelector('.board') // Снимаем блюр
        board.classList.remove('blur')

        cells = findCells() // Находим все элементы .cell внутри .board
        fillBoard(boardArr, cells) // Случайным образом заполняем игровое пространство клетками

        firstGeneration = false

    } else {
        boardArr = makeEmptyBoard(24) // Создаем пустой массив размера x * x и заполняем null
        cells = findCells() // Находим все элементы .cell внутри .board
        fillBoard(boardArr, cells) // Случайным образом заполняем игровое пространство клетками
    }
    handleCells(cells, boardArr)
}

function start() {
    const generate = document.getElementById('gen')
    generate.classList.add('disabled')

    const start = document.getElementById('st')
    start.classList.add('disabled')

    const next = document.getElementById('nxt')
    next.classList.remove('disabled')

    const stop = document.getElementById('sp')
    stop.classList.remove('disabled')

}

function stop() {
    const generate = document.getElementById('gen')
    generate.classList.remove('disabled')

    const start = document.getElementById('st')
    start.classList.remove('disabled')

    const next = document.getElementById('nxt')
    next.classList.add('disabled')

    const stop = document.getElementById('sp')
    stop.classList.add('disabled')
}