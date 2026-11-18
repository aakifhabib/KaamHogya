import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';
import { DisclaimerBox } from '@/components/DisclaimerBox';
import { PageMetaBar } from '@/components/PageMetaBar';
import { OFFICIAL_DIRECTORY_URL, SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for KaamHoGaya.pk explaining what minimum data we collect, what we never collect, third-party services, data retention, and your rights.',
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageMetaBar
        breadcrumbs={[{ label: 'Privacy Policy', href: '/privacy-policy' }]}
        lastUpdated="2026-11-17T00:00:00Z"
        sourceUrl={OFFICIAL_DIRECTORY_URL}
        sourceLabel="pakistan.gov.pk"
      />

      <article className="mx-auto max-w-4xl space-y-6 px-4 py-10 sm:px-6">
        <div className="space-y-6 rounded-2xl border border-emerald-950/10 bg-white p-6 text-sm leading-relaxed text-gray-700 shadow-sm sm:p-8">
          <header className="border-b border-gray-100 pb-5">
            <h1 className="text-3xl font-extrabold tracking-tight text-ink">
              Privacy Policy
            </h1>
            <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5 text-xs text-gray-600 sm:text-sm">
              <div>
                <dt className="inline font-semibold text-ink">Effective Date: </dt>
                <dd className="inline">17 November 2026</dd>
              </div>
              <div>
                <dt className="inline font-semibold text-ink">Website: </dt>
                <dd className="inline">
                  <Link href="/" className="font-semibold text-brand hover:underline">
                    {SITE_NAME}
                  </Link>
                </dd>
              </div>
              <div>
                <dt className="inline font-semibold text-ink">Contact: </dt>
                <dd className="inline">
                  <a
                    href="mailto:hello@kaamhogya.pk"
                    className="font-semibold text-brand hover:underline"
                  >
                    hello@kaamhogya.pk
                  </a>
                </dd>
              </div>
            </dl>
          </header>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-ink">1. What KaamHoGaya.pk is</h2>
            <p>
              KaamHoGaya.pk is an independent information website. We explain government
              processes in Pakistan in simple language. We are not a government website,
              we are not <strong>NADRA</strong>, DGIP, FBR, or Punjab Police, and we do
              not process government applications on your behalf.
            </p>
          </section>

          <section className="space-y-2.5">
            <h2 className="text-lg font-bold text-ink">2. What we collect</h2>
            <p>We collect the minimum data needed to run the site.</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Wait Time Submissions:</strong> When you submit a wait time, we
                collect city, office name, date of visit, wait time in minutes, rating,
                and your tip. We do not ask for your name, CNIC, passport number, or
                phone number in this form. An identifier stored in your browser is used for basic rate limiting; do not include personal information in your tip.
              </li>
              <li>
                <strong>Contact Form:</strong> If you contact us, we collect your name,
                email, and your message so we can reply.
              </li>
              <li>
                <strong>Analytics:</strong> If enabled, Google Analytics may collect usage and device information.
              </li>
              <li>
                <strong>Cookies:</strong> See our{' '}
                <Link
                  href="/cookie-policy"
                  className="font-semibold text-brand hover:underline"
                >
                  Cookie Policy
                </Link>{' '}
                for full details.
              </li>
            </ul>
          </section>

          <section className="rounded-xl border border-red-200 bg-red-50/70 p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <ShieldAlert
                className="mt-0.5 h-5 w-5 shrink-0 text-red-700"
                aria-hidden="true"
              />
              <div className="space-y-1.5">
                <h2 className="text-base font-bold text-red-950">
                  3. What we never collect
                </h2>
                <p className="text-red-950">
                  We never collect or store your CNIC number, passport number, bank
                  account details, passwords, or OTPs. If anyone asks you for these in
                  the name of KaamHoGaya.pk, it is a scam. Report it to us immediately.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-2.5">
            <h2 className="text-lg font-bold text-ink">4. How we use your data</h2>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>To show average wait times and improve guides</li>
              <li>To reply to your messages</li>
              <li>To fix errors in guides</li>
              <li>To understand which guides need updating</li>
            </ul>
            <p>
              We do not sell your data. We do not share your personal data with third
              parties except for the services needed to run the site, like hosting,
              analytics, and database.
            </p>
          </section>

          <section className="space-y-2.5">
            <h2 className="text-lg font-bold text-ink">5. Third party services</h2>
            <p>We use:</p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Vercel for hosting</li>
              <li>Supabase for database</li>
              <li>Google Analytics for traffic analysis</li>
              <li>Google AdSense for ads, if ads are shown</li>
            </ul>
            <p>
              These services may set their own cookies. Their privacy policies apply to
              their services.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-ink">6. Ads</h2>
            <p>
              If we show Google AdSense ads, Google may use cookies to show relevant
              ads. You can turn off personalized ads in your Google Ads settings.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-ink">7. Data retention</h2>
            <p>
              Wait time submissions are kept to calculate averages. Contact messages are sent using your email application; do not include sensitive identity information.
            </p>
          </section>

          <section className="space-y-2.5">
            <h2 className="text-lg font-bold text-ink">8. Your rights</h2>
            <p>You can ask us to:</p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Show what data we have about your contact message</li>
              <li>Delete your contact message</li>
              <li>Delete your wait time tip if you can identify it</li>
            </ul>
            <p>
              Email{' '}
              <a
                href="mailto:hello@kaamhogya.pk?subject=Data%20Request"
                className="font-semibold text-brand hover:underline"
              >
                hello@kaamhogya.pk
              </a>{' '}
              with subject &ldquo;Data Request&rdquo; and we will reply within 7 working
              days.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-ink">9. Children</h2>
            <p>
              Our site is for general information. We do not knowingly collect data from
              children under 13. If you are under 18, please use the site with a parent
              or guardian.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-ink">10. Changes</h2>
            <p>
              If we change this policy, we will update the Effective Date at the top and
              post the new version on this page.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-ink">11. Contact</h2>
            <p>
              For any privacy question, email{' '}
              <a
                href="mailto:hello@kaamhogya.pk"
                className="font-semibold text-brand hover:underline"
              >
                hello@kaamhogya.pk
              </a>
              .
            </p>
          </section>
        </div>

        <DisclaimerBox />
      </article>
    </>
  );
}
