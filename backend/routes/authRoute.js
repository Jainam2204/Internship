const express = require('express');
const router = express.Router();

const {loginAllowedFields, userAllowedFields} = require('../config/allowedFieldsArray');
const allowedFields = require('../middlewares/allowedFields');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');
const loginValidator = require('../middlewares/loginValidator');
const { login, register, logout, getMe, refreshToken} = require('../controllers/authController');


router.post('/login', allowedFields(loginAllowedFields), loginValidator, validate, login);

router.post('/register', allowedFields(userAllowedFields), loginValidator, validate, register);

router.post('/refresh-token', refreshToken);

router.get('/logout', logout);

router.get('/me', authMiddleware, getMe);

module.exports = router;