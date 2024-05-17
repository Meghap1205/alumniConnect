const User = require("../models/student.model.js");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/error.js");


const signup = async (req, res, next) => {
  const { name, email, password, studentID, dateOfBirth, address, contact } =
    req.body;

  if (
    !name ||
    !email ||
    !password ||
    !studentID ||
    !dateOfBirth ||
    !address ||
    !contact ||
    name === "" ||
    email === "" ||
    password === "" ||
    studentID === "" ||
    dateOfBirth === "" ||
    address === "" ||
    contact === "" 
  ) {
    next(errorHandler(400, "All fields are required"));
  }

  if (typeof password !== "string") {
    return next(errorHandler(400, "Password must be a string"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    studentID,
    dateOfBirth,
    address,
    contact,
  });

  try {
    await newUser.save();
    res.json({ message: "Signup successful" });
  } catch (error) {
    next(error);
  }
};


module.exports = { signup };
