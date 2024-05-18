const express = require("express");
const { uploadPicture } = require("../controllers/galleryController");
const multer = require("multer");
const path = require("path"); // Import the path module

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../frontend/public/uploads')); // Ensure this path exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/upload", upload.single("image"), uploadPicture);

module.exports = router;
