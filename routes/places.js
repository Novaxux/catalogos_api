import express from "express";
import { validationResult } from "express-validator";
import {
  createPlaceRules,
  updatePlaceRules,
} from "../validators/placesValidator.js";
import * as ctrl from "../controllers/placesController.js";

const router = express.Router();

function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });
  next();
}

router.get("/", ctrl.getAllPlaces);
router.get("/:id", ctrl.getPlaceById);
router.post("/", createPlaceRules, handleValidation, ctrl.createPlace);
router.put("/:id", updatePlaceRules, handleValidation, ctrl.updatePlace);
router.delete("/:id", ctrl.deletePlace);

export default router;
