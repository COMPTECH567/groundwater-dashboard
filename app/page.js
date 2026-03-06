"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const Map = dynamic(() => import("./components/Map"), { ssr: false });

export default function Dashboard() {

  const groundwaterData = [
    { day: "Mon", level: 30 },
    { day: "Tue", level: 29 },
    { day: "Wed", level: 28 },
    { day: "Thu", level: 28 },
    { day: "Fri", level: 27 },
    { day: "Sat", level: 27 },
    { day: "Sun", level: 26 }
  ];

  const rainfallData = [
    { day: "Mon", rain: 5 },
    { day: "Tue", rain: 12 },
    { day: "Wed", rain: 8 },
    { day: "Thu", rain: 20 },
    { day: "Fri", rain: 15 },
    { day: "Sat", rain: 9 },
    { day: "Sun", rain: 6 }
  ];

  const sensors = [
    { id: "GW-01", location: "North Sector", level: "28m", status: "Normal" },
    { id: "GW-02", location: "Central Zone", level: "25m", status: "Warning" },
    { id: "GW-03", location: "South Village", level: "23m", status: "Critical" },
    { id: "GW-04", location: "Industrial Area", level: "27m", status: "Normal" }
  ];

  const alerts = [
    "GW-03 groundwater dropped below safe level",
    "Heavy rainfall expected tomorrow",
    "Central zone water usage rising rapidly"
  ];

  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi!! How can I help you 👋" }
  ]);
  const [input, setInput] = useState("");

  function sendMessage() {

    if (!input) return;

    const userMsg = { role: "user", text: input };

    const botMsg = {
      role: "bot",
      text: "I can help with groundwater data, rainfall analytics, sensor alerts and water usage insights."
    };

    setMessages([...messages, userMsg, botMsg]);

    setInput("");

  }

  return (

    <div style={{ padding: 20, fontFamily: "Arial" }}>

      <h1 style={{ marginBottom: 20 }}>
        District Groundwater Monitoring Dashboard
      </h1>

      {/* KPI CARDS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 15,
          marginBottom: 25
        }}
      >

        <StatCard title="Active Sensors" value="24" color="#dbeafe" />

        <StatCard title="Average Water Level" value="28 m" color="#dcfce7" />

        <StatCard title="Critical Zones" value="3" color="#fee2e2" />

        <StatCard title="Rainfall Today" value="12 mm" color="#e0f2fe" />

      </div>

      {/* CHART SECTION */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20
        }}
      >

        <ChartCard title="Weekly Groundwater Level Trend">

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={groundwaterData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="level"
                stroke="#2563eb"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>

        </ChartCard>

        <ChartCard title="Weekly Rainfall Analysis">

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={rainfallData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="rain"
                stroke="#06b6d4"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>

        </ChartCard>

      </div>

      {/* MAP */}

      <div style={{ marginTop: 25 }}>
        <ChartCard title="Groundwater Sensor Locations">
          <Map />
        </ChartCard>
      </div>

      {/* SENSOR TABLE */}

      <div style={{ marginTop: 25 }}>

        <ChartCard title="Sensor Monitoring Table">

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "center"
            }}
          >

            <thead>

              <tr style={{ background: "#f3f4f6" }}>
                <th>ID</th>
                <th>Location</th>
                <th>Water Level</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {sensors.map((sensor, index) => (

                <tr key={index}>

                  <td>{sensor.id}</td>

                  <td>{sensor.location}</td>

                  <td>{sensor.level}</td>

                  <td
                    style={{
                      color:
                        sensor.status === "Normal"
                          ? "green"
                          : sensor.status === "Warning"
                          ? "orange"
                          : "red"
                    }}
                  >
                    {sensor.status}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </ChartCard>

      </div>

      {/* ALERTS */}

      <div style={{ marginTop: 25 }}>

        <ChartCard title="System Alerts">

          <ul>

            {alerts.map((alert, i) => (

              <li key={i}>{alert}</li>

            ))}

          </ul>

        </ChartCard>

      </div>

      {/* AI CHATBOT */}

      <div
        style={{
          position: "fixed",
          bottom: 20,
          right: 20
        }}
      >

        <button
          onClick={() => setChatOpen(!chatOpen)}
          style={{
            background: "#2563eb",
            color: "white",
            padding: "10px 15px",
            borderRadius: 8,
            border: "none"
          }}
        >
          AI Assistant
        </button>

        {chatOpen && (

          <div
            style={{
              width: 300,
              height: 350,
              background: "white",
              border: "1px solid #ddd",
              marginTop: 10,
              display: "flex",
              flexDirection: "column"
            }}
          >

            <div
              style={{
                background: "#2563eb",
                color: "white",
                padding: 10
              }}
            >
              Water Monitoring AI
            </div>

            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: 10
              }}
            >

              {messages.map((msg, i) => (

                <div
                  key={i}
                  style={{
                    textAlign: msg.role === "user" ? "right" : "left",
                    marginBottom: 8
                  }}
                >
                  {msg.text}
                </div>

              ))}

            </div>

            <div style={{ display: "flex", padding: 10 }}>

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ flex: 1, padding: 6 }}
              />

              <button
                onClick={sendMessage}
                style={{ marginLeft: 5 }}
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

/* COMPONENTS */

function StatCard({ title, value, color }) {

  return (
    <div
      style={{
        background: color,
        padding: 20,
        borderRadius: 10
      }}
    >
      <h3>{title}</h3>
      <h2>{value}</h2>
    </div>
  );

}

function ChartCard({ title, children }) {

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 10,
        padding: 20
      }}
    >
      <h3 style={{ marginBottom: 10 }}>{title}</h3>

      {children}

    </div>
  );

}