require('dotenv').config();
const jwt = require("jsonwebtoken");


const authMiddleware = (req, res, next) => {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "Access token missing",
      });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(error) {
        console.error("Error : " + error);
        res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};

module.exports = authMiddleware;