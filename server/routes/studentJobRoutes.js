const express=require("express");
const {displayJobs, adminInsertJobs, adminDeleteJob, getJobs} = require("../controllers/studentJobController.js");
const { verifyToken } = require("../utils/verifyStudent.js");
const router = express.Router();

router.get("/displayjob", displayJobs);
router.post("/admin/insertjobs", adminInsertJobs);
router.delete("/admin/deleteJobs/:id", adminDeleteJob);
router.get("/getjobs", getJobs);

module.exports = router;