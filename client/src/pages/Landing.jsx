import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Headline from "../components/Headline";
import Carousal from "../components/Carousal";
import Features from "../components/Features";
import Footer from "../components/Footer";
import HospitalMapLeaflet from "../components/HospitalMapLeaflet";
import Testimonials from "../components/testimonials";

const Landing = () => {

  const location = useLocation();

useEffect(() => {
  if (location.hash) {
    const target = document.getElementById(location.hash.substring(1));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }
}, [location]);


  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-[90px]">
      <Navbar />
      <Headline />
      <Carousal />
      <p className="mt-1 sm:p-6 text-center sm:text-lg text-gray-600">
        Sometimes it takes only one act of kindness and caring to change a person's life ~ 
        <span className="text-gray-900 font-semibold"> Jackie Chan</span>
      </p>
      <Features />
<div id="hospital-map">
  <HospitalMapLeaflet />
</div>
<div id="testimonial">
  <Testimonials />
</div>

      <Footer />
    </div>
  );
};

export default Landing;
