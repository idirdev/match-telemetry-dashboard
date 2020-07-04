import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function killsPerMinute(kills: number, durationSec: number): number {
  if (durationSec <= 0) return 0;
  return (kills / durationSec) * 60;
}

export function normalizeCoords(pos: { x: number; y: number }, bounds: { width: number; height: number }) {
  return {
    x: Math.max(0, Math.min(1, pos.x / bounds.width)),
    y: Math.max(0, Math.min(1, pos.y / bounds.height)),
  };
}

export function groupByRound<T extends { round: number }>(events: T[]): Record<number, T[]> {
  const groups: Record<number, T[]> = {};
  for (const e of events) {
    (groups[e.round] ??= []).push(e);
  }
  return groups;
}
