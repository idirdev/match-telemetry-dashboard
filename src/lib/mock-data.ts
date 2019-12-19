import { MatchSession, Player, LoadoutStats, LatencySnapshot, AntiCheatEvent } from "./types";

const mkTimeline = (mult: number) => Array.from({ length: 30 }, (_, i) => ({
  timestamp: i * 60, kills: Math.floor(Math.random() * 3), deaths: Math.floor(Math.random() * 2),
  score: i * mult + Math.floor(Math.random() * 200), latency: 25 + Math.random() * 30,
}));

export const mockPlayers: Player[] = [
  {
    id: "p1", name: "PhantomX", kills: 28, deaths: 12, assists: 8, accuracy: 34.2, headshots: 11,
    damageDealt: 4280, damageTaken: 2150,
    loadout: { primary: "AK-47", secondary: "Deagle", equipment: ["Smoke", "Flash"], perks: ["Ghost", "Tracker"] },
    performanceTimeline: mkTimeline(100), antiCheatFlags: [],
  },
  {
    id: "p2", name: "ShadowBlade", kills: 22, deaths: 15, assists: 12, accuracy: 28.7, headshots: 6,
    damageDealt: 3450, damageTaken: 2800,
    loadout: { primary: "M4A1-S", secondary: "USP-S", equipment: ["Molotov", "Flash"], perks: ["Overkill", "Resupply"] },
    performanceTimeline: mkTimeline(85), antiCheatFlags: [],
  },
  {
    id: "p3", name: "NexusHunter", kills: 31, deaths: 8, assists: 5, accuracy: 42.1, headshots: 18,
    damageDealt: 5100, damageTaken: 1400,
    loadout: { primary: "AWP", secondary: "P250", equipment: ["Smoke", "HE"], perks: ["Dead Silence", "Tracker"] },
    performanceTimeline: mkTimeline(130),
    antiCheatFlags: [{ type: "aim_snap" as const, severity: "medium" as const, timestamp: 845, confidence: 0.72, details: "Unusual aim adjustment speed detected at 14:05" }],
  },
  {
    id: "p4", name: "VoltStrike", kills: 19, deaths: 18, assists: 15, accuracy: 26.3, headshots: 5,
    damageDealt: 3100, damageTaken: 3200,
    loadout: { primary: "MP9", secondary: "Glock", equipment: ["Flash", "Flash"], perks: ["Double Time", "Resupply"] },
    performanceTimeline: mkTimeline(70), antiCheatFlags: [],
  },
];

export const mockMatch: MatchSession = {
  id: "match-2025-0142", map: "Dust II", mode: "Competitive 5v5",
  startTime: new Date("2025-02-15T19:30:00Z"), endTime: new Date("2025-02-15T20:15:00Z"),
  duration: 2700,
  server: { region: "EU-West", ip: "185.xx.xx.42", tickRate: 128, avgLatency: 28, peakPlayers: 10 },
  teams: [
    { id: "t1", name: "Alpha", score: 16, players: [mockPlayers[0], mockPlayers[1]] },
    { id: "t2", name: "Bravo", score: 12, players: [mockPlayers[2], mockPlayers[3]] },
  ],
  events: [
    { id: "e1", type: "round_start", timestamp: 0, data: { round: 1 } },
    { id: "e2", type: "kill", timestamp: 45, data: { killer: "PhantomX", victim: "VoltStrike", weapon: "AK-47", headshot: true } },
    { id: "e3", type: "objective", timestamp: 90, data: { type: "bomb_plant", player: "ShadowBlade", site: "A" } },
    { id: "e4", type: "round_end", timestamp: 115, data: { round: 1, winner: "Alpha", reason: "bomb_detonation" } },
    { id: "e5", type: "anticheat", timestamp: 845, data: { player: "NexusHunter", type: "aim_snap", severity: "medium" } },
  ],
  tickRate: 128,
};

export const mockLoadoutStats: LoadoutStats[] = [
  { weapon: "AK-47", usage: 32, winRate: 54, avgKills: 18.5, category: "Rifle" },
  { weapon: "M4A1-S", usage: 28, winRate: 51, avgKills: 16.2, category: "Rifle" },
  { weapon: "AWP", usage: 15, winRate: 58, avgKills: 14.8, category: "Sniper" },
  { weapon: "MP9", usage: 12, winRate: 45, avgKills: 12.1, category: "SMG" },
  { weapon: "Deagle", usage: 8, winRate: 42, avgKills: 8.4, category: "Pistol" },
  { weapon: "USP-S", usage: 5, winRate: 49, avgKills: 6.2, category: "Pistol" },
];

export const mockLatencyData: LatencySnapshot[] = Array.from({ length: 45 }, (_, i) => ({
  timestamp: i * 60,
  avgLatency: 22 + Math.sin(i * 0.3) * 8 + Math.random() * 5,
  p95Latency: 45 + Math.sin(i * 0.3) * 15 + Math.random() * 10,
  p99Latency: 65 + Math.sin(i * 0.3) * 20 + Math.random() * 15,
  tickRate: 128 - (Math.random() > 0.9 ? Math.floor(Math.random() * 10) : 0),
  packetLoss: Math.random() > 0.85 ? Math.random() * 2 : 0,
}));

export const mockAntiCheatEvents: AntiCheatEvent[] = [
  { type: "aim_snap", severity: "medium", timestamp: 845, confidence: 0.72, details: "Unusual aim adjustment speed — 847deg/s in 16ms window" },
  { type: "speed_anomaly", severity: "low", timestamp: 1230, confidence: 0.45, details: "Movement speed exceeded limit by 3% for 200ms" },
  { type: "wallhack_suspect", severity: "high", timestamp: 1890, confidence: 0.81, details: "Pre-aim through smoke on 3 consecutive rounds" },
];
