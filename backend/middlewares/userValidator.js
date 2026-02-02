const { body } = require("express-validator");

const userValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 12 })
    .withMessage("Name must be between 2 and 12 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6, max: 14 })
    .withMessage("Password must be between 6 and 14 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one digit")
    .matches(/[@$!%*?&]/)
    .withMessage("Password must contain at least one special character (@$!%*?&)"),
];

module.exports = userValidator;
