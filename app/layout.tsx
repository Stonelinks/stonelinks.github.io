import type { Metadata } from 'next';
import './globals.css';
import 'highlight.js/styles/github.css';

export const metadata: Metadata = {
  title: 'Stonelinks',
  description: 'Personal website of Lucas Doyle',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
