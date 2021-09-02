module.exports = function solveSudoku(matrix) {
  const matixSize = 9;
  const matrixBoxSize = 3;

  const matrixFind = (matrix) => {
    for (let row = 0; row < matixSize; row++) {
      for (let column = 0; column < matixSize; column++) {
        if (matrix[row][column] === 0) {
          return [row, column];
        }
      }
    }
    return null;
  };

  const validationBox = (number, position, matrix) => {
    const [row, column] = position;

    for (let i = 0; i < matixSize; i++) {
      if (matrix[i][column] === number && i !== row) {
        return false;
      }
    }

    for (let i = 0; i < matixSize; i++) {
      if (matrix[row][i] === number && i !== column) {
        return false;
      }
    }

    const matrixBoxRow = Math.floor(row / matrixBoxSize) * matrixBoxSize;
    const matrixBoxColumn = Math.floor(column / matrixBoxSize) * matrixBoxSize;

    for (let i = matrixBoxRow; i < matrixBoxRow + matrixBoxSize; i++) {
      for (let j = matrixBoxColumn; j < matrixBoxColumn + matrixBoxSize; j++) {
        if (matrix[i][j] === number && i !== row && j !== column) {
          return false;
        }
      }
    }

    return true;
  };

  const sudokuSolve = () => {
    const currentPosition = matrixFind(matrix);
    if (currentPosition === null) {
      return true;
    }
    for (let i = 1; i < matixSize + 1; i++) {
      const currentNumber = i;
      const validBox = validationBox(currentNumber, currentPosition, matrix);
      if (validBox) {
        const [x, y] = currentPosition;
        matrix[x][y] = currentNumber;

        if (sudokuSolve()) {
          return true;
        }

        matrix[x][y] = 0;
      }
    }

    return false;
  };

  sudokuSolve();
  return matrix;
};
