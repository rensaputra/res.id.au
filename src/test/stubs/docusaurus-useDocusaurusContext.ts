// Test stub for `@docusaurus/useDocusaurusContext`.
//
// Provides a minimal siteConfig shape. Tests that depend on specific config
// values (for example `customFields.visitorCounterApiBaseUrl`) override this
// module with `vi.mock`.

export default function useDocusaurusContext() {
  return {
    siteConfig: {
      customFields: {},
    },
  };
}
