// let students = JSON.parse(localStorage.getItem("students")) || [];
// let marks = JSON.parse(localStorage.getItem("marks")) || [];
// let ids = JSON.parse(localStorage.getItem("idss")) || 1;

// const form = document.getElementById("form");
// const data = document.getElementById("data");
// const table = document.getElementById("showTable");
// const errBox = document.getElementById("err");
// const totalStudents = document.getElementById("totalStudents");
// const editIndexInput = document.getElementById("editIndex");
// const rollInput = document.getElementById("rollno");

// // Filter elements
// const filterName = document.getElementById("filterName");
// const filterRoll = document.getElementById("filterRoll");
// const filterClass = document.getElementById("filterClass");
// const filterStatus = document.getElementById("filterStatus");
// const filterMsg = document.getElementById("filterMsg");

// document.getElementById("applyFilter").addEventListener("click", applyFilter);
// document.getElementById("saveFilter").addEventListener("click", saveFilter);
// document.getElementById("clearFilter").addEventListener("click", clearFilter);

// window.onload = () => {
//     form.reset();
//     loadSavedFilter();
//     displayStudents();
// };

// // Display all students
// function displayStudents() {
//     if (!students.length) {
//         table.style.display = "none";
//         totalStudents.innerHTML = "Add students";
//         return;
//     }

//     table.style.display = "table";
//     data.innerHTML = "";

//     students.forEach((s, i) => {
//         data.innerHTML += createRow(s, marks[i], i);
//     });

//     totalStudents.innerHTML = `Total students : ${students.length}`;
// }

// // Create row
// function createRow(s, m, i) {
//     return `
//     <tr>
//         <td>${s.id}</td>
//         <td>${s.name}</td>
//         <td>${s.rollNo}</td>
//         <td>${s.class}</td>
//         <td>${m.sub1}</td>
//         <td>${m.sub2}</td>
//         <td>${m.sub3}</td>
//         <td>${m.avgMarks}</td>
//         <td>${m.status ? "Pass" : "Fail"}</td>
//         <td><button onclick="editStudent(${i})">Edit</button></td>
//         <td><button onclick="deleteStudent(${i})">Delete</button></td>
//     </tr>`;
// }

// // Edit student
// function editStudent(index) {
//     editIndexInput.value = students[index].id;

//     document.getElementById("name").value = students[index].name;
//     rollInput.value = students[index].rollNo;
//     document.getElementById("class").value = students[index].class;

//     document.getElementById("sub1").value = marks[index].sub1;
//     document.getElementById("sub2").value = marks[index].sub2;
//     document.getElementById("sub3").value = marks[index].sub3;

//     rollInput.disabled = true;
// }

// // Delete student
// function deleteStudent(index) {
//     students.splice(index, 1);
//     marks.splice(index, 1);

//     localStorage.setItem("students", JSON.stringify(students));
//     localStorage.setItem("marks", JSON.stringify(marks));

//     displayStudents();
// }

// // Helpers
// const getAverage = (a, b, c) => ((a + b + c) / 3).toFixed(2);
// const getStatus = (a, b, c) => a >= 33 && b >= 33 && c >= 33;

// // Form submit
// form.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const name = document.getElementById("name").value.trim();
//     const rollNo = rollInput.value.trim();
//     const std = document.getElementById("class").value;

//     const sub1 = Number(document.getElementById("sub1").value);
//     const sub2 = Number(document.getElementById("sub2").value);
//     const sub3 = Number(document.getElementById("sub3").value);

//     if (!name || !rollNo || isNaN(sub1) || isNaN(sub2) || isNaN(sub3)) {
//         errBox.innerHTML = "Please fill all fields correctly!";
//         return;
//     }

//     errBox.innerHTML = "";

//     const avgMarks = getAverage(sub1, sub2, sub3);
//     const status = getStatus(sub1, sub2, sub3);

//     // const editIndex = editIndexInput.value;
//     // const mark = { sub1, sub2, sub3, avgMarks, status };

//     // if (editIndex === "") {
//     //     students.push({ id: ids, name, rollNo, class: std });
//     //     marks.push(mark);
//     //     ids++;
//     // } else {
//     //     students[editIndex] = {
//     //         id: students[editIndex].id,
//     //         name,
//     //         rollNo: students[editIndex].rollNo,
//     //         class: std
//     //     };
//     //     marks[editIndex] = mark;
//     //     editIndexInput.value = "";
//     //     rollInput.disabled = false;
//     // }

//     const editIndex = editIndexInput.value;
//     const id = editIndex === "" ? ids : editIndex;
//     const student = {id, name, rollNo, class: std}
//     const mark = { id, sub1, sub2, sub3, avgMarks, status };

//     if (editIndex === "") {
//         students.push(student);
//         marks.push(mark);
//         ids++;
//     } else {
//         students[editIndex-1] = student;
//         marks[editIndex-1] = mark;
//         editIndexInput.value = "";
//         rollInput.disabled = false;
//     }

//     localStorage.setItem("students", JSON.stringify(students));
//     localStorage.setItem("marks", JSON.stringify(marks));
//     localStorage.setItem("idss", JSON.stringify(ids));

//     form.reset();
//     displayStudents();
// });

// // Apply filter
// function applyFilter() {
//     let filtered = students.filter((s, i) => {
//         let matchName = filterName.value === "" || s.name.toLowerCase().includes(filterName.value.toLowerCase());
//         let matchRoll = filterRoll.value === "" || s.rollNo.includes(filterRoll.value);
//         let matchClass = filterClass.value === "" || s.class === filterClass.value;
//         let matchStatus = filterStatus.value === "" || 
//             (marks[i].status ? "Pass" : "Fail") === filterStatus.value;

//         return matchName && matchRoll && matchClass && matchStatus;
//     });

//     if (filtered.length === 0) {
//         filterMsg.innerHTML = "No data found for this filter!";
//         displayStudents();
//         return;
//     }

//     filterMsg.innerHTML = "";
//     renderFilteredData(filtered);
// }

// // Render filtered
// function renderFilteredData(filtered) {
//     table.style.display = "table";
//     data.innerHTML = "";

//     filtered.forEach(s => {
//         let i = students.findIndex(st => st.id === s.id);
//         data.innerHTML += createRow(s, marks[i], i);
//     });

//     totalStudents.innerHTML = `Filtered students : ${filtered.length}`;
// }

// // Save filter for 3 hours
// function saveFilter() {
//     const filterData = {
//         name: filterName.value,
//         roll: filterRoll.value,
//         class: filterClass.value,
//         status: filterStatus.value,
//         expiry: Date.now() + (3 * 60 * 60 * 1000)
//     };

//     localStorage.setItem("savedFilter", JSON.stringify(filterData));
//     alert("Filter saved for 3 hours!");
// }

// // Load saved filter
// function loadSavedFilter() {
//     const saved = JSON.parse(localStorage.getItem("savedFilter"));
//     if (!saved) return;

//     if (Date.now() > saved.expiry) {
//         localStorage.removeItem("savedFilter");
//         return;
//     }

//     filterName.value = saved.name;
//     filterRoll.value = saved.roll;
//     filterClass.value = saved.class;
//     filterStatus.value = saved.status;

//     applyFilter();
// }

// // Clear filter
// function clearFilter() {
//     filterName.value = "";
//     filterRoll.value = "";
//     filterClass.value = "";
//     filterStatus.value = "";
//     filterMsg.innerHTML = "";
//     localStorage.removeItem("savedFilter");
//     displayStudents();
// }


// let students = JSON.parse(localStorage.getItem("students")) || [];
// let marks = JSON.parse(localStorage.getItem("marks")) || [];
// let ids = JSON.parse(localStorage.getItem("idss")) || 1;

// const form = document.getElementById("form");
// const data = document.getElementById("data");
// const table = document.getElementById("showTable");
// const errBox = document.getElementById("err");
// const totalStudents = document.getElementById("totalStudents");
// const editIndexInput = document.getElementById("editIndex");
// const rollInput = document.getElementById("rollno");

// window.onload = () => {
//     form.reset();
//     displayStudents();
// };

// const displayStudents = () => {
//     if (!students.length) {
//         table.style.display = "none";
//         totalStudents.innerHTML = "Add students";
//         return;
//     }

//     table.style.display = "table";
//     data.innerHTML = "";

//     students.forEach((s, i) => {
//         data.innerHTML += `
//         <tr>
//             <td>${s.id}</td>
//             <td>${s.name}</td>
//             <td>${s.rollNo}</td>
//             <td>${s.class}</td>
//             <td>${marks[i].sub1}</td>
//             <td>${marks[i].sub2}</td>
//             <td>${marks[i].sub3}</td>
//             <td>${marks[i].avgMarks}</td>
//             <td>${marks[i].status ? "Pass" : "Fail"}</td>
//             <td><button onclick="editStudent(${i})">Edit</button></td>
//             <td><button onclick="deleteStudent(${i})">Delete</button></td>
//         </tr>`;
//     });

//     totalStudents.innerHTML = `Total students : ${students.length}`;
// };

// const editStudent = (index) => {
//     editIndexInput.value = students[index].id;

//     document.getElementById("name").value = students[index].name;
//     rollInput.value = students[index].rollNo;
//     document.getElementById("class").value = students[index].class;

//     document.getElementById("sub1").value = marks[index].sub1;
//     document.getElementById("sub2").value = marks[index].sub2;
//     document.getElementById("sub3").value = marks[index].sub3;

//     rollInput.disabled = true;
// };

// const deleteStudent = (index) => {
//     students.splice(index, 1);
//     marks.splice(index, 1);

//     localStorage.setItem("students", JSON.stringify(students));
//     localStorage.setItem("marks", JSON.stringify(marks));

//     displayStudents();
// };

// const getAverage = (a, b, c) => ((a + b + c) / 3).toFixed(2);
// const getStatus = (a, b, c) => a >= 33 && b >= 33 && c >= 33;

// form.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const name = document.getElementById("name").value.trim();
//     const rollNo = rollInput.value.trim();
//     const std = document.getElementById("class").value;

//     const sub1 = Number(document.getElementById("sub1").value);
//     const sub2 = Number(document.getElementById("sub2").value);
//     const sub3 = Number(document.getElementById("sub3").value);

//     if (!name || !rollNo || isNaN(sub1) || isNaN(sub2) || isNaN(sub3)) {
//         errBox.innerHTML = "Please fill all fields correctly!";
//         return;
//     }

//     errBox.innerHTML = "";

//     const avgMarks = getAverage(sub1, sub2, sub3);
//     const status = getStatus(sub1, sub2, sub3);

//     const editIndex = editIndexInput.value;

//     const id = editIndex === "" ? ids : editIndex;
//     const student = {id, name, rollNo, class: std}
//     const mark = { id, sub1, sub2, sub3, avgMarks, status };

//     if (editIndex === "") {
//         students.push(student);
//         marks.push(mark);
//         ids++;
//     } else {
//         students[editIndex-1] = student;
//         marks[editIndex-1] = mark;
//         editIndexInput.value = "";
//         rollInput.disabled = false;
//     }

//     localStorage.setItem("students", JSON.stringify(students));
//     localStorage.setItem("marks", JSON.stringify(marks));
//     localStorage.setItem("idss", JSON.stringify(ids));

//     form.reset();
//     displayStudents();
// });

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

  students.forEach((s, i) => {
    data.innerHTML += createRow(s, marks[i], i);
  });

  totalStudents.innerHTML = `Total students : ${students.length}`;
}

function createRow(s, m, i) {
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
        <td><button onclick="deleteStudent(${i})">Delete</button></td>
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
  //   const editIndex = editIndexInput.value;

  //   if (editIndex === "") {
  //     const student = { id: ids, name, rollNo, class: std };
  //     const mark = { id: ids, sub1, sub2, sub3, avgMarks, status };

  //     students.push(student);
  //     marks.push(mark);
  //     ids++;
  //   } else {
  //     students[editIndex] = {
  //       id: students[editIndex].id,
  //       name,
  //       rollNo: students[editIndex].rollNo,
  //       class: std,
  //     };

  //     marks[editIndex] = {
  //       id: students[editIndex].id,
  //       sub1,
  //       sub2,
  //       sub3,
  //       avgMarks,
  //       status,
  //     };

  //     editIndexInput.value = "";
  //     rollInput.disabled = false;
  //   }

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
