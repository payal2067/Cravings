import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  FaShoppingBag,
  FaHeart,
  FaMapMarkerAlt,
  FaCog,
  FaSignOutAlt,
  FaEnvelope,
  FaPhone,
  FaUser,
  FaUserTag,
} from "react-icons/fa";

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setUserData(JSON.parse(sessionStorage.getItem("UserData")));
  }, []);

  if (!userData) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="min-h-[70vh] bg-(--background) py-8 px-5">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-(--primary)">
              Welcome Back, {userData.fullName}!
            </h1>

            <p className="text-gray-600 mt-3 text-lg">Ready to order</p>
          </div>

          <div className="mt-10 flex  flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-(--primary) shadow-lg">
              <img
                src={userData.photo}
                alt={userData.fullName}
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="text-2xl font-bold text-(--text) mt-5">
              {userData.fullName}
            </h2>
          </div>

          <div className=" flex flex-col grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <div className="bg-(--background) rounded-2xl p-5 shadow-md">
              <h3 className="justify-center items-center gap-2 text-sm font-semibold text-gray-500 uppercase">
                <FaUser className="text-(--primary)" />
                Full Name
              </h3>

              <p className="text-xl font-semibold text-(--text) mt-2">
                {userData.fullName}
              </p>
            </div>

            <div className="bg-(--background) rounded-2xl p-5 shadow-md">
              <h3 className="justify-center items-center gap-2 text-sm font-semibold text-gray-500 uppercase">
                <FaEnvelope className="text-(--primary)" />
                Email
              </h3>

              <p className="text-xl font-semibold text-(--text) mt-2 break-all">
                {userData.email}
              </p>
            </div>

            <div className="bg-(--background) rounded-2xl p-5 shadow-md">
              <h3 className="justify-center items-center gap-2 text-sm font-semibold text-gray-500 uppercase">
                <FaPhone className="text-(--primary)" />
                Phone
              </h3>

              <p className="text-xl font-semibold text-(--text) mt-2">
                {userData.phone}
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-12">

            <button  className="flex items-center gap-2 bg-(--primary) text-white px-8 py-3 rounded-xl font-semibold hover:bg-(--secondary) transition duration-300">
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
