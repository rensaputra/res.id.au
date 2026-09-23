// Presentational, state-driven VisitorCounter component.
//
// This is a pure function of `state`: it renders exactly one of the loading
// placeholder, the formatted visitor line, or nothing. Keeping the network
// and orchestration logic in `useVisitorCount` leaves this component trivially
// testable and free of side effects.
//
// _Requirements: 2.1, 2.3, 3.1, 3.2, 4.1, 6.1_

import React from 'react';
import clsx from 'clsx';
import styles from '../styles.module.css';
import { formatVisitorLine } from './format';
import type { VisitorCountState } from './types';

export default function VisitorCounter({ state }: { state: VisitorCountState }) {
  // Requirement 4.1 — silent failure: render nothing when hidden.
  if (state.status === 'hidden') return null;

  // Requirement 3.1 — subtle placeholder while the request is in flight.
  if (state.status === 'loading') {
    return (
      <p
        aria-hidden="true"
        className={clsx('mt-2 text-sm text-gray-400', styles.visitorCounterPlaceholder)}
      >
        {'\u00A0'}
      </p>
    );
  }

  // Requirements 2.1 / 2.3 / 3.2 — display the formatted visitor total.
  return (
    <p className={clsx('mt-2 text-sm text-gray-400', styles.visitorCounter)}>
      {formatVisitorLine(state.count)}
    </p>
  );
}
