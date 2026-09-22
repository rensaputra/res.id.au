// API client for the Visitor_Counter_API.
//
// This is the only layer that touches `fetch`. `buildCounterUrl` is a pure
// helper (independently testable), and `incrementCount` performs the single
// POST that increments the visit count.

import type { ApiResponse } from './types';

// Builds the request URL from the API base URL.
//
// The base URL is used as-is (any trailing slash is preserved, because the
// staged AWS API Gateway endpoint requires the trailing slash to resolve).
// A `?pageId=<encoded>` query is appended only when a `pageId` is provided.
export function buildCounterUrl(baseUrl: string, pageId?: string): string {
  const query = pageId ? `?pageId=${encodeURIComponent(pageId)}` : '';
  return `${baseUrl}${query}`;
}

// Increments the count. Resolves with the raw response body (unvalidated),
// or throws on network / non-OK responses.
export async function incrementCount(
  baseUrl: string,
  options?: { pageId?: string; signal?: AbortSignal },
): Promise<ApiResponse> {
  const res = await fetch(buildCounterUrl(baseUrl, options?.pageId), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal: options?.signal,
  });
  if (!res.ok) {
    throw new Error(`Visitor counter request failed: ${res.status}`);
  }
  return (await res.json()) as ApiResponse;
}
