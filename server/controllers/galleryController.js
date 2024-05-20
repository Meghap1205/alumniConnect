const path = require("path");
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

module.exports = { uploadPicture , displayPictures};
