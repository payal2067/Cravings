 import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const UserDashboard = () => {
 const {user} = useAuth()

 


  return (
    <>
      <div>Welcome Back!! {userData.fullName}</div>
      <div>Welcome Back!! {userData.email}</div>
      <div>Welcome Back!! {userData.phone}</div>
      <div className="w-24 h-24 rounded-full overflow-hidden">
        <img
          src={userData.photo}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </>
  );
};

export default UserDashboard;