# Implementation Plan: Hero Visitor Counter

## Overview

Build the visitor counter as four small layers under `src/components/Hero/VisitorCounter/`, from the innermost pure helpers outward to Hero integration and config wiring. Pure helpers (`format.ts`) and the API client come first so they can be property-tested independently; the state hook and presentational component follow; then everything is wired into `Hero` and exposed through Docusaurus `customFields`. Testing is dual: fast-check property tests (4 properties, ≥100 iterations, tagged) for the input-varying logic, plus React Testing Library example/integration tests for lifecycle, guards, wiring, and DOM structure.

## Tasks

- [x] 1. Set up VisitorCounter module scaffolding and shared types
  - Create `src/components/Hero/VisitorCounter/` directory and `__tests__/` subfolder
  - Define shared types in a location importable by all layer files: `ApiResponse` (`{ count?: unknown; updatedAt?: unknown }`) and the `VisitorCountState` discriminated union (`loading` | `success` with numeric `count` | `hidden`)
  - Confirm `fast-check` is available as a dev dependency; if absent, add it to `package.json` devDependencies
  - _Requirements: 4.1, 4.2, 4.3_

- [x] 2. Implement pure formatting and validation helpers
  - [x] 2.1 Implement `format.ts`
    - Write `formatCount(count: number): string` using `count.toLocaleString('en-US')` for deterministic thousands separators
    - Write `formatVisitorLine(count: number): string` returning `You are visitor #${formatCount(count)}`
    - Write `parseCount(response: ApiResponse | null | undefined): number | null` returning `Math.trunc(value)` only for finite, non-negative numeric `count`, else `null`
    - _Requirements: 2.2, 2.3, 4.2_

  - [x]* 2.2 Write property test for count formatting
    - **Feature: hero-visitor-counter, Property 2: Count formatting with thousands separators**
    - Generate arbitrary non-negative integers; assert output equals `en-US` grouped representation and that stripping grouping separators yields exactly the base-10 digits of the count
    - Run ≥100 iterations; tag with the property
    - **Validates: Requirements 2.2**

  - [x]* 2.3 Write property test for response validation
    - **Feature: hero-visitor-counter, Property 3: Response validation accepts only finite numeric counts**
    - Generate arbitrary response shapes (valid numbers, negatives, NaN, strings, missing, null); assert `parseCount` returns a non-negative integer iff `count` is finite and non-negative, else `null`
    - Run ≥100 iterations; tag with the property
    - **Validates: Requirements 4.2**

- [x] 3. Implement the API client and URL builder
  - [x] 3.1 Implement `visitorCounterClient.ts`
    - Write `buildCounterUrl(baseUrl, pageId?)` that strips trailing slashes from `baseUrl`, appends `?pageId=<encoded>` only when `pageId` is provided, and never produces a double slash between base and query
    - Write async `incrementCount(baseUrl, options?)` that sends a single `POST` with `Content-Type: application/json`, forwards an optional `AbortSignal`, throws on non-OK responses, and returns the parsed JSON body typed as `ApiResponse`
    - _Requirements: 1.1, 1.2_

  - [x]* 3.2 Write property test for URL construction
    - **Feature: hero-visitor-counter, Property 1: URL construction from the base URL**
    - Generate arbitrary base URLs (with and without trailing slashes) and optional `pageId` strings; assert the result begins with the trimmed base URL, includes a `pageId` query only when provided, and contains no double slash between base and query
    - Run ≥100 iterations; tag with the property
    - **Validates: Requirements 1.2**

- [x] 4. Implement the state-orchestration hook
  - [x] 4.1 Implement `useVisitorCount.ts`
    - Initialize state to `{ status: 'loading' }`; use a `hasRun` ref to guarantee exactly one increment per mount even under effect re-invocation
    - Guard: when `baseUrl` is falsy, set `{ status: 'hidden' }` and send no request
    - On success, call `parseCount` and set `success` (valid) or `hidden` (invalid); on rejection set `hidden`
    - Create an `AbortController`, pass its signal to `incrementCount`, and abort on cleanup to avoid post-unmount updates
    - _Requirements: 1.1, 1.3, 4.1, 4.2, 4.3_

  - [x]* 4.2 Write example/integration tests for the hook
    - Increment on mount: mock the client; assert exactly one `POST` per mount, including under a simulated effect re-run (Req 1.1, 1.3)
    - Silent failure: mock the client to reject; assert terminal state is `hidden` (Req 4.1)
    - Invalid count: mock a response whose `count` is non-numeric; assert `hidden` (Req 4.2)
    - Missing base URL: pass empty/undefined base URL; assert the client is never called and state is `hidden` (Req 4.3)
    - _Requirements: 1.1, 1.3, 4.1, 4.2, 4.3_

- [x] 5. Implement the presentational component
  - [x] 5.1 Implement `VisitorCounter/index.tsx`
    - Render nothing when `hidden`; render an `aria-hidden` non-breaking-space placeholder `<p>` when `loading`; render `formatVisitorLine(count)` in a single `<p>` when `success`
    - Apply muted styling with `clsx('mt-2 text-sm text-gray-400', styles.<class>)` consistent with the Hero component
    - _Requirements: 2.1, 2.3, 3.1, 3.2, 4.1, 6.1_

  - [x]* 5.2 Write property test for state-driven rendering
    - **Feature: hero-visitor-counter, Property 4: State-driven rendering is exclusive and correct**
    - Generate arbitrary states (loading, success with random count, hidden); render and assert exactly one of placeholder / line / nothing, and that the success text contains both the visitor phrase and `formatCount(count)`
    - Run ≥100 iterations; tag with the property
    - **Validates: Requirements 2.1, 2.3, 3.2, 4.1**

- [x] 6. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Add CSS module classes for the counter
  - In `src/components/Hero/styles.module.css`, add `.visitorCounter` and `.visitorCounterPlaceholder` classes for the subtle, less-prominent counter line, consistent with existing Hero styling
  - _Requirements: 6.1, 6.2_

- [x] 8. Wire the API base URL through Docusaurus config
  - [x] 8.1 Expose the base URL via `customFields`
    - In `docusaurus.config.ts`, add `customFields.visitorCounterApiBaseUrl` populated from `process.env.VISITOR_COUNTER_API_BASE_URL || ''`, following the existing `process.env` pattern in that file
    - _Requirements: 5.1, 5.2_

- [x] 9. Integrate the counter into the Hero component
  - [x] 9.1 Render VisitorCounter in `Hero/index.tsx`
    - Read `siteConfig.customFields?.visitorCounterApiBaseUrl` via `useDocusaurusContext()` and pass it to `useVisitorCount`
    - Render `<VisitorCounter state={state} />` as the last child inside the `max-w-4xl mx-auto px-4 text-center` container, immediately after the intro `<p>`
    - _Requirements: 2.4, 5.1, 5.2, 6.2_

  - [x]* 9.2 Write integration tests for Hero wiring
    - Placeholder while loading: render with the request pending; assert the placeholder is present and no final count (Req 3.1)
    - Placement: on success, assert the counter node is inside the `max-w-4xl` container and ordered after the intro paragraph (Req 2.4)
    - Config accessor: mock `useDocusaurusContext` returning `customFields.visitorCounterApiBaseUrl`; assert the value flows into the client call (Req 5.1, 5.2)
    - Styling consistency: assert the counter renders a single subtle line with the expected muted Tailwind utilities via `clsx` (Req 6.1, 6.2)
    - _Requirements: 2.4, 3.1, 5.1, 5.2, 6.1, 6.2_

- [x] 10. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional tests and can be skipped for a faster MVP.
- Each task references specific requirements for traceability; property-test tasks reference their design property number.
- The four fast-check property tests each run a minimum of 100 iterations and are tagged with their design property.
- Checkpoints ensure incremental validation before wiring layers together.
- Layers are built innermost-first (pure helpers → client → hook → component) so each is testable in isolation before Hero integration wires everything together, leaving no orphaned code.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1"] },
    { "id": 1, "tasks": ["2.1", "3.1", "7", "8.1"] },
    { "id": 2, "tasks": ["2.2", "2.3", "3.2", "4.1"] },
    { "id": 3, "tasks": ["4.2", "5.1"] },
    { "id": 4, "tasks": ["5.2", "9.1"] },
    { "id": 5, "tasks": ["9.2"] }
  ]
}
```
