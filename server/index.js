const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const studentRoutes = require("./routes/student.routes.js");
const studentauthRoutes = require("./routes/student_auth.routes.js");
const studentJobRoutes =require("./routes/studentJobRoutes.js")
const galleryRoutes = require("./routes/galleryRoutes.js");

const cors = require("cors");

dotenv.config();
const app = express();

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST, PUT, HEAD, DELETE, PATCH",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, '../../client/public')));




mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Mongodb is connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("server is running");
});

app.use("/server/student", studentRoutes);
app.use("/server/studentauth", studentauthRoutes);
app.use("/server/job", studentJobRoutes);
app.use("/server/gallery", galleryRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
