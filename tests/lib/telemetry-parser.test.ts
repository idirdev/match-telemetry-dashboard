import { describe, it, expect } from 'vitest';
import { parseTelemetryStream, filterByPlayer, filterByType, getEventTypes } from '../../src/lib/telemetry-parser';

describe('telemetry parser', () => {
  const rawStream = [
    '{"type":"kill","timestamp":1000,"playerId":"p1","data":{"weapon":"ak47"}}',
    '{"type":"death","timestamp":1200,"playerId":"p2","data":{}}',
    '{"type":"move","timestamp":1100,"playerId":"p1","data":{"x":100,"y":200}}',
    'invalid line',
    '{"type":"kill","timestamp":1500,"playerId":"p2","data":{"weapon":"m4a1"}}',
  ].join('\n');

  it('parses valid events', () => {
    const result = parseTelemetryStream(rawStream);
    expect(result.events).toHaveLength(4);
  });

  it('sorts events by timestamp', () => {
    const result = parseTelemetryStream(rawStream);
    for (let i = 1; i < result.events.length; i++) {
      expect(result.events[i].timestamp).toBeGreaterThanOrEqual(result.events[i - 1].timestamp);
    }
  });

  it('extracts unique players', () => {
    const result = parseTelemetryStream(rawStream);
    expect(result.players).toContain('p1');
    expect(result.players).toContain('p2');
  });

  it('calculates duration', () => {
    const result = parseTelemetryStream(rawStream);
    expect(result.duration).toBe(500);
  });

  it('filters by player', () => {
    const telemetry = parseTelemetryStream(rawStream);
    expect(filterByPlayer(telemetry, 'p1')).toHaveLength(2);
  });

  it('filters by type', () => {
    const telemetry = parseTelemetryStream(rawStream);
    expect(filterByType(telemetry, 'kill')).toHaveLength(2);
  });

  it('lists event types', () => {
    const telemetry = parseTelemetryStream(rawStream);
    const types = getEventTypes(telemetry);
    expect(types).toContain('kill');
    expect(types).toContain('death');
    expect(types).toContain('move');
  });

  it('handles empty stream', () => {
    const result = parseTelemetryStream('');
    expect(result.events).toHaveLength(0);
    expect(result.duration).toBe(0);
  });
});
