const Job = require("../models/jobModel.js");
const errorHandler = require("../utils/error");

const displayJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        if (!jobs || jobs.length === 0) {
            return res.status(404).json({ message: "No jobs found" });
        }
        return res.status(200).json(jobs);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Failed to fetch jobs" });
    }
};

const adminInsertJobs = async (req, res) => {
    try {
        const data = req.body;
        const insertedJob = await Job.create(data);
        return res.status(201).json({ job: insertedJob });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Failed to insert job" });
    }
};

const adminDeleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const deletedJob = await Job.findByIdAndDelete(jobId);
        if (!deletedJob) {
            return res.status(404).json({ msg: "Job not found" });
        }
        return res.status(200).json({ msg: "Job deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Failed to delete job" });
    }
};

const getJobs = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const jobs = await Job.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalJobs = await Job.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthJobs = await Job.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      jobs,
      totalJobs,
      lastMonthJobs,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { displayJobs, adminInsertJobs, adminDeleteJob, getJobs };
