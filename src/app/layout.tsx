'use client';
import '../styles/globals.css';
import '../styles/reset.css';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <title>Repick</title>
        <link rel="icon" href="/../favicon.png" />
      </head>
      <body>
        <RecoilRoot>
          <ThemeProvider theme={theme}>
            <Navigation />
            <div className="content">{children}</div>
            <Footer />
          </ThemeProvider>
        </RecoilRoot>
      </body>
    </html>
  );
}
