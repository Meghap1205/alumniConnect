const express = require("express");
const { signup} = require("../controllers/student_auth.controller.js");

const router = express.Router();

router.post("/signup", signup);

module.exports = router;
