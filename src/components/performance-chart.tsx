"use client";

import { Player } from "@/lib/types";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const colors = ["#00ff88", "#00d4ff", "#b347ff", "#ffcc00"];

export function PerformanceChart({ players }: { players: Player[] }) {
  const chartData = players[0]?.performanceTimeline.map((_, i) => {
    const point: Record<string, unknown> = { time: `${i}:00` };
    players.forEach((p) => { point[p.name] = p.performanceTimeline[i]?.score || 0; });
    return point;
  }) || [];

  return (
    <div className="bg-surface-800 border border-surface-600 rounded-xl p-6">
      <h2 className="font-semibold mb-4">Performance Over Time</h2>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#243044" />
          <XAxis dataKey="time" tick={{ fill: "#6b7280", fontSize: 11 }} />
          <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} />
          <Tooltip contentStyle={{ backgroundColor: "#111827", border: "1px solid #243044", borderRadius: "8px" }} />
          <Legend />
          {players.map((p, i) => (
            <Line key={p.id} type="monotone" dataKey={p.name} stroke={colors[i % colors.length]} strokeWidth={2} dot={false} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
