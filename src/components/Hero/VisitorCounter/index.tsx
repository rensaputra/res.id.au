// Presentational, state-driven VisitorCounter component.
//
// This is a pure function of `state`: it renders exactly one of the loading
// placeholder, the formatted visitor line, or nothing. Keeping the network
// and orchestration logic in `useVisitorCount` leaves this component trivially
// testable and free of side effects.

import React from 'react';
import clsx from 'clsx';
import styles from '../styles.module.css';
import { formatVisitorLine } from './format';
import type { VisitorCountState } from './types';
import Spinner from '@site/src/components/Spinner';

export default function VisitorCounter({
  state,
  className,
}: {
  state: VisitorCountState;
  className?: string;
}) {
  // Requirement 4.1 — silent failure: render nothing when hidden.
  if (state.status === 'hidden') {
    return <div className={clsx(className)} />;
  }

  // Requirement 3.1 — spinner placeholder while the request is in flight.
  // Centered on its own line; forwards `className` so spacing/typography stays
  // consistent with the success line.
  if (state.status === 'loading') {
    return (
      <div className={clsx('flex items-center justify-center', className)}>
        <Spinner className="text-gray-200" />
      </div>
    );
  }

  // Requirements 2.1 / 2.3 / 3.2 — display the formatted visitor total as a
  // single subtle line.
  return <p className={clsx(styles.visitorCounter, className)}>{formatVisitorLine(state.count)}</p>;
}
