const express = require("express");
const { uploadPicture , displayPictures, deletepicture} = require("../controllers/galleryController");
const multer = require("multer");
const path = require("path"); // Import the path module

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../frontend/public/uploads')); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/upload", upload.single("image"), uploadPicture);
router.get("/displaygallery", displayPictures);
router.delete("/deletepicture/:id", deletepicture);

module.exports = router;
