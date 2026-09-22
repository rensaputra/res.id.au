import { describe, expect, it } from 'vitest';
import fc from 'fast-check';

import { parseCount } from '../format';
import type { ApiResponse } from '../types';

// Feature: hero-visitor-counter, Property 3: Response validation accepts only
// finite numeric counts
//
// For any API response object, `parseCount` returns a non-negative integer
// when and only when the response's `count` is a finite, non-negative number,
// and returns `null` for every other case (missing, `null`, non-numeric,
// `NaN`, negative), so that only valid counts lead to a displayed count and
// all others hide the counter.
//
// **Validates: Requirements 4.2**
describe('Feature: hero-visitor-counter, Property 3: Response validation accepts only finite numeric counts', () => {
  // Arbitrary `count` values spanning the full input space: finite numbers
  // (positive, negative, zero, fractional), NaN, infinities, strings,
  // booleans, null/undefined, and nested objects/arrays.
  const countArb = fc.oneof(
    fc.double(), // includes NaN, +/-Infinity, negatives, fractions
    fc.integer(),
    fc.string(),
    fc.boolean(),
    fc.constant(null),
    fc.constant(undefined),
    fc.constant(NaN),
    fc.constant(Infinity),
    fc.constant(-Infinity),
    fc.object(),
    fc.array(fc.anything()),
  );

  // Build assorted response shapes: an object with a `count` key, an object
  // missing `count` entirely, and null/undefined responses.
  const responseArb: fc.Arbitrary<ApiResponse | null | undefined> = fc.oneof(
    countArb.map((count) => ({ count }) as ApiResponse),
    countArb.map((count) => ({ count, updatedAt: 'ignored' }) as ApiResponse),
    fc.constant({} as ApiResponse), // missing count
    fc.constant(null),
    fc.constant(undefined),
  );

  it('returns a non-negative integer iff count is a finite non-negative number, else null', () => {
    fc.assert(
      fc.property(responseArb, (response) => {
        const result = parseCount(response);
        const value = response?.count;
        const isValid = typeof value === 'number' && Number.isFinite(value) && value >= 0;

        if (isValid) {
          expect(result).toBe(Math.trunc(value as number));
          expect(Number.isInteger(result)).toBe(true);
          expect(result as number).toBeGreaterThanOrEqual(0);
        } else {
          expect(result).toBeNull();
        }
      }),
      { numRuns: 100 },
    );
  });
});
