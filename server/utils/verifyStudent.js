const jwt = require("jsonwebtoken");
const errorHandler = require("./error.js");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, student) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized"));
    }
    req.student = student;
    next();
  });
};

module.exports = { verifyToken };
