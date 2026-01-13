let students = JSON.parse(localStorage.getItem("students")) || [];
let marks = JSON.parse(localStorage.getItem("marks")) || [];
let ids = parseInt(JSON.parse(localStorage.getItem("idss")) || 1);
// ids = parseInt(ids);

const form = document.getElementById('form');
const errBox = document.getElementById('err');
const data = document.getElementById('data');


// form.reset();
// errBox.innerHTML = '';
// displayStudents();

window.onload = () => {
    try {
       form.reset();
       errBox.innerHTML = '';
       displayStudents();
    } catch (err) {
        handleError("Error occured while refreshing page")
    }
}

const handleError = (err) => {
    try{
        errBox.innerHTML = "Error : " + err;
    }catch(err){
        console.error(err)
        globalThis.location.reload();
    }
}

const displayStudents = () => {

    try{
        
        data.innerHTML = "";
            for(let i = 0 ; i < students.length ; i++){
            data.innerHTML += `
            <tr>
                <td>${students[i].id}</td>
                <td>${students[i].name}</td>
                <td>${students[i].rollNo}</td>
                <td>${students[i].class}</td>
                <td>${marks[i].sub1}</td>
                <td>${marks[i].sub2}</td>
                <td>${marks[i].sub3}</td>
                <td>${marks[i].avgMarks}</td>
                <td>${marks[i].status ? 'Pass' : 'Fail'}</td>
                <td><button onclick="editStudent(${i})">Edit</button></td>
                <td><button onclick="deleteStudent(${i})">Delete</button></td>
            </tr>
            `;
        };
    }catch(err){
        handleError("Error occured while displaying student")
    }
}

const editStudent = (index) => {
    try{
        document.getElementById("id").value = students[index].id;
        document.getElementById("name").value = students[index].name
        document.getElementById("rollno").value = students[index].rollNo;
        document.getElementById("class").value = students[index].class;
        document.getElementById("sub1").value = marks[index].sub1;
        document.getElementById("sub2").value = marks[index].sub2;
        document.getElementById("sub3").value = marks[index].sub3;
    }catch(err){
        handleError("Error occured while editing student")
    }

}

const deleteStudent = (index) => {
    try{
        students.splice(index, 1);
        marks.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        localStorage.setItem("marks", JSON.stringify(marks));
        displayStudents();
    }catch(err){
        handleError("Error occured while deleting student")
    }    
}

const getAverageMArks = (sub1, sub2, sub3) => {
    try{
        return Number((sub1 + sub2 + sub3) / 3).toFixed(2);
    }catch(err){
        handleError("Error occured while calaulating average marks");
    }
}

const getPassFailStatus = (sub1, sub2, sub3) => {
    try {
        return ((sub1 >= 33) && (sub2 >= 33) && (sub3 >= 33));
    } catch (err) {
        handleError("Error occured while checking pass fail status")
    }
}


form.addEventListener('submit', (e) => {
    try {

        e.preventDefault();

        let idd = document.getElementById("id").value;
        let id = idd ? idd : ids
        const name = document.getElementById('name').value;
        const rollNo = document.getElementById('rollno').value;
        const std = document.getElementById('class').value;
        const sub1 = Number(document.getElementById('sub1').value);
        const sub2 = Number(document.getElementById('sub2').value);
        const sub3 = Number(document.getElementById('sub3').value);

        const student = {
            id,
            name: name,
            rollNo: rollNo,
            class: std,
            status: true
        };

        let avgMarks = getAverageMArks(sub1, sub2, sub3);
        let status = getPassFailStatus(sub1, sub2, sub3);

        const mark = {
            id,
            sub1: sub1,
            sub2: sub2,
            sub3: sub3,
            avgMarks: avgMarks,
            status: status
        };

        if (id == ids) {
            students.push(student);
            marks.push(mark);
            ids += 1;
            console.log("new");
        } else {
            console.log("update");
            students[id-1] = student;
            marks[id-1] = mark;
            document.getElementById("id").value = ''
        }

        localStorage.setItem("students", JSON.stringify(students));
        localStorage.setItem("marks", JSON.stringify(marks));
        localStorage.setItem("idss", JSON.stringify(ids));
        form.reset();
        displayStudents();

    } catch (err) {
        handleError("Error occured during listening event")
    }
})