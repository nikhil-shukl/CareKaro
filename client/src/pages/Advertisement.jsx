import React, { useState, useEffect } from "react";
import mediNeedsData from "../MediNeed.json";
import Navbar from "../components/Navbar2";
import { Search } from "lucide-react";
import HospitalLoader from "../components/HospitalLoader";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";

const Advertisement = () => {
  const [loading, setLoading] = useState(true); // ✅ define loading state
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900); // 1.8s loading
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <HospitalLoader />; // show loader while loading

  const filteredNeeds = mediNeedsData.MediNeeds.filter((need) => {
    const matchesFilter = filter === "all" || need.Type === filter;
    const matchesSearch =
      need.Title.toLowerCase().includes(search.toLowerCase()) ||
      need.Location.toLowerCase().includes(search.toLowerCase()) ||
      need.Description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Navbar */}
      <Navbar />
      

      {/* Page Content */}
      <div className="pt-24 px-6 md:px-12 mb-3">
  {/* Quote Section - Top Banner */}
<div className="mt-4 mb-6 text-center px-2">
  <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif italic text-gray-700 max-w-3xl mx-auto leading-relaxed">
    "I'm not handsome but can give my hand to someone who needs help...<br/>
    Because beauty lies in heart not in face."
  </p>
  <p className="mt-2 font-semibold text-sm sm:text-base md:text-lg text-gray-900">
    — A. P. J. Abdul Kalam Azad
  </p>
  <div className="mt-6 w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
</div>


      {/* Filter + Search */}
<div className="flex flex-col md:flex-row gap-4 mb-6 w-full">
  {/* Sort by */}
  <div className="flex items-center gap-3 border px-4 py-2 rounded-md shadow-sm bg-white md:w-auto">
    <span className="font-semibold text-gray-700">Sort by :</span>
    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="outline-none text-gray-600"
    >
      <option value="all">All Needs</option>
      <option value="Emergency">Emergency</option>
      <option value="Hiring">Hiring</option>
      <option value="Demand">Demand</option>
    </select>
  </div>

  {/* Search bar */}
  <div className="flex items-center border px-3 py-2 rounded-md shadow-sm bg-white flex-grow max-w-full md:max-w-2xl lg:max-w-3xl">
    <Search className="text-gray-500 mr-2 w-5 h-5" /> {/* ✅ Lucide Icon */}
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Find help..."
      className="flex-grow outline-none text-gray-600 text-sm"
    />
    <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm font-medium">
      Find it now
    </button>
  </div>
</div>


        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredNeeds.map((need, index) => (
            <div
              key={index}
              className="p-6 rounded-xl shadow bg-white flex flex-col justify-between"
            >
              <div>
                <div className="font-bold text-xl">{need.Title}</div>
                <div className="text-gray-500 text-base">{need.Location}</div>
                <div
                  className={`text-sm mt-1 font-medium ${
                    need.Type === "Emergency"
                      ? "text-red-600"
                      : need.Type === "Hiring"
                      ? "text-green-600"
                      : "text-blue-600"
                  }`}
                >
                  {need.Type}
                </div>
              </div>

              <div className="border-t my-3"></div>

              <div className="flex-grow text-base text-gray-700">
                {need.Description}
              </div>

              <div className="mt-3 text-base text-gray-800 font-medium">
                {need.FullName}
                <div className="text-sm text-gray-500 mt-1">
                  Contact: {need.Contact}
                </div>
                <button className="w-full mt-3 border border-gray-400 py-2 rounded font-bold hover:bg-gray-100">
                  Help Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quote Section */}

      </div  >
            <HowItWorks />
            <Footer  />
          
    </div>
    
  );
};

export default Advertisement;
