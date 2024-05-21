const express= require("express");
const { addevent, displayevent , deletevent} = require("../controllers/eventController");
const router = express.Router();

router.post("/addevent", addevent);
router.get("/displayevent", displayevent);
router.delete("/deleteevent/:id", deletevent);

module.exports = router;