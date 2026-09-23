import { describe, expect, it } from 'vitest';
import fc from 'fast-check';

import { formatCount } from '../format';

// Feature: hero-visitor-counter, Property 2: Count formatting with thousands separators
//
// For any finite non-negative integer count, `formatCount` produces the
// `en-US` grouped representation of that integer, and stripping the grouping
// separators (commas) from the result yields exactly the base-10 digits of
// the count.
//
// **Validates: Requirements 2.2**
describe('Feature: hero-visitor-counter, Property 2: Count formatting with thousands separators', () => {
  it('produces en-US grouped output whose digits (sans separators) match the count', () => {
    fc.assert(
      fc.property(fc.nat(), (count) => {
        const formatted = formatCount(count);

        // Matches the deterministic en-US grouped representation.
        expect(formatted).toBe(count.toLocaleString('en-US'));

        // Stripping grouping separators (commas) yields exactly the base-10
        // digits of the count.
        expect(formatted.replace(/,/g, '')).toBe(String(count));
      }),
      { numRuns: 100 },
    );
  });
});
