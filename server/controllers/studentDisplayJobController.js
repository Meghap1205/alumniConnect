const Job = require("../models/jobModel.js");

const displayJobs = async (req, res) => {
    try {
        const jobs = await Job.find();

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({ message: "no jobs found" });
        }
        return res.status(200).json(jobs);

    } catch (error) {
        console.error("Error fetching jobs:", error);
        return res.status(500).json({ msg: "not fetching jobs" });
    }
};

module.exports = displayJobs;
