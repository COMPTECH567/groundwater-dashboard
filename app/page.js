"use client";

import Map from "./components/Map";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", level: 32 },
  { day: "Tue", level: 31 },
  { day: "Wed", level: 30 },
  { day: "Thu", level: 29 },
  { day: "Fri", level: 28 },
  { day: "Sat", level: 27 },
  { day: "Sun", level: 27 },
];

const sensors = [
  { id: "DWLR-01", location: "Well A", level: "29 m", status: "Normal" },
  { id: "DWLR-02", location: "Well B", level: "31 m", status: "Warning" },
  { id: "DWLR-03", location: "Well C", level: "34 m", status: "Critical" },
  { id: "DWLR-04", location: "Well D", level: "27 m", status: "Normal" },
];

export default function Dashboard() {
  return (
    <div className="p-10 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-8">
        District Groundwater Monitoring Dashboard
      </h1>

      {/* KPI CARDS */}

      <div className="grid grid-cols-3 gap-6 mb-8">

        <div className="bg-blue-100 p-6 rounded-xl">
          <h2 className="text-lg font-semibold">Active DWLR Sensors</h2>
          <p className="text-4xl mt-2">24</p>
        </div>

        <div className="bg-green-100 p-6 rounded-xl">
          <h2 className="text-lg font-semibold">Average Water Level</h2>
          <p className="text-4xl mt-2">28 m</p>
        </div>

        <div className="bg-red-100 p-6 rounded-xl">
          <h2 className="text-lg font-semibold">Critical Zones</h2>
          <p className="text-4xl mt-2">3</p>
        </div>

      </div>

      {/* WEEKLY TREND CHART */}

      <div className="bg-white shadow p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">
          Weekly Groundwater Level Trend
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
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
      </div>

      {/* SENSOR MAP */}

      <div className="mt-8 bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          Groundwater Sensor Locations
        </h2>

        <Map />
      </div>

      {/* SENSOR TABLE */}

      <div className="mt-8 bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          Sensor Monitoring Table
        </h2>

        <table className="w-full border border-gray-300">

          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Sensor ID</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Water Level</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>

          <tbody>
            {sensors.map((sensor, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{sensor.id}</td>
                <td className="border p-2">{sensor.location}</td>
                <td className="border p-2">{sensor.level}</td>
                <td className="border p-2">{sensor.status}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* ALERT PANEL */}

      <div className="mt-8 bg-yellow-100 p-6 rounded-xl">
        <h2 className="text-lg font-semibold mb-2">
          System Alerts
        </h2>

        <ul className="list-disc ml-6">
          <li>Groundwater level dropping in Zone 3</li>
          <li>Recharge rate declining this week</li>
          <li>2 sensors temporarily offline</li>
        </ul>
      </div>

      {/* ASSISTANT */}

      <div className="mt-8 bg-gray-100 p-6 rounded-xl">
        <h2 className="text-lg font-semibold">
          Friendly Water Assistant
        </h2>

        <p className="text-sm mt-2">
          Hi! I'm Jarvis your friendly AI assistant. Ask me about groundwater trends and recharge levels.
        </p>

        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
          Open Chatbot
        </button>
      </div>

    </div>
  );
}