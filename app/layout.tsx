import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'VibeFinder - Discover Trending Local Spots',
  description: 'Stop doomscrolling, start discovering: Your AI guide to trending local spots.',
  keywords: 'local spots, trending, AI recommendations, social media, map view',
  authors: [{ name: 'VibeFinder Team' }],
  openGraph: {
    title: 'VibeFinder - Discover Trending Local Spots',
    description: 'Stop doomscrolling, start discovering: Your AI guide to trending local spots.',
    url: 'https://vibefinder.com',
    siteName: 'VibeFinder',
    images: [
      {
        url: 'https://vibefinder.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VibeFinder - Discover Trending Local Spots',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VibeFinder - Discover Trending Local Spots',
    description: 'Stop doomscrolling, start discovering: Your AI guide to trending local spots.',
    images: ['https://vibefinder.com/twitter-image.jpg'],
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        {children}
      </body>
    </html>
  );
}

