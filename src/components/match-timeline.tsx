import { GameEvent } from "@/lib/types";

const eventConfig: Record<string, { icon: string; color: string }> = {
  kill: { icon: "x", color: "border-neon-red" },
  objective: { icon: "!", color: "border-neon-yellow" },
  round_start: { icon: ">", color: "border-neon-green" },
  round_end: { icon: "=", color: "border-neon-blue" },
  anticheat: { icon: "#", color: "border-neon-purple" },
  disconnect: { icon: "~", color: "border-gray-500" },
};

export function MatchTimeline({ events, duration }: { events: GameEvent[]; duration: number }) {
  return (
    <div className="bg-surface-800 border border-surface-600 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold">Match Timeline</h2>
        <span className="text-xs text-gray-500">{events.length} events</span>
      </div>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-surface-600" />
        <div className="space-y-4">
          {events.map((event) => {
            const cfg = eventConfig[event.type] || { icon: ".", color: "border-gray-500" };
            const min = Math.floor(event.timestamp / 60);
            const sec = event.timestamp % 60;
            return (
              <div key={event.id} className="flex items-start gap-4 pl-1">
                <div className={`w-8 h-8 rounded-full bg-surface-700 border-2 ${cfg.color} flex items-center justify-center text-sm font-mono shrink-0 z-10`}>
                  {cfg.icon}
                </div>
                <div className="flex-1 bg-surface-700/50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium capitalize">{event.type.replace("_", " ")}</span>
                    <span className="text-xs text-gray-500 font-mono">{min}:{String(sec).padStart(2, "0")}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {Object.entries(event.data).map(([k, v]) => `${k}: ${v}`).join(" | ")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
