const API_URL = "http://localhost:3000/api/students";

(async () => {
  try {
    const res = await fetch(API_URL, {
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

const studentForm = document.getElementById("studentForm");
const showStudentTable = document.getElementById("showStudentTable");
const showStudentData = document.getElementById("showStudentdata");
const tableDetails = document.getElementById("tableDetails");
const formTitle = document.getElementById("formTitle");
const namePattern = document.getElementById("namePattern");
const rollNoPattern = document.getElementById("rollNoPattern");

const nameInput = document.getElementById("name");
const rollNoInput = document.getElementById("rollNo");
const std = document.getElementById("class");
const sub1 = document.getElementById("sub1");
const sub2 = document.getElementById("sub2");
const sub3 = document.getElementById("sub3");
const studentIdInput = document.getElementById("studentId");

const loadTotalStudent = async () => {
  try {
    const res = await fetch(`${API_URL}`, {
      credentials: "include",
    });

    if (res.status === 401) {
      alert("Unathorized access");
      globalThis.location.href = "login.html";
    }

    if (!res.ok) {
      alert("Error loading students");
      return;
    }

    const data = await res.json();
    displayStudents(data.student, data.mark);
  } catch (err) {
    console.error("Load Error:", err);
  }
};

const createRow = (student, mark) => {
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
            <button onclick='deleteStudent(${student.id})'>
                Delete
            </button>
        </td>
        </tr>
        `;
  } catch (err) {
    console.error("Create row Error:", err);
  }
};

const displayStudents = (students, marks) => {
  try {
    console.log(students);
    console.log(marks);
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
};

const getPassFailStatus = (marks) => {
  try {
    return marks[0] >= 33 && marks[1] >= 33 && marks[2] >= 33 ? "Pass" : "Fail";
  } catch (error) {
    console.error("Pass/Fail staus Error : " + error);
  }
};

const getAverageMarks = (marks) => {
  try {
    return Number((marks[0] + marks[1] + marks[2]) / marks.length).toFixed(2);
  } catch (error) {
    console.error("Avg marks Error : " + error);
  }
};

const createStudentObject = () => {
  try {
    const subject1 = Number(sub1.value);
    const subject2 = Number(sub2.value);
    const subject3 = Number(sub3.value);
    return {
      student: {
        id: 0,
        name: nameInput.value.trim(),
        rollNo: rollNoInput.value.trim(),
        std: std.value,
        status: true,
      },
      mark: {
        id: 0,
        sub1: subject1,
        sub2: subject2,
        sub3: subject3,
        passFail: getPassFailStatus([subject1, subject2, subject3]),
        avgMarks: getAverageMarks([subject1, subject2, subject3]),
      },
    };
  } catch (err) {
    console.error("Create obj Error:", err);
  }
};

const getRollNo = async (rollNo, std) => {
  try {
    const res = await fetch(`${API_URL}/${rollNo}/${std}`, {
      credentials: "include",
    });

    if (res.status === 401) {
      alert("Unathorized access");
      globalThis.location.href = "login.html";
    }

    if (res.status === 400) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error : " + error);
  }
};

const addEditStudent = async () => {
  const student = createStudentObject();
  const studentId = studentIdInput.value;

  const isEdit = studentId !== "";

  const url = isEdit
    ? `${API_URL}/update-student/${studentId}`
    : `${API_URL}/add-student`;

  const method = isEdit ? "PUT" : "POST";

  const response = await fetch(url, {
    method,
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(student),
  });

  if (res.status === 401) {
      alert("Unathorized access");
      globalThis.location.href = "login.html";
    }

  if (!response.ok) {
    alert("Add/Edit failed");
    return;
  }

  const res = await response.json();
  resetForm();
  alert(res.message);
  loadTotalStudent();
};

const submitStudentDetails = async (e) => {
  e.preventDefault();

  try {
    const name = nameInput.value.trim();

    const namePattern = /^[a-zA-Z\s]+$/;

    if (!namePattern.test(name)) {
      namePattern.innerHTML = "Name only contains letters and space!";
      return;
    }

    if (studentIdInput.value === "") {
      const rollNo = rollNoInput.value.trim();
      const standard = std.value;
      const result = await getRollNo(rollNo, standard);
      if (!result) {
        rollNoPattern.innerHTML = `Student with Roll No : ${rollNo} exists in class ${standard}`;
        return;
      }
    }

    addEditStudent();
  } catch (err) {
    console.error("Submit Error:", err);
  }
};

studentForm.addEventListener("submit", submitStudentDetails);

const editStudent = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
        credentials: "include"
    });

    if (res.status === 401) {
      alert("Unathorized access");
      globalThis.location.href = "login.html";
    }

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
};

const deleteStudent = async (id) => {
  try {
    const response = await fetch(`${API_URL}/delete-student/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 401) {
      alert("Unathorized access");
      globalThis.location.href = "login.html";
    }

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
};

const resetForm = () => {
  try {
    studentForm.reset();
    studentIdInput.value = "";
    namePattern.innerHTML = "";
    rollNoPattern.innerHTML = "";
    formTitle.innerText = "Add Student";
  } catch (err) {
    console.error("Reset form Error : " + err);
  }
};

loadTotalStudent();
