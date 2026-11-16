import Link from 'next/link';
import { ArrowLeft, FileSearch } from 'lucide-react';
import { PageMetaBar } from '@/components/PageMetaBar';
import { OFFICIAL_DIRECTORY_URL } from '@/lib/constants';

export default function NotFound() {
  return (
    <>
      <PageMetaBar
        breadcrumbs={[{ label: 'Page Not Found' }]}
        lastUpdated="2026-11-17T00:00:00Z"
        sourceUrl={OFFICIAL_DIRECTORY_URL}
        sourceLabel="pakistan.gov.pk"
      />
      <section className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-brand">
          <FileSearch className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-3xl font-bold text-ink">Page Not Found</h1>
        <p className="mt-3 text-sm text-gray-600 sm:text-base">
          Sorry, we could not find the document guide or city page you were looking for.
          Search all verified Pakistani government processes below.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/processes"
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            Browse All Processes
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-ink hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </section>
    </>
  );
}
