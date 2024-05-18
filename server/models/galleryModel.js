const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Upload = mongoose.model("Upload", uploadSchema);

module.exports = Upload;
