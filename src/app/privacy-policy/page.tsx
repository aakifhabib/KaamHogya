import type { Metadata } from 'next';
import { DisclaimerBox } from '@/components/DisclaimerBox';
import { PageMetaBar } from '@/components/PageMetaBar';
import { OFFICIAL_DIRECTORY_URL, SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for KaamHoGaya.pk explaining how offline checklists, anonymous wait-time reports, and analytics work.',
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageMetaBar
        breadcrumbs={[{ label: 'Privacy Policy', href: '/privacy-policy' }]}
        lastUpdated="2026-11-16T08:00:00Z"
        sourceUrl={OFFICIAL_DIRECTORY_URL}
        sourceLabel="pakistan.gov.pk"
      />

      <article className="mx-auto max-w-4xl space-y-6 px-4 py-10 sm:px-6">
        <div className="space-y-5 rounded-2xl border border-emerald-950/10 bg-white p-6 text-sm leading-relaxed text-gray-700 shadow-sm sm:p-8">
          <h1 className="text-3xl font-extrabold text-ink">Privacy Policy</h1>
          <p className="text-xs text-gray-500">Effective Date: 16 November 2026</p>

          <p>
            At <strong>{SITE_NAME}</strong>, we respect your privacy. We never ask for
            your CNIC number, passport number, bank credentials, or sensitive personal
            identity documents on our website.
          </p>

          <h2 className="text-lg font-bold text-ink">
            1. Document Checklists (Stored Locally on Your Device)
          </h2>
          <p>
            When you tick checkboxes, add personal reminders, or click &ldquo;Save My
            Checklist&rdquo;, your progress is stored strictly inside your own browser’s{' '}
            <code>localStorage</code> so it remains available offline. We do not upload
            or track your personal checklist selections on our servers.
          </p>

          <h2 className="text-lg font-bold text-ink">
            2. Anonymous Wait Time Reports &amp; Anti-Spam Rate Limiting
          </h2>
          <p>
            When you submit an office wait time report, we store only the office/process,
            visit date, wait minutes, star rating, and optional public tip. To prevent
            spam, we generate a random anonymous browser identifier in{' '}
            <code>localStorage</code> used strictly for rate limiting (max 3 reports per
            hour) and automatically pruned after 24 hours. Please do not include personal
            names, phone numbers, or CNIC digits inside public wait time tips.
          </p>

          <h2 className="text-lg font-bold text-ink">
            3. Analytics &amp; Advertising (Google Analytics / AdSense)
          </h2>
          <p>
            We may use privacy-friendly aggregated analytics (such as Google Analytics
            with anonymized IP) to understand which Pakistani cities and guides need
            updates, and clearly labeled AdSense slots to keep the process library free
            for citizens.
          </p>

          <h2 className="text-lg font-bold text-ink">4. WhatsApp Document Review</h2>
          <p>
            If you voluntarily contact our optional WhatsApp support line, messages are
            governed by WhatsApp’s end-to-end encryption and privacy policy. We never
            sell or share citizen contact details with third parties.
          </p>

          <h2 className="text-lg font-bold text-ink">5. Contact</h2>
          <p>
            Questions about this Privacy Policy? Email{' '}
            <strong className="text-brand">support@kaamhogaya.pk</strong>.
          </p>
        </div>

        <DisclaimerBox />
      </article>
    </>
  );
}
