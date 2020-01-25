"use client";

import { LatencySnapshot } from "@/lib/types";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function LatencyMonitor({ data }: { data: LatencySnapshot[] }) {
  const chartData = data.map((d) => ({
    time: `${Math.floor(d.timestamp / 60)}m`,
    avg: Math.round(d.avgLatency),
    p95: Math.round(d.p95Latency),
    p99: Math.round(d.p99Latency),
  }));

  return (
    <div className="bg-surface-800 border border-surface-600 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">Latency Monitor</h2>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-neon-green inline-block" /> avg</span>
          <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-neon-blue inline-block" /> p95</span>
          <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-neon-red inline-block" /> p99</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#243044" />
          <XAxis dataKey="time" tick={{ fill: "#6b7280", fontSize: 11 }} />
          <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} unit="ms" />
          <Tooltip contentStyle={{ backgroundColor: "#111827", border: "1px solid #243044", borderRadius: "8px" }} />
          <Area type="monotone" dataKey="p99" stroke="#ff3366" fill="#ff336620" strokeWidth={1.5} />
          <Area type="monotone" dataKey="p95" stroke="#00d4ff" fill="#00d4ff20" strokeWidth={1.5} />
          <Area type="monotone" dataKey="avg" stroke="#00ff88" fill="#00ff8820" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
