import type { Metadata } from 'next';
import { DisclaimerBox } from '@/components/DisclaimerBox';
import { PageMetaBar } from '@/components/PageMetaBar';
import { OFFICIAL_DIRECTORY_URL, SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Terms of Use for KaamHoGaya.pk — citizen process guides, community wait time guidelines, and accuracy notices.',
  alternates: { canonical: `${SITE_URL}/terms` },
};

export default function TermsPage() {
  return (
    <>
      <PageMetaBar
        breadcrumbs={[{ label: 'Terms of Use', href: '/terms' }]}
        lastUpdated="2026-11-16T08:00:00Z"
        sourceUrl={OFFICIAL_DIRECTORY_URL}
        sourceLabel="pakistan.gov.pk"
      />

      <article className="mx-auto max-w-4xl space-y-6 px-4 py-10 sm:px-6">
        <div className="space-y-5 rounded-2xl border border-emerald-950/10 bg-white p-6 text-sm leading-relaxed text-gray-700 shadow-sm sm:p-8">
          <h1 className="text-3xl font-extrabold text-ink">Terms of Use</h1>
          <p className="text-xs text-gray-500">Last Updated: 16 November 2026</p>

          <p>
            By accessing or using <strong>{SITE_NAME}</strong>, you agree to these Terms
            of Use. If you do not agree, please discontinue use of the site.
          </p>

          <h2 className="text-lg font-bold text-ink">
            1. Independent Information &amp; User Verification Responsibility
          </h2>
          <p>
            {SITE_NAME} provides independent educational guides for Pakistani civic
            processes. While our editors work carefully to verify PKR fees, office
            timings, and document lists, government agencies frequently revise policies.
            You are responsible for confirming final fees and rules on the official
            government portal linked on every guide before paying fees or travelling.
          </p>

          <h2 className="text-lg font-bold text-ink">
            2. Community Wait Time Submissions
          </h2>
          <p>
            When submitting a wait time or tip, you agree to share truthful, respectful
            information based on a real visit within the last 90 days. Submissions
            containing spam, abusive language, personal phone numbers, agent promotions,
            or HTML/script payloads will be rejected or deleted by moderators.
          </p>

          <h2 className="text-lg font-bold text-ink">3. Limitation of Liability</h2>
          <p>
            {SITE_NAME} and its contributors shall not be liable for any missed
            appointments, rejected applications, fee discrepancies, travel expenses, or
            delays incurred while dealing with government offices or third-party portals.
          </p>

          <h2 className="text-lg font-bold text-ink">4. Acceptable Use</h2>
          <p>
            You may print, download PDF checklists, and share guides freely for personal
            and family use. Automated scraping, impersonation of government agencies, or
            unauthorized attempts to access the administrative panel are strictly
            prohibited.
          </p>
        </div>

        <DisclaimerBox />
      </article>
    </>
  );
}
