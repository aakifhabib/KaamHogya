import type { Metadata } from 'next';
import { Suspense } from 'react';
import { DisclaimerBox } from '@/components/DisclaimerBox';
import { PageMetaBar } from '@/components/PageMetaBar';
import { ProcessesExplorer } from '@/components/ProcessesExplorer';
import { OFFICIAL_DIRECTORY_URL, SITE_URL } from '@/lib/constants';
import { getCategories, getCities, getProcessSummaries } from '@/lib/data';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'All Government Processes in Pakistan — Fees, Documents & Wait Times',
  description:
    'Search and filter verified Pakistani government document processes by city, category, official PKR fee range, and processing time.',
  alternates: {
    canonical: `${SITE_URL}/processes`,
  },
};

export default async function AllProcessesPage() {
  const [{ data: processes }, cities, categories] = await Promise.all([
    getProcessSummaries(),
    getCities(),
    getCategories(),
  ]);

  const lastUpdated =
    processes.reduce(
      (latest, p) => (p.last_updated > latest ? p.last_updated : latest),
      processes[0]?.last_updated ?? '2026-11-17T00:00:00Z'
    ) || '2026-11-17T00:00:00Z';

  return (
    <>
      <PageMetaBar
        breadcrumbs={[{ label: 'All Processes', href: '/processes' }]}
        lastUpdated={lastUpdated}
        sourceUrl={OFFICIAL_DIRECTORY_URL}
        sourceLabel="Official Government Portals"
      />

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            All Pakistani Citizen Processes
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-600 sm:text-base">
            Filter instantly by city, category, official PKR fee, or processing time — no
            page reloads. Click any card for exact fee tables, interactive document
            checklists, and live office wait times.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
              Loading processes...
            </div>
          }
        >
          <ProcessesExplorer
            initialProcesses={processes}
            cities={cities}
            categories={categories}
          />
        </Suspense>

        <div className="mt-10">
          <DisclaimerBox />
        </div>
      </section>
    </>
  );
}
