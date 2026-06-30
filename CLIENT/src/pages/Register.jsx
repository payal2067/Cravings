import React, { useState } from "react";
import deliveryboy from "../assets/delivery.jpg";
import { Link } from "react-router-dom";
import api from "../config/api.config.js";
import { Toaster } from "react-hot-toast";
const Register = () => {
  const [registerData, setregisterData] = useState({
    fullName: "",
    email: "",
    number: "",
    password: "",
  });

  const [validateError, setValidateError] = useState();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setregisterData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here, e.g., send loginData to the server
    //Validate loginData

    console.log("register data submitted:", registerData);

    const payload = {
      fullName: registerData.fullName,
      email: registerData.email.toLowerCase(),
      number: registerData.number,
      password: registerData.password,
    };

    try {
      const res = await api.post("/auth/register", payload);
      alert(res.data.message);
    } catch (error) {
      console.log(res?.data?.message || error.message);
    }
  };

  return (
    <>
      <div className="h-[90vh] bg-linear-to-l from-(--secondary) to-(--primary) grid grid-cols-2 p-10  ">
        <div className="hidden md:block mt-24 mx-16">
          <img src={deliveryboy} alt="" className="rotate-y-200" />
        </div>
        <div className="w-md bg-(--primary-content) rounded shadow p-10 flex flex-col justify-center">
          <div className="text-center text-4xl text-(--primary)">
            {" "}
            Create Account
          </div>
          <p className="text-center font">
            Join us as a Customer, Restaurant, or Rider
          </p>

          <form onSubmit={handleSubmit}>
         
            <div className="flex flex-col gap-2">
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={registerData.fullName}
                placeholder="Enter your full name"
                onChange={handleChange}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-(--error)"
              />
            </div>
            <br />

            <div className="flex flex-col gap-2">
              <input
                type="email"
                id="email"
                name="email"
                value={registerData.email}
                placeholder="Enter your email"
                onChange={handleChange}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-(--error)"
              />
            </div>
            <br />
            <div className="flex flex-col gap-2">
              <input
                type="number"
                id="number"
                name="number"
                value={registerData.number}
                placeholder="Enter your phone number"
                onChange={handleChange}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-(--error)"
              />
            </div>
            <br />
            <div className="flex flex-col gap-2 mt-4">
              <input
                type="password"
                id="password"
                name="password"
                value={registerData.password}
                placeholder="Enter your password"
                onChange={handleChange}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-(--error)"
              />
            </div>
            <br />
            <div >
              <input type="checkbox" className="checkbox" /> I agree to the
              <span className="text-(--primary)"> terms and conditions</span>
            </div>
            <br />
            <button
              type="submit"
              className="btn  w-full border-0 text-white bg-(--primary) py-2 px-4 rounded hover:bg-(--success)"
            >
              Register
            </button>
            <br />
            <br />
            <div className="flex gap-3 w-full items-center justify-center">
              <p className="text-center flex">
                {" "}
                Already have an account?{" "}
                <Link to="/login" className="text-(--primary) hover:underline">
                  Login here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
