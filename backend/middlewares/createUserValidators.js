const { body } = require("express-validator");

module.exports = [
    body("name")
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 2, max: 12 })
        .withMessage("Name must be 2–12 characters")
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage("Name must contain only letters"),

    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,14}$/)
        .withMessage(
            "Password must be 6–14 chars, 1 uppercase, 1 digit & 1 special char"
        ),
];
