const errorHandler = require("../utils/error");
const bcryptjs = require("bcryptjs");
const Student = require("../models/student.model.js");

const test = (req, res) => {
  res.json({ message: "API is working!" });
};

const updateUser = async (req, res, next) => {
  if (req.student.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "Password must be atleat 6 characters"));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.name) {
    if (req.body.name.length < 7 || req.body.name.length > 20) {
      return next(
        errorHandler(400, "name must be between 7 and 20 characters")
      );
    }
    if (req.body.name.includes(" ")) {
      return next(errorHandler(400, "name cannot conatin spaces"));
    }
    if (req.body.name != req.body.name.toLowerCase()) {
      return next(errorHandler(400, "name must be lowercase"));
    }
    if (!req.body.name.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "name can only contain letters and numbers")
      );
    }
  }
  try {
    const updateUser = await Student.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
          studentID: req.body.studentID,
          dateOfBirth: req.body.dateOfBirth,
          address: req.body.address,
          contact: req.body.contact,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  if (req.student.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this user"));
  }
  try {
    await Student.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};

const signout = (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been Signed out");
  } catch (error) {
    next(error);
  }
};

module.exports = { test, updateUser, deleteUser, signout };
