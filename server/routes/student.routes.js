const express = require("express");
const { test } = require("../controllers/student.controller.js");
const router = express.Router();

router.get("/test", test);

module.exports = router;
