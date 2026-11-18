import type { Metadata, Viewport } from 'next';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/noto-nastaliq-urdu/400.css';
import '@fontsource/noto-nastaliq-urdu/700.css';
import './globals.css';

import { Footer } from '@/components/Footer';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { Header } from '@/components/Header';
import { PwaRegister } from '@/components/PwaRegister';
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from '@/lib/constants';

export const viewport: Viewport = {
  themeColor: '#0B5C3F',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Pakistan’s independent citizen process library for CNIC, Passport, Driving Licence, FBR NTN, Domicile, Birth Certificate, and Police Character Certificate — fee information, document checklists, step-by-step guides, and historical citizen reports.',
  keywords: [
    'Pakistan government documents guide',
    'Passport renewal Rawalpindi',
    'CNIC renewal Rawalpindi',
    'NADRA Mega Center Rawalpindi',
    'FBR NTN freelancer Pakistan',
    'Domicile certificate Rawalpindi',
    'Police character certificate Rawalpindi',
    'KaamHoGaya',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description:
      'Step-by-step Pakistani citizen process library with fee information, interactive document checklists, and historical citizen reports.',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description:
      'Har Sarkari Kaam, Step by Step — Fee information, document checklists, and historical citizen reports across Pakistan.',
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-surface text-ink antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        <GoogleAnalytics />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <PwaRegister />
      </body>
    </html>
  );
}
