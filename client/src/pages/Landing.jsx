import React from "react";
import Navbar from "../components/Navbar";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      <div className="p-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Landing Page</h1>
        <p className="mt-4 text-lg text-gray-600">
          This is your beautiful landing page with Clerk authentication.
        </p>
      </div>
    </div>
  );
};

export default Landing;
