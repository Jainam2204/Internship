const express = require('express');
const router = express.Router();


const {studentAllowedFields} = require('../config/allowedFieldsArray');
const allowedFields = require('../middlewares/allowedFields');
const authMiddleware = require('../middlewares/authMiddleware');
const { getStudent, getRollNo, getStudentDetails, addStudentDetails, updateStudentDetails, deleteStudentDetails } = require('../controllers/studentController');

const validate = require('../middlewares/validate');
const studentValidator = require('../middlewares/studentValidator');

router.get('/', authMiddleware, getStudentDetails);

router.get('/:id', authMiddleware, getStudent);

router.get('/:rollNo/:std', authMiddleware, getRollNo);

router.post('/add-student', allowedFields(studentAllowedFields), studentValidator, validate, authMiddleware, addStudentDetails);

router.put('/update-student/:id', studentValidator, validate, authMiddleware, updateStudentDetails);

router.delete('/delete-student/:id', authMiddleware, deleteStudentDetails);

module.exports = router;