const express = require("express");
const { signup , login } = require("../controllers/student_auth.controller.js");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
