const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const admin = require("../config/adminConfig");
const { getUsers, setUsers } = require('../utils/dataStorage');

const generateAccessToken = (payload) =>
    jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
    });

const generateRefreshToken = (payload) =>
    jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
    });

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const role = email === admin.email ? "admin" : "user";

        if (role === "admin") {
            if (!password === admin.password) {
                return res.status(404).json({
                    success: false,
                    message: "Invalid credentials"
                });
            }

        } else {
            const users = getUsers();
            const user = users.find(u => u.email === email);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            if (!user.status) {
                return res.status(401).json({
                    success: false,
                    message: "User is inActive"
                });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid credentials"
                });
            }
        }

        const accessToken = generateAccessToken({ email, role });
        const refreshToken = generateRefreshToken({ email, role });

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            maxAge: (30 * 60 * 1000),
            path: '/'
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            maxAge: (1 * 24 * 60 * 60 * 1000),
            path: '/'
        });

        res.status(200).json({
            success: true,
            message: "Login successful"
        });
    } catch (error) {
        console.error("Error in login : " + error);
        res.status(404).json({
            success: false,
            message: "Error in login"
        });
    }
};

const refreshToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({
            success: false,
            message: "Refresh token missing",
        });
    }

    try {
        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );

        const newAccessToken = generateAccessToken({
            email: decoded.email,
            role: decoded.role,
        });

        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            maxAge: (30 * 60 * 1000),
            path: '/'
        });

        res.json({
            success: true,
            message: "Access token refreshed",
        });
    } catch (error) {
        console.error("Error in refreshToken : " + error);
        res.status(403).json({
            success: false,
            message: "Invalid refresh token",
        });
    }
};

const register = async (req, res) => {
    try {
        const user = req.body;

        const users = getUsers();
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.id = users.length + 1;
        user.status = true;
        user.password = hashedPassword;

        users.push(user);

        setUsers(users);

        return res.status(200).json({
            success: true,
            message: "User added Successfully"
        });
    } catch (error) {
        console.error("Error in addUser : " + error);
        res.status(404).json({
            success: false,
            message: "Error occured in addUser"
        });
    }
}

const logout = (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            path: '/'
        });
        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        console.error("Error in logout : " + error);
        res.status(404).json({
            success: false,
            message: "Error in logout"
        });
    }
};

const getMe = (req, res) => {
    try {
        if (!req.user) {
            res.status(404).json({
                success: false,
                message: "Login first"
            });
        }
        return res.status(200).json({
            success: true,
            role: req.user.role,
            email: req.user.email,
        });
    } catch (error) {
        console.error("Error in getMe : " + error);
        res.status(404).json({
            success: false,
            message: "Error in getMe"
        });
    }
};

module.exports = {
    login,
    refreshToken,
    register,
    logout,
    getMe
};