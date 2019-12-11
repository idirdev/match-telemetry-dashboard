export interface MatchSession {
  id: string;
  map: string;
  mode: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  server: ServerInfo;
  teams: Team[];
  events: GameEvent[];
  tickRate: number;
}

export interface ServerInfo {
  region: string;
  ip: string;
  tickRate: number;
  avgLatency: number;
  peakPlayers: number;
}

export interface Team {
  id: string;
  name: string;
  score: number;
  players: Player[];
}

export interface Player {
  id: string;
  name: string;
  kills: number;
  deaths: number;
  assists: number;
  accuracy: number;
  headshots: number;
  damageDealt: number;
  damageTaken: number;
  loadout: Loadout;
  performanceTimeline: PerformancePoint[];
  antiCheatFlags: AntiCheatEvent[];
}

export interface Loadout {
  primary: string;
  secondary: string;
  equipment: string[];
  perks: string[];
}

export interface PerformancePoint {
  timestamp: number;
  kills: number;
  deaths: number;
  score: number;
  latency: number;
}

export interface GameEvent {
  id: string;
  type: "kill" | "objective" | "round_start" | "round_end" | "anticheat" | "disconnect";
  timestamp: number;
  data: Record<string, unknown>;
}

export interface AntiCheatEvent {
  type: "speed_anomaly" | "aim_snap" | "wallhack_suspect" | "packet_manipulation";
  severity: "low" | "medium" | "high" | "critical";
  timestamp: number;
  confidence: number;
  details: string;
}

export interface LoadoutStats {
  weapon: string;
  usage: number;
  winRate: number;
  avgKills: number;
  category: string;
}

export interface LatencySnapshot {
  timestamp: number;
  avgLatency: number;
  p95Latency: number;
  p99Latency: number;
  tickRate: number;
  packetLoss: number;
}
