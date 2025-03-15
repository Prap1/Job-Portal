import { Job } from "../models/jobModel.js";

export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experienceLevel, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experienceLevel || !position || !companyId) {
            return res.status(400).json({
                message: "Please fill all the fields",
                success: "false"
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements,
            salary,
            location,
            jobType,
            experienceLevel,
            position,
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: "Job posted successfully",
            success: "true",
            job
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            success: "false",
            error: error.message
        });
    }
};

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        };

        const jobs = await Job.find(query).populate({
            path: "company",
        }).sort({
            createdAt:-1
        });

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: "No jobs found",
                success: "false"
            });
        }

        return res.status(200).json({
            message: "Jobs found",
            success: "true",
            jobs
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            success: "false",
            error: error.message
        });
    }
};

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: "false"
            });
        }

        return res.status(200).json({
            message: "Job found",
            success: "true",
            job
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            success: "false",
            error: error.message
        });
    }
};

export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path : 'company',
            createdAt:-1
        });

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: "No jobs found",
                success: "false"
            });
        }

        return res.status(200).json({
            message: "Jobs found",
            success: "true",
            jobs
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            success: "false",
            error: error.message
        });
    }
};
