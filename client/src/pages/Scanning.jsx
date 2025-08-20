import React, { useState } from "react";
import Fuse from "fuse.js";
import data from "../data.json";

const Scanning = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);

  // Setup Fuse.js
  const fuse = new Fuse(data, {
    keys: ["symptoms", "name"], // Search in both disease name + symptoms
    threshold: 0.3              // Lower = stricter match
  });

  const handleSearch = () => {
    const searchResult = fuse.search(query);
    if (searchResult.length > 0) {
      setResult(searchResult[0].item);
    } else {
      setResult(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">CareScan 🩺</h1>
      <p className="mb-6 text-gray-600">Describe your symptoms to get possible causes and remedies</p>

      <input
        type="text"
        placeholder="Enter your symptoms..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full max-w-lg p-3 border rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={handleSearch}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-2xl shadow hover:bg-blue-600"
      >
        Scan Symptoms
      </button>

      {result && (
        <div className="mt-8 w-full max-w-lg p-6 bg-white shadow-lg rounded-2xl text-left">
          <h2 className="text-2xl font-semibold text-blue-600">{result.name}</h2>
          <p className="mt-2 text-gray-700">{result.description}</p>
          <p className="mt-2 text-green-600 font-medium">💡 Solution: {result.solution}</p>
        </div>
      )}

      {!result && query && (
        <p className="mt-6 text-red-500">❌ No close match found. Try describing differently.</p>
      )}
    </div>
  );
};

export default Scanning;
