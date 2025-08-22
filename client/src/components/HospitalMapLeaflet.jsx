import React, { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icon paths for Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).href,
});

// Small helper component to move map when center changes
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

  // Get user location or fallback
  useEffect(() => {
    if (!useFallback && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        () => setUseFallback(true),
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      setCenter(mumbaiLatLng);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useFallback]);

  // Fetch hospitals from Overpass API
  const fetchHospitals = async (lat, lon, r) => {
    setLoading(true);
    try {
      const query = `[out:json][timeout:25];(node["amenity"="hospital"](around:${r},${lat},${lon});way["amenity"="hospital"](around:${r},${lat},${lon});relation["amenity"="hospital"](around:${r},${lat},${lon}););out center;`;
      const url = "https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(query);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Overpass error: ${res.status}`);
      const data = await res.json();
      const items = (data.elements || []).map((el) => {
        const lat = el.lat ?? el.center?.lat;
        const lon = el.lon ?? el.center?.lon;
        return {
          id: el.id,
          lat,
          lon,
          name: el.tags?.name || "Unnamed Hospital",
          tags: el.tags || {},
        };
      });
      setHospitals(items);
      setResultsCount(items.length);
    } catch (err) {
      console.error("fetchHospitals:", err);
      setHospitals([]);
      setResultsCount(0);
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetch when center or radius changes
  useEffect(() => {
    if (!center) return;
    fetchHospitals(center.lat, center.lng, radius);
  }, [center, radius]);

  const filtered = hospitals.filter((h) =>
    !searchKeyword.trim()
      ? true
      : (h.name || "").toLowerCase().includes(searchKeyword.toLowerCase()) ||
        (h.tags?.name || "").toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm px-2 py-1 rounded-full bg-gray-100">{loading ? "searching" : "ready"}</span>
          <span className="text-sm text-gray-600">{loading ? "Searching nearby hospitals…" : `Showing ${resultsCount} hospitals`}</span>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search hospitals (Apollo, Fortis...)"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="px-3 py-2 border rounded-xl text-sm w-64"
          />

          <label className="text-sm">Radius: {(radius / 1000).toFixed(1)} km</label>
          <input
            type="range"
            min={1000}
            max={10000}
            step={500}
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-48"
          />

          <button
            className="px-3 py-2 rounded-xl bg-gray-900 text-white text-sm shadow hover:opacity-90"
            onClick={() => setUseFallback((v) => !v)}
            title="Toggle My Location / Mumbai"
          >
            {useFallback ? "Use My Location" : "Show Mumbai"}
          </button>
        </div>
      </div>

      <div className="w-full h-80 md:h-[420px] rounded-2xl shadow ring-1 ring-gray-200 overflow-hidden">
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          whenCreated={(map) => (mapRef.current = map)}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
          <FlyTo center={[center.lat, center.lng]} />
          <Circle center={[center.lat, center.lng]} radius={radius} pathOptions={{ color: "#2563eb", fillOpacity: 0.05 }} />

          {filtered.map((h) => (
            <Marker key={h.id} position={[h.lat, h.lon]}>
              <Popup>
                <div style={{ maxWidth: 260 }}>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>{h.name}</div>
                  <div style={{ fontSize: 12 }}>{h.tags["addr:street"] || h.tags["addr:full"] || ""}</div>
                  <div style={{ fontSize: 12, marginTop: 6 }}>{Object.entries(h.tags || {}).slice(0, 5).map(([k, v]) => (<div key={k}><strong>{k}:</strong> {v}</div>))}</div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="mt-3 text-xs text-gray-600">
        Showing hospital results: <span className="font-medium">{filtered.length}</span>
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
2) In App.jsx replace import HospitalMap from './components/HospitalMap' with:
   import HospitalMap from './components/HospitalMapLeaflet'
3) Remove @googlemaps/js-api-loader dependency if you want:
   npm remove @googlemaps/js-api-loader

NOTES
- Overpass API is free but has rate limits; for heavy production use consider Mapbox or paid providers.
- Overpass CORS is usually allowed; if you hit CORS or 429 errors, try a different Overpass mirror or add a tiny server proxy.
*/
