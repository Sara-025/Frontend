import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "leaflet/dist/leaflet.css";

const Locations = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const locationText = params.get("loc") || "Algeria";

  const [coordinates, setCoordinates] = useState({ lat: 36.75, lng: 3.06 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!locationText || locationText === "N/A") return;

    const fetchCoordinates = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://nominatim.openstreetmap.org/search", {
          params: { q: locationText, format: "json" },
        });

        if (response.data.length > 0) {
          const { lat, lon } = response.data[0];
          setCoordinates({ lat: parseFloat(lat), lng: parseFloat(lon) });
        } else {
          console.error("No results found for location:", locationText);
        }
      } catch (error) {
        console.error("Error fetching geolocation:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinates();
  }, [locationText]);

  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <h2 style={{ color: "black", textAlign: "center" }}>Location Details</h2>
      <p style={{ textAlign: "center" }}>Current Location: {locationText}</p>

      {loading ? (
        <p style={{ textAlign: "center", fontWeight: "bold" }}>Loading map...</p>
      ) : (
        <MapContainer center={[coordinates.lat, coordinates.lng]} zoom={13} style={{ height: "100%", width: "102%" , borderRadius:"20px 20px 0px 0px " , color:"blue"}}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[coordinates.lat, coordinates.lng]}>
            <Popup>{locationText}</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default Locations;

