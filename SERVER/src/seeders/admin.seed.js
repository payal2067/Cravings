import User from "../models/user.model";
import bcrypt from "bcrypt";

const AdminUser = {
  fullName: "Admin",
  email: "admin@cravings.com",
  password: await bcrypt.hash("StrongPassword@rICR", 10),
  dob: "2001-01-12",
  gender: "Female",
  userType: "admin",
  phone: "8103731264",
  photo: { url: "https://placehold.co/600x400?text=A", publicId: null },
};

const adminSeed = async () => {
    try {
        const existingAdmin = await User.findOne({email:AdminUser.email})
        if(existingAdmin){
            console.log("Existing User Found");
            console.log("DEleting Exiting User");
            await existingAdmin.deleteOne();
            
            
        }
        console.log("Creating New Admin");
        
        
    } catch (error) {
        console.log("Admin Not Created");
        throw error;
        
    }
}

export default adminSeed;