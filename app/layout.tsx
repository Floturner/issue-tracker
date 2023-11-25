import { Container, Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import NavBar from './NavBar';
import QueryClientProvider from './QueryClientProvider';
import AuthProvider from './auth/Provider';
import './theme-config.css';
// After theme-config.css
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const APP_NAME = 'Issue Tracker';

export const metadata: Metadata = {
  title: APP_NAME,
  description: 'An app to track issues.',
  openGraph: {
    title: APP_NAME,
    description: 'An app to track issues.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={montserrat.variable}>
        <QueryClientProvider>
          <AuthProvider>
            <Theme appearance='light' accentColor='blue'>
              <NavBar />
              <Container>
                <main className='p-5'>{children}</main>
              </Container>
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
