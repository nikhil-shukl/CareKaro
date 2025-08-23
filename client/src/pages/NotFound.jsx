import React from "react";
import { Link } from "react-router-dom";
import { Home, Phone } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white px-6 md:px-16 lg:px-32 py-10 md:py-20">
      
      <div className="max-w-xl md:max-w-2xl text-center md:text-left">
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-extrabold text-gray-900">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mt-4">
          Page Critical Condition!
        </h2>
        <p className="text-gray-600 mt-6 text-base md:text-lg lg:text-xl leading-relaxed">
          Looks like this page has gone into the ICU 🔍. <br />
          Let’s take you back to the healthy pages.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 border-2 border-blue-500 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition text-base md:text-lg"
          >
            <Home className="w-5 h-5 md:w-6 md:h-6" /> Back to Home
          </Link>

          {/* Scroll to footer of landing page */}
          <Link
            to="/#footer"
            className="flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition text-base md:text-lg"
          >
            <Phone className="w-5 h-5 md:w-6 md:h-6" /> Emergency Helplines
          </Link>
        </div>

        <p className="text-gray-500 text-sm md:text-base mt-8">
          Don’t worry, our doctors (developers) are trying to revive this page.
        </p>
      </div>

      <div className="mt-10 md:mt-0 md:ml-16 flex-shrink-0">
        <img
          src="/doctor-illustration.png"
          alt="Doctor Illustration"
          className="w-72 md:w-[28rem] lg:w-[32rem]"
        />
      </div>
    </div>
  );
}
