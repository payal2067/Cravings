import React from "react";
import { Link } from "react-router-dom";
import headerlogo from "../assets/images/header-logo.png";
import { useAuth } from "../context/AuthContext";
const Header = () => {

  const {user, islogin}
  return (
    <>
      <div className="navbar p-2 z-50 flex top-0 items-center  sticky justify-between bg-(--primary)">
        <div className="px-8">
          <Link to={"./"}>
            <img src={headerlogo} alt="Login" className="header-img w-20 " />
          </Link>
        </div>

        <div className="btn flex gap-6 px-8 items-center">
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
          <Link to={"/contact-us"}>
            <button className="btn text-(--base-100) outline-none hover:bg-transparent hover:underline">
              ContactUs
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
