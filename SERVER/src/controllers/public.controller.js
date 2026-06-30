import Contact from "../models/contact.model.js";
import bcrypt from "bcrypt";
export const ContactUs = async (req, res, next) => {
  try {
    //Controller Logic
    const { fullName, email, phone, subject, message } = req.body;
    if (!fullName || !email || !phone || !subject || !message) {
      const error = new Error("All fields Required");
      error.statusCode = 400;
      return next(error);
    }
    const NewContactMessage = await Contact.create({
      fullName,
      email,
      phone,
      subject,
      message,
    });
    res.status(201).json({
      message: "Thanks for Contacting us! you will hear Back from us Soon",
    });
  } catch (error) {
    console.log(error.message);
    next();
  }
};
export default ContactUs;
