import { describe, it, expect } from 'vitest';
import { mean, median, stddev, percentile, correlate, movingAverage } from '../../src/lib/stats';

describe('stats', () => {
  it('calculates mean', () => {
    expect(mean([2, 4, 6])).toBe(4);
    expect(mean([])).toBe(0);
  });

  it('calculates median', () => {
    expect(median([1, 3, 5])).toBe(3);
    expect(median([1, 2, 3, 4])).toBe(2.5);
    expect(median([])).toBe(0);
  });

  it('calculates stddev', () => {
    const sd = stddev([2, 4, 4, 4, 5, 5, 7, 9]);
    expect(sd).toBeCloseTo(2.0, 0);
  });

  it('calculates percentile', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(percentile(values, 50)).toBeCloseTo(5.5);
    expect(percentile(values, 90)).toBeCloseTo(9.1);
  });

  it('calculates correlation', () => {
    const perfect = correlate([1, 2, 3], [2, 4, 6]);
    expect(perfect).toBeCloseTo(1.0);
    const inverse = correlate([1, 2, 3], [6, 4, 2]);
    expect(inverse).toBeCloseTo(-1.0);
  });

  it('calculates moving average', () => {
    const result = movingAverage([1, 2, 3, 4, 5], 3);
    expect(result[0]).toBe(1);
    expect(result[2]).toBeCloseTo(2);
    expect(result[4]).toBeCloseTo(4);
  });
});
