  import express from "express";
  import multer from "multer";
  import { AdminUpdateProfile , AdminGetData } from "../controller/admin.controller.js";
  import { AdminAuthProtect } from "../middlewares/auth.middleware.js";
  
  const upload = multer();
  const router = express.Router();
  
  router.post(
    "/update-profile",
    AdminAuthProtect,
    upload.single("coverImage"),
    upload.array("adminImage", 10),
   AdminUpdateProfile,
  );
  
  router.get("/get-admin-data", AdminAuthProtect, AdminGetData);
  
  export default router;