import type { Metadata } from 'next';
import { Providers } from './providers';
import '@coinbase/onchainkit/styles.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Base Tip Jar 🫙',
  description: 'Send onchain ETH tips on Base — fast, cheap, unstoppable.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
