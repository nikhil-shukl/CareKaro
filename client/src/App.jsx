import React from "react";
import {  Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Landing from "./pages/Landing";

const App = () => {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Landing />} />
           <Route path="/scan" element={<Scanning />} />
      </Routes>
    </div>
  );
};

export default App;
