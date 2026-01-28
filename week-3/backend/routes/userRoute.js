const express = require("express");
const router = express.Router();
const { addUser } = require("../controllers/userController");
const auth = require("../middlewares/authMiddleware");
const admin = require("../middlewares/adminMiddleware");

router.post("/add-user", auth, admin, addUser);

module.exports = router;