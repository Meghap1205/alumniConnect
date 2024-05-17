const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const studentRoutes = require("./routes/student.routes.js");
const studentauthRoutes = require("./routes/student_auth.routes.js");


dotenv.config();
const app = express();

app.use(express.json());

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

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
