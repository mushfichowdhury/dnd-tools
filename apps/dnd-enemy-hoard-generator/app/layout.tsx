import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'D&D 5e Enemy Horde Generator',
  description: 'Generate mechanically balanced, thematic enemy hordes for D&D 5e encounters.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
