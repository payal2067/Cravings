 import express from "express";
 import multer from "multer";
 import { CustomerUpdateProfile , CustomerGetData } from "../controller/customer.controller.js";
 import { CustomerAuthProtect } from "../middlewares/auth.middleware.js";
 
 const upload = multer();
 const router = express.Router();
 
 router.post(
   "/update-profile",
   CustomerAuthProtect,
   upload.single("coverImage"),
   upload.array("customerImage", 10),
   CustomerUpdateProfile,
 );
 
 router.get("/get-customer-data", CustomerAuthProtect, CustomerGetData);
 
 export default router;