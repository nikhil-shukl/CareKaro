import React, { useRef, useState } from "react";

export default function ReportScanner() {
  const fileInputRef = useRef(null);
  const [scannedData, setScannedData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Convert file to base64
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]); // remove "data:image/png;base64,"
      reader.onerror = (error) => reject(error);
    });

  const handleScan = async (file) => {
    setLoading(true);
    try {
      const base64Image = await fileToBase64(file);

const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/scan-report`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ base64Image }),
});


      const data = await response.json();
      setScannedData(data);
    } catch (err) {
      console.error("Error scanning report:", err);
      setScannedData({ error: "Failed to process the report" });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) handleScan(file);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Report Scanner</h2>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {loading && <p>Processing report...</p>}

      {scannedData && (
        <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
          <h3>Scanned Report Data:</h3>
          <pre>{JSON.stringify(scannedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
