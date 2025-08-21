import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6 text-center">
      <motion.img
        src="https://i.pinimg.com/originals/51/10/12/511012fa1cfe9efa408b0c26bf30795d.gif"
        alt="Hospital Ambulance Animation"
        className="w-64 h-64 mb-6 drop-shadow-lg"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
      />
      <h1 className="text-7xl font-extrabold text-red-500 drop-shadow-sm">404</h1>
      <p className="text-2xl text-gray-700 mt-4 mb-8 max-w-lg">
        Oops! Looks like CareKaro’s ambulance is on its way but the page you're looking for hasn’t arrived yet.
      </p>
      <Link
        to="/"
        className="px-8 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all"
      >
        🏥 Back to Home
      </Link>
    </div>
  );
};

export default NotFound;


