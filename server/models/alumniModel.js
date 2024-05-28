const mongoose = require("mongoose");

const alumniSchema = new mongoose.Schema({
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
    alumniID: {
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
    profilePicture: {
        type: String,
        default:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    jobTitle: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "",
    },

});

const Alumni = mongoose.model("Alumni", alumniSchema);

module.exports = Alumni;
