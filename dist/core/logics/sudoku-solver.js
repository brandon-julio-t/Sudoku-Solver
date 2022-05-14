"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SudokuSolver {
    validate(puzzleString) {
        if (!puzzleString)
            return "Required field missing";
        if (puzzleString.split("").some(char => !/[1-9\.]/gi.test(char)))
            return "Invalid characters in puzzle";
        if (puzzleString.length !== 81)
            return "Expected puzzle to be 81 characters long";
        return "";
    }
    checkRowPlacement(puzzleString, row, column, value) {
        console.log({ puzzleString, row, column, value });
    }
    checkColPlacement(puzzleString, row, column, value) {
        console.log({ puzzleString, row, column, value });
    }
    checkRegionPlacement(puzzleString, row, column, value) {
        console.log({ puzzleString, row, column, value });
    }
    solve(puzzleString) {
        console.log({ puzzleString });
    }
}
exports.default = SudokuSolver;
