"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { icon: "//", label: "Live Matches", active: true },
  { icon: "::", label: "Analytics", active: false },
  { icon: "><", label: "Players", active: false },
  { icon: "##", label: "Heatmaps", active: false },
  { icon: "[]", label: "Anti-Cheat", active: false },
  { icon: "{}", label: "Servers", active: false },
  { icon: "->", label: "Export", active: false },
];

export function Sidebar() {
  const [active, setActive] = useState(0);

  return (
    <aside className="w-16 lg:w-56 bg-surface-800 border-r border-surface-600 flex flex-col shrink-0">
      <div className="p-4 border-b border-surface-600 flex items-center gap-3">
        <div className="w-8 h-8 bg-neon-green/20 rounded-lg flex items-center justify-center text-neon-green font-bold text-sm font-mono">T</div>
        <span className="font-semibold hidden lg:block">Telemetry</span>
      </div>
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item, i) => (
          <button key={item.label} onClick={() => setActive(i)}
            className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
              active === i ? "bg-neon-green/10 text-neon-green" : "text-gray-400 hover:bg-surface-700 hover:text-gray-200"
            )}>
            <span className="font-mono text-xs">{item.icon}</span>
            <span className="hidden lg:block">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-3 border-t border-surface-600">
        <div className="flex items-center gap-2 px-2">
          <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
          <span className="text-xs text-gray-500 hidden lg:block">3 live matches</span>
        </div>
      </div>
    </aside>
  );
}
