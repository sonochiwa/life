const {expect} = require('chai');

const countLivingNeighbors = require('../js/app.js');

describe('countLivingNeighbors', () => {
    it('должна возвращать 0, если вокруг нет живых соседей', () => {
        const board = [
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0]
        ];
        const result = countLivingNeighbors(board, 1, 1);
        expect(result).to.equal(0);
    });

    it('должна правильно считать живых соседей', () => {
        const board = [
            [1, 1, 0],
            [1, 0, 0],
            [0, 0, 1]
        ];
        const result = countLivingNeighbors(board, 1, 1);
        expect(result).to.equal(5);
    });

    it('не должна учитывать выход за границы доски', () => {
        const board = [
            [1, 0, 1],
            [0, 0, 0],
            [1, 0, 1]
        ];
        const result = countLivingNeighbors(board, 0, 0);
        expect(result).to.equal(3);
    });
});