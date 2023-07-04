'use client';
import './globals.css';
import Navigation from '@/components/common/Navigation';
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
        <Navigation />
        <RecoilRoot>{children}</RecoilRoot>
      </body>
    </html>
  );
}
