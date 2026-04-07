import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'CorteQS - Dashboard',
  description: 'CorteQS Project Status and Management Dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <html lang="tr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
