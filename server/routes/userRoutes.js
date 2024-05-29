const express = require("express");
const  {displayStudent, displayAlumni} = require("../controllers/userController");
const router = express.Router();

router.get("/student", displayStudent);
router.get("/alumni", displayAlumni);

module.exports = router;