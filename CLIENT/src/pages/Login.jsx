import React, { useState } from "react";
import { Link } from "react-router-dom";
import deliveryboy from "../assets/delivery.jpg";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [validateError, setValidateError] = useState();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here, e.g., send loginData to the server
    //Validate loginData

    console.log("Login data submitted:", loginData);

    const payload = {
      email: loginData.email.toLowerCase(),
      password: loginData.password,
    };
  };

  return (
    <>
      <div className="h-[90vh] bg-linear-to-l from-(--secondary) to-(--primary) grid grid-cols-2 p-10  ">
        <div className="hidden md:block mt-24 mx-16">
          <img src={deliveryboy} alt="" className="rotate-y-200" />
        </div>
        <div className="w-md bg-(--primary-content) rounded shadow p-10 flex flex-col justify-center">
          <div className="text-center text-4xl text-(--primary)">Welcome Back!</div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-(--error)"
              />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-(--error)"
              />
            </div>
            <br />
            <div className="flex justify-between">
              <label>
                <input className="checkbox " type="checkbox" />
                Remember me
              </label>

              <Link to="/login" className="text-(--primary) hover:underline">
                Forgot Password?
              </Link>
            </div>
            <br />
            <button
              type="submit"
              className="btn  w-full border-0 text-white bg-(--primary) py-2 px-4 rounded hover:bg-(--success)"
            >
              Login
            </button>
            <br />
            <br/>
            <div className="flex gap-3 w-full items-center justify-center">
              <hr className="border  border-olive-400 text-( --primary) w-20" />

              <p className="text-center flex">Don't have an account?</p>
              <hr className="border border-olive-400 text-( --primary) w-20" />
            </div>
            <br />
            <p className=" text-center">
              <Link to="/register" className="text-(--primary) hover:underline">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
