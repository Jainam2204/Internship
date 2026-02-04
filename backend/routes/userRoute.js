const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const { 
    addUserDetails,
    getUserDetails,
    updateUserDetails,
    changeUserStatus,
    getUser,
    checkEmail
} = require('../controllers/userController');

const validate = require('../middlewares/validate');
const userValidator = require('../middlewares/userValidator');

router.get('/', authMiddleware, adminMiddleware, getUserDetails);

router.post('/email-check', authMiddleware, adminMiddleware, checkEmail);

router.get('/:id', authMiddleware, adminMiddleware, getUser);

router.put('/update-user/:id', userValidator, validate, authMiddleware, adminMiddleware, updateUserDetails);

router.put('/change-user-status/:id', authMiddleware, adminMiddleware, changeUserStatus);


module.exports = router;