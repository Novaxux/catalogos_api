import { body } from "express-validator";

export const createBookRules = [
  body("title").isString().trim().notEmpty().withMessage("title is required"),
  body("author").optional().isString().trim(),
  body("genre").optional().isString().trim(),
  body("publication_year")
    .optional()
    .isInt({ min: 1000 })
    .withMessage("publication_year must be a valid year"),
  body("cover_url")
    .optional()
    .isURL()
    .withMessage("cover_url must be a valid URL"),
];

export const updateBookRules = [
  body("title").optional().isString().trim().notEmpty(),
  body("author").optional().isString().trim(),
  body("genre").optional().isString().trim(),
  body("publication_year").optional().isInt({ min: 1000 }),
  body("cover_url").optional().isURL(),
];
