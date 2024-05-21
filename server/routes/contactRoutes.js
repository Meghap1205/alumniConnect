const express = require("express");
const { addcontact, displayconatct, deleteconatct } = require("../controllers/contactController");
const router = express.Router();

router.post("/addcontact", addcontact);
router.get("/displaycontact", displayconatct);
router.delete("/deletecontact/:id", deleteconatct);

module.exports = router;
