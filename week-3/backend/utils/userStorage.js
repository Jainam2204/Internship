const { LocalStorage } = require("node-localstorage");
const localStorage = new LocalStorage("./models");

const getUsers = () =>
  JSON.parse(localStorage.getItem("users")) || [];

const saveUsers = (users) =>
  localStorage.setItem("users", JSON.stringify(users));

module.exports = { getUsers, saveUsers };