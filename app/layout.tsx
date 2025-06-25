import type { Metadata, Viewport } from 'next';
import './globals.css';
import 'highlight.js/styles/github.css';
import { DEFAULT_TITLE } from '../lib/const';

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

export const generateMetadata = (): Metadata => {
  const defaultDescription = 'Personal website of Lucas Doyle';

  // For now, return the default title and description
  // This can be extended to generate dynamic titles based on page parameters

  return {
    title: DEFAULT_TITLE,
    description: defaultDescription,
  };
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
