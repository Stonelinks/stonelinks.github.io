import type { Metadata } from 'next';
import { EB_Garamond } from 'next/font/google';
import './globals.css';
import 'highlight.js/styles/github.css';

const font = EB_Garamond({ subsets: ['latin'] });

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
      <body className={font.className}>{children}</body>
    </html>
  );
}
