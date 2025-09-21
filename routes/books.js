import express from "express";
import { validationResult } from "express-validator";
import {
  createBookRules,
  updateBookRules,
} from "../validators/booksValidator.js";
import * as ctrl from "../controllers/booksController.js";

const router = express.Router();

function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });
  next();
}

router.get("/", ctrl.getAllBooks);
router.get("/:id", ctrl.getBookById);
router.post("/", createBookRules, handleValidation, ctrl.createBook);
router.put("/:id", updateBookRules, handleValidation, ctrl.updateBook);
router.delete("/:id", ctrl.deleteBook);

export default router;
