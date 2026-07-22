  import Admin from "../models/admin.model.js";
import {
  deleteMultipleImages,
  uploadMultipleImages,
  uploadSingleImage,
  deleteSingleImage,
} from "../utils/image.service.js";


export const AdminGetData = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const managerId = req.query.id;

    console.log("Current User:", currentUser);
    console.log("Manager ID:", managerId);

    if (currentUser._id.toString() !== managerId) {
      const error = new Error("Unauthorized Access");
      error.statusCode = 401;
      return next(error);
    }

    const AdminData = await Admin.find({ managerId });

    if (adminData) {
      res.status(200).json({
        message: "Admin Fetched Successfully",
        data: adminData,
      });
    } else {
      res.status(200).json({
        message: "No admin Data Found",
        data: {},
      });
    }
  } catch (error) {
    console.log(error.message);
    next();
  }
};

export const AdminUpdateProfile = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const adminDataFromFE = req.body;
    const coverImageFromFE = req.files?.coverImage;
    const adminImageFromFE = req.files?.adminImage;

    const dataKeys = Object.keys(adminDataFromFE);

    dataKeys.forEach((key) => {
      if (!adminDataFromFE[key]) {
        const error = new Error(`Missing required field: ${key}`);
        error.statusCode = 400;
        return next(error);
      }
    });

    const existingAdmin = await Admin.findOne({
      managerId: currentUser._id,
    });

    if (!existingAdmin) {
      if (coverImageFromFE) {
        const coverImage = await uploadSingleImage(
          coverImageFromFE,
          `admin/${currentUser.phone}/coverPhoto`,
        );
        dataKeys.push("coverImage");
        adminDataFromFE.coverImage = coverImage;
      }

      if (adminImageFromFE && adminImageFromFE.length > 0) {
        const adminImage = await uploadMultipleImages(
          adminImageFromFE,
          `admin/${currentUser.phone}/adminPhotos`,
        );
        dataKeys.push("adminImage");
        adminDataFromFE.adminImage = adminImage;
      }

      const newAdmin = await Admin.create({
        managerId: currentUser._id,
        ...adminDataFromFE,
      });
      return res.status(201).json({
        message: "Admin profile created successfully",
        data: newAdmin,
      });
    } else {
      if (coverImageFromFE) {
        await deleteSingleImage(existingAdmin.coverImage);

        const coverImage = await ploadSingleImage(
          coverImageFromFE,
          `admin/${currentUser.phone}/coverPhoto`,
        );
        dataKeys.push("coverImage");
       adminDataFromFE.coverImage = coverImage;
      }
      if (adminImageFromFE && adminImageFromFE.length > 0) {
        await deleteMultipleImages(existingAdmin.adminImage);

        const adminImage = await uploadMultipleImages(
          adminImageFromFE,
          `admin/${currentUser.phone}/adminPhotos`,
        );
        dataKeys.push("adminImage");
        adminDataFromFE.adminImage = adminImage;
      }
      dataKeys.forEach((key) => {
        existingAdmin[key] =
          adminDataFromFE[key] || existingAdmin[key];
      });
      await existingAdmin.save();
      return res.status(200).json({
        message: "Admin profile updated successfully",
        data: existingAdmin,
      });
    }
  } catch (error) {
    console.log(error.message);
    next();
  }
};
