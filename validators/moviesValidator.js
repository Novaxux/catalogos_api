import { body } from "express-validator";

export const createMovieRules = [
  body("title").isString().trim().notEmpty().withMessage("title is required"),
  body("genre").isString().trim().notEmpty().withMessage("genre is required"),
  body("release_year")
    .optional()
    .isInt({ min: 1800 })
    .withMessage("release_year must be a valid year"),
  body("image_url")
    .optional()
    .isURL()
    .withMessage("image_url must be a valid URL"),
];

export const updateMovieRules = [
  body("title").optional().isString().trim().notEmpty(),
  body("genre").optional().isString().trim().notEmpty(),
  body("release_year").optional().isInt({ min: 1800 }),
  body("image_url").optional().isURL(),
];
