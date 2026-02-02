const { LocalStorage } = require("node-localstorage");
const localStorage = new LocalStorage("./models");

const getStudents = () => {
    try {
        return JSON.parse(localStorage.getItem("students")) || [];
    } catch (error) {
        console.error("Error : " + error);
    }
}
const setStudents = (students) => {
    try {
        localStorage.setItem("students", JSON.stringify(students));
    } catch (error) {
        console.error("Error : " + error);
    }
}

const getMarks = () => {
    try {
        return JSON.parse(localStorage.getItem("marks")) || [];
    } catch (error) {
        console.error("Error : " + error);
    }
}
const setMarks = (marks) => {
    try {
        localStorage.setItem("marks", JSON.stringify(marks));
    } catch (error) {
        console.error("Error : " + error);
    }
}

const getUsers = () => {
    try {
        return JSON.parse(localStorage.getItem("users")) || [];
    } catch (error) {
        console.error("Error : " + error);
    }
}
const setUsers = (users) => {
    try {
        localStorage.setItem("students", JSON.stringify(users));
    } catch (error) {
        console.error("Error : " + error);
    }
}

const getStudentsLength = () => {
    try {
        const len = JSON.parse(localStorage.getItem("students")) || [];
        return len.length;
    } catch (error) {
        console.error("Error : " + error);
    }
}

const getUsersLength = () => {
    try {
        const len = JSON.parse(localStorage.getItem("users")) || [];
        return len.length;
    } catch (error) {
        console.error("Error : " + error);
    }
}

module.exports = {
    getStudents,
    setStudents,
    getMarks,
    setMarks,
    getUsers,
    setUsers,
    getStudentsLength,
    getUsersLength
};