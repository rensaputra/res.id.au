import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import fc from 'fast-check';

import VisitorCounter from '../index';
import { formatCount } from '../format';
import type { VisitorCountState } from '../types';

// Feature: hero-visitor-counter, Property 4: State-driven rendering is exclusive and correct
//
// For any VisitorCountState, the VisitorCounter component renders exactly one
// of: the loading placeholder (when `loading`), a single line containing the
// visitor phrase and the formatted count (when `success`), or nothing (when
// `hidden`). In the `success` case the rendered text contains both the
// visitor phrase and `formatCount(count)`.
//
// **Validates: Requirements 2.1, 2.3, 3.2, 4.1**

// Generate an arbitrary VisitorCountState across all three variants:
// loading, success (with a random non-negative integer count), and hidden.
const stateArb: fc.Arbitrary<VisitorCountState> = fc.oneof(
  fc.constant<VisitorCountState>({ status: 'loading' }),
  fc.nat().map<VisitorCountState>((count) => ({ status: 'success', count })),
  fc.constant<VisitorCountState>({ status: 'hidden' }),
);

describe('Feature: hero-visitor-counter, Property 4: State-driven rendering is exclusive and correct', () => {
  afterEach(() => {
    // Unmount between runs so the DOM does not accumulate across iterations.
    cleanup();
  });

  it('renders exactly one of placeholder / line / nothing, with correct success content', () => {
    fc.assert(
      fc.property(stateArb, (state) => {
        const { container } = render(<VisitorCounter state={state} />);

        const paragraphs = container.querySelectorAll('p');

        if (state.status === 'hidden') {
          // Nothing is rendered.
          expect(container.textContent).toBe('');
          expect(paragraphs.length).toBe(0);
        } else if (state.status === 'loading') {
          // A single spinner status element, no visitor line and no count text.
          const spinners = container.querySelectorAll('[role="status"]');
          expect(spinners.length).toBe(1);
          expect(paragraphs.length).toBe(0);
          expect(container.textContent).not.toContain('You are visitor');
        } else {
          // Exactly one line containing the visitor phrase and formatted count.
          expect(paragraphs.length).toBe(1);
          const text = paragraphs[0].textContent ?? '';
          expect(text).toContain('You are visitor');
          expect(text).toContain(formatCount(state.count));
        }

        cleanup();
      }),
      { numRuns: 100 },
    );
  });
});
