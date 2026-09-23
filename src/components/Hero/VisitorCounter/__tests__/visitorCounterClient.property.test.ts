import { describe, expect, it } from 'vitest';
import fc from 'fast-check';

import { buildCounterUrl } from '../visitorCounterClient';

// Feature: hero-visitor-counter, Property 1: URL construction from the base URL
//
// For any API base URL string (with or without a trailing slash) and any
// optional `pageId`, `buildCounterUrl` produces a URL that:
//   - begins with the base URL exactly as given (the trailing slash is
//     preserved, since the staged API Gateway endpoint requires it),
//   - appends a `?pageId=<encoded>` query only when a `pageId` is provided.
//
// **Validates: Requirements 1.2**
describe('Feature: hero-visitor-counter, Property 1: URL construction from the base URL', () => {
  // Arbitrary base URL: a non-slash body optionally wrapped in trailing
  // slashes, so we exercise both "with" and "without" trailing-slash cases.
  const baseUrlArb = fc
    .tuple(
      fc.stringMatching(/^[^/\s]+$/), // non-empty core without slashes/whitespace
      fc.nat({ max: 3 }), // number of trailing slashes to append
    )
    .map(([core, trailing]) => `${core}${'/'.repeat(trailing)}`);

  const pageIdArb = fc.option(fc.string(), { nil: undefined });

  it('preserves the base URL exactly and adds pageId only when provided', () => {
    fc.assert(
      fc.property(baseUrlArb, pageIdArb, (baseUrl, pageId) => {
        const url = buildCounterUrl(baseUrl, pageId);

        // Begins with the base URL exactly as given (trailing slash preserved).
        expect(url.startsWith(baseUrl)).toBe(true);

        // The portion after the base URL is the query (if any).
        const suffix = url.slice(baseUrl.length);

        if (pageId) {
          // A pageId query is present only when a (truthy) pageId is provided,
          // and the value is URI-encoded.
          expect(suffix).toBe(`?pageId=${encodeURIComponent(pageId)}`);
        } else {
          // No query appended when no pageId (or a falsy pageId) is provided.
          expect(suffix).toBe('');
        }
      }),
      { numRuns: 100 },
    );
  });
});
