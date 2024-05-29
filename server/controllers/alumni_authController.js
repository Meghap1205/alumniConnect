const User = require("../models/alumniModel.js");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/error.js");
const jwt = require("jsonwebtoken");

const alumniSignup = async (req, res, next) => {
  const {
    name,
    email,
    password,
    alumniID,
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
    !alumniID ||
    !contact ||
    !company ||
    !startDate ||
    !role ||
    !linkedinUrl ||
    name === "" ||
    email === "" ||
    password === "" ||
    alumniID === "" ||
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
    alumniID,
    contact,
    company,
    startDate,
    role,
    linkedinUrl
  });

  try {
    await newUser.save();
    res.json({ message: "Signup successful" });
  } catch (error) {
    next(error);
  }
};

const alumniLogin = async (req, res, next) => {
  const { alumniID, password } = req.body;

  if (!alumniID || !password || alumniID === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ alumniID });
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

module.exports = { alumniSignup, alumniLogin };
