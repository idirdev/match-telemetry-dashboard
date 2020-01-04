import { MatchSession } from "@/lib/types";

export function MatchHeader({ match }: { match: MatchSession }) {
  return (
    <div className="bg-surface-800 border border-surface-600 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold">Match {match.id}</h1>
          <p className="text-sm text-gray-500">{match.map} — {match.mode} — {match.server.region}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-neon-green/10 text-neon-green text-xs font-medium rounded-full">{match.server.tickRate}Hz</span>
          <button className="px-4 py-2 bg-surface-700 hover:bg-surface-600 rounded-lg text-sm transition-colors">Export JSON</button>
        </div>
      </div>
      <div className="flex items-center justify-center gap-8">
        <div className="text-center">
          <p className="text-sm text-gray-400">{match.teams[0].name}</p>
          <p className="text-4xl font-bold font-mono text-neon-green">{match.teams[0].score}</p>
        </div>
        <span className="text-2xl text-gray-600 font-light">vs</span>
        <div className="text-center">
          <p className="text-sm text-gray-400">{match.teams[1].name}</p>
          <p className="text-4xl font-bold font-mono text-neon-red">{match.teams[1].score}</p>
        </div>
      </div>
    </div>
  );
}
