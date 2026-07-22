   import Admin from "../models/rider.model.js";
import {
  deleteMultipleImages,
  uploadMultipleImages,
  uploadSingleImage,
  deleteSingleImage,
} from "../utils/image.service.js";


export const RiderGetData = async (req, res, next) => {
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

    const RiderData = await Rider.find({ managerId });

    if (riderData) {
      res.status(200).json({
        message: "Rider Fetched Successfully",
        data: riderData,
      });
    } else {
      res.status(200).json({
        message: "No rider Data Found",
        data: {},
      });
    }
  } catch (error) {
    console.log(error.message);
    next();
  }
};

export const RiderUpdateProfile = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const riderDataFromFE = req.body;
    const coverImageFromFE = req.files?.coverImage;
    const riderImageFromFE = req.files?.riderImage;

    const dataKeys = Object.keys(riderDataFromFE);

    dataKeys.forEach((key) => {
      if (!riderDataFromFE[key]) {
        const error = new Error(`Missing required field: ${key}`);
        error.statusCode = 400;
        return next(error);
      }
    });

    const existingRider = await Rider.findOne({
      managerId: currentUser._id,
    });

    if (!existingRider) {
      if (coverImageFromFE) {
        const coverImage = await uploadSingleImage(
          coverImageFromFE,
          `rider/${currentUser.phone}/coverPhoto`,
        );
        dataKeys.push("coverImage");
        riderDataFromFE.coverImage = coverImage;
      }

      if (riderImageFromFE && riderImageFromFE.length > 0) {
        const riderImage = await uploadMultipleImages(
          riderImageFromFE,
          `rider/${currentUser.phone}/riderPhotos`,
        );
        dataKeys.push("riderImage");
        riderDataFromFE.riderImage = riderImage;
      }

      const newRider = await Rider.create({
        managerId: currentUser._id,
        ...riderDataFromFE,
      });
      return res.status(201).json({
        message: "Rider profile created successfully",
        data: newRider,
      });
    } else {
      if (coverImageFromFE) {
        await deleteSingleImage(existingRider.coverImage);

        const coverImage = await ploadSingleImage(
          coverImageFromFE,
          `rider/${currentUser.phone}/coverPhoto`,
        );
        dataKeys.push("coverImage");
       riderDataFromFE.coverImage = coverImage;
      }
      if (riderImageFromFE && riderImageFromFE.length > 0) {
        await deleteMultipleImages(existingRider.riderImage);

        const riderImage = await uploadMultipleImages(
          riderImageFromFE,
          `rider/${currentUser.phone}/riderPhotos`,
        );
        dataKeys.push("riderImage");
        riderDataFromFE.riderImage = riderImage;
      }
      dataKeys.forEach((key) => {
        existingRider[key] =
          riderDataFromFE[key] || existingRider[key];
      });
      await existingRider.save();
      return res.status(200).json({
        message: "Rider profile updated successfully",
        data: existingRider,
      });
    }
  } catch (error) {
    console.log(error.message);
    next();
  }
};
