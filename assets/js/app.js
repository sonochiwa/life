// Генерируем игровую сетку
const gridY = document.querySelector('.grid-y');
const gridX = document.querySelector('.grid-x');

for (let i = 0; i < 24; i++) {
    const lineY = document.createElement('div');
    lineY.classList.add('line-y');
    gridY.appendChild(lineY);

    const lineX = document.createElement('div');
    lineX.classList.add('line-x');
    gridX.appendChild(lineX);
}

// Заполняем игровое пространство пустыми клетками
const board = document.querySelector('.board');
for (let i = 0; i < 576; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    board.appendChild(cell);
}

// Создаем пустой массив 24x24
const boardArray = new Array(24).fill(null).map(() => new Array(24).fill(null));

// Заполняем массив случайными значениями true и null (в соотношении 1 к 10)
for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 24; j++) {
        const randomValue = Math.random() < 0.1 ? true : null;
        boardArray[i][j] = randomValue;
    }
}

// Находим все элементы .cell внутри .board
const cells = document.querySelectorAll('.board .cell');

// Применяем класс "living" к соответствующим элементам .cell на основе массива
for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 24; j++) {
        if (boardArray[i][j] === true) {
            cells[i * 24 + j].classList.add('living');
        }
    }
}