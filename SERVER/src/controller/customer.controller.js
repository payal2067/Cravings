 import Customer from "../models/customer.model.js";
import {
  deleteMultipleImages,
  uploadMultipleImages,
  uploadSingleImage,
  deleteSingleImage,
} from "../utils/image.service.js";


export const CustomerGetData = async (req, res, next) => {
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

    const customerData = await Customer.find({ managerId });

    if (customertData) {
      res.status(200).json({
        message: "Customer Fetched Successfully",
        data: customertData,
      });
    } else {
      res.status(200).json({
        message: "No customer Data Found",
        data: {},
      });
    }
  } catch (error) {
    console.log(error.message);
    next();
  }
};

export const CustomerUpdateProfile = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const customerDataFromFE = req.body;
    const coverImageFromFE = req.files?.coverImage;
    const customerImageFromFE = req.files?.customerImage;

    const dataKeys = Object.keys(customerDataFromFE);

    dataKeys.forEach((key) => {
      if (!customerDataFromFE[key]) {
        const error = new Error(`Missing required field: ${key}`);
        error.statusCode = 400;
        return next(error);
      }
    });

    const existingCustomer = await Customer.findOne({
      managerId: currentUser._id,
    });

    if (!existingCustomer) {
      if (coverImageFromFE) {
        const coverImage = await uploadSingleImage(
          coverImageFromFE,
          `customer/${currentUser.phone}/coverPhoto`,
        );
        dataKeys.push("coverImage");
        customerDataFromFE.coverImage = coverImage;
      }

      if (customerImageFromFE && customerImageFromFE.length > 0) {
        const customerImage = await uploadMultipleImages(
          customerImageFromFE,
          `customer/${currentUser.phone}/customerPhotos`,
        );
        dataKeys.push("customerImage");
        customerDataFromFE.customerImage = customerImage;
      }

      const newCustomer = await Customer.create({
        managerId: currentUser._id,
        ...customerDataFromFE,
      });
      return res.status(201).json({
        message: "Customer profile created successfully",
        data: newCustomer,
      });
    } else {
      if (coverImageFromFE) {
        await deleteSingleImage(existingCustomer.coverImage);

        const coverImage = await ploadSingleImage(
          coverImageFromFE,
          `customer/${currentUser.phone}/coverPhoto`,
        );
        dataKeys.push("coverImage");
        customerDataFromFE.coverImage = coverImage;
      }
      if (customerImageFromFE && customerImageFromFE.length > 0) {
        await deleteMultipleImages(existingCustomer.customerImage);

        const customerImage = await uploadMultipleImages(
          customerImageFromFE,
          `customer/${currentUser.phone}/customerPhotos`,
        );
        dataKeys.push("customerImage");
        customerDataFromFE.customerImage = customerImage;
      }
      dataKeys.forEach((key) => {
        existingCustomer[key] =
          customerDataFromFE[key] || existingCustomer[key];
      });
      await existingCustomer.save();
      return res.status(200).json({
        message: "Customer profile updated successfully",
        data: existingCustomer,
      });
    }
  } catch (error) {
    console.log(error.message);
    next();
  }
};
