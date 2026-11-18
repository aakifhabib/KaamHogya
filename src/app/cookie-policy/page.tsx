import type { Metadata } from 'next';
import Link from 'next/link';
import { Cookie } from 'lucide-react';
import { DisclaimerBox } from '@/components/DisclaimerBox';
import { PageMetaBar } from '@/components/PageMetaBar';
import { OFFICIAL_DIRECTORY_URL, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    'Cookie Policy for KaamHoGaya.pk explaining essential cookies, analytics cookies, advertising cookies, and how you can manage your choices.',
  alternates: { canonical: `${SITE_URL}/cookie-policy` },
};

export default function CookiePolicyPage() {
  return (
    <>
      <PageMetaBar
        breadcrumbs={[{ label: 'Cookie Policy', href: '/cookie-policy' }]}
        lastUpdated="2026-11-17T00:00:00Z"
        sourceUrl={OFFICIAL_DIRECTORY_URL}
        sourceLabel="pakistan.gov.pk"
      />

      <article className="mx-auto max-w-4xl space-y-6 px-4 py-10 sm:px-6">
        <div className="space-y-6 rounded-2xl border border-emerald-950/10 bg-white p-6 text-sm leading-relaxed text-gray-700 shadow-sm sm:p-8">
          <header className="border-b border-gray-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-brand">
                <Cookie className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-ink">
                  Cookie Policy
                </h1>
                <p className="mt-1 text-xs text-gray-600 sm:text-sm">
                  <strong className="text-ink">Effective Date:</strong> 17 November 2026
                </p>
              </div>
            </div>
          </header>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-ink">1. What cookies are</h2>
            <p>
              Cookies are small files saved by your browser. This site also uses local storage and a service-worker cache, which are different browser storage mechanisms.
            </p>
          </section>

          <section className="space-y-2.5">
            <h2 className="text-lg font-bold text-ink">2. Cookies we use</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Local storage and cache:</strong> Checklist ticks and optional reminders may be saved on your device. The site caches some pages and assets for offline use. A browser identifier may be saved when submitting a wait report. Administrator authentication can also use browser storage.
              </li>
              <li>
                <strong>Analytics:</strong> If enabled by the site operator, Google Analytics may use cookies and collect device and usage information.
              </li>
              <li>
                <strong>Advertising cookies:</strong> If we show Google AdSense ads,
                Google may set cookies to show relevant ads.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-ink">3. Your choice</h2>
            <p>
              You can manage cookies, local storage and cached site data in your browser settings. Clearing site data may remove saved checklists and sign out administrators. Analytics or ads should not be enabled until any applicable consent requirements are addressed.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-ink">4. Third party cookies</h2>
            <p>
              Google Analytics and Google AdSense may set their own cookies. Please read
              their cookie policies for details.
            </p>
          </section>

          <div className="flex flex-wrap gap-4 border-t border-gray-100 pt-4 text-xs font-semibold">
            <Link href="/privacy-policy" className="text-brand hover:underline">
              Read Privacy Policy →
            </Link>
            <Link href="/terms" className="text-brand hover:underline">
              Read Terms of Service →
            </Link>
            <Link href="/contact" className="text-brand hover:underline">
              Contact Us →
            </Link>
          </div>
        </div>

        <DisclaimerBox />
      </article>
    </>
  );
}
