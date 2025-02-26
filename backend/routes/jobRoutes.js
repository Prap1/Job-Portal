import express from "express";

import Authenticated from "../middleware/Authenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/jobController.js";

const router = express.Router();
router.route("/post").post(Authenticated,postJob)
router.route("/get").get(Authenticated,getAllJobs)
router.route("/getAdminjob").get(Authenticated,getAdminJobs)
router.route("/get/:id").get(Authenticated,getJobById)
export default router;