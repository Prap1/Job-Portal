import express from "express";

import Authenticated from "../middleware/Authenticated.js";
import { login, logout, register, updateProfile } from "../controllers/userController.js";
import { singleUpload } from "../middleware/multer.js";
const router = express.Router();
router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/update-profile").post(Authenticated,singleUpload,updateProfile);
router.route("/logout").post(logout);

export default router;