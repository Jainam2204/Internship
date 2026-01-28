const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");

const {
  getStudent,
  getRollNo,
  getStudentDetails,
  addStudentDetails,
  updateStudentDetails,
  deleteStudentDetails
} = require("../controllers/studentController");

router.use(auth); // 🔐 protect all routes

router.get("/", (req, res) => {
  res.send(getStudentDetails());
});

router.get("/:id", (req, res) => {
  res.json(getStudent(Number(req.params.id)));
});

router.get("/:rollNo/:std", (req, res) => {
  const result = getRollNo(req.params.rollNo, req.params.std);
  if (result)
    return res.status(400).json({ message: "Student exists" });
  res.json({ message: "Valid roll no" });
});

router.post("/add-student", (req, res) => {
  addStudentDetails(req.body.student, req.body.mark);
  res.json({ message: "Student added" });
});

router.put("/update-student/:id", (req, res) => {
  updateStudentDetails(Number(req.params.id), req.body.student, req.body.mark);
  res.json({ message: "Student updated" });
});

router.delete("/delete-student/:id", (req, res) => {
  deleteStudentDetails(Number(req.params.id));
  res.json({ message: "Student deleted" });
});

module.exports = router;