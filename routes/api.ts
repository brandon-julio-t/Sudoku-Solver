"use strict";

import { Express } from "express";

import SudokuSolver from "../core/logics/sudoku-solver";

module.exports = function (app: Express) {
  let solver = new SudokuSolver();

  console.log({ solver });

  app.route("/api/check").post((req, res) => {
    const { puzzle, coordinate, value } = req.body;

    if (!puzzle || !coordinate || !value) {
      res.json({ error: "Required field(s) missing" });
      return;
    }

    const [rowStr, colStr] = coordinate.split("") as string[];
    const row = (rowStr?.charCodeAt(0) ?? 0) - "A".charCodeAt(0) + 1;
    const col = Number(colStr);
    if (coordinate.length !== 2 || isNaN(col) || row <= 0 || row > 9 || col <= 0 || col > 9) {
      res.json({ error: "Invalid coordinate" });
      return;
    }

    const v = Number(value);
    if (isNaN(v) || v > 9 || v < 1) {
      res.json({ error: "Invalid value" });
      return;
    }

    const error = solver.validate(puzzle);
    if (error) {
      res.json({ error });
      return;
    }

    const conflict = [
      !solver.checkRowPlacement(puzzle, row - 1, col - 1, v) && "row",
      !solver.checkColPlacement(puzzle, row - 1, col - 1, v) && "column",
      !solver.checkRegionPlacement(puzzle, row - 1, col - 1, v) && "region",
    ].filter((x) => x);

    if (conflict.length > 0) {
      res.json({ valid: false, conflict });
      return;
    }

    res.json({ valid: true });
  });

  app.route("/api/solve").post((req, res) => {
    const { puzzle } = req.body;

    if (!puzzle) {
      res.json({ error: "Required field missing" });
      return;
    }

    const error = solver.validate(puzzle);
    if (error) {
      res.json({ error });
      return;
    }

    try {
      const solution = solver.solve(puzzle);
      res.json({ solution });
    } catch (error) {
      const err = error as Error;
      res.json({ error: err.message });
    }
  });
};
