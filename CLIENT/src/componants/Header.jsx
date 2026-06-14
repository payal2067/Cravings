import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <div className="bg-(--secondary) flex text-(--primary-text) p-3 justify-between">
        <div className="text-(--primary-text)">Craving</div>
       <div className="gap-6 flex ">
         <Link to={"/"} className="hover:underline hover:text-(--accent)">
          Home
        </Link>
        <Link to={"/login"} className="hover:underline hover:text-(--accent)">
          Login
        </Link>
        <Link to={"/register"} className="hover:underline hover:text-(--accent)">
          Register
        </Link>
        <Link to={"/contact-us"} className="hover:underline hover:text-(--accent)">
          ContactUs
        </Link>
       </div>
      </div>
    </>
  );
};

export default Header;
