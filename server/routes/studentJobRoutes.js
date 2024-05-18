const express=require("express");
const {displayJobs, adminInsertJobs, adminDeleteJob} = require("../controllers/studentDisplayJobController");
const router = express.Router();

router.get("/displayjob", displayJobs);
router.post("/admin/insertjobs", adminInsertJobs);
router.delete("/admin/deleteJobs/:id", adminDeleteJob);

module.exports = router;