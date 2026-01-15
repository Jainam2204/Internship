// function getCookie(name) {
//   let cookies = document.cookie.split("; ");
//   for (let c of cookies) {
//     let [k, v] = c.split("=");
//     if (k === name) return v;
//   }
//   return null;
// }

// function deleteCookie(name) {
//   document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
// }

// const role = getCookie("role");

// if (!role) {
//   window.location.href = "login.html";
// }

// document.getElementById("roleText").innerText = "Logged in as: " + role;

// function logout() {
//   deleteCookie("role");
//   window.location.href = "login.html";
// }

// let students = JSON.parse(localStorage.getItem("students")) || [];
// let marks = JSON.parse(localStorage.getItem("marks")) || [];
// let ids = JSON.parse(localStorage.getItem("idss")) || 1;

// const form = document.getElementById("form");
// const data = document.getElementById("data");
// const editIndexInput = document.getElementById("editIndex");

// function displayStudents() {
//   data.innerHTML = "";

//   students.forEach((s, i) => {
//     let m = marks[i];

//     let deleteBtn = role === "admin"
//       ? `<button onclick="deleteStudent(${i})">Delete</button>`
//       : "";

//     data.innerHTML += `
//     <tr>
//       <td>${s.id}</td>
//       <td>${s.name}</td>
//       <td>${s.rollNo}</td>
//       <td>${s.class}</td>
//       <td>${m.sub1}</td>
//       <td>${m.sub2}</td>
//       <td>${m.sub3}</td>
//       <td>${m.avgMarks}</td>
//       <td>${m.status ? "Pass" : "Fail"}</td>
//       <td><button onclick="editStudent(${i})">Edit</button></td>
//       <td>${deleteBtn}</td>
//     </tr>`;
//   });
// }

// function editStudent(index) {
//   editIndexInput.value = index;
//   name.value = students[index].name;
//   rollno.value = students[index].rollNo;
//   class.value = students[index].class;

//   sub1.value = marks[index].sub1;
//   sub2.value = marks[index].sub2;
//   sub3.value = marks[index].sub3;
// }

// function deleteStudent(index) {
//   students.splice(index, 1);
//   marks.splice(index, 1);

//   localStorage.setItem("students", JSON.stringify(students));
//   localStorage.setItem("marks", JSON.stringify(marks));

//   displayStudents();
// }

// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const student = {
//     id: ids,
//     name: name.value,
//     rollNo: rollno.value,
//     class: class.value
//   };

//   const mark = {
//     id: ids,
//     sub1: Number(sub1.value),
//     sub2: Number(sub2.value),
//     sub3: Number(sub3.value),
//     avgMarks: ((+sub1.value + +sub2.value + +sub3.value) / 3).toFixed(2),
//     status: sub1.value >= 33 && sub2.value >= 33 && sub3.value >= 33
//   };

//   if (editIndexInput.value === "") {
//     students.push(student);
//     marks.push(mark);
//     ids++;
//   } else {
//     const i = editIndexInput.value;
//     students[i] = { ...students[i], name: student.name, class: student.class };
//     marks[i] = mark;
//     editIndexInput.value = "";
//   }

//   localStorage.setItem("students", JSON.stringify(students));
//   localStorage.setItem("marks", JSON.stringify(marks));
//   localStorage.setItem("idss", JSON.stringify(ids));

//   form.reset();
//   displayStudents();
// });

// displayStudents();

// ================= AUTH START =================

function getAuthCookie(name) {
  let cookies = document.cookie.split("; ");
  for (let c of cookies) {
    let [k, v] = c.split("=");
    if (k === name) return v;
  }
  return null;
}

function deleteAuthCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
}

// Check login session
const role = getAuthCookie("role");

if (!role) {
  window.location.href = "login.html";
}

// Logout function
function logout() {
  deleteAuthCookie("role");
  window.location.href = "login.html";
}

// ================= AUTH END =================



let students = JSON.parse(localStorage.getItem("students")) || [];
let marks = JSON.parse(localStorage.getItem("marks")) || [];
let ids = JSON.parse(localStorage.getItem("idss")) || 1;

const form = document.getElementById("form");
const data = document.getElementById("data");
const table = document.getElementById("showTable");
const errBox = document.getElementById("err");
const totalStudents = document.getElementById("totalStudents");
const editIndexInput = document.getElementById("editIndex");
const rollInput = document.getElementById("rollno");

const filterName = document.getElementById("filterName");
const filterRoll = document.getElementById("filterRoll");
const filterClass = document.getElementById("filterClass");
const filterStatus = document.getElementById("filterStatus");
const filterMsg = document.getElementById("filterMsg");

document.getElementById("applyFilter").addEventListener("click", applyFilter);
document.getElementById("saveFilter").addEventListener("click", saveFilter);
document.getElementById("clearFilter").addEventListener("click", clearFilter);

window.onload = () => {
  form.reset();
  loadSavedFilter();
};

function setCookie(name, value, hours) {
  let expiry = new Date();
  expiry.setTime(expiry.getTime() + hours * 60 * 60 * 1000);
  document.cookie = name + "=" + value + "; expires=" + expiry.toUTCString();
}

function getCookie(name) {
  let cookies = document.cookie.split("; ");
  for (let c of cookies) {
    let parts = c.split("=");
    if (parts[0] === name) return parts[1];
  }
  return null;
}

function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
}

function displayStudents() {
  if (!students.length) {
    table.style.display = "none";
    totalStudents.innerHTML = "Add students";
    return;
  }

  table.style.display = "table";
  data.innerHTML = "";

  students.forEach((student, i) => {
    data.innerHTML += createRow(student, marks[i], i);
  });

  totalStudents.innerHTML = `Total students : ${students.length}`;
}

function createRow(s, m, i) {
  let deleteBtn = role === "admin"
    ? `<button onclick="deleteStudent(${i})">Delete</button>`
    : "";

  return `
    <tr>
        <td>${s.id}</td>
        <td>${s.name}</td>
        <td>${s.rollNo}</td>
        <td>${s.class}</td>
        <td>${m.sub1}</td>
        <td>${m.sub2}</td>
        <td>${m.sub3}</td>
        <td>${m.avgMarks}</td>
        <td>${m.status ? "Pass" : "Fail"}</td>
        <td><button onclick="editStudent(${i})">Edit</button></td>
        <td>${deleteBtn}</td>
    </tr>`;
}

function editStudent(index) {
  editIndexInput.value = index;

  document.getElementById("name").value = students[index].name;
  rollInput.value = students[index].rollNo;
  document.getElementById("class").value = students[index].class;

  document.getElementById("sub1").value = marks[index].sub1;
  document.getElementById("sub2").value = marks[index].sub2;
  document.getElementById("sub3").value = marks[index].sub3;

  rollInput.disabled = true;
}

function deleteStudent(index) {
  if (role !== "admin") {
    alert("User is not allowed to delete students!");
    return;
  }

  students.splice(index, 1);
  marks.splice(index, 1);

  localStorage.setItem("students", JSON.stringify(students));
  localStorage.setItem("marks", JSON.stringify(marks));

  displayStudents();
}

const getAverage = (a, b, c) => ((a + b + c) / 3).toFixed(2);
const getStatus = (a, b, c) => a >= 33 && b >= 33 && c >= 33;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  let rollNo = rollInput.value.trim();
  const std = document.getElementById("class").value;

  const sub1 = Number(document.getElementById("sub1").value);
  const sub2 = Number(document.getElementById("sub2").value);
  const sub3 = Number(document.getElementById("sub3").value);

  if (!name || !rollNo || isNaN(sub1) || isNaN(sub2) || isNaN(sub3)) {
    errBox.innerHTML = "Please fill all fields correctly!";
    return;
  }

  errBox.innerHTML = "";

  const avgMarks = getAverage(sub1, sub2, sub3);
  const status = getStatus(sub1, sub2, sub3);

  const editIndex = editIndexInput.value;
  const id = editIndex === "" ? ids : students[editIndex].id;

  const student = { id, name, rollNo, class: std };
  const mark = { id, sub1, sub2, sub3, avgMarks, status };

  if (editIndex === "") {
    students.push(student);
    marks.push(mark);
    ids++;
  } else {
    students[editIndex] = student;
    marks[editIndex] = mark;

    editIndexInput.value = "";
    rollInput.disabled = false;
  }

  localStorage.setItem("students", JSON.stringify(students));
  localStorage.setItem("marks", JSON.stringify(marks));
  localStorage.setItem("idss", JSON.stringify(ids));

  form.reset();
  displayStudents();
});

function applyFilter() {
  let filtered = students.filter((s, i) => {
    let matchName =
      filterName.value === "" ||
      s.name.toLowerCase().includes(filterName.value.toLowerCase());
    let matchRoll =
      filterRoll.value === "" || s.rollNo.includes(filterRoll.value);
    let matchClass = filterClass.value === "" || s.class === filterClass.value;
    let matchStatus =
      filterStatus.value === "" ||
      (marks[i].status ? "Pass" : "Fail") === filterStatus.value;

    return matchName && matchRoll && matchClass && matchStatus;
  });

  if (filtered.length === 0) {
    filterMsg.innerHTML = "No data found for this filter!";
    displayStudents();
    return;
  }

  filterMsg.innerHTML = "";
  renderFilteredData(filtered);
}

function renderFilteredData(filtered) {
  table.style.display = "table";
  data.innerHTML = "";

  filtered.forEach((s) => {
    let i = students.findIndex((st) => st.id === s.id);
    data.innerHTML += createRow(s, marks[i], i);
  });

  totalStudents.innerHTML = `Filtered students : ${filtered.length}`;
}

function saveFilter() {
  const filterData = {
    name: filterName.value,
    roll: filterRoll.value,
    class: filterClass.value,
    status: filterStatus.value,
  };

  setCookie("studentFilter", JSON.stringify(filterData), 3);
  alert("Filter saved in cookie for 3 hours!");
}

function loadSavedFilter() {
  const saved = getCookie("studentFilter");
  if (!saved) return;

  const filterData = JSON.parse(saved);

  filterName.value = filterData.name;
  filterRoll.value = filterData.roll;
  filterClass.value = filterData.class;
  filterStatus.value = filterData.status;

  if (
    filterName.value ||
    filterRoll.value ||
    filterClass.value ||
    filterStatus.value
  ) {
    applyFilter();
  } else {
    displayStudents();
  }
}

function clearFilter() {
  filterName.value = "";
  filterRoll.value = "";
  filterClass.value = "";
  filterStatus.value = "";
  filterMsg.innerHTML = "";

  deleteCookie("studentFilter");
  displayStudents();
}
