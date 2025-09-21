import express from "express";
import { validationResult } from "express-validator";
import {
  createMovieRules,
  updateMovieRules,
} from "../validators/moviesValidator.js";
import * as ctrl from "../controllers/moviesController.js";

const router = express.Router();

function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });
  next();
}

router.get("/", ctrl.getAllMovies);
router.get("/:id", ctrl.getMovieById);
router.post("/", createMovieRules, handleValidation, ctrl.createMovie);
router.put("/:id", updateMovieRules, handleValidation, ctrl.updateMovie);
router.delete("/:id", ctrl.deleteMovie);

export default router;
