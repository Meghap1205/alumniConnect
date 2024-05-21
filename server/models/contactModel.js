const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  phoneNo: {
    type: String,
    required: true
  },
  issueDescription: {
    type: String,
    required: true
  }
});

const ContactModel = mongoose.model("Contact", contactSchema);

module.exports = ContactModel;
