import React from "react";

const Headline = () => {
  return (
    <div className="w-[95%] mx-auto bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <marquee
        behavior="scroll"
        direction="left"
        scrollamount="9"
        className="py-2 text-sm sm:text-base md:text-lg font-medium"
      >
        <span className="text-red-600 font-semibold">
          🔴 Shree Laxmi Hospital, Andheri (Mumbai) requires O+ blood units – 
          contact Dr. Ramesh Patil at{" "}
          <a href="tel:+911812345678" className="underline">+91 18123 45678</a>.
        </span>
        &nbsp;&nbsp; | &nbsp;&nbsp;
        <span className="text-green-600 font-semibold">
          🟢 Sunrise Care Hospital, Thane is hiring Nurses & Ward Assistants – 
          contact HR Priya Nair at{" "}
          <a href="tel:+911876543210" className="underline">+91 18765 43210</a>.
        </span>
        &nbsp;&nbsp; | &nbsp;&nbsp;
        <span className="text-blue-600 font-semibold">
          🔵 City Health Clinic, Navi Mumbai seeks volunteers for patient support – 
          contact Mr. Amit Sharma at{" "}
          <a href="tel:+911823456789" className="underline">+91 18234 56789</a>.
        </span>
      </marquee>
    </div>
  );
};

export default Headline;
