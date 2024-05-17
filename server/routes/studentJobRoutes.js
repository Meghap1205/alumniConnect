const express=require("express");
const displayJobs = require("../controllers/studentDisplayJobController");
const router = express.Router();

router.get("/displayjob", displayJobs);

module.exports = router;