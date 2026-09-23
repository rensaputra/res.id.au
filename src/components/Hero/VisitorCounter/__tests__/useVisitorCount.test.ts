import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';

import { useVisitorCount } from '../useVisitorCount';
import { incrementCount } from '../visitorCounterClient';
import type { ApiResponse } from '../types';

// Mock the API client so the hook is exercised in isolation from `fetch`.
vi.mock('../visitorCounterClient', () => ({
  incrementCount: vi.fn(),
}));

const mockedIncrementCount = vi.mocked(incrementCount);

const BASE_URL = 'https://counter.example.com';

describe('useVisitorCount', () => {
  beforeEach(() => {
    mockedIncrementCount.mockReset();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // Req 1.1, 1.3: one increment request per mount, even if the effect re-runs.
  describe('increment on mount', () => {
    it('calls the client exactly once per mount', async () => {
      mockedIncrementCount.mockResolvedValue({ count: 42 } as ApiResponse);

      const { result } = renderHook(() => useVisitorCount(BASE_URL));

      await waitFor(() => {
        expect(result.current).toEqual({ status: 'success', count: 42 });
      });

      expect(mockedIncrementCount).toHaveBeenCalledTimes(1);
      expect(mockedIncrementCount).toHaveBeenCalledWith(
        BASE_URL,
        expect.objectContaining({ signal: expect.any(AbortSignal) }),
      );
    });

    it('sends exactly one request even when the effect re-runs (simulated re-invocation)', async () => {
      mockedIncrementCount.mockResolvedValue({ count: 7 } as ApiResponse);

      // Re-rendering with the same baseUrl re-runs the effect body; the
      // `hasRun` ref must prevent a second increment request.
      const { rerender, result } = renderHook(() => useVisitorCount(BASE_URL));

      await waitFor(() => {
        expect(result.current).toEqual({ status: 'success', count: 7 });
      });

      rerender();
      rerender();

      expect(mockedIncrementCount).toHaveBeenCalledTimes(1);
    });
  });

  // Req 4.1: a rejected request converges on the terminal `hidden` state.
  describe('silent failure', () => {
    it('ends in the hidden state when the client rejects', async () => {
      mockedIncrementCount.mockRejectedValue(new Error('network down'));

      const { result } = renderHook(() => useVisitorCount(BASE_URL));

      await waitFor(() => {
        expect(result.current).toEqual({ status: 'hidden' });
      });

      expect(mockedIncrementCount).toHaveBeenCalledTimes(1);
    });
  });

  // Req 4.2: a non-numeric `count` in the response is treated as invalid → hidden.
  describe('invalid count', () => {
    it('ends in the hidden state when the response count is non-numeric', async () => {
      mockedIncrementCount.mockResolvedValue({ count: 'not-a-number' } as ApiResponse);

      const { result } = renderHook(() => useVisitorCount(BASE_URL));

      await waitFor(() => {
        expect(result.current).toEqual({ status: 'hidden' });
      });

      expect(mockedIncrementCount).toHaveBeenCalledTimes(1);
    });
  });

  // Req 4.3: no base URL → skip the request entirely and hide.
  describe('missing base URL', () => {
    it('never calls the client and ends hidden when baseUrl is an empty string', async () => {
      const { result } = renderHook(() => useVisitorCount(''));

      await waitFor(() => {
        expect(result.current).toEqual({ status: 'hidden' });
      });

      expect(mockedIncrementCount).not.toHaveBeenCalled();
    });

    it('never calls the client and ends hidden when baseUrl is undefined', async () => {
      const { result } = renderHook(() => useVisitorCount(undefined));

      await waitFor(() => {
        expect(result.current).toEqual({ status: 'hidden' });
      });

      expect(mockedIncrementCount).not.toHaveBeenCalled();
    });
  });
});
