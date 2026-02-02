const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const loginValidator = require('../middlewares/userValidator');
const validate = require('../middlewares/validate');
const { login, logout, getMe} = require('../controllers/authController');

router.post('/login', loginValidator, validate, login);
router.get('/logout', logout);

router.get("/me", authMiddleware, getMe);

module.exports = router;