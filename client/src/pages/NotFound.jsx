import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="py-25 bg-white font-serif">
      <div className="max-w-5xl mx-auto text-center px-4">
        
        {/* 404 text at the top */}
        <h1 className="text-6xl sm:text-8xl font-bold mb-1">404</h1>
        
        {/* Background image in the center */}
        <div
          className="h-[300px] sm:h-[300px] bg-center bg-no-repeat bg-contain mx-auto"
          style={{
            backgroundImage:
              "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
          }}
        ></div>
        
        {/* Content below */}
        <div className="mt-1">
          <h3 className="text-xl sm:text-2xl font-bold">Look like you're lost</h3>
          <p className="mt-2 text-gray-700 text-sm sm:text-base">
            The page you are looking for is not available!
          </p>
          <Link
            to="/"
            className="inline-block mt-2 text-white px-5 py-2 bg-blue-600 rounded hover:bg-blue-400 transition"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
