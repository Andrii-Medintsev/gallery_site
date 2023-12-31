import type { Metadata } from 'next';

import './styles/globals.scss';
import { inter } from './ui/fonts';
import Header from './ui/Header';

export const metadata: Metadata = {
  title: 'Gallery site',
  description: 'Unsplash smaller brother',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
