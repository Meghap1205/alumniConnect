const Event = require("../models/eventModel");

const addevent = async (req, res) => {
    try {
        const { eventName, date, time, location, organizedBy, contactNo, description } = req.body;

        if (!eventName || !date || !time || !location || !organizedBy || !contactNo || !description) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newEvent = new Event({
            eventName,
            date,
            time,
            location,
            organizedBy,
            contactNo,
            description,
        });

        await newEvent.save();

        res.status(201).json({ message: "Event added successfully", event: newEvent });
    } catch (error) {
        console.error("Error adding event:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

const deletevent = async (req,res) => {
    try {
        const eventId = req.params.id;
        const deletedevent = await Event.findByIdAndDelete(eventId);
        if(!deletedevent){
            return res.status(404).json({ msg: "event not found" });
        }
        return res.status(200).json({ msg: "event deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error in deleting event. Please try again later." });
    }
};

const getevents = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const events = await Event.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalEvents = await Event.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthEvents = await Event.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      events,
      totalEvents,
      lastMonthEvents,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { addevent, deletevent, getevents };
