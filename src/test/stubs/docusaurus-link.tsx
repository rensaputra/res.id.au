// Test stub for `@docusaurus/Link`.
//
// Docusaurus provides this module only through its own build/runtime, so it
// cannot be resolved under Vitest. This stub renders a plain anchor so that
// components importing Link can be exercised in jsdom.

import React from 'react';

export default function Link({
  to,
  href,
  children,
  ...rest
}: {
  to?: string;
  href?: string;
  children?: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href={to ?? href} {...rest}>
      {children}
    </a>
  );
}
