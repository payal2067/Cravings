import express from "express";
import { EditUserProfile } from "../controllers/user.controller.js";
import { AuthProtect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.put("/edit-profile", AuthProtect, EditUserProfile);

export default router;
