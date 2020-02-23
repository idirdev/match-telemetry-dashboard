import { Sidebar } from "@/components/sidebar";
import { MatchHeader } from "@/components/match-header";
import { ScoreboardPanel } from "@/components/scoreboard";
import { PerformanceChart } from "@/components/performance-chart";
import { LatencyMonitor } from "@/components/latency-monitor";
import { LoadoutUsage } from "@/components/loadout-usage";
import { AntiCheatPanel } from "@/components/anticheat-panel";
import { MatchTimeline } from "@/components/match-timeline";
import { mockMatch, mockLatencyData, mockLoadoutStats, mockAntiCheatEvents } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <MatchHeader match={mockMatch} />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {[
            { label: "Avg. Latency", value: `${mockMatch.server.avgLatency}ms`, color: "text-neon-green" },
            { label: "Tick Rate", value: `${mockMatch.server.tickRate}Hz`, color: "text-neon-blue" },
            { label: "Duration", value: `${Math.floor(mockMatch.duration / 60)}m`, color: "text-neon-purple" },
            { label: "AC Flags", value: `${mockAntiCheatEvents.length}`, color: "text-neon-red" },
          ].map((stat) => (
            <div key={stat.label} className="bg-surface-800 border border-surface-600 rounded-xl p-5">
              <p className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</p>
              <p className={`text-2xl font-bold font-mono mt-1 ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>
        <ScoreboardPanel teams={mockMatch.teams} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PerformanceChart players={mockMatch.teams.flatMap(t => t.players)} />
          <LatencyMonitor data={mockLatencyData} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LoadoutUsage stats={mockLoadoutStats} />
          <AntiCheatPanel events={mockAntiCheatEvents} />
        </div>
        <MatchTimeline events={mockMatch.events} duration={mockMatch.duration} />
      </main>
    </div>
  );
}
