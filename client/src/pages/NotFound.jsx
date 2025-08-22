import React from "react";
import { Link } from "react-router-dom";

import { Home, Phone } from "lucide-react";


export default function NotFound() {
  return (

    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white px-6 py-10">
      
      {/* Left Section (Text) */}
      <div className="max-w-lg text-center md:text-left">
        <h1 className="text-7xl font-extrabold text-gray-900">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mt-2">
          Page Critical Condition!
        </h2>
        <p className="text-gray-600 mt-4">
          Looks like this page has gone into the ICU 🔍. <br />
          Let’s take you back to the healthy pages.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-blue-500 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition"
          >
            <Home className="w-5 h-5" /> Back to Home
          </Link>
          <a
            href="mailto:support@carekaro.com"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
          >
            <Phone className="w-5 h-5" /> Contact Support
          </a>
        </div>

        <p className="text-gray-500 text-sm mt-6">
          Don’t worry, our doctors (developers) are trying to revive this page.
        </p>
      </div>




      {/* Right Section (Illustration) */}
      <div className="mt-10 md:mt-0 md:ml-12">
        <img
          src="/doctor-illustration.png"
          alt="Doctor Illustration"
          className="w-80 md:w-96"
        />
      </div>
    </div>
  );
};

export default NotFound;


