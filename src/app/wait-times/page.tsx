import type { Metadata } from 'next';
import { DisclaimerBox } from '@/components/DisclaimerBox';
import { PageMetaBar } from '@/components/PageMetaBar';
import { WaitTimeTracker } from '@/components/WaitTimeTracker';
import { WhatsAppCta } from '@/components/WhatsAppCta';
import { OFFICIAL_DIRECTORY_URL, SITE_URL } from '@/lib/constants';
import { getCities, getOfficeWaitSummaries } from '@/lib/data';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Live Office Wait Time Tracker — NADRA, Passport & Traffic Offices',
  description:
    'Check crowdsourced live waiting times, best days to visit, and citizen tips for NADRA Mega Centers, Regional Passport Offices, Police Khidmat Markaz, and e-Khidmat offices across Pakistan.',
  alternates: {
    canonical: `${SITE_URL}/wait-times`,
  },
};

export default async function WaitTimesPage() {
  const [{ data }, cities] = await Promise.all([
    getOfficeWaitSummaries(),
    getCities(),
  ]);

  const lastUpdated =
    data.recentReports[0]?.created_at ?? '2026-11-17T00:00:00Z';

  return (
    <>
      <PageMetaBar
        breadcrumbs={[{ label: 'Live Wait Times', href: '/wait-times' }]}
        lastUpdated={lastUpdated}
        sourceUrl={OFFICIAL_DIRECTORY_URL}
        sourceLabel="Citizen Reports & Official Portals"
      />

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Pakistan Office Wait Time Tracker
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-600 sm:text-base">
            Know how busy NADRA, Passport Office, Traffic Licensing, and e-Khidmat
            counters are before you leave home. Submit your own visit duration to help
            fellow citizens.
          </p>
        </div>

        <WaitTimeTracker
          initialOffices={data.offices}
          initialRecentReports={data.recentReports}
          cities={cities}
        />

        <div className="mt-10 space-y-6">
          <WhatsAppCta />
          <DisclaimerBox />
        </div>
      </section>
    </>
  );
}
