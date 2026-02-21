const { body, param, validationResult } = require("express-validator");
const ApiError = require("../utils/ApiError");

/**
 * Run after validation chains — collects all errors and throws a single ApiError.
 */
const validate = (req, _res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((e) => e.msg);
    throw new ApiError(422, messages.join(". "));
  }
  next();
};

// ─── Auth ────────────────────────────────────────────────────────────────────
const loginRules = [
  body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

// ─── Projects ────────────────────────────────────────────────────────────────
const projectRules = [
  body("title")
    .trim()
    .notEmpty().withMessage("Title is required")
    .isLength({ max: 100 }).withMessage("Title cannot exceed 100 characters"),
  body("description")
    .trim()
    .notEmpty().withMessage("Description is required")
    .isLength({ max: 2000 }).withMessage("Description cannot exceed 2000 characters"),
  body("techStack")
    .isArray({ min: 1 }).withMessage("techStack must be a non-empty array"),
  body("liveUrl")
    .optional({ checkFalsy: true })
    .isURL().withMessage("liveUrl must be a valid URL"),
  body("githubUrl")
    .optional({ checkFalsy: true })
    .isURL().withMessage("githubUrl must be a valid URL"),
  body("featured")
    .optional()
    .isBoolean().withMessage("featured must be a boolean"),
];

const mongoIdParam = (paramName = "id") => [
  param(paramName).isMongoId().withMessage(`${paramName} must be a valid MongoDB ObjectId`),
];

// ─── Contact ─────────────────────────────────────────────────────────────────
const contactRules = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ max: 100 }).withMessage("Name cannot exceed 100 characters"),
  body("email")
    .isEmail().normalizeEmail().withMessage("Valid email is required"),
  body("message")
    .trim()
    .notEmpty().withMessage("Message is required")
    .isLength({ min: 10, max: 2000 })
    .withMessage("Message must be between 10 and 2000 characters"),
];

module.exports = {
  validate,
  loginRules,
  projectRules,
  mongoIdParam,
  contactRules,
};
