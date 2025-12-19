import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
import { Footer } from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | VectraDocs',
    default: 'VectraDocs - AI-Powered Documentation',
  },
  description: 'AI-powered documentation that chats back. Transform your static docs into interactive, intelligent experiences with VectraDocs. Open source & free.',
  keywords: ['documentation', 'AI', 'chatbot', 'docs', 'nextjs', 'fumadocs', 'open source', 'developer tools'],
  authors: [{ name: 'iotserver24', url: 'https://github.com/iotserver24' }],
  creator: 'iotserver24',
  publisher: 'iotserver24',
  metadataBase: new URL('https://vectra-docs.xibe.app'),
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/logo.jpg', // Using the logo as apple touch icon
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vectra-docs.xibe.app',
    title: 'VectraDocs - AI-Powered Documentation',
    description: 'AI-powered documentation that chats back. Transform your static docs into interactive, intelligent experiences.',
    siteName: 'VectraDocs',
    images: [
      {
        url: '/metadata.png',
        width: 1200,
        height: 630,
        alt: 'VectraDocs - AI-Powered Documentation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VectraDocs - AI-Powered Documentation',
    description: 'AI-powered documentation that chats back. Transform your static docs into interactive, intelligent experiences.',
    images: ['/metadata.png'],
    creator: '@iotserver24', // Update if you have a specific handle
  },
};



const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        <RootProvider>
          <main className="flex-1">{children}</main>
          <Footer />
        </RootProvider>
      </body>
    </html>
  );
}
