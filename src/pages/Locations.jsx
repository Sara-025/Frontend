import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useLocation } from "react-router-dom";
import "leaflet/dist/leaflet.css";

const Locations = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const locationText = params.get("loc") || "Location";
  const paramLat = parseFloat(params.get("lat"));
  const paramLng = parseFloat(params.get("lng"));

  const hasValidCoordinates = !isNaN(paramLat) && !isNaN(paramLng);
  const coordinates = hasValidCoordinates ? { lat: paramLat, lng: paramLng } : null;

  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <h2 style={{ color: "black", textAlign: "center",fontWeight:"600",fontSize:"20px", paddingBottom:"7px"  }}>Location Details</h2>
      <p style={{ textAlign: "center", paddingBottom:"14px" ,fontWeight:"600"}}>Current Location: <span>{locationText}</span></p>

      {hasValidCoordinates ? (
        <MapContainer
          center={[coordinates.lat, coordinates.lng]}
          zoom={13}
          style={{
            height: "100%",
            width: "100%",
            borderRadius: "20px 20px 0px 0px",
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[coordinates.lat, coordinates.lng]}>
            <Popup>
              <strong >{locationText}</strong>
              <br />
              Latitude: {coordinates.lat.toFixed(6)}
              <br />
              Longitude: {coordinates.lng.toFixed(6)}
            </Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p style={{ textAlign: "center", color: "red" }}>
          {coordinates === null 
            ? "No valid coordinates provided." 
            : "Could not display map for the given coordinates."}
        </p>
      )}
    </div>
  );
};

export default Locations;