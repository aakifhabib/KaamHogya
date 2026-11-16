import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ChecklistGenerator } from '@/components/ChecklistGenerator';
import { DisclaimerBox } from '@/components/DisclaimerBox';
import { PageMetaBar } from '@/components/PageMetaBar';
import { OFFICIAL_DIRECTORY_URL, SITE_URL } from '@/lib/constants';
import { getAllProcessesWithDocuments, getCities } from '@/lib/data';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Document Checklist & PDF Generator — Offline Ready',
  description:
    'Select any Pakistani government process and city, tick off required originals and photocopies, save offline, download a clean PDF, or share on WhatsApp.',
  alternates: {
    canonical: `${SITE_URL}/checklist`,
  },
};

export default async function ChecklistPage() {
  const [bundles, cities] = await Promise.all([
    getAllProcessesWithDocuments(),
    getCities(),
  ]);

  const lastUpdated =
    bundles.reduce(
      (latest, b) => (b.last_updated > latest ? b.last_updated : latest),
      bundles[0]?.last_updated ?? '2026-11-16T08:00:00Z'
    ) || '2026-11-16T08:00:00Z';

  return (
    <>
      <PageMetaBar
        breadcrumbs={[{ label: 'Document Checklist Generator', href: '/checklist' }]}
        lastUpdated={lastUpdated}
        sourceUrl={OFFICIAL_DIRECTORY_URL}
        sourceLabel="Official Portals (NADRA, DGIP, FBR, Punjab)"
      />

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="no-print mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Document Checklist &amp; PDF Generator
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-600 sm:text-base">
            Prepare your document folder before visiting any office. Tick every Original
            and Photocopy, save it offline on your mobile, download a printable PDF, or
            share your checklist on WhatsApp.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
              Loading checklist generator...
            </div>
          }
        >
          <ChecklistGenerator initialBundles={bundles} cities={cities} />
        </Suspense>

        <div className="no-print mt-10">
          <DisclaimerBox />
        </div>
      </section>
    </>
  );
}
