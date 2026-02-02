const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');
const studentValidator = require('../middlewares/studentValidator');
const { getStudent, getRollNo, getStudentDetails, addStudentDetails, updateStudentDetails, deleteStudentDetails } = require('../controllers/studentController');

router.get('/', authMiddleware, (req, res) => {
    try {
        const studentsData = getStudentDetails();
        res.status(200).send(studentsData);
    } catch (error) {
        console.error("Error : " + error);
    }
});

router.get('/:id', authMiddleware, (req, res) => {
    try {
        const id = Number(req.params.id);
        const studentsData = getStudent(id);
        res.status(200).send(studentsData);
    } catch (error) {
        console.error("Error : " + error);
    }
});

router.get('/:rollNo/:std', authMiddleware, (req, res) => {
    try {
        const rollNo = req.params.rollNo;
        const std = req.params.std;
        const result = getRollNo(rollNo, std);
        if(result){
           return res.status(400).send(result);
        }
        res.status(200).send(result);
    } catch (error) {
        console.error("Error : " + error);
    }
});

// router.post('/add-student', authMiddleware, (req, res) => {
//     try {
//         const data = req.body;
//         const student = data.student;
//         const mark = data.mark;

//         const response = addStudentDetails(student, mark);
//         if (!response) {
//             res.status(404).json({ message: "Student is not added" });
//         }
//         res.status(200).json({ message: "Student added Successfully" });
//     } catch (error) {
//         console.error("Error : " + error);
//     }
// });

router.post('/add-student', studentValidator, validate, authMiddleware, addStudentDetails);

router.put('/update-student/:id', authMiddleware, updateStudentDetails);
// router.put('/update-student/:id', authMiddleware, (req, res) => {
//     try {
//         const data = req.body;
//         const student = data.student;
//         const mark = data.mark;
//         const id = Number(req.params.id);
//         const response = updateStudentDetails(id, student, mark);
//         if (!response) {
//             res.status(404).json({ message: "Student not found" });
//         }
//         res.status(200).json({ message: "Student updated Successfully" });
//     } catch (error) {
//         console.error("Error : " + error);
//     }
// });

router.delete('/delete-student/:id', authMiddleware, (req, res) => {
    try {
        const id = Number(req.params.id);;
        const response = deleteStudentDetails(id);
        if (!response) {
            res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json({ message: "Student deleted Successfully" });
    } catch (error) {
        console.error("Error : " + error);
    }
});

module.exports = router;