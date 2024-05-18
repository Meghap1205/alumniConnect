const path = require("path");
const Upload = require("../models/jobModel");

const uploadPicture = async (req, res) => {
  try {
    const { description } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`;

    const newUpload = new Upload({
      description,
      imageUrl,
    });

    await newUpload.save();

    return res.status(200).json({ message: "Upload successful", upload: newUpload });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Upload failed" });
  }
};

module.exports = { uploadPicture };
