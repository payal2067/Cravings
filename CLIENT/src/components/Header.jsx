import React from "react";
import { Link, useNavigate } from "react-router-dom";
import headerlogo from "../assets/images/header-logo.png";
import { useAuth } from "../context/AuthContext.jsx";
import { AiOutlineLogout } from "react-icons/ai";
import api from "../config/api.config.js";
import toast from "react-hot-toast";

const Header = () => {
  const { user, setUser, isLogin, setIsLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await api.get("/auth/logout");
      sessionStorage.removeItem("UserData");
      setIsLogin(false);
      setUser(false);
      navigate("/");
      toast.success(res.data.message);
    } catch (error) {
      toast.error(
        error.response.status + " | " + error.response?.data?.message ||
          error.message,
      );
    }
  };

  return (
    <>
      <div className="navbar p-2 z-50 flex top-0 items-center  sticky justify-between bg-(--primary)">
        <div className="px-8">
          <Link to={"./"}>
            <img src={headerlogo} alt="Login" className="header-img w-20 " />
          </Link>
        </div>

        <div className="btn flex gap-6 px-8 items-center">
          <Link to={"/"}>
            <button className="btn text-(--base-100) outline-none hover:bg-transparent hover:underline">
              Home
            </button>
          </Link>
          <Link to={"/contact-us"}>
            <button className="btn text-(--base-100) outline-none hover:bg-transparent hover:underline">
              ContactUs
            </button>
          </Link>
          {isLogin ? (
            <div className="border-s-2 flex justify-center items-center gap-4 px-4">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src={user.photo}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <Link
                to={"/user/dashboard"}
                className="hover:underline hover:text-white"
              >
                {user.fullName}
              </Link>
              <button
                onClick={handleLogout}
                className="text-(--success) hover:text-(--base-content)"
              >
                <AiOutlineLogout />
              </button>
            </div>
          ) : (
            <>
              <Link to={"/login"}>
                <button className="btn text-(--base-100) outline-none hover:bg-transparent hover:underline">
                  Login
                </button>
              </Link>
              <Link to={"/register"}>
                <button className="btn text-(--primary) bg-white rounded-md px-5 py-2 ">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
