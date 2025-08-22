import React, { useRef, useState, useEffect } from "react";
import { Camera, ArrowLeft } from "lucide-react";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import HospitalLoader from "../components/HospitalLoader";
import vividBg from "/vivid.jpg";

export default function ReportScanner() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [scannedText, setScannedText] = useState("");
  
  // Separate loaders
  const [initialLoading, setInitialLoading] = useState(true);  // for route entry loader
  const [processing, setProcessing] = useState(false);         // for file processing spinner

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) return <HospitalLoader />; // Only show when route loads

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });

  const handleScan = async (file) => {
    setProcessing(true);
    setScannedText("");
    try {
      const base64Image = await fileToBase64(file);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/scan-report`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ base64Image }),
        }
      );
      const data = await response.json();
      const friendlyText = `Hello! 👋\n${data.description || "No description available."}\n\nThank you for using CareKaro AI-report scanner.`;
      setScannedText(friendlyText);
    } catch (err) {
      console.error("Error scanning report:", err);
      setScannedText(
        "Hello! 👋\n\nFailed to process the report.\n\nThank you for using CareKaro AI-report scanner."
      );
    } finally {
      setProcessing(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) handleScan(file);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6 flex flex-col items-center"
      style={{ backgroundImage: `url(${vividBg})` }}
    >
      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        className="self-start mb-4 flex items-center text-gray-700 hover:text-gray-900 font-semibold"
      >
        <ArrowLeft className="mr-1" size={16} />
        Back
      </button>

      {/* Quote */}
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif italic text-gray-700 max-w-5xl mb-5 leading-relaxed text-center">
        "The greatest medicine of all is teaching people how not to need it" ~{" "}
        <span className="text-gray-600 font-semibold">Hippocrates</span>
      </p>

      {/* Upload box */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="cursor-pointer w-full max-w-md p-6 flex items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 animate-gradient hover:opacity-90 transition-opacity text-white font-semibold shadow-lg"
      >
        {processing ? (
          <>
            <ClipLoader size={24} color="#fff" />
            <span className="ml-2">Processing report...</span>
          </>
        ) : (
          <>
            <Camera className="mr-2" />
            <span>Click or Tap to Upload Report</span>
          </>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Scanned report display */}
      {scannedText && (
        <div className="mt-6 w-full max-w-md bg-white bg-opacity-90 p-4 rounded-lg shadow-lg">
          <h3 className="font-semibold mb-2 text-gray-800 text-center">
            Scanned Report:
          </h3>
          <p className="whitespace-pre-line text-gray-700">{scannedText}</p>
        </div>
      )}
    </div>
  );
}
