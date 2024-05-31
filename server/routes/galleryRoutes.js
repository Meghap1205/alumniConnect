const express = require("express");
const { verifyToken } = require("../utils/verifyStudent.js");
const { create, getposts, updatepost, deleltepost } = require("../controllers/gallery.controller.js");
const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getposts", getposts);
router.delete("/deletepost/:postId/:userId", verifyToken, deleltepost);
router.put("/updatepost/:postId/:userId", verifyToken, updatepost);
module.exports = router;
