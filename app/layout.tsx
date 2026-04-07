import type { Metadata, Viewport } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'CorteQS - Dashboard',
  description: 'CorteQS Project Status and Management Dashboard',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <html lang="tr">
      <body style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
