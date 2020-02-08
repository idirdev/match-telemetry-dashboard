import { AntiCheatEvent } from "@/lib/types";

const styles: Record<string, string> = {
  low: "bg-neon-yellow/10 text-neon-yellow border-neon-yellow/20",
  medium: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  high: "bg-neon-red/10 text-neon-red border-neon-red/20",
  critical: "bg-red-600/10 text-red-500 border-red-600/20",
};

export function AntiCheatPanel({ events }: { events: AntiCheatEvent[] }) {
  return (
    <div className="bg-surface-800 border border-surface-600 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">Anti-Cheat Events</h2>
        <span className="text-xs text-gray-500">{events.length} flags</span>
      </div>
      <div className="space-y-3">
        {events.map((event, i) => (
          <div key={i} className={`border rounded-lg p-4 ${styles[event.severity]}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase">{event.type.replace("_", " ")}</span>
                <span className="text-xs opacity-60">{Math.round(event.confidence * 100)}% confidence</span>
              </div>
              <span className="text-xs font-mono">{Math.floor(event.timestamp / 60)}:{String(event.timestamp % 60).padStart(2, "0")}</span>
            </div>
            <p className="text-xs opacity-80">{event.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
