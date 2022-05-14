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
  });
});
