const User = require("../models/student.model.js");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/error.js");
const jwt = require("jsonwebtoken");



const signupStudent = async (req, res, next) => {
  const { name, email, password, studentID, dateOfBirth, address, contact } =
    req.body;

  if (
    !name ||
    !email ||
    !password ||
    !studentID ||
    !contact ||
    name === "" ||
    email === "" ||
    password === "" ||
    studentID === "" ||
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
    contact,
    graduationYear: null,
    company: "",
    startDate: "",
    role: "",
    linkedinUrl: "",
  });

  try {
    await newUser.save();
    res.json({ message: "Signup successful" });
  } catch (error) {
    next(error);
  }
};


const loginStudent = async (req, res, next) => {
  const { studentID, password } = req.body;

  if (!studentID || !password || studentID === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ studentID });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(404, "Invalid password"));
    }

    const token = jwt.sign({ id: validUser._id ,isAdmin : validUser.isAdmin }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite:"none",
        secure:true,
        maxAge:2100000,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};


const alumniSignup = async (req, res, next) => {
  const {
    name,
    email,
    password,
    studentID,
    contact,
    company,
    startDate,
    role,
    linkedinUrl,
  } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    !studentID ||
    !contact ||
    !company ||
    !startDate ||
    !role ||
    !linkedinUrl ||
    name === "" ||
    email === "" ||
    password === "" ||
    studentID === "" ||
    contact === "" ||
    company === "" ||
    startDate === "" ||
    role === "" ||
    linkedinUrl === ""
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
    contact,
    company,
    startDate,
    role,
    linkedinUrl,
    isAlumni: true,
  });

  try {
    await newUser.save();
    res.json({ message: "Signup successful" });
  } catch (error) {
    next(error);
  }
};

const alumniLogin = async (req, res, next) => {
  const { studentID, password } = req.body;

  if (!studentID || !password || studentID === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ studentID });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(404, "Invalid password"));
    }

    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};


module.exports = { signupStudent, loginStudent, alumniSignup, alumniLogin };
