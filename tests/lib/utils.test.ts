import { describe, it, expect } from 'vitest';
import { formatDuration, killsPerMinute, normalizeCoords, groupByRound } from '../../src/lib/utils';

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
