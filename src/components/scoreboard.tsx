import { Team } from "@/lib/types";

export function ScoreboardPanel({ teams }: { teams: Team[] }) {
  const allPlayers = teams.flatMap((t) => t.players.map((p) => ({ ...p, team: t.name })));

  return (
    <div className="bg-surface-800 border border-surface-600 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-surface-600 flex items-center justify-between">
        <h2 className="font-semibold">Scoreboard</h2>
        <span className="text-xs text-gray-500">{allPlayers.length} players</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-gray-500 uppercase tracking-wider border-b border-surface-600">
              <th className="text-left px-4 py-3">Player</th>
              <th className="text-center px-3 py-3">K</th>
              <th className="text-center px-3 py-3">D</th>
              <th className="text-center px-3 py-3">A</th>
              <th className="text-center px-3 py-3">K/D</th>
              <th className="text-center px-3 py-3">ACC</th>
              <th className="text-center px-3 py-3">HS%</th>
              <th className="text-center px-3 py-3">DMG</th>
              <th className="text-center px-3 py-3">Flags</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-700">
            {allPlayers.sort((a, b) => b.kills - a.kills).map((player) => {
              const kd = player.deaths > 0 ? (player.kills / player.deaths).toFixed(2) : player.kills.toFixed(2);
              const hsPercent = player.kills > 0 ? Math.round((player.headshots / player.kills) * 100) : 0;
              return (
                <tr key={player.id} className="hover:bg-surface-700/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${player.team === "Alpha" ? "bg-neon-green" : "bg-neon-red"}`} />
                      <span className="font-medium font-mono">{player.name}</span>
                    </div>
                  </td>
                  <td className="text-center px-3 py-3 font-mono text-neon-green">{player.kills}</td>
                  <td className="text-center px-3 py-3 font-mono text-neon-red">{player.deaths}</td>
                  <td className="text-center px-3 py-3 font-mono text-gray-400">{player.assists}</td>
                  <td className="text-center px-3 py-3 font-mono font-bold">{kd}</td>
                  <td className="text-center px-3 py-3 font-mono">{player.accuracy}%</td>
                  <td className="text-center px-3 py-3 font-mono">{hsPercent}%</td>
                  <td className="text-center px-3 py-3 font-mono">{player.damageDealt.toLocaleString()}</td>
                  <td className="text-center px-3 py-3">
                    {player.antiCheatFlags.length > 0
                      ? <span className="px-2 py-0.5 bg-neon-red/20 text-neon-red text-xs rounded-full">{player.antiCheatFlags.length}</span>
                      : <span className="text-gray-600">-</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
