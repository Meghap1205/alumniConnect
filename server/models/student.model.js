const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  studentID: {
    type: String,
    required: true,
    unique: true,
  },

  contact: {
    type: Number,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },
  isAlumni:{
    type:Boolean,
    default:false,
  },
  
  profilePicture: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },

    graduationYear: {
        type: Number,
        default: null  // Default value for students
    },
    company: {
        type: String,
        default: ""  // Default value for students
    },
    startDate: {
        type: String,
        default: ""  // Default value for students
    },
    role: {
        type: String,
        default: ""  // Default value for students
    },
    linkedinUrl: {
        type: String,
        default: ""  // Default value for students
    },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
