const ContactModel = require("../models/contactModel");

const addcontact = async (req, res) => {
  try {
    const { name, email, phoneNo, issueDescription } = req.body;

    if (!name || !email || !phoneNo || !issueDescription) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newContact = new ContactModel({
      name,
      email,
      phoneNo,
      issueDescription
    });

    await newContact.save();
    return res.status(201).json({ message: "Contact added successfully", contact: newContact });
  } catch (error) {
    console.error("Error adding contact:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const displayconatct = async (req,res) => {
  try {
    const contacts = await ContactModel.find();
    return res.status(200).json({ contacts });
  } catch (error) {
    console.error("Error displaying contacts:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
}

const deleteconatct = async (req,res) => {
  try {
    const contactId = req.params.id;
    const deletedContact = await ContactModel.findByIdAndDelete(contactId);

    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
}

module.exports = { addcontact , displayconatct, deleteconatct};
