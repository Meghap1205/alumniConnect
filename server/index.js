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

