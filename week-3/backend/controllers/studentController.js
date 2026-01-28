// const express = require('express');

const { LocalStorage } = require("node-localstorage");
const localStorage = new LocalStorage("./models");
let students = JSON.parse(localStorage.getItem("students")) || [];
let marks = JSON.parse(localStorage.getItem("marks")) || [];

const saveStudentDetails = () => {
    try {
        localStorage.setItem("students", JSON.stringify(students));
        localStorage.setItem("marks", JSON.stringify(marks));
    } catch (error) {
        console.error("Error : " + error);
    }
}

const getStudent = (id) => {
    try {
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
        for (const student of students) {
            if (student.std === std && student.rollNo === rollNo) {
                console.log(student);
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
        return {
            student: students,
            mark: marks
        };
    } catch (error) {
        console.error("Error : " + error);
    }
}

const addStudentDetails = (student, mark) => {
    try {
        student.id = students.length + 1;
        mark.id = marks.length + 1;
        students.push(student);
        marks.push(mark);
        saveStudentDetails();
        return true;
    } catch (error) {
        console.error("Error : " + error);
    }
}

const updateStudentDetails = (id, student, mark) => {
    try {
        const index = students.findIndex((student) => student.id === id);

        if (index === -1) {
            return false;
        }

        student.id = id;
        mark.id = id;
        students[index] = student;
        marks[index] = mark;

        saveStudentDetails();
        return true;
    } catch (error) {
        console.error("Error : " + error);
    }
}

const deleteStudentDetails = (id) => {
    try {
        const student = students.find((student) => student.id === id);

        if (!student) {
            return false;
        }

        student.status = false;
        saveStudentDetails();
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