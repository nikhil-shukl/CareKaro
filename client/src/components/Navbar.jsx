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

    </>
  );
};

export default Navbar;

