"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

export default function MapInner() {

  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    });
  }, []);

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
        <Popup>DWLR Sensor 1</Popup>
      </Marker>

      <Marker position={[9.9312, 76.2673]}>
        <Popup>DWLR Sensor 2</Popup>
      </Marker>

      <Marker position={[11.2588, 75.7804]}>
        <Popup>DWLR Sensor 3</Popup>
      </Marker>

    </MapContainer>
  );
}