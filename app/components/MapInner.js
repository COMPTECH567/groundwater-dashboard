"use client";

import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapInner() {

const sensors = [

{
id:"DWLR-01",
position:[9.9312,76.2673],
status:"normal"
},

{
id:"DWLR-02",
position:[9.98,76.29],
status:"warning"
},

{
id:"DWLR-03",
position:[10.01,76.31],
status:"critical"
},

{
id:"DWLR-04",
position:[9.95,76.28],
status:"normal"
}

];


const zones = [

{
center:[9.95,76.25],
radius:20000,
color:"green"
},

{
center:[9.99,76.30],
radius:20000,
color:"orange"
},

{
center:[10.03,76.33],
radius:20000,
color:"red"
}

];


return(

<MapContainer
center={[9.97,76.29]}
zoom={8}
style={{height:"420px"}}
>

<TileLayer
url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>


{/* HEATMAP ZONES */}

{zones.map((zone,i)=>(

<Circle
key={i}
center={zone.center}
radius={zone.radius}
pathOptions={{
color:zone.color,
fillColor:zone.color,
fillOpacity:0.25
}}
/>

))}


{/* SENSOR MARKERS */}

{sensors.map((sensor,i)=>(

<Marker key={i} position={sensor.position}>

<Popup>

<b>{sensor.id}</b>

<br/>

Status: {sensor.status}

</Popup>

</Marker>

))}

</MapContainer>

);

}