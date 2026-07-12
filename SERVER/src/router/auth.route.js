import express from "express";
import {
  LoginUser,
  LogoutUser,
  RegisterUser,
  SendOtp,
  verifyOtp,
  ResetPassword,
} from "../controller/auth.controller.js";
import { OTPAuthProtect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", LoginUser);
router.post("/register", RegisterUser);
router.get("/logout", LogoutUser);

router.post("/send-otp", SendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", OTPAuthProtect, ResetPassword);

export default router;
