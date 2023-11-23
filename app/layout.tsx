import { Container, Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import NavBar from './NavBar';
import './theme-config.css';
// After theme-config.css
import AuthProvider from './auth/Provider';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-montserrat',
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
    <html lang='en'>
      <body className={montserrat.variable}>
        <AuthProvider>
          <Theme appearance='light' accentColor='blue'>
            <NavBar />
            <Container>
              <main className='p-5'>{children}</main>
            </Container>
          </Theme>
        </AuthProvider>
      </body>
    </html>
  );
}
