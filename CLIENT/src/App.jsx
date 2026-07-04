import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import UserDashboard from "../src/pages/dashboard/UserDashboard"
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact-us" element={<ContactUs />} />

          {/* Dashboard Routes */}
          <Route path="/user/dashboard" element={<UserDashboard />} /> 
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
