const userAllowedFields = ["name", "email", "password"];
const loginAllowedFields = ["email", "password"];
const studentAllowedFields = [
    "name",
    "rollNo",
    "std",
    "sub1",
    "sub2",
    "sub3"
];

module.exports = {
    userAllowedFields,
    loginAllowedFields,
    studentAllowedFields
};