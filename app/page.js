"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Map from "./components/Map";
import { useState } from "react";

const groundwaterData = [
  { day: "Mon", level: 32 },
  { day: "Tue", level: 31 },
  { day: "Wed", level: 30 },
  { day: "Thu", level: 29 },
  { day: "Fri", level: 28 },
  { day: "Sat", level: 27 },
  { day: "Sun", level: 27 }
];

const rainfallData = [
  { month: "Jan", value: 45 },
  { month: "Feb", value: 32 },
  { month: "Mar", value: 60 },
  { month: "Apr", value: 78 },
  { month: "May", value: 120 }
];

const sensors = [
  { id: "DWLR-01", location: "Well A", level: "29 m", status: "Normal" },
  { id: "DWLR-02", location: "Well B", level: "31 m", status: "Warning" },
  { id: "DWLR-03", location: "Well C", level: "34 m", status: "Critical" }
];

export default function Dashboard() {

  const [messages,setMessages] = useState([
    {role:"bot",text:"Hi!! 👋 How can I help you?"}
  ])

  const [input,setInput] = useState("");

  function sendMessage(){
    if(!input) return;

    setMessages([...messages,
      {role:"user",text:input},
      {role:"bot",text:"This is a demo AI assistant for groundwater monitoring."}
    ])

    setInput("")
  }

  return (
    <div style={{padding:"30px",fontFamily:"Arial"}}>

      <h1 style={{marginBottom:"20px"}}>
        District Groundwater Monitoring Dashboard
      </h1>

      {/* STATS */}

      <div style={{display:"flex",gap:"20px",marginBottom:"25px"}}>

        <div style={{background:"#dbeafe",padding:"20px",borderRadius:"10px",flex:1}}>
          <h3>Active DWLR Sensors</h3>
          <h1>24</h1>
        </div>

        <div style={{background:"#d1fae5",padding:"20px",borderRadius:"10px",flex:1}}>
          <h3>Average Water Level</h3>
          <h1>28 m</h1>
        </div>

        <div style={{background:"#fee2e2",padding:"20px",borderRadius:"10px",flex:1}}>
          <h3>Critical Zones</h3>
          <h1>3</h1>
        </div>

      </div>

      {/* GROUNDWATER TREND */}

      <div style={{background:"#f8fafc",padding:"20px",borderRadius:"10px",marginBottom:"25px"}}>
        <h2>Weekly Groundwater Level Trend</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={groundwaterData}>
            <XAxis dataKey="day"/>
            <YAxis/>
            <Tooltip/>
            <Line type="monotone" dataKey="level" stroke="#2563eb"/>
          </LineChart>
        </ResponsiveContainer>

      </div>

      {/* MAP */}

      <div style={{background:"#f8fafc",padding:"20px",borderRadius:"10px",marginBottom:"25px"}}>
        <h2>Groundwater Sensor Locations</h2>
        <Map/>
      </div>

      {/* SENSOR TABLE */}

      <div style={{background:"#f8fafc",padding:"20px",borderRadius:"10px",marginBottom:"25px"}}>

        <h2>Sensor Monitoring Table</h2>

        <table style={{width:"100%",borderCollapse:"collapse"}}>

          <thead>
            <tr style={{background:"#e5e7eb"}}>
              <th>Sensor ID</th>
              <th>Location</th>
              <th>Water Level</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {sensors.map((s)=>(
              <tr key={s.id}>

                <td style={{padding:"10px"}}>{s.id}</td>
                <td>{s.location}</td>
                <td>{s.level}</td>
                <td>

                  <span style={{
                    padding:"6px 12px",
                    borderRadius:"15px",
                    background:
                      s.status==="Normal"?"#22c55e":
                      s.status==="Warning"?"#f59e0b":
                      "#ef4444",
                    color:"white"
                  }}>
                    {s.status}
                  </span>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* RAINFALL CHART */}

      <div style={{background:"#f8fafc",padding:"20px",borderRadius:"10px",marginBottom:"25px"}}>

        <h2>Rainfall vs Groundwater Recharge</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={rainfallData}>
            <XAxis dataKey="month"/>
            <YAxis/>
            <Tooltip/>
            <Line type="monotone" dataKey="value" stroke="#16a34a"/>
          </LineChart>
        </ResponsiveContainer>

      </div>

      {/* ALERTS */}

      <div style={{
        background:"#fef9c3",
        padding:"20px",
        borderRadius:"10px",
        marginBottom:"25px"
      }}>

        <h2>System Alerts</h2>

        <ul>
          <li>Groundwater level dropping in Zone 3</li>
          <li>Recharge rate declining this week</li>
          <li>2 sensors temporarily offline</li>
        </ul>

      </div>

      {/* AI CHATBOT */}

      <div style={{
        position:"fixed",
        bottom:"20px",
        right:"20px",
        width:"320px",
        background:"white",
        border:"1px solid #ddd",
        borderRadius:"10px",
        boxShadow:"0 5px 20px rgba(0,0,0,0.2)",
        padding:"15px"
      }}>

        <div style={{fontWeight:"bold",marginBottom:"10px"}}>
          AI Water Assistant
        </div>

        <div style={{height:"200px",overflowY:"auto",marginBottom:"10px"}}>

          {messages.map((m,i)=>(
            <div key={i} style={{
              textAlign:m.role==="user"?"right":"left",
              marginBottom:"8px"
            }}>
              {m.text}
            </div>
          ))}

        </div>

        <div style={{display:"flex",gap:"5px"}}>

          <input
            value={input}
            onChange={(e)=>setInput(e.target.value)}
            style={{flex:1,padding:"6px"}}
          />

          <button onClick={sendMessage}>
            Send
          </button>

        </div>

      </div>

    </div>
  )
}