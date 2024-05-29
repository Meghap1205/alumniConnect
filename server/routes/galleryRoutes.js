const express = require("express");
const { verifyToken } = require("../utils/verifyStudent.js");
const { create, getposts } = require("../controllers/gallery.controller.js");
const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getposts", getposts);
module.exports = router;
