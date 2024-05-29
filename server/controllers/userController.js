const Student = require("../models/student.model");
const Alumni = require("../models/alumniModel");

const displayStudent = async(req,res)=> {
    try {
        const data = await Student.find();
        res.status(200).json({student : data});
    } catch (error) {
        res.status(500).json({ message: "Server error in displaying users. Please try again later." });
    }
}

const displayAlumni = async(req,res)=> {
    try {
        const data = await Alumni.find();
        res.status(200).json({alumni : data});
    } catch (error) {
        res.status(500).json({ message: "Server error in displaying users. Please try again later." });
    }
}

module.exports = {displayStudent, displayAlumni}