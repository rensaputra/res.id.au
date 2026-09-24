import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';

import type { ApiResponse } from '../types';

// Hero pulls in several Docusaurus-only modules that do not resolve under
// Vitest. Mock them with lightweight stand-ins so the component renders in
// jsdom while preserving the behavior the integration test relies on.

const BASE_URL = 'https://counter.example.com';

// `useDocusaurusContext` is the config accessor under test (Req 5.1, 5.2):
// the base URL must flow from `customFields.visitorCounterApiBaseUrl` into the
// client call.
vi.mock('@docusaurus/useDocusaurusContext', () => ({
  default: () => ({
    siteConfig: {
      customFields: {
        visitorCounterApiBaseUrl: BASE_URL,
      },
    },
  }),
}));

vi.mock('@docusaurus/useBaseUrl', () => ({
  default: (path: string) => path,
}));

vi.mock('@docusaurus/Link', () => ({
  default: ({ to, children, ...rest }: { to: string; children: React.ReactNode }) => (
    <a href={to} {...rest}>
      {children}
    </a>
  ),
}));

// Control the network layer: `incrementCount` resolves/pends on demand so we
// can assert loading and success states, and inspect the URL passed in.
vi.mock('../visitorCounterClient', () => ({
  incrementCount: vi.fn(),
}));

import Hero from '../../index';
import { incrementCount } from '../visitorCounterClient';

const mockedIncrementCount = vi.mocked(incrementCount);

describe('Hero visitor counter integration', () => {
  beforeEach(() => {
    mockedIncrementCount.mockReset();
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  // Req 3.1: while the increment request is in flight, the counter shows the
  // loading spinner and no final count.
  describe('spinner while loading', () => {
    it('renders the spinner and no final count while the request is pending', () => {
      // A promise that never resolves keeps the hook in the loading state.
      mockedIncrementCount.mockReturnValue(new Promise<ApiResponse>(() => {}));

      const { container } = render(<Hero />);

      const spinner = container.querySelector('[role="status"]');
      expect(spinner).not.toBeNull();
      // No visitor count is shown while loading.
      expect(container.textContent).not.toContain('You are visitor');
    });
  });

  // Req 2.4: on success, the counter sits at the bottom of the hero header,
  // after (and outside) the max-w-4xl intro container.
  describe('placement on success', () => {
    it('renders the counter at the bottom of the hero, after the intro container', async () => {
      mockedIncrementCount.mockResolvedValue({ count: 1234 } as ApiResponse);

      const { container } = render(<Hero />);

      const counter = await screen.findByText('You are visitor #1,234');

      // The counter lives outside the centered intro container.
      const containerDiv = container.querySelector('div.max-w-4xl');
      expect(containerDiv).not.toBeNull();
      expect(containerDiv?.contains(counter)).toBe(false);

      // Ordered after the intro container in DOM order (bottom of the header).
      const position = containerDiv!.compareDocumentPosition(counter);
      // DOCUMENT_POSITION_FOLLOWING (4) means `counter` comes after the container.
      expect(position & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });
  });

  // Req 5.1, 5.2: the base URL from customFields flows into the client call.
  describe('config accessor', () => {
    it('passes the customFields base URL into the client call', async () => {
      mockedIncrementCount.mockResolvedValue({ count: 5 } as ApiResponse);

      render(<Hero />);

      await waitFor(() => {
        expect(mockedIncrementCount).toHaveBeenCalledTimes(1);
      });

      expect(mockedIncrementCount).toHaveBeenCalledWith(
        BASE_URL,
        expect.objectContaining({ signal: expect.any(AbortSignal) }),
      );
    });
  });

  // Req 6.1, 6.2: the counter renders as a single subtle line with the expected
  // muted Tailwind utilities applied via clsx.
  describe('styling consistency', () => {
    it('renders a single subtle line with the muted Tailwind utilities', async () => {
      mockedIncrementCount.mockResolvedValue({ count: 42 } as ApiResponse);

      render(<Hero />);

      const counter = await screen.findByText('You are visitor #42');

      // Single line: the counter is a single <p> element.
      expect(counter.tagName).toBe('P');

      // Muted utilities applied via clsx (my-2 text-sm text-gray-400).
      expect(counter.classList.contains('my-2')).toBe(true);
      expect(counter.classList.contains('text-sm')).toBe(true);
      expect(counter.classList.contains('text-gray-400')).toBe(true);
    });
  });
});
