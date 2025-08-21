import React from "react";
import {  Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Landing from "./pages/Landing";
import Scanning from "./pages/Scanning";
import NotFound from "./pages/NotFound";
import ReportScanner from "./pages/ReportScanner";
import Advertisement from "./pages/Advertisement";
import ScrollToTop from "./components/ScrollToTop"; // <-- import

const App = () => {
  return (
    <div>
      <Toaster />
         <ScrollToTop /> {/* This ensures every page starts at top */}
      <Routes>
        <Route path="/" element={<Landing />} />
           <Route path="/scan" element={<Scanning />} />
               <Route path="/ReportScanner" element={<ReportScanner />} />
                 <Route path="/advertisement" element={<Advertisement />} />
                 <Route path="*" element={<NotFound />} />
           
      </Routes>
    </div>
  );
};

export default App;
