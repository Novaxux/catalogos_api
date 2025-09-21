import { body } from "express-validator";

export const createSongRules = [
  body("title").isString().trim().notEmpty().withMessage("title is required"),
  body("artist").optional().isString().trim(),
  body("genre").optional().isString().trim(),
  body("duration_seconds")
    .optional()
    .isInt({ min: 0 })
    .withMessage("duration_seconds must be an integer"),
  body("cover_url")
    .optional()
    .isURL()
    .withMessage("cover_url must be a valid URL"),
];

export const updateSongRules = [
  body("title").optional().isString().trim().notEmpty(),
  body("artist").optional().isString().trim(),
  body("genre").optional().isString().trim(),
  body("duration_seconds").optional().isInt({ min: 0 }),
  body("cover_url").optional().isURL(),
];
