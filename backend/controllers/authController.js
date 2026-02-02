const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const admin = require("../config/adminConfig");
const { getUsers } = require("../utils/dataStorage");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === admin.email) {
            const match = (password === "admin123");
            if (!match) {
                console.log("match");
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign(
                { email, role: "admin" },
                process.env.JWT_SECRET,
                { expiresIn: "3h" }
            );

            res.cookie("token", token, {
                httpOnly: true,
                sameSite: "None",
                secure: true,
                maxAge: (3 * 60 * 60 * 1000),
                path: '/'
            });

            return res.json({ message: "Admin Login successful" });
        }

        const users = getUsers();
        const user = users.find(u => u.email === email);

        if (!user)
            return res.status(401).json({ message: "User not found" });

        if (!user.status)
            return res.status(401).json({ message: "User is Inactive" });

        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { email, role: "user" },
            process.env.JWT_SECRET,
            { expiresIn: "3h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            maxAge: (3 * 60 * 60 * 1000),
            path: '/'
        });

        res.json({ message: "User Login successful" });
    } catch (error) {
        console.error("Error : " + error);
    }
};

const logout = (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            path: '/'
        });
        res.json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error : " + error);
    }
};

const getMe = (req, res) => {
    res.status(200).json({
        role: req.user.role,
        email: req.user.email,
    });
};

module.exports = {
    login,
    logout,
    getMe
};