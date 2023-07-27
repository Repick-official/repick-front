'use client';
import './globals.css';
import './reset.css';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';
import { RecoilRoot } from 'recoil';

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
          <Navigation />
          <div className="content">{children}</div>
          <Footer />
        </RecoilRoot>
      </body>
    </html>
  );
}
