import type { Metadata } from 'next';
import { ExternalLink } from 'lucide-react';
import { DisclaimerBox } from '@/components/DisclaimerBox';
import { PageMetaBar } from '@/components/PageMetaBar';
import { OFFICIAL_DIRECTORY_URL, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of Service for KaamHoGaya.pk — accuracy verification, user wait-time submissions, document check service terms, limitation of liability, and governing law.',
  alternates: { canonical: `${SITE_URL}/terms` },
};

const OFFICIAL_VERIFICATION_LINKS = [
  { label: 'NADRA', display: 'nadra.gov.pk', url: 'https://www.nadra.gov.pk' },
  { label: 'Passport', display: 'dgip.gov.pk', url: 'https://dgip.gov.pk' },
  { label: 'FBR', display: 'fbr.gov.pk', url: 'https://fbr.gov.pk' },
  {
    label: 'Punjab Driving Licence',
    display: 'dlims.punjab.gov.pk',
    url: 'https://dlims.punjab.gov.pk',
  },
  {
    label: 'Punjab Police',
    display: 'pkm.punjab.gov.pk',
    url: 'https://pkm.punjab.gov.pk',
  },
];

export default function TermsPage() {
  return (
    <>
      <PageMetaBar
        breadcrumbs={[{ label: 'Terms of Service', href: '/terms' }]}
        lastUpdated="2026-11-17T00:00:00Z"
        sourceUrl={OFFICIAL_DIRECTORY_URL}
        sourceLabel="pakistan.gov.pk"
      />

      <article className="mx-auto max-w-4xl space-y-6 px-4 py-10 sm:px-6">
        <div className="space-y-6 rounded-2xl border border-emerald-950/10 bg-white p-6 text-sm leading-relaxed text-gray-700 shadow-sm sm:p-8">
          <header className="border-b border-gray-100 pb-5">
            <h1 className="text-3xl font-extrabold tracking-tight text-ink">
              Terms of Service
            </h1>
            <p className="mt-2 text-xs text-gray-600 sm:text-sm">
              <strong className="text-ink">Effective Date:</strong> 17 November 2026
            </p>
          </header>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-ink">1. Acceptance</h2>
            <p>
              By using KaamHoGaya.pk, you agree to these Terms. If you do not agree,
              please do not use the site.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-ink">2. What we provide</h2>
            <p>
              We provide general information about government processes in Pakistan,
              including fees, documents, steps, and crowdsourced wait times. All
              information is for guidance only.
            </p>
          </section>

          <section className="space-y-2.5">
            <h2 className="text-lg font-bold text-ink">3. Accuracy</h2>
            <p>
              Government fees, documents, and timings change. We try to keep guides
              updated and show a Last Updated date on each guide, but we do not
              guarantee that every fee or step is 100% correct at the moment you read
              it. Always confirm the fee and documents on the official website before
              you go:
            </p>
            <ul className="space-y-2 pt-1">
              {OFFICIAL_VERIFICATION_LINKS.map((item) => (
                <li key={item.url} className="flex flex-wrap items-center gap-1.5">
                  <span className="font-semibold text-ink">{item.label}:</span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-brand hover:underline"
                  >
                    {item.display}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-2.5">
            <h2 className="text-lg font-bold text-ink">4. User submissions</h2>
            <p>When you submit a wait time or tip, you agree that:</p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Your information is true to the best of your knowledge</li>
              <li>You are not submitting someone else&apos;s personal data</li>
              <li>We can publish your tip anonymously to help others</li>
              <li>
                We can remove any submission that is abusive, fake, or spam
              </li>
            </ul>
            <p>We may moderate all submissions before publishing.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-ink">5. Document Check Service</h2>
            <p>
              No paid document review service is currently offered through this site. Never share identity documents, passwords or one-time codes with an unverified contact.
            </p>
          </section>

          <section className="space-y-2.5">
            <h2 className="text-lg font-bold text-ink">6. Prohibited use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>
                Copy our guides and republish them as your own without permission
              </li>
              <li>Try to hack, scrape, or overload the site</li>
              <li>Submit fake wait times to mislead others</li>
              <li>Use the site for any illegal activity</li>
              <li>
                Impersonate KaamHoGaya.pk or claim to be from the government
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-ink">7. Intellectual property</h2>
            <p>
              All guides, text, design, and logo on KaamHoGaya.pk belong to
              KaamHoGaya.pk. You may share a link to a guide. You may not copy a full
              guide to your own website without written permission.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-ink">8. Limitation of liability</h2>
            <p>
              KaamHoGaya.pk is provided as is. We are not liable for any loss, extra
              fee, missed appointment, or rejected application caused by relying on our
              guides. Your use of the site is at your own risk. Our maximum liability
              for any paid service is limited to the fee you paid for that service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-ink">9. External links</h2>
            <p>
              We link to official government sites for verification. We are not
              responsible for the content of those external sites.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-ink">10. Changes to Terms</h2>
            <p>
              We may update these Terms at any time. The updated version will be posted
              on this page with a new Effective Date.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-ink">11. Governing law</h2>
            <p>
              These Terms are governed by the laws of Pakistan. Any dispute will be
              handled in the courts of Rawalpindi, Punjab, Pakistan.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-ink">12. Contact</h2>
            <p>
              Questions about these Terms:{' '}
              <a
                href="mailto:hello@kaamhogya.pk"
                className="font-semibold text-brand hover:underline"
              >
                hello@kaamhogya.pk
              </a>
            </p>
          </section>
        </div>

        <DisclaimerBox />
      </article>
    </>
  );
}
