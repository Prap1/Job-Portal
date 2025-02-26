import express from "express";

import Authenticated from "../middleware/Authenticated.js";
import { applyJob, getApplicant, getAppliedJobs, updateStatus } from "../controllers/applicationController.js";
const router = express.Router();
router.route("/apply/:id").get(Authenticated,applyJob);
router.route("/getJob").get(Authenticated,getAppliedJobs);
router.route("/:id/getApplicant").get(Authenticated,getApplicant);
router.route("/status/:id/update").post(Authenticated,updateStatus);

export default router;