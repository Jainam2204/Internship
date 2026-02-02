const API_URL = CONFIG.API_URL;

const studentForm = document.getElementById("studentForm");
const showStudentTable = document.getElementById("showStudentTable");
const showStudentData = document.getElementById("showStudentdata");
const tableDetails = document.getElementById("tableDetails");
const formTitle = document.getElementById("formTitle");
// const namePattern = document.getElementById("namePattern");
// const rollNoPattern = document.getElementById("rollNoPattern");

const nameInput = document.getElementById("name");
const rollNoInput = document.getElementById("rollNo");
const std = document.getElementById("class");
const sub1 = document.getElementById("sub1");
const sub2 = document.getElementById("sub2");
const sub3 = document.getElementById("sub3");
const studentIdInput = document.getElementById("studentId");

const addStudentLink = document.getElementById("addStudentLink");
const logoutBtn = document.getElementById("logoutBtn");
const errorMessage = document.getElementById("errorMessage");

let role = null;

const getUserRole = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        credentials: "include",
      });
  
      if (!res.ok) {
        alert("Login first");
        globalThis.location.href = "login.html";
        return;
      }
  
      const data = await res.json();
      role = data.role;
  
      addStudentLink.style.display = role === "admin" ? "" : "none";
  
    } catch (error) {
      console.error("Role fetch error:", error);
      globalThis.location.href = "login.html";
    }
  };
  

const loadTotalStudent = async () => {
    try {
        const res = await fetch(`${API_URL}/students`, {
            credentials: "include",
        });

        if (!res.ok) {
            alert("Load failed");
            return;
        }

        const data = await res.json();
        displayStudents(data.student, data.mark);
    } catch (err) {
        console.error("Load Error:", err);
    }
}


const createRow = (student, mark) => {
    let deleteButton = role === "admin" 
    ? `<button onclick='deleteStudent(${student.id})'>Delete</button>` 
    : `<button onclick='deleteStudent(${student.id})' disabled>Delete</button>`;
    try {
        return `
        <tr>
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.rollNo}</td>
        <td>${student.std}</td>
        <td>${mark.sub1}</td>
        <td>${mark.sub2}</td>
        <td>${mark.sub3}</td>
        <td>${mark.passFail}</td>
        <td>${mark.avgMarks}</td>
        <td>
            <button onclick='editStudent(${student.id})'>
                Edit        
            </button>
        </td>
        <td>
            ${deleteButton}
        </td>
        </tr>
        `;
    } catch (err) {
        console.error("Create row Error:", err);
    }
}

const displayStudents = (students, marks) => {
    try {
        showStudentData.innerHTML = "";

        if (students.length === 0) {
            showStudentTable.style.display = "none";
            tableDetails.innerHTML = "No students";
            return;
        }

        showStudentTable.style.display = "table";

        let studentCount = 0;

        students.forEach((student, i) => {
            if (student.status) {
                showStudentData.innerHTML += createRow(student, marks[i]);
                studentCount++;
            }
        });

        tableDetails.innerHTML = `Total active students : ${studentCount}`;
    } catch (err) {
        console.error("Dsiplay Error:", err);
    }
}

// const getPassFailStatus = (marks) => {
//     try {
//         return ((marks[0] >= 33 && marks[1] >= 33 && marks[2] >= 33)
//             ? "Pass"
//             : "Fail");
//     } catch (error) {
//         console.error("Pass/Fail staus Error : " + error);
//     }
// }

// const getAverageMarks = (marks) => {
//     try {
//         return Number((marks[0] + marks[1] + marks[2]) / marks.length).toFixed(2);
//     } catch (error) {
//         console.error("Avg marks Error : " + error);
//     }
// }

const createStudentObject = () => {
    try {
        const subject1 = Number(sub1.value);
        const subject2 = Number(sub2.value);
        const subject3 = Number(sub3.value);
        return {
            name: nameInput.value.trim(),
            rollNo: rollNoInput.value.trim(),
            std: std.value,
            sub1: subject1,
            sub2: subject2,
            sub3: subject3,
        };
    } catch (err) {
        console.error("Create obj Error:", err);
    }
}

const getRollNo = async (rollNo, std) => {
    try {
        const res = await fetch(`${API_URL}/students/${rollNo}/${std}`, {
            credentials: "include",
        });
        if (res.status === 400) {
            return true;
        }

        return false;
    } catch (error) {
        console.error("Error : " + error);
    }
}

const addEditStudent = async () => {
    try {
        const student = createStudentObject();
        const studentId = studentIdInput.value;

        const isEdit = studentId !== "";

        const url = isEdit
            ? `${API_URL}/students/update-student/${studentId}`
            : `${API_URL}/students/add-student`;


        const method = isEdit ? "PUT" : "POST";

        const response = await fetch(url, {
            method,
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(student),
        });

        if (!response.ok) {
            alert("Add/Edit failed");
            return;
        }

        const res = await response.json();
        resetForm();
        alert(res.message);
        loadTotalStudent();
    } catch (error) {
        console.error("Error : " + error);
    }
}

const submitStudentDetails = async (e) => {
    e.preventDefault();

    try {
        const name = nameInput.value.trim();

        const namePattern = /^[a-zA-Z\s]+$/;

        if (!namePattern.test(name)) {
            errorMessage.innerHTML = "Name only contains letters and space!";
            return;
        }

        if (studentIdInput.value === "") {
            const rollNo = rollNoInput.value.trim();
            const standard = std.value;
            const result = await getRollNo(rollNo, standard);
            if (result) {   
                errorMessage.innerHTML = `Student with Roll No : ${rollNo} exists in class ${standard}`;
                return;
            }
        }

        addEditStudent();
    } catch (err) {
        console.error("Submit Error:", err);
        errorMessage.innerHTML = "Error in submitStudentDetails method " + err;
    }
}

studentForm.addEventListener("submit", submitStudentDetails);


const editStudent = async (id) => {
    try {
        const res = await fetch(`${API_URL}/students/${id}`, {
            credentials: "include",
        });

        if (!res.ok) {
            alert("Edit failed");
            return;
        }
        const data = await res.json();
        if (!data) {
            alert("No student found");
            return;
        }
        const student = data.student;
        const mark = data.mark;

        studentIdInput.value = student.id;
        nameInput.value = student.name;
        rollNoInput.value = student.rollNo;
        std.value = student.std;

        sub1.value = mark.sub1;
        sub2.value = mark.sub2;
        sub3.value = mark.sub3;

        formTitle.innerText = "Edit Student";
    } catch (err) {
        console.error("Edit Error : " + err);
    }
}


const deleteStudent = async (id) => {
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


const resetForm = () => {
    try {
        studentForm.reset();
        studentIdInput.value = "";
        namePattern.innerHTML = "";
        rollNoPattern.innerHTML = "";
        formTitle.innerText = "Add Student";
        errorMessage.innerHTML = "";
    } catch (err) {
        console.error("Reset form Error : " + err);
    }
}

const logoutHandle = async () => {
    try {
        const response = await fetch(`${API_URL}/auth/logout`, {
            credentials: "include",
        });
        const res = await response.json();
        alert(res.message);
        globalThis.location.href = "login.html";
    } catch (error) {
        console.error("Error : " + error);
    }
}

logoutBtn.addEventListener("click", logoutHandle);


window.onload = () => {
    try {
        studentForm.reset();
        getUserRole();
        // addStudentLink.style.display = role === 'admin' ? '' : 'none'
        loadTotalStudent();
    } catch (err) {
        console.error("Error : " + err);
        alert("Error in window.onload method " + err);
    }
};
