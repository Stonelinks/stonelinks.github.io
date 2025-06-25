import { Header } from './Header';

import '@fontsource/playfair-display/400.css';
import '@fontsource/playfair-display/700.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/700.css';
import Link from 'next/link';

interface PageWrapperProps {
  children?: React.ReactNode;
  className?: string;
}

export const PageWrapper = ({ children, className }: PageWrapperProps) => {
  return (
    <div
      className={`flex flex-col justify-between items-center min-h-screen p-6 pt-0 ${className || ''}`}
    >
      <Header />
      <div className="max-w-3xl">
        {children}
        <footer className="mt-6">
          <hr />© <Link href="/luke">Lucas Doyle</Link>{' '}
          {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
};
