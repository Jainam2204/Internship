const API_URL = CONFIG.API_URL;


let users = JSON.parse(localStorage.getItem("users")) || [];
let userId = JSON.parse(localStorage.getItem("userId")) || 1;

const userForm = document.getElementById("userForm");
const usersData = document.getElementById("usersData");
const showUsersTable = document.getElementById("showUsersTable");
const totalUsers = document.getElementById("totalUsers");
const editUserIndex = document.getElementById("editUserIndex");
const emailInput = document.getElementById("email");

const errBox = document.getElementById("err");

(async () => {
    try {
        const res = await fetch(`${API_URL}/users`, {
            credentials: "include",
        });

        if (res.status === 401) {
            globalThis.location.href = "login.html";
        }
    } catch (err) {
        console.error("Auth check failed", err);
        globalThis.location.href = "login.html";
    }
})();

// stores email from the cookie to apply filter and if there is no email key in cookie then it will store null
const email = getCookie("email");



// display all users
const displayUsers = () => {
    try {
        if (!users.length) {
            showUsersTable.style.display = "none";
            totalUsers.innerHTML = "Add Users";
            return;
        }

        totalUsers.innerHTML = `Total users : ${users.length}`;
        showUsersTable.style.display = "table";
        usersData.innerHTML = "";

        users.forEach((user, i) => {
            usersData.innerHTML += createUserRow(user, i);
        });

    } catch (err) {
        console.error("Error : " + err);
        handleError("Error in displayUsers method " + err);
    }
}
// assigns form's values to existing values that can be further edited and made email field disabled so it can not be modified
const editUser = (index) => {
    try {
        editUserIndex.value = index;

        document.getElementById("userName").value = users[index].name;
        document.getElementById("password").value = users[index].password;
        emailInput.value = users[index].email;

        emailInput.disabled = true;
    } catch (err) {
        console.error("Error : " + err);
        handleError("Error in editUser method " + err);
    }
}

const changeUserStatus = (index) => {
    try {
        users[index].status = users[index].status
            ? false
            : true;

        localStorage.setItem("users", JSON.stringify(users));
        displayUsers();
    } catch (err) {
        console.error("Error : " + err);
        handleError("Error in changeUserStatus method " + err);
    }
}

// creates rows for table that shows user's data 
const createUserRow = (user, i) => {
    try {
        let statusBtn = user.status
            ? `<button onclick="changeUserStatus(${i})">Inactive</button>`
            : `<button onclick="changeUserStatus(${i})">Active</button>`;


        return `
        <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.status ? "Active" : "Inactive"}</td>
        <td><button onclick="editUser(${i})">Edit</button></td>
        <td>${statusBtn}</td>
        </tr>`;
    } catch (err) {
        console.error("Error : " + err);
        handleError("Error in createUserRaw method " + err);
    }
}

const addUser = async (e) => {
    try {

        e.preventDefault();

        const name = document.getElementById("userName").value.trim();
        const password = document.getElementById("password").value.trim();
        const email = emailInput.value.trim();

        if (!name || !password || !email) {
            errBox.innerHTML = "Please fill all fields correctly!";
            return;
        }

        const namePattern = /^[a-zA-Z\s]+$/;

        if (!namePattern.test(name)) {
            document.getElementById('namePatternUser').innerHTML = "Name only contains letters and space!";
            return;
        }

        errBox.innerHTML = "";

        const editIndex = editUserIndex.value;

        if (!editIndex) {
            for (const user of users) {
                if (email === user.email) {
                    document.getElementById('emailMatch').innerHTML = "Email already exists";
                    return;
                }
            }
        }

        const id = editIndex === "" ? userId : users[editIndex].id;

        const user = { id, name, password, email, status: true };

        if (editIndex === "") {
            users.push(user);
            userId++;
        } else {
            users[editIndex] = user;

            editUserIndex.value = "";
            emailInput.disabled = false;
        }

        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("userId", JSON.stringify(userId));

        document.getElementById('emailMatch').innerHTML = ''
        userForm.reset();
        displayUsers();
    } catch (err) {
        console.error("Error : " + err);
        handleError("Error in userFormEventHandler method " + err);
    }
};

userForm.addEventListener("submit", addUser);


window.onload = () => {
    try {
        userForm.reset();
        displayUsers();
    } catch (err) {
        console.error("Error : " + err);
        handleError("Error in window.onload method " + err);
    }
};
