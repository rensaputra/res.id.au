// State-orchestration hook for the VisitorCounter module.
//
// Owns the effect that fires exactly one increment per mount, the base-URL
// guard, the loading/success/hidden state machine, and response validation.
// Every failure path converges on the `hidden` state (Requirement 4).

import { useEffect, useRef, useState } from 'react';
import type { VisitorCountState } from './types';
import { incrementCount } from './visitorCounterClient';
import { parseCount } from './format';

export function useVisitorCount(baseUrl: string | undefined): VisitorCountState {
  // Requirement 4.3: no base URL → skip request, hide (derived during render).
  const [state, setState] = useState<VisitorCountState>(
    baseUrl ? { status: 'loading' } : { status: 'hidden' },
  );
  const hasRun = useRef(false); // Requirement 1.3: exactly one increment per mount

  useEffect(() => {
    if (!baseUrl) return;
    if (hasRun.current) return;
    hasRun.current = true;

    const controller = new AbortController();
    incrementCount(baseUrl, { signal: controller.signal })
      .then((response) => {
        const count = parseCount(response);
        setState(count === null ? { status: 'hidden' } : { status: 'success', count });
      })
      .catch(() => {
        setState({ status: 'hidden' }); // Requirement 4.1: silent failure
      });

    return () => controller.abort();
  }, [baseUrl]);

  return state;
}
