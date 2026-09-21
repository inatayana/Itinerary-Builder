import type { Metadata } from 'next';
import './globals.css';
import { env } from '@bali-car-charter/config';

export const metadata: Metadata = {
  title: 'Bali Car Charter',
  description: 'Platform penyedia transportasi berfasilitas pengemudi fasih berbahasa Inggris',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
