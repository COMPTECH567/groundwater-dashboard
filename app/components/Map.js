"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Map() {
  return (
    <MapContainer
      center={[10.8505, 76.2711]}
      zoom={7}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[10.8505, 76.2711]}>
        <Popup>Sensor DWLR-01</Popup>
      </Marker>

      <Marker position={[9.9312, 76.2673]}>
        <Popup>Sensor DWLR-02</Popup>
      </Marker>

      <Marker position={[11.2588, 75.7804]}>
        <Popup>Sensor DWLR-03</Popup>
      </Marker>

    </MapContainer>
  );
}