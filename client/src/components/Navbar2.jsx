import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar2 = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setShow(false);
    } else {
      setShow(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] bg-white shadow-md rounded-2xl z-50 transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-24"
      }`}
    >
      <nav className="px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/navbar.png"
            alt="Logo"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
          <Link to="/about" className="hover:text-black transition">
            Testimonials
          </Link>
          <Link to="/contactus" className="hover:text-black transition">
            Contact Us
          </Link>
        </div>

        {/* Buttons when on /advertisement */}
        {location.pathname === "/advertisement" && (
          <div className="flex items-center gap-3">
            {/* Go Back Button */}
            <button
              onClick={() => navigate("/")}
              className="bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition 
                px-3 py-1 text-sm md:px-5 md:py-2 md:text-base"
            >
              Go Back
            </button>

            {/* Ask Help Button */}
        <button
      onClick={() => navigate("/askhelp")}
      className="bg-blue-600 text-white rounded-full hover:opacity-90 transition 
                 px-3 py-1 text-sm md:px-5 md:py-2 md:text-base"
    >
      Ask Help
    </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar2;
