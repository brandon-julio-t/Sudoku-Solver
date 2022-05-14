"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sudoku_solver_1 = __importDefault(require("../core/logics/sudoku-solver"));
module.exports = function (app) {
    let solver = new sudoku_solver_1.default();
    console.log({ solver });
    app.route("/api/check").post((req, res) => {
        const { puzzle } = req.body;
        const error = solver.validate(puzzle);
        if (error)
            return res.json({ error });
        console.log({ req, res });
    });
    app.route("/api/solve").post((req, res) => {
        console.log({ req, res });
    });
};
