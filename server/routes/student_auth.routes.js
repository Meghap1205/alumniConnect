const express = require("express");
const {
  signupStudent,
  loginStudent,
  alumniSignup,
  alumniLogin
} = require("../controllers/student_auth.controller.js");

const router = express.Router();

router.post("/student-signup", signupStudent);
router.post("/student-login", loginStudent);
router.post("/alumni-signup", alumniSignup);
router.post("/alumni-login", alumniLogin);



module.exports = router;
