import express from "express";
import {
  LoginUser,
  LogoutUser,
  RegisterUser,
  SendOtp,
  verifyOtp,
  ResetPassword
} from "../controller/auth.controller.js";


const router = express.Router();

router.post("/login", LoginUser);
router.post("/register", RegisterUser);
router.get("/logout", LogoutUser);

router.post("/send-otp", SendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", ResetPassword);

export default router;
