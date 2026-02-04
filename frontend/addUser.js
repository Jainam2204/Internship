const API_URL = CONFIG.API_URL;

const userForm = document.getElementById("userForm");
const usersData = document.getElementById("usersData");
const showUsersTable = document.getElementById("showUsersTable");
const totalUsers = document.getElementById("totalUsers");
const editUserIndex = document.getElementById("editUserIndex");
const emailInput = document.getElementById("email");
const formTitle = document.getElementById("formTitle");
const errBox = document.getElementById("err");

let role = null;
const getUserRole = async () => {
    try {
        const res = await fetch(`${API_URL}/auth/me`, {
            credentials: "include",
        });
        const response = await res.json();

        if (!response.success) {
            alert(response.message);
            globalThis.location.href = "login.html";
            return;
        }

        role = response.role;
        displayUsers();

    } catch (error) {
        console.error("Role fetch error:", error);
        globalThis.location.href = "login.html";
    }
};


const displayUsers = async () => {
    try {
        if (role !== "admin") {
            alert("Admin access only");
            return;
        }
        const res = await fetch(`${API_URL}/users`, {
            credentials: "include"
        })

        const response = await res.json();

        if (!response.success) {
            alert(response.message);
            return;
        }

        const users = response.body;

        if (users.length < 1) {
            totalUsers.innerHTML = `Add Users`;
            showUsersTable.style.display = "none";
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
        alert("Error in displayUsers method " + err);
    }
}

const editUser = async (id) => {
    try {
        if (role !== "admin") {
            alert("Admin access only");
            return;
        }
        const res = await fetch(`${API_URL}/users/${id}`, {
            credentials: "include",
        });

        const response = await res.json();
        if (!response.success) {
            alert(response.message);
            return;
        }

        const data = response.body;
        editUserIndex.value = id;

        document.getElementById("userName").value = data.name;
        document.getElementById("password").value = '';
        emailInput.value = data.email;

        emailInput.disabled = true;
        formTitle.innerText = "Edit User";
    } catch (err) {
        console.error("Error : " + err);
        alert("Error in editUser method " + err);
    }
}

const changeUserStatus = async (id) => {
    try {
        if (role !== "admin") {
            alert("Admin access only");
            return;
        }
        const res = await fetch(`${API_URL}/users/change-user-status/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
        });

        const response = await res.json();
        if (!response.success) {
            alert(response.message);
            return;
        }

        alert(response.message);
        displayUsers();
    } catch (err) {
        console.error("Error : " + err);
        alert("Error in changeUserStatus method " + err);
    }
}

const createUserRow = (user, i) => {
    try {
        let statusBtn = user.status
            ? `<button onclick="changeUserStatus(${user.id})">Inactive</button>`
            : `<button onclick="changeUserStatus(${user.id})">Active</button>`;


        return `
        <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.status ? "Active" : "Inactive"}</td>
        <td><button onclick="editUser(${user.id})">Edit</button></td>
        <td>${statusBtn}</td>
        </tr>`;
    } catch (err) {
        console.error("Error : " + err);
        alert("Error in createUserRaw method " + err);
    }
}

const emailCheck = async (email) => {
    try {
        const res = await fetch(`${API_URL}/users/email-check`, {
            method: "POST",
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        const response = await res.json();

        return response.success;

    } catch (error) {
        console.error("Error : " + error);
        alert("Error in emailCheck method " + error);
    }
}

const addEditUser = async (user) => {
    try {
        if (role !== "admin") {
            alert("Admin access only");
            return;
        }
        const editIndex = editUserIndex.value;

        if (!editIndex) {
            const result = emailCheck(user.email);
            if (!result) {
                document.getElementById('emailMatch').innerHTML = "Email already exists";
                return;
            }
        }
        const userId = editUserIndex.value;

        const isEdit = userId !== "";

        const url = isEdit
            ? `${API_URL}/users/update-user/${userId}`
            : `${API_URL}/auth/register`;


        const method = isEdit ? "PUT" : "POST";

        const res = await fetch(url, {
            method,
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user),
        });

        const response = await res.json();


        if (!response.success) {
            console.log(response.message);
            alert(response.message);
            // alert(response.errors);
            return;
        }
        userForm.reset();
        errBox.innerHTML = "";
        alert(response.message);
        displayUsers();
    } catch (error) {
        console.error("Error : " + error);
    }
}

const handleSubmit = async (e) => {
    try {

        e.preventDefault();

        const name = document.getElementById("userName").value.trim();
        const password = document.getElementById("password").value.trim();
        const email = emailInput.value.trim();

        const isEdit = editUserIndex.value !== "";

        if (!isEdit) {
            if (!name || !password || !email) {
                errBox.innerHTML = "All fields are required to create user";
                return;
            }
        }

        if (isEdit) {
            if (!name && !password) {
                errBox.innerHTML = "At least one field must be updated";
                return;
            }
        }

        if (name) {
            const namePattern = /^[a-zA-Z\s]+$/;

            if (!namePattern.test(name)) {
                document.getElementById('namePatternUser').innerHTML = "Name only contains letters and space!";
                return;
            }
        }

        if (password) {
            const passwordPattern =
                /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,14}$/;
    
            if (!passwordPattern.test(password)) {
                errBox.innerHTML =
                    "Password must be 6–14 chars, 1 uppercase, 1 digit & 1 special char";
                return;
            }
        }

        addEditUser({ name, password, email });
    } catch (err) {
        console.error("Error : " + err);
        alert("Error in userFormEventHandler method " + err);
    }
};

userForm.addEventListener("submit", handleSubmit);

const deleteUser = async (id) => {
    try {
        const response = await fetch(`${API_URL}/students/delete-student/${id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            }
        }
        );

        if (!response.ok) {
            alert("Delete failed");
            return;
        }

        const res = await response.json();
        alert(res.message);
        loadTotalStudent();

    } catch (err) {
        console.error("Delete Error:", err);
    }
}


window.onload = () => {
    try {
        userForm.reset();
        getUserRole();
    } catch (err) {
        console.error("Error : " + err);
        alert("Error in window.onload method " + err);
    }
};
