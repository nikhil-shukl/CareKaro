import React from "react";
import {  Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Landing from "./pages/Landing";
import Scanning from "./pages/Scanning";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Landing />} />
           <Route path="/scan" element={<Scanning />} />
                 <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
