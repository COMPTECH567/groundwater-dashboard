"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", level: 32 },
  { day: "Tue", level: 31 },
  { day: "Wed", level: 30 },
  { day: "Thu", level: 29 },
  { day: "Fri", level: 28 },
  { day: "Sat", level: 27 },
  { day: "Sun", level: 27 }
];

export default function Dashboard() {
  return (
    <div className="p-10 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold mb-8">
        District Groundwater Monitoring Dashboard
      </h1>

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

      <div className="bg-white shadow p-6 rounded-xl">

        <h2 className="text-xl font-semibold mb-4">
          Weekly Groundwater Level Trend
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="level" stroke="#2563eb" />
          </LineChart>
        </ResponsiveContainer>

      </div>

      <div className="mt-8 bg-gray-100 p-6 rounded-xl">

       <h2 className="text-lg font-semibold">Friendly Water Assistant</h2>

      <p className="text-sm mt-2">
        Hi! I'm Jarvis your friendly Ai Assistant.How can I be of use!!
      </p>

        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
          Open Chatbot
        </button>

      </div>

    </div>
  );
}