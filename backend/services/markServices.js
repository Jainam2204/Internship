const getPassFailStatus = (marks) => {
    try {
        const passingMArks = 33;

        return ((marks[0] >= passingMArks
             && marks[1] >= passingMArks
             && marks[2] >= passingMArks)
            ? "Pass"
            : "Fail");
    } catch (error) {
        console.error("Pass/Fail staus Error : " + error);
    }
}

const getAverageMarks = (marks) => {
    try {
        return Number((marks[0] + marks[1] + marks[2]) / marks.length).toFixed(2);
    } catch (error) {
        console.error("Avg marks Error : " + error);
    }
}

const createStudentObject = (data) => {
    try {
        return {
            id: 0,
            name: data.name,
            rollNo: data.rollNo,
            std: data.std,
            status: true,
        };
    } catch (error) {
        console.error("Error : " + error);
    }
}

const createMarkObject = (data) => {
    try {
        return {
            id: 0,
            sub1: data.sub1,
            sub2: data.sub2,
            sub3: data.sub3,
            passFail: getPassFailStatus([data.sub1, data.sub2, data.sub3]),
            avgMarks: getAverageMarks([data.sub1, data.sub2, data.sub3])
        };
    } catch (error) {
        console.error("Error : " + error);
    }
}

module.exports = {
    createMarkObject,
    createStudentObject
}