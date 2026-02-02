const { body } = require("express-validator");

const studentValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 12 })
    .withMessage("Name must be between 2 and 12 characters"),

  body("rollNo")
    .notEmpty()
    .withMessage("Roll number is required")
    .isNumeric()
    .withMessage("Roll number must be a number")
    .isInt({ min: 1, max: 100 })
    .withMessage("Subject 1 marks must be between 1 and 100"),

  body("std")
    .notEmpty()
    .withMessage("Standard is required")
    .isInt({ min: 1, max: 12 })
    .withMessage("Standard must be between 1 and 12"),

  body("sub1")
    .notEmpty()
    .withMessage("Subject 1 marks are required")
    .isNumeric()
    .withMessage("Subject 1 must be a number")
    .isInt({ min: 1, max: 100 })
    .withMessage("Subject 1 marks must be between 1 and 100"),

  body("sub2")
    .notEmpty()
    .withMessage("Subject 2 marks are required")
    .isNumeric()
    .withMessage("Subject 2 must be a number")
    .isInt({ min: 1, max: 100 })
    .withMessage("Subject 2 marks must be between 1 and 100"),

  body("sub3")
    .notEmpty()
    .withMessage("Subject 3 marks are required")
    .isNumeric()
    .withMessage("Subject 3 must be a number")
    .isInt({ min: 1, max: 100 })
    .withMessage("Subject 3 marks must be between 1 and 100"),
];

module.exports = studentValidator;
