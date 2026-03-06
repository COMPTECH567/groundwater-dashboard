"use client";

import { useState, useEffect, useRef } from "react";
import Map from "./components/Map";
import GaugeChart from "react-gauge-chart";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Legend
} from "recharts";

export default function Dashboard() {

const [time,setTime] = useState("");
const [chatOpen,setChatOpen] = useState(false);
const [input,setInput] = useState("");

const chatEndRef = useRef(null);

const [messages,setMessages] = useState([
{
sender:"ai",
text:"Hello! I'm AquaAI. Ask me about groundwater levels, sensors, or recharge trends."
}
]);

const [weeklyData,setWeeklyData] = useState([
{ day:"Mon", level:32 },
{ day:"Tue", level:31 },
{ day:"Wed", level:30 },
{ day:"Thu", level:29 },
{ day:"Fri", level:28 },
{ day:"Sat", level:27 },
{ day:"Sun", level:27 }
]);

const rainfallData=[
{month:"Jan",rain:120,ground:30},
{month:"Feb",rain:90,ground:28},
{month:"Mar",rain:60,ground:26},
{month:"Apr",rain:40,ground:25},
{month:"May",rain:20,ground:24},
{month:"Jun",rain:140,ground:29}
];

useEffect(()=>{

const interval=setInterval(()=>{

const now=new Date();
setTime(now.toLocaleTimeString());

setWeeklyData(prev =>
prev.map(item=>({
...item,
level:item.level+(Math.random()*0.4-0.2)
}))
);

},4000);

return ()=>clearInterval(interval);

},[]);

useEffect(()=>{
chatEndRef.current?.scrollIntoView({behavior:"smooth"});
},[messages]);

function sendMessage(){

if(!input.trim()) return;

const userMsg={sender:"user",text:input};

let reply="";
const text=input.toLowerCase();

if(text.includes("water")){
reply="District groundwater average level is approximately 28 meters.";
}
else if(text.includes("sensor")){
reply="24 DWLR monitoring sensors are currently active.";
}
else if(text.includes("rain")){
reply="Recent rainfall trends indicate moderate groundwater recharge.";
}
else if(text.includes("critical")){
reply="Three groundwater monitoring zones are currently critical.";
}
else{
reply="I can provide insights on groundwater levels, rainfall recharge, sensors, and alerts.";
}

setMessages(prev=>[
...prev,
userMsg,
{sender:"ai",text:reply}
]);

setInput("");

}

return(

<div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">

{/* SIDEBAR */}

<div className="w-64 bg-blue-900 text-white p-6 shadow-xl">

<h2 className="text-2xl font-bold mb-8">
💧 Jal Monitoring
</h2>

<ul className="space-y-4 text-sm">
<li>📊 Dashboard</li>
<li>📡 Sensor Network</li>
<li>📈 Groundwater Trends</li>
<li>🌧 Recharge Monitoring</li>
<li>⚠ Alerts</li>
</ul>

</div>

{/* MAIN */}

<div className="flex-1 p-10">

{/* HEADER */}

<div className="flex justify-between items-center mb-6">

<h1 className="text-3xl font-bold text-blue-900">
Smart Groundwater Monitoring System
</h1>

<div className="flex gap-6 items-center">

<div className="text-gray-600">
⏰ {time}
</div>

<div className="bg-green-500 text-white px-4 py-1 rounded-full text-sm">
System Online
</div>

</div>

</div>

{/* KPI */}

<div className="grid grid-cols-4 gap-6 mb-8">

<div className="bg-white p-6 rounded-xl shadow border-l-4 border-blue-500">
<div className="text-sm text-gray-500">Active Sensors</div>
<p className="text-3xl font-bold text-blue-700">24</p>
</div>

<div className="bg-white p-6 rounded-xl shadow border-l-4 border-green-500">
<div className="text-sm text-gray-500">Average Water Level</div>
<p className="text-3xl font-bold text-green-700">28 m</p>
</div>

<div className="bg-white p-6 rounded-xl shadow border-l-4 border-red-500">
<div className="text-sm text-gray-500">Critical Zones</div>
<p className="text-3xl font-bold text-red-600 animate-pulse">3</p>
</div>

<div className="bg-white p-6 rounded-xl shadow border-l-4 border-yellow-500">
<div className="text-sm text-gray-500">Warning Zones</div>
<p className="text-3xl font-bold text-yellow-600">5</p>
</div>

</div>

{/* GAUGE + TREND */}

<div className="grid grid-cols-2 gap-8 mb-8">

<div className="bg-white shadow p-6 rounded-xl">

<h2 className="text-xl font-semibold mb-4 text-blue-900">
District Water Stress Index
</h2>

<GaugeChart
id="gauge-chart"
nrOfLevels={3}
colors={["#16a34a","#eab308","#dc2626"]}
percent={0.65}
/>

</div>

<div className="bg-white shadow p-6 rounded-xl">

<h2 className="text-xl font-semibold mb-4 text-blue-900">
Weekly Groundwater Trend
</h2>

<ResponsiveContainer width="100%" height={260}>

<LineChart data={weeklyData}>
<CartesianGrid strokeDasharray="3 3"/>
<XAxis dataKey="day"/>
<YAxis/>
<Tooltip/>

<Line
type="monotone"
dataKey="level"
stroke="#2563eb"
strokeWidth={3}
/>

</LineChart>

</ResponsiveContainer>

</div>

</div>

{/* RAINFALL */}

<div className="bg-white shadow p-6 rounded-xl mb-8">

<h2 className="text-xl font-semibold mb-4 text-blue-900">
Rainfall vs Groundwater Recharge
</h2>

<ResponsiveContainer width="100%" height={300}>

<BarChart data={rainfallData}>
<CartesianGrid strokeDasharray="3 3"/>
<XAxis dataKey="month"/>
<YAxis/>
<Tooltip/>
<Legend/>

<Bar dataKey="rain" fill="#38bdf8"/>
<Bar dataKey="ground" fill="#22c55e"/>

</BarChart>

</ResponsiveContainer>

</div>

{/* MAP */}

<div className="bg-white shadow p-6 rounded-xl mb-8">

<h2 className="text-xl font-semibold mb-4 text-blue-900">
Groundwater Monitoring Map
</h2>

<Map/>

</div>

{/* ALERT */}

<div className="bg-yellow-100 border-l-4 border-yellow-500 p-6 rounded-xl">

<h2 className="text-xl font-semibold mb-3">
⚠ System Alerts
</h2>

<ul className="list-disc ml-6 space-y-1">
<li>Groundwater level dropping in Zone 3</li>
<li>Recharge rate declining this week</li>
<li>Sensor DWLR-03 reporting abnormal drop</li>
</ul>

</div>

</div>

{/* CHATBOT */}

<div className="fixed bottom-6 right-6 flex items-center gap-3">

{/* Animated helper text */}

<div className="bg-white text-gray-700 text-sm px-4 py-2 rounded-lg shadow animate-bounce flex items-center gap-2">

<span>👋</span>
<span>Hi! How can I help you?</span>

</div>

{/* Chat button */}

<button
onClick={()=>setChatOpen(!chatOpen)}
className="bg-blue-600 text-white p-4 rounded-full shadow-lg animate-pulse"
>
💬
</button>

{chatOpen && (

<div className="absolute bottom-16 right-0 w-80 h-96 bg-white rounded-xl shadow-xl flex flex-col">

<div className="bg-blue-600 text-white p-3 rounded-t-xl font-semibold">
AquaAI Assistant
</div>

<div className="flex-1 p-3 overflow-y-auto text-sm">

{messages.map((m,i)=>(
<div key={i} className={`mb-2 ${m.sender==="user"?"text-right":""}`}>

<span className={`inline-block px-3 py-2 rounded-lg ${
m.sender==="user"
?"bg-blue-500 text-white"
:"bg-gray-200"
}`}>
{m.text}
</span>

</div>
))}

<div ref={chatEndRef}></div>

</div>

<div className="flex border-t">

<input
value={input}
onChange={(e)=>setInput(e.target.value)}
onKeyDown={(e)=>{if(e.key==="Enter")sendMessage();}}
className="flex-1 p-2 text-sm outline-none"
placeholder="Ask about groundwater..."
/>

<button
onClick={sendMessage}
className="bg-blue-600 text-white px-4"
>
Send
</button>

</div>

</div>

)}

</div>

</div>

);
}