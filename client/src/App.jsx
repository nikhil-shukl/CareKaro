import React from "react";
import { Route, Routes } from "react-router-dom";
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
        <Route
          path="/ReportScanner"
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

        <Route path="*" element={<NotFound />} />
      </Routes>
       <HospitalMap />
    </div>
  );
};

export default App;
