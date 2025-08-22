import React from "react";
import ambulanceImg from "../assets/ambulance.png";

const HospitalLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white mt-20">

      {/* Ambulance moving smoothly left to right */}
      <div className="relative w-64 h-28 overflow-hidden">
        <img
          src={ambulanceImg}
          alt="loading ambulance"
          className="w-28 h-28 animate-horizontal"
        />
      </div>

      {/* Heartbeat / EKG line */}
      <div className="w-48 h-2 relative mt-2 mb-2 overflow-hidden">
        <div className="absolute w-48 h-2 border-b-2 border-red-500 animate-[heartbeat_1s_ease-in-out_infinite]"></div>
      </div>

      {/* Loading text */}
      <p className="text-gray-700 text-lg animate-pulse">
        Caring begins...
      </p>

      {/* Keyframes for horizontal motion and heartbeat */}
      <style jsx>{`
        @keyframes horizontal {
          0% { transform: translateX(0); }
          50% { transform: translateX(40px); }
          100% { transform: translateX(0); }
        }
        .animate-horizontal {
          animation: horizontal 2s ease-in-out infinite;
        }

        @keyframes heartbeat {
          0%, 100% { transform: scaleX(1); }
          25% { transform: scaleX(1) translateY(0); }
          50% { transform: scaleX(1) translateY(0); }
          75% { transform: scaleX(1) translateY(0); }
        }
        .animate-[heartbeat_1s_ease-in-out_infinite] {
          animation: heartbeat 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HospitalLoader;
