"use client";

import { LoadoutStats } from "@/lib/types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const COLORS: Record<string, string> = { Rifle: "#00ff88", Sniper: "#00d4ff", SMG: "#b347ff", Pistol: "#ffcc00" };

export function LoadoutUsage({ stats }: { stats: LoadoutStats[] }) {
  return (
    <div className="bg-surface-800 border border-surface-600 rounded-xl p-6">
      <h2 className="font-semibold mb-4">Loadout Usage</h2>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={stats} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#243044" horizontal={false} />
          <XAxis type="number" tick={{ fill: "#6b7280", fontSize: 11 }} unit="%" />
          <YAxis type="category" dataKey="weapon" tick={{ fill: "#e5e7eb", fontSize: 12 }} width={70} />
          <Tooltip contentStyle={{ backgroundColor: "#111827", border: "1px solid #243044", borderRadius: "8px" }} />
          <Bar dataKey="usage" radius={[0, 4, 4, 0]} barSize={20}>
            {stats.map((entry, i) => <Cell key={i} fill={COLORS[entry.category] || "#6b7280"} fillOpacity={0.8} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
