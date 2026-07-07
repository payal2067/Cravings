import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.config.js";

export const EditUserProfile = async (req, res, next) => {
  try {
    const { email, fullName, phone } = req.body;
    const newPhoto = req.file;
    console.log(1);

    console.log("Req Body :", req.body);
    console.log("Req File :", req.file);
    console.log(2);

    if (!email || !fullName || !phone) {
      const error = new Error("All fields Required");
      error.statusCode = 400;
      return next(error);
    }
    console.log(3);

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const error = new Error("Email not registred");
      error.statusCode = 404;
      return next(error);
    }
    console.log(4);

    if (newPhoto) {
      existingUser?.photo?.publicId &&
        (await cloudinary.uploader.destroy(existingUser.photo.publicId));

      const b64 = Buffer.from(newPhoto.buffer).toString("base64");
      const dataURI = `data:${newPhoto.mimetype};base64,${b64}`;
      // console.log(dataURI.slice(0, 100));
      console.log(5);

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "Cravings678/profile",
        width: 500,
        height: 500,
        crop: "fill",
      });
      console.log(6);

      console.log(result);
      existingUser.photo.url = result.secure_url;
      existingUser.photo.publicId = result.public_id;
    }
    console.log(7);

    existingUser.fullName = fullName;
    existingUser.phone = phone;
    console.log(8);

    await existingUser.save();
    console.log(9);

    res
      .status(200)

      .json({ message: "User Updated Sucessfully", data: existingUser });
  } catch (error) {
    console.log(error.message);
    next();
  }
  console.log(10);
};
