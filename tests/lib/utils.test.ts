import { describe, it, expect } from 'vitest';

describe('telemetry utils', () => {
  it('formats duration in seconds', () => {
    expect(formatDuration(90)).toBe('1:30');
    expect(formatDuration(3661)).toBe('1:01:01');
  });
  it('calculates round KPM', () => {
    expect(killsPerMinute(15, 300)).toBeCloseTo(3.0);
    expect(killsPerMinute(0, 300)).toBe(0);
  });
  it('normalizes coordinates to map bounds', () => {
    const norm = normalizeCoords({ x: 500, y: 300 }, { width: 1000, height: 600 });
    expect(norm.x).toBeCloseTo(0.5);
    expect(norm.y).toBeCloseTo(0.5);
  });
  it('clamps normalized coords to 0-1', () => {
    const norm = normalizeCoords({ x: 1500, y: -100 }, { width: 1000, height: 600 });
    expect(norm.x).toBe(1);
    expect(norm.y).toBe(0);
  });
  it('groups events by round', () => {
    const events = [
      { round: 1, type: 'kill' },
      { round: 1, type: 'death' },
      { round: 2, type: 'kill' },
    ];
    const grouped = groupByRound(events);
    expect(grouped[1]).toHaveLength(2);
    expect(grouped[2]).toHaveLength(1);
  });
});

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function killsPerMinute(kills: number, durationSec: number): number {
  if (durationSec <= 0) return 0;
  return (kills / durationSec) * 60;
}

function normalizeCoords(pos: { x: number; y: number }, bounds: { width: number; height: number }) {
  return {
    x: Math.max(0, Math.min(1, pos.x / bounds.width)),
    y: Math.max(0, Math.min(1, pos.y / bounds.height)),
  };
}

function groupByRound<T extends { round: number }>(events: T[]): Record<number, T[]> {
  const groups: Record<number, T[]> = {};
  for (const e of events) {
    (groups[e.round] ??= []).push(e);
  }
  return groups;
}
