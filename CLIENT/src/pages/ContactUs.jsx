import React, { useState } from "react";
import deliveryboy from "../assets/delivery.jpg";
import { Link } from "react-router-dom";
const ContactUs = () => {
  const [contactData, setcontactData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [validateError, setValidateError] = useState();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setcontactData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here, e.g., send loginData to the server
    //Validate loginData

    console.log("contact data submitted:", contactData);

    const payload = {
      fullName: contactData.fullName,
      email: contactData.email.toLowerCase(),
      phone: contactData.phone,
      subject: contactData.subject,
      message: contactData.message,
    };
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
            Contact Us
          </div>
          <p class="text-center font">
            Have a question? We'd love to hear from you.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={contactData.fullName}
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
                value={contactData.email}
                placeholder="Enter your email"
                onChange={handleChange}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-(--error)"
              />
            </div>
            <br />
            <div className="flex flex-col gap-2">
              <input
                type="number"
                id="phone"
                name="phone"
                value={contactData.number}
                placeholder="Enter your phone number"
                onChange={handleChange}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-(--error)"
              />
            </div>
            <br />
            <div className="flex flex-col gap-2 mt-4">
              <input
                type="text"
                id="subject"
                name="subject"
                value={contactData.subject}
                placeholder="What is this about?"
                onChange={handleChange}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-(--error)"
              />
            </div>

            <br />
            <div className="mb-3">
              <textarea
                rows={4}
                name="message"
                value={contactData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none transition focus:border-orange-600 focus:ring-2 focus:ring-orange-200"
              ></textarea>
            </div>

            <br />
            <button
              type="submit"
              className="btn  w-full border-0 text-white bg-(--primary) py-2 px-4 rounded hover:bg-(--success)"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
