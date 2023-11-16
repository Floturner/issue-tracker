import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import NavBar from './NavBar';
import './theme-config.css';
// After theme-config.css
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Issue Tracker',
  description: 'An app to track issues.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={poppins.variable}>
      <body>
        <Theme appearance='light' accentColor='blue'>
          <NavBar />
          <main className='p-5'>{children}</main>
        </Theme>
      </body>
    </html>
  );
}
