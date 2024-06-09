const express= require("express");
const { addevent, displayevent , deletevent, getevents} = require("../controllers/eventController");
const { getposts } = require("../controllers/gallery.controller");
const router = express.Router();

router.post("/addevent", addevent);
router.delete("/deleteevent/:id", deletevent);
router.get("/getevents", getevents);

module.exports = router;