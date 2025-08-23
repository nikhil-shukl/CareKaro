import React from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Landing from "./pages/Landing";

import NotFound from "./pages/NotFound";
import ReportScanner from "./pages/ReportScanner";
import Advertisement from "./pages/Advertisement";
import ScrollToTop from "./components/ScrollToTop"; // <-- import
import ProtectedRoute from "./components/ProtectedRoute"
import ContactUs from "./pages/ContactUs";
import AskHelp from "./pages/AskHelp";
import AboutUs from "./pages/AboutUs";


const App = () => {
  return (
    <div>
      <Toaster />
         <ScrollToTop /> {/* This ensures every page starts at top */}
      <Routes>
        <Route path="/" element={<Landing />} />
   
              <Route path="/contactus" element={<ContactUs />} />
                        <Route path="/askhelp" element={<AskHelp />} />
        <Route
          path="/reportscanner"
          element={
            <ProtectedRoute>
              <ReportScanner />
            </ProtectedRoute>
          }
        />

        {/* Protected Advertisement Route */}
        <Route
          path="/advertisement"
          element={
            <ProtectedRoute>
              <Advertisement />
            </ProtectedRoute>
          }
        />
              <Route path="/aboutus" element={<AboutUs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  );
};

export default App;
