require('dotenv').config();

const express = require('express');
const app = express();

const bodyParser = require("body-parser"); 
const cookieParser = require("cookie-parser");
const cors = require('cors');

const studentRoutes = require("./routes/studentRoute");
const authRoutes = require("./routes/authRoute");
const userRoutes = require("./routes/userRoute");

app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({
   origin: [process.env.CLIENT_URL1, process.env.CLIENT_URL2],
   credentials: true,
   methods: ['GET', 'POST', 'PUT', 'DELETE'],
   allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/students", studentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
   console.log(`Server is running on PORT ${PORT}`);
});