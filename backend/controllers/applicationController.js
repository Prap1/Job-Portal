import { Application } from "../models/applicationModel.js";
import { Job } from "../models/jobModel.js";
import mongoose from "mongoose";
export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    console.log("Job ID from request:", jobId); // Debugging

    if (!jobId) {
      return res.status(400).json({
        message: "Job id is required",
        success: false,
      });
    }

    // Validate jobId
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        message: "Invalid job ID",
        success: false,
      });
    }

    // Check if the user has already applied for this job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }

    // Check if the job exists
    const job = await Job.findById(jobId);
    console.log("Job found:", job); // Debugging

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    // Create a new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    // Add the application to the job's applications array
    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "Application submitted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error in applyJob:", error); // Debugging
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const applications = await Application.find({
      applicant: userId,
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!applications.length) {
      return res.status(404).json({
        message: "No jobs applied",
        success: false,
      });
    }

    return res.status(200).json({
      applications,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const getApplicant = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
        select: "-password", // 👈 Exclude password field
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) { 
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false 
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
        success: false,
      });
    }

    // Validate the status
    const allowedStatuses = ["pending", "accepted", "rejected"];
    if (!allowedStatuses.includes(status.toLowerCase())) {
      return res.status(400).json({
        message: "Invalid status",
        success: false,
      });
    }

    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }

    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status updated successfully",
      application,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};