const {
    getStudents,
    setStudents,
    getMarks,
    setMarks,
    // getStudentsLength
} = require('../utils/dataStorage');

const {
    createMarkObject,
    createStudentObject
} = require('../services/markServices');

const saveStudentDetails = (students, marks) => {
    try {
        setStudents(students);
        setMarks(marks);
    } catch (error) {
        console.error("Error : " + error);
    }
}

const getStudent = (id) => {
    try {
        const students = getStudents();
        const marks = getMarks();

        const student = students.find((student) => student.id === id);
        const mark = marks.find((mark) => mark.id === id);

        if (!student || !mark) {
            return null;
        }

        return JSON.stringify({
            student: student,
            mark: mark
        });
    } catch (error) {
        console.error("Error : " + error);
    }
}

const getRollNo = (rollNo, std) => {
    try {
        const students = getStudents();

        for (const student of students) {
            if (student.std === std && student.rollNo === rollNo) {
                return student;
            }
        }
        return null;
    } catch (error) {
        console.error("Error : " + error);
    }
}

const getStudentDetails = () => {
    try {
        const students = getStudents();
        const marks = getMarks();

        return JSON.stringify({
            student: students,
            mark: marks
        });
    } catch (error) {
        console.error("Error : " + error);
    }
}

const addStudentDetails = (req, res) => {
    try {
        const data = req.body;
        const students = getStudents();
        const marks = getMarks();

        let student = createStudentObject(data);
        let mark = createMarkObject(data);

        student.id = students.length + 1;
        mark.id = marks.length + 1;

        students.push(student);
        marks.push(mark);

        saveStudentDetails(students, marks);
        res.status(200).json({ message: "Student added successfully" });
    } catch (error) {
        console.error("Error : " + error);
    }
}
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
const updateStudentDetails = (req, res) => {
    try {
        const data = req.body;
        const id = Number(req.params.id);
        const students = getStudents();
        const marks = getMarks();

        let student = createStudentObject(data);
        let mark = createMarkObject(data);

        const index = students.findIndex((student) => student.id === id);

        if (index === -1) {
            res.status(404).json({ message: "Student not found" });

        }

        student.id = id;
        mark.id = id;
        students[index] = student;
        marks[index] = mark;

        saveStudentDetails(students, marks);
        res.status(200).json({ message: "Student updated successfully" });
    } catch (error) {
        console.error("Error : " + error);
    }
}

const deleteStudentDetails = (id) => {
    try {
        const students = getStudents();
        const marks = getMarks();

        const student = students.find((student) => student.id === id);

        if (!student) {
            return false;
        }

        student.status = false;
        saveStudentDetails(students, marks);
        return true;
    } catch (error) {
        console.error("Error : " + error);
    }
}

module.exports = {
    getStudent,
    getRollNo,
    getStudentDetails,
    addStudentDetails,
    updateStudentDetails,
    deleteStudentDetails
};