import { body } from "express-validator";

export const createPlaceRules = [
  body("name").isString().trim().notEmpty().withMessage("name is required"),
  body("description").optional().isString(),
  body("visit_date")
    .optional()
    .isISO8601()
    .withMessage("visit_date must be a valid date (YYYY-MM-DD)"),
  body("image_url")
    .optional()
    .isURL()
    .withMessage("image_url must be a valid URL"),
];

export const updatePlaceRules = [
  body("name").optional().isString().trim().notEmpty(),
  body("description").optional().isString(),
  body("visit_date").optional().isISO8601(),
  body("image_url").optional().isURL(),
];
