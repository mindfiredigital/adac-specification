import React from 'react';
import { ThemeProvider } from '@mindfiredigital/ignix-ui';

// This component runs at the very root of the Docusaurus React tree,
// allowing us to inject global context providers (like Ignix UI's ThemeProvider)
// before any other components are rendered.
export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}
