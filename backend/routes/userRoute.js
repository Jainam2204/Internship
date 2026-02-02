const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const { addUser, getUser} = require('../controllers/userController');
const userValidator = require('../middlewares/userValidator');
const validate = require('../middlewares/validate');


router.get('/', authMiddleware, adminMiddleware, getUser);
router.post('/add-user', userValidator, validate, authMiddleware, adminMiddleware, addUser);

module.exports = router;