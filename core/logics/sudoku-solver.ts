export default class SudokuSolver {
  public validate(puzzleString: string): string {
    if (!puzzleString) return "Required field missing";

    if (puzzleString.split("").some((char: string) => !/[a-z0-9]/gi.test(char)))
      return "Invalid characters in puzzle";

    if (puzzleString.length !== 81)
      return "Expected puzzle to be 81 characters long";

    return "";
  }

  public checkRowPlacement(
    puzzleString: string,
    row: number,
    column: number,
    value: number
  ): any {
    //
  }

  public checkColPlacement(
    puzzleString: string,
    row: number,
    column: number,
    value: number
  ): any {
    //
  }

  public checkRegionPlacement(
    puzzleString: string,
    row: number,
    column: number,
    value: number
  ): any {
    //
  }

  public solve(puzzleString: string): any {
    //
  }
}
