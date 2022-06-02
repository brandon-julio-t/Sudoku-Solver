const chai = require("chai");
const assert = chai.assert;

const SudokuSolver = require("../dist/core/logics/sudoku-solver.js").default;
const solver = new SudokuSolver();

suite("UnitTests", () => {
  suite("validate", () => {
    test("Logic handles a valid puzzle string of 81 characters", () => {
      const puzzle =
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      assert.strictEqual(solver.validate(puzzle), "");
    });

    test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", () => {
      const puzzle =
        "z.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      assert.strictEqual(
        solver.validate(puzzle),
        "Invalid characters in puzzle"
      );
    });

    test("Logic handles a puzzle string that is not 81 characters in length", () => {
      const puzzle = "1";
      assert.strictEqual(
        solver.validate(puzzle),
        "Expected puzzle to be 81 characters long"
      );
    });

    const puzzleString =
      "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";

    test("Logic handles a valid row placement", () => {
      assert.isTrue(solver.checkRowPlacement(puzzleString, 0, 0, "7"));
    });

    test("Logic handles an invalid row placement", () => {
      assert.isFalse(solver.checkRowPlacement(puzzleString, 0, 0, "9"));
    });

    test("Logic handles a valid column placement", () => {
      assert.isTrue(solver.checkRowPlacement(puzzleString, 0, 0, "7"));
    });

    test("Logic handles an invalid column placement", () => {
      assert.isFalse(solver.checkRowPlacement(puzzleString, 0, 0, "9"));
    });

    test("Logic handles a valid region (3x3 grid) placement", () => {
      assert.isTrue(solver.checkRowPlacement(puzzleString, 0, 0, "7"));
    });

    test("Logic handles an invalid region (3x3 grid) placement", () => {
      assert.isFalse(solver.checkRowPlacement(puzzleString, 0, 0, "9"));
    });

    test("Valid puzzle strings pass the solver", () => {
      const board = [
        ["5", "3", ".", ".", "7", ".", ".", ".", "."],
        ["6", ".", ".", "1", "9", "5", ".", ".", "."],
        [".", "9", "8", ".", ".", ".", ".", "6", "."],
        ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
        ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
        ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
        [".", "6", ".", ".", ".", ".", "2", "8", "."],
        [".", ".", ".", "4", "1", "9", ".", ".", "5"],
        [".", ".", ".", ".", "8", ".", ".", "7", "9"],
      ];

      const answer = [
        ["5", "3", "4", "6", "7", "8", "9", "1", "2"],
        ["6", "7", "2", "1", "9", "5", "3", "4", "8"],
        ["1", "9", "8", "3", "4", "2", "5", "6", "7"],
        ["8", "5", "9", "7", "6", "1", "4", "2", "3"],
        ["4", "2", "6", "8", "5", "3", "7", "9", "1"],
        ["7", "1", "3", "9", "2", "4", "8", "5", "6"],
        ["9", "6", "1", "5", "3", "7", "2", "8", "4"],
        ["2", "8", "7", "4", "1", "9", "6", "3", "5"],
        ["3", "4", "5", "2", "8", "6", "1", "7", "9"],
      ];

      const puzzleString = board.map((row) => row.join("")).join("");
      const answerString = answer.map((row) => row.join("")).join("");

      assert.deepStrictEqual(answerString, solver.solve(puzzleString));
    });

    test("Invalid puzzle strings fail the solver", () => {
      assert.throws(() =>
        solver.solve(
          "9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
        )
      );
    });

    test("Solver returns the expected solution for an incomplete puzzle", () => {
      const board = [
        ["5", "3", ".", ".", "7", ".", ".", ".", "."],
        ["6", ".", ".", "1", "9", "5", ".", ".", "."],
        [".", "9", "8", ".", ".", ".", ".", "6", "."],
        ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
        ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
        ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
        [".", "6", ".", ".", ".", ".", "2", "8", "."],
        [".", ".", ".", "4", "1", "9", ".", ".", "5"],
        [".", ".", ".", ".", "8", ".", ".", "7", "9"],
      ];

      const answer = [
        ["5", "3", "4", "6", "7", "8", "9", "1", "2"],
        ["6", "7", "2", "1", "9", "5", "3", "4", "8"],
        ["1", "9", "8", "3", "4", "2", "5", "6", "7"],
        ["8", "5", "9", "7", "6", "1", "4", "2", "3"],
        ["4", "2", "6", "8", "5", "3", "7", "9", "1"],
        ["7", "1", "3", "9", "2", "4", "8", "5", "6"],
        ["9", "6", "1", "5", "3", "7", "2", "8", "4"],
        ["2", "8", "7", "4", "1", "9", "6", "3", "5"],
        ["3", "4", "5", "2", "8", "6", "1", "7", "9"],
      ];

      const puzzleString = board.map((row) => row.join("")).join("");
      const answerString = answer.map((row) => row.join("")).join("");

      assert.deepStrictEqual(answerString, solver.solve(puzzleString));
    });
  });
});
