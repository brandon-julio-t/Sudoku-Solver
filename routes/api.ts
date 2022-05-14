"use strict";

import { Express } from "express";

import SudokuSolver from "../core/logics/sudoku-solver";

module.exports = function (app: Express) {
  let solver = new SudokuSolver();

  console.log({ solver });

  app.route("/api/check").post((req, res) => {
    const { puzzle } = req.body;

    const error = solver.validate(puzzle);
    if (error) res.json({ error });

    console.log({ req, res });
  });

  app.route("/api/solve").post((req, res) => {
    console.log({ req, res });
  });
};
