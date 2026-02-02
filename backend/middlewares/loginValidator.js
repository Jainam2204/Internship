const { body } = require("express-validator");

const loginValidator = [

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
];

module.exports = loginValidator;
