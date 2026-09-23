// Pure formatting and validation helpers for the VisitorCounter module.
//
// These are side-effect-free and independently testable. They cover the
// display formatting (Requirements 2.2, 2.3) and the response validation
// that decides whether a count is shown at all (Requirement 4.2).

import type { ApiResponse } from './types';

// Requirement 2.2 / 2.3 — thousands separators.
// The `en-US` locale is pinned deliberately so grouping is deterministic
// regardless of the visitor's runtime locale, keeping the display and the
// tests stable.
export function formatCount(count: number): string {
  return count.toLocaleString('en-US');
}

export function formatVisitorLine(count: number): string {
  return `You are visitor #${formatCount(count)}`;
}

// Requirement 4.2 — accept only a finite, non-negative integer count.
export function parseCount(response: ApiResponse | null | undefined): number | null {
  const value = response?.count;
  if (typeof value === 'number' && Number.isFinite(value) && value >= 0) {
    return Math.trunc(value);
  }
  return null; // missing / null / string / NaN / negative → hide
}
