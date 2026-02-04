const {
    getStudents,
    setStudents,
    getMarks,
    setMarks,
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
        console.error("Error in saveStudentDetails : " + error);
    }
}

const getStudent = (req, res) => {
    try {
        const id = Number(req.params.id);
        const students = getStudents();
        const marks = getMarks();

        const student = students.find((student) => student.id === id);
        const mark = marks.find((mark) => mark.id === id);

        if (!student || !mark) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        return res.status(200).json({
            success: true,
            body: { student: student, mark: mark }
        });
    } catch (error) {
        console.error("Error in getStudent : " + error);
        res.status(404).json({
            success: false,
            message: "Error occured in getStudent"
        });
    }
}

const getRollNo = (req, res) => {
    try {
        const rollNo = req.params.rollNo;
        const std = req.params.std;
        const students = getStudents();

        for (const student of students) {
            if (student.std === std && student.rollNo === rollNo) {
                return res.status(400).json({
                    success: false,
                    message: "Student exists with same rollNo and class"
                });
            }
        }
        return res.status(400).json({
            success: true,
            message: "You can add student"
        });
    } catch (error) {
        console.error("Error in getRollNo : " + error);
        res.status(404).json({
            success: false,
            message: "Error occured in getRollNo"
        });
    }
}

const getStudentDetails = (req, res) => {
    try {
        const students = getStudents();
        const marks = getMarks();

        if (!students || !marks) {
            return res.status(404).json({
                success: false,
                body: null
            })
        }

        return res.status(200).json({
            success: true,
            body: { student: students, mark: marks }
        });
    } catch (error) {
        console.error("Error in getStudentDetails : " + error);
        res.status(404).json({
            success: false,
            message: "Error occured in getStudentDetails"
        });
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
        return res.status(200).json({ 
            success: true,
            message: "Student added successfully" });
    } catch (error) {
        console.error("Error in addStudentDetails : " + error);
        res.status(404).json({
            success: false,
            message: "Error occured in addStudentDetails"
        });
    }
}

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
            res.status(404).json({
                success: false,
                message: "Student not found"
            });

        }

        student.id = id;
        mark.id = id;
        students[index] = student;
        marks[index] = mark;

        saveStudentDetails(students, marks);
        return res.status(200).json({
            success: true,
            message: "Student updated successfully"
        });
    } catch (error) {
        console.error("Error in updateStudentDetails : " + error);
        res.status(404).json({
            success: false,
            message: "Error occured in updateStudentDetails"
        });
    }
}

const deleteStudentDetails = (req, res) => {
    try {
        const id = Number(req.params.id);;
        const students = getStudents();
        const marks = getMarks();

        const student = students.find((student) => student.id === id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        student.status = false;
        saveStudentDetails(students, marks);
        return res.status(200).json({
            success: true,
            message: "Student deleted Successfully"
        });
    } catch (error) {
        console.error("Error in deleteStudentDetails : " + error);
        res.status(404).json({
            success: false,
            message: "Error occured in deleteStudentDetails"
        });
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