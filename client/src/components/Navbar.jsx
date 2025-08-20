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
      // Scrolling down → hide
      setShow(false);
    } else {
      // Scrolling up → show
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
          <img src="/navbar.png" alt="Logo" className="h-10 w-auto object-contain" />
        </Link>

        <div className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
          <a href="#services" className="hover:text-black transition">Features</a>
          <a href="#testimonials" className="hover:text-black transition">Highlights</a>
        </div>

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
  );
};

export default Navbar;
