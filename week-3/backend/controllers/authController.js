const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const admin = require("../config/admin");
const { getUsers } = require("../utils/userStorage");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (email === admin.email) {
    // const match = await bcrypt.compare(password, admin.password);
    const match = password === "admin123";
    if (!match)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 86400000
    });

    return res.json({ role: "admin" });
  }

  const users = getUsers();
  const user = users.find(u => u.email === email);

  if (!user || !user.status)
    return res.status(401).json({ message: "Invalid user" });

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, role: "user" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 86400000
  });

  res.json({ role: "user" });
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};