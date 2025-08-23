import React, { useState, useEffect } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setShow(false); // scrolling down → hide
    } else {
      setShow(true); // scrolling up → show
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
      <nav className="px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/navbar.png"
            alt="Logo"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
          <a
            href="#hospital-map"
            className="hover:text-black transition"
          >
            Nearby Hospitals
          </a>
          <a
            href="#testimonial"
            className="hover:text-black transition"
          >
            Testimonials
          </a>
          <a href="#about" className="hover:text-black transition">
            About Us
          </a>
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center space-x-2">
          {/* About Button - only visible on small screens */}
          <a
            href="#about"
            className="text-gray-700 text-sm px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 transition md:hidden"
          >
            About
          </a>

          {/* Login / User button */}
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-black text-white px-4 py-1 rounded-full hover:opacity-80 transition text-sm md:text-base">
                Login
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

