const Alumni = require("../models/alumniModel");

const getAllAlumni = async (req, res) => {
  try {
    const data = await Alumni.find();
    res.status(200).json({alumni : data});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAlumniByCompany = async (req, res) => {
  try {
    const { companyname } = req.params;
    const data = await Alumni.find({ company: companyname });
    res.status(200).json({ alumni: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {getAllAlumni, getAlumniByCompany};
