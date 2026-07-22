   import express from "express";
   import multer from "multer";
   import { RiderUpdateProfile , RiderGetData } from "../controller/rider.controller.js";
   import { RiderAuthProtect } from "../middlewares/auth.middleware.js";
   
   const upload = multer();
   const router = express.Router();
   
   router.post(
     "/update-profile",
     RiderAuthProtect,
     upload.single("coverImage"),
     upload.array("riderImage", 10),
    RiderUpdateProfile,
   );
   
   router.get("/get-rider-data", RiderAuthProtect, RiderGetData);
   
   export default router;