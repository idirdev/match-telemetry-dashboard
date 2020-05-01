export interface TelemetryEvent {
  type: string;
  timestamp: number;
  playerId: string;
  data: Record<string, unknown>;
}

export interface ParsedTelemetry {
  events: TelemetryEvent[];
  players: string[];
  duration: number;
  startTime: number;
  endTime: number;
}

export function parseTelemetryStream(raw: string): ParsedTelemetry {
  const lines = raw.trim().split('\n').filter(Boolean);
  const events: TelemetryEvent[] = [];
  const playerSet = new Set<string>();

  for (const line of lines) {
    try {
      const parsed = JSON.parse(line);
      if (!parsed.type || !parsed.timestamp || !parsed.playerId) continue;

      events.push({
        type: parsed.type,
        timestamp: parsed.timestamp,
        playerId: parsed.playerId,
        data: parsed.data ?? {},
      });
      playerSet.add(parsed.playerId);
    } catch {
      continue;
    }
  }

  events.sort((a, b) => a.timestamp - b.timestamp);

  const startTime = events[0]?.timestamp ?? 0;
  const endTime = events[events.length - 1]?.timestamp ?? 0;

  return {
    events,
    players: Array.from(playerSet),
    duration: endTime - startTime,
    startTime,
    endTime,
  };
}

export function filterByPlayer(telemetry: ParsedTelemetry, playerId: string): TelemetryEvent[] {
  return telemetry.events.filter((e) => e.playerId === playerId);
}

export function filterByType(telemetry: ParsedTelemetry, type: string): TelemetryEvent[] {
  return telemetry.events.filter((e) => e.type === type);
}

export function getEventTypes(telemetry: ParsedTelemetry): string[] {
  return [...new Set(telemetry.events.map((e) => e.type))];
}
