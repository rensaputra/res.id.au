import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

// Minimal Vitest setup for unit and property-based tests.
// `jsdom` supports the React Testing Library tests added by later tasks;
// pure-logic tests (like the formatting property tests) run fine under it too.
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
  resolve: {
    // Docusaurus runtime modules are only provided by the Docusaurus dev/build
    // server, so they cannot be resolved under Vitest. Point them at small
    // stub modules so component tests can import (and `vi.mock`) them. Tests
    // that need specific behavior override these stubs with `vi.mock`.
    alias: {
      // Docusaurus maps `@site` to the project root. Mirror that here so
      // component imports like `@site/src/components/...` resolve under Vitest.
      '@site': fileURLToPath(new URL('.', import.meta.url)),
      '@docusaurus/Link': fileURLToPath(
        new URL('./src/test/stubs/docusaurus-link.tsx', import.meta.url),
      ),
      '@docusaurus/useBaseUrl': fileURLToPath(
        new URL('./src/test/stubs/docusaurus-useBaseUrl.ts', import.meta.url),
      ),
      '@docusaurus/useDocusaurusContext': fileURLToPath(
        new URL('./src/test/stubs/docusaurus-useDocusaurusContext.ts', import.meta.url),
      ),
    },
  },
  // The project's tsconfig (from @docusaurus/tsconfig) sets `jsx: "preserve"`,
  // which leaves JSX untransformed. Component tests render React elements, so
  // enable the automatic JSX runtime for the test build. This Vitest build
  // transforms with oxc, so the JSX option lives under `oxc`.
  oxc: {
    jsx: {
      runtime: 'automatic',
    },
  },
});
