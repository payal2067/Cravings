import User from "../models/user.model";
import bcrypt from "bcrypt";

const UserData = [
  {
    fullName: "Manager",
    email: "manager@gmail.com",
    password: await bcrypt.hash("manager@123", 10),
    dob: "2001-01-12",
    gender: "Female",
    userType: "restaurant",
    phone: "8103731264",
    photo: { url: "https://placehold.co/600x400?text=M", publicId: null },
  },
  {
    fullName: "Customer",
    email: "customer@gmail.com",
    password: await bcrypt.hash("customer@123", 10),
    dob: "2001-09-19",
    gender: "Female",
    userType: "customer",
    phone: "8103731264",
    photo: { url: "https://placehold.co/600x400?text=C", publicId: null },
  },
  {
    fullName: "Rider",
    email: "rider@gmail.com",
    password: await bcrypt.hash("rider@123", 10),
    dob: "2003-08-01",
    gender: "other",
    userType: "rider",
    phone: "7470921712",
    photo: { url: "https://placehold.co/600x400?text=R", publicId: null },
  },
];

const userSeed = async () => {
  try {
    //Seeding Restaurant
    const existingRestaurant = await User.findOne({ email: UserData[0].email });

    if (existingRestaurant) {
      console.log("Existing Restaurant Found");
      console.log("Deleting Existing Restaurant");
      await existingRestaurant.deleteOne();
    }
    console.log("Creating New Restaurant");

    const newRestaurant = await User.create(UserData[0]);
    console.log("Restaurant Created Sucessfully");

     //Seeding Customer

    const existingCustomer = await User.findOne({ email: UserData[1].email });

    if (existingCustomer) {
      console.log("Existing Customer Found");
      console.log("Deleting Existing Customer");
      await existingCustomer.deleteOne();
    }

    console.log("Creating New Customer");

    const newCustomer = await User.create(UserData[1]);
    console.log("Customer Created Sucessfully");

    // Seeding Rider

    const existingRider = await User.findOne({ email: UserData[2].email });

    if (existingRider) {
      console.log("Existing Rider Found");
      console.log("Deleting Existing Rider");
      await existingRider.deleteOne();
    }

    console.log("Creating New Rider");

    const newRider = await User.create(UserData[2]);
    console.log("Rider Created Sucessfully");
  } catch (error) {
    console.log("User Not Created");
    throw error;
  }
  
};
export default userSeed;
