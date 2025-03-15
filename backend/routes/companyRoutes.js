import express from "express";

import Authenticated from "../middleware/Authenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/companyController.js";
import { singleUpload } from "../middleware/multer.js";
const router = express.Router();
router.route("/add/company").post(Authenticated,registerCompany);
router.route("/update/:id").put(Authenticated,singleUpload,updateCompany);
router.route("/get/company").get(Authenticated,getCompany);
router.route("/get/:id").get(Authenticated,getCompanyById);

export default router;