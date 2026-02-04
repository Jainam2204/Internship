const { body } = require("express-validator");

module.exports = [
    body().custom((value, { req }) => {
        const { name, password } = req.body;

        if (!name && !password) {
            throw new Error("At least one field must be updated");
        }
        return true;
    }),

    body("name")
        .optional()
        .isLength({ min: 2, max: 12 })
        .withMessage("Name must be 2–12 characters")
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage("Name must contain only letters"),

    body("password")
        .optional()
        .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,14}$/)
        .withMessage(
            "Password must be 6–14 chars, 1 uppercase, 1 digit & 1 special char"
        ),
];
