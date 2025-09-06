import React, { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).href,
});

function FlyTo({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function HospitalMapLeaflet() {
  const mumbaiLatLng = useMemo(() => ({ lat: 19.076, lng: 72.8777 }), []);
  const [center, setCenter] = useState(mumbaiLatLng);
  const [useFallback, setUseFallback] = useState(false);
  const [radius, setRadius] = useState(4000);
  const [hospitals, setHospitals] = useState([]);
  const [resultsCount, setResultsCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const mapRef = useRef(null);

  useEffect(() => {
    if (!useFallback && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setUseFallback(true),
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      setCenter(mumbaiLatLng);
    }
  }, [useFallback]);

  const fetchHospitals = async (lat, lon, r) => {
    setLoading(true);
    try {
      const query = `[out:json][timeout:25];(node["amenity"="hospital"](around:${r},${lat},${lon});way["amenity"="hospital"](around:${r},${lat},${lon});relation["amenity"="hospital"](around:${r},${lat},${lon}););out center;`;
      const res = await fetch("https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(query));
      const data = await res.json();
      const items = (data.elements || []).map((el) => ({
        id: el.id,
        lat: el.lat ?? el.center?.lat,
        lon: el.lon ?? el.center?.lon,
        name: el.tags?.name || "Unnamed Hospital",
        tags: el.tags || {},
      }));
      setHospitals(items);
      setResultsCount(items.length);
    } catch (err) {
      console.error(err);
      setHospitals([]);
      setResultsCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (center) fetchHospitals(center.lat, center.lng, radius);
  }, [center, radius]);

  const filtered = hospitals.filter((h) =>
    !searchKeyword.trim()
      ? true
      : (h.name || "").toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col items-center space-y-5">
      {/* Heading */}
          <h2 className="text-3xl font-bold text-center mt-5 mb-5">
      View Nearby Hospitals
        </h2>


      {/* Search bar */}
      <div className="flex items-center w-full md:w-2/3 lg:w-1/2 bg-white shadow rounded-full px-2 py-1">
        <input
          type="text"
          placeholder="Search nearby hospitals..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="flex-grow px-4 py-2 rounded-l-full focus:outline-none text-sm"
        />
        <button
          type="button"
          className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium"
        >
          View Hospitals
        </button>
      </div>

      {/* Controls in one line on large screens */}
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
        <span className="text-gray-600 text-sm">
          {loading ? "Searching nearby hospitals…" : `Hospitals Found: ${resultsCount}`}
        </span>
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-700">Radius: {(radius / 1000).toFixed(1)} km</label>
          <input
            type="range"
            min={1000}
            max={10000}
            step={500}
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-40"
          />
        </div>
        <button
          className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm shadow hover:bg-blue-700"
          onClick={() => setUseFallback((v) => !v)}
        >
          Use My Location
        </button>
      </div>

      {/* Map with border */}
      <div className="w-full md:w-11/12 lg:w-5/6 h-[450px] md:h-[500px] border-2 border-gray-300 rounded-xl shadow ring-1 ring-gray-200 overflow-hidden">
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          whenCreated={(map) => (mapRef.current = map)}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <FlyTo center={[center.lat, center.lng]} />
          <Circle center={[center.lat, center.lng]} radius={radius} pathOptions={{ color: "#2563eb", fillOpacity: 0.05 }} />
          {filtered.map((h) => (
            <Marker key={h.id} position={[h.lat, h.lon]}>
              <Popup>
                <div style={{ maxWidth: 260 }}>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>{h.name}</div>
                  <div style={{ fontSize: 12 }}>{h.tags["addr:street"] || h.tags["addr:full"] || ""}</div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

    </div>
  );
}



/*
INSTALL
npm i leaflet react-leaflet

USAGE (main.jsx)
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'leaflet/dist/leaflet.css'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)

HOW TO SWITCH
1) Save this file as src/components/HospitalMapLeaflet.jsx
2) In App.jsx import HospitalMap from './components/HospitalMapLeaflet'

NOTES
- Overpass API is free but has rate limits; for heavy production use consider Mapbox or paid providers.
- Overpass CORS is usually allowed; if you hit CORS or 429 errors, try a different Overpass mirror or add a tiny server proxy.
*/
