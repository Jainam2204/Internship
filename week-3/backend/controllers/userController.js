const bcrypt = require("bcrypt");
const { getUsers, saveUsers } = require("../utils/userStorage");

exports.addUser = async (req, res) => {
  const { name, email, password } = req.body;

  const users = getUsers();

  if (users.find(u => u.email === email))
    return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password: hashedPassword,
    role: "user",
    status: true
  };

  users.push(newUser);
  saveUsers(users);

  res.status(201).json({ message: "User created successfully" });
};