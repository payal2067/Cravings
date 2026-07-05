import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import CustomerDashboard from "./pages/dashboard/CustomerDashboard";
// import OrderNow from "./pages/OrderNow";
const App = () => {
  return (
    <>
      
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact-us" element={<ContactUs />} />

          {/* Dashboard Routes */}
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        </Routes>
        <Footer />
      
    </>
  );
};

export default App;
