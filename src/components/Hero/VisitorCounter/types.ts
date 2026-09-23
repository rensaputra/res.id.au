// Shared types for the VisitorCounter module.
//
// These are imported by every layer file (client, hook, presentational
// component) so the data contract lives in one place.

// The subset of the Visitor_Counter_API response we rely on.
// `count` is expected to be a number but is validated at runtime, so it is
// typed as `unknown` here. `updatedAt` is part of the contract but unused.
export interface ApiResponse {
  count?: unknown;
  updatedAt?: unknown;
}

// Discriminated union describing what the counter should render.
// `hidden` is the single terminal state for every failure path
// (request error, non-numeric count, missing base URL).
export type VisitorCountState =
  { status: 'loading' } | { status: 'success'; count: number } | { status: 'hidden' };
