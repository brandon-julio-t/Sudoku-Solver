export default class SudokuSolver {
  public validate(puzzleString: string): string {
    if (!puzzleString) return "Required field missing";

    if (puzzleString.split("").some((char) => !/[1-9\.]/gi.test(char)))
      return "Invalid characters in puzzle";

    if (puzzleString.length !== 81)
      return "Expected puzzle to be 81 characters long";

    return "";
  }

  public checkRowPlacement(
    puzzleString: string,
    startRow: number,
    startColumn: number,
    value: number
  ): any {
    const board = this.puzzleStringTo2DArray(puzzleString);

    const existingNumbers = [] as number[];
    for (let col = 0; col < 9; col++) {
      if (col === startColumn) {
        continue;
      }

      existingNumbers.push(Number(board[startRow]?.[col]));
    }

    return !existingNumbers.includes(Number(value));
  }

  public checkColPlacement(
    puzzleString: string,
    startRow: number,
    startColumn: number,
    value: number
  ): any {
    const board = this.puzzleStringTo2DArray(puzzleString);

    const existingNumbers = [] as number[];
    for (let row = 0; row < 9; row++) {
      if (row === startRow) {
        continue;
      }

      existingNumbers.push(Number(board[row]?.[startColumn]));
    }

    return !existingNumbers.includes(Number(value));
  }

  public checkRegionPlacement(
    puzzleString: string,
    startRow: number,
    startColumn: number,
    value: number
  ): any {
    const board = this.puzzleStringTo2DArray(puzzleString);

    const regionRow = startRow % 3;
    const regionCol = startColumn % 3;

    let offsetRowStart = 0;
    let offsetColStart = 0;

    if (regionRow === 1) {
      offsetRowStart = 3;
    } else if (regionRow === 2) {
      offsetRowStart = 6;
    }

    if (regionCol === 1) {
      offsetColStart = 3;
    } else if (regionCol === 2) {
      offsetColStart = 6;
    }

    const existingNumbers = [] as number[];
    for (let offsetRow = offsetRowStart; offsetRow < 3; offsetRow++) {
      for (let offsetCol = offsetColStart; offsetCol < 3; offsetCol++) {
        const row = startRow + offsetRow;
        const col = startColumn + offsetCol;
        existingNumbers.push(Number(board[row]?.[col]));
      }
    }

    return !existingNumbers.includes(Number(value));
  }

  public solve(puzzleString: string): any {
    const board = this.puzzleStringTo2DArray(puzzleString);

    if (!isValidSudoku(board)) {
      throw new Error("Puzzle cannot be solved");
    }

    const answer = solveSudoku(board);
    return answer.map((row) => row.join("")).join("");
  }

  private puzzleStringTo2DArray(puzzleString: string): string[][] {
    const board = [] as string[][];

    let i = 0;
    for (let row = 0; row < 9; row++) {
      const numbersInRow = [] as string[];

      for (let col = 0; col < 9; col++) {
        numbersInRow.push(puzzleString.charAt(i++));
      }

      board.push(numbersInRow);
    }

    return board;
  }
}

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function (board: string[][]) {
  const canChange = board.map((row) => row.map((x) => x === "."));
  _solveSudoku(board, canChange, 0, 0);
  return board;
};

function _solveSudoku(
  board: string[][],
  canChange: boolean[][],
  row: number,
  col: number
): boolean {
  if (row >= 9) {
    return isValidSudoku(board);
  }

  let nextRow = row;
  let nextCol = col;

  nextCol++;
  if (nextCol >= 9) {
    nextRow++;
    nextCol = 0;
  }

  if (!canChange[row]?.[col]) {
    return _solveSudoku(board, canChange, nextRow, nextCol);
  }

  for (let number = 1; number <= 9; number++) {
    // @ts-ignore
    board[row][col] = `${number}`;

    if (
      isValidSudoku(board) &&
      _solveSudoku(board, canChange, nextRow, nextCol)
    ) {
      return true;
    }
  }

  // @ts-ignore
  board[row][col] = ".";
  return false;
}

/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board: string[][]) {
  const rowLen = 9;
  const colLen = 9;

  // check row
  for (let row = 0; row < rowLen; row++) {
    for (let col = 0; col < colLen; col++) {
      const num = board[row]?.[col];

      if (num === ".") {
        continue;
      }

      for (let curr = 0; curr < colLen; curr++) {
        if (curr === col) {
          continue;
        }

        const currN = board[row]?.[curr];

        if (num === currN) {
          return false;
        }
      }
    }
  }

  // check col
  for (let row = 0; row < rowLen; row++) {
    for (let col = 0; col < colLen; col++) {
      const num = board[row]?.[col];

      if (num === ".") {
        continue;
      }

      for (let curr = 0; curr < rowLen; curr++) {
        if (curr === row) {
          continue;
        }

        const currN = board[curr]?.[col];

        if (num === currN) {
          return false;
        }
      }
    }
  }

  // check matrix
  for (let row = 0; row < rowLen; row += 3) {
    for (let col = 0; col < colLen; col += 3) {
      const matrixSize = 3;
      const numbers = [] as string[];

      for (let mRow = 0; mRow < matrixSize; mRow++) {
        for (let mCol = 0; mCol < matrixSize; mCol++) {
          const _row = row + mRow;
          const _col = col + mCol;

          const value = board[_row]?.[_col];

          if (!value || value === ".") {
            continue;
          }

          if (numbers.includes(value)) {
            return false;
          }

          numbers.push(value);
        }
      }
    }
  }

  return true;
};
