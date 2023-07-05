'use client';
import './globals.css';
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
        <link rel="icon" href="" />
      </head>
      <body>
        <div className="content">
          <Navigation />
          <RecoilRoot>{children}</RecoilRoot>
          <Footer />
        </div>
      </body>
    </html>
  );
}
