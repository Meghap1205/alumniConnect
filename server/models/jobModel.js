const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    companyname: {
        type: String,
        require: true,
    },
    location: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        require: true,
    },
    requireskills: {
        type: String,
        default: null,
    },
    coursespecialization: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

    websiteUrl: {
        type: String, 
        default: null,
    },

});

const job = mongoose.model("job", jobSchema);

module.exports = job;