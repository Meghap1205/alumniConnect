const express = require("express");
const {
  alumniSignup,
  alumniLogin,
} = require("../controllers/alumni_authController.js");

const router = express.Router();

router.post("/alumni-signup", alumniSignup);
router.post("/alumni-login", alumniLogin);

module.exports = router;
