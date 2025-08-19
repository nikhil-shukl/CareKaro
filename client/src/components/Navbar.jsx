import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      {/* Navbar */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] bg-white shadow-md rounded-2xl z-50">
        <nav className="px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/navbar.png"
              alt="Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
            <a href="#services" className="hover:text-black transition">
              Services
            </a>
            <a href="#testimonials" className="hover:text-black transition">
              Highlights
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-black text-white px-5 py-2 rounded-full hover:opacity-80 transition">
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

      {/* 🔔 Headline Bar (separated with margin) */}
      <div className="fixed top-[88px] left-1/2 -translate-x-1/2 w-[95%] bg-white rounded-lg shadow-sm border border-gray-200 z-40 overflow-hidden mt-0.5">
        <marquee
          behavior="scroll"
          direction="left"
          scrollamount="4"
          onMouseOver={(e) => e.target.stop()}
          onMouseOut={(e) => e.target.start()}
          className="py-2 text-sm sm:text-base md:text-lg font-medium"
        >
          <span className="text-red-600 font-semibold">
            🔴 Shree Laxmi Hospital, Andheri (Mumbai) requires O+ blood units – contact
            Dr. Ramesh Patil at{" "}
            <a href="tel:+911812345678" className="underline">
              +91 18123 45678
            </a>
            .
          </span>

          &nbsp;&nbsp; | &nbsp;&nbsp;

          <span className="text-green-600 font-semibold">
            🟢 Sunrise Care Hospital, Thane is hiring Nurses & Ward Assistants – contact
            HR Priya Nair at{" "}
            <a href="tel:+911876543210" className="underline">
              +91 18765 43210
            </a>
            .
          </span>

          &nbsp;&nbsp; | &nbsp;&nbsp;

          <span className="text-blue-600 font-semibold">
            🔵 City Health Clinic, Navi Mumbai seeks volunteers for patient support – 
            contact Mr. Amit Sharma at{" "}
            <a href="tel:+911823456789" className="underline">
              +91 18234 56789
            </a>
            .
          </span>
        </marquee>
      </div>
    </>
  );
};

export default Navbar;

