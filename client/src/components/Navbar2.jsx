import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar2 = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

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
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/navbar.png"
            alt="Logo"
            className="h-10 w-auto object-contain"
          />
        </Link>

        <div className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
          <Link to="/about" className="hover:text-black transition">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-black transition">
            Contact Us
          </Link>
        </div>

        {location.pathname === "/advertisement" && (
          <button className="bg-blue-600 text-white px-5 py-2 rounded-full hover:opacity-90 transition">
            Ask Help
          </button>
        )}
      </nav>
    </header>
  );
};

export default Navbar2;
