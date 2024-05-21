const path = require("path");
const fs = require("fs");
const Upload = require("../models/galleryModel");

const uploadPicture = async (req, res) => {
  try {
    const { description } = req.body;
    const imageUrl = `/uploads/${path.basename(req.file.path)}`

    const newUpload = new Upload({
      description,
      imageUrl,
    });

    await newUpload.save();
    console.log(newUpload.description);

    return res.status(200).json({ message: "Upload successful", upload: newUpload });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
};

const displayPictures = async (req,res)=> {
  try {
    const pictures = await Upload.find();
    return res.status(200).json(pictures);
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
}

const deletepicture = async(req,res)=> {
  try {
    const picId= req.params.id;
    const deletepic = await Upload.findByIdAndDelete(picId);

    if (!deletepic) {
      return res.status(404).json({ msg: "picture not found" });
  }

  // Delete the file from the filesystem
  const imagePath = path.join(__dirname, '../../frontend/public', deletepic.imageUrl);
  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Failed to delete picture file" });
    }
  });

  return res.status(200).json({ msg: "picture deleted successfully" });
  } catch (error) {
    console.error(error);
        return res.status(500).json({ msg: "Failed to delete pic" });
  }
}

module.exports = { uploadPicture , displayPictures, deletepicture};
