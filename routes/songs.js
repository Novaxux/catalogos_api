import express from "express";
import { validationResult } from "express-validator";
import {
  createSongRules,
  updateSongRules,
} from "../validators/songsValidator.js";
import * as ctrl from "../controllers/songsController.js";

const router = express.Router();

function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });
  next();
}

router.get("/", ctrl.getAllSongs);
router.get("/:id", ctrl.getSongById);
router.post("/", createSongRules, handleValidation, ctrl.createSong);
router.put("/:id", updateSongRules, handleValidation, ctrl.updateSong);
router.delete("/:id", ctrl.deleteSong);

export default router;
