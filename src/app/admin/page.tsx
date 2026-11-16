import type { Metadata } from 'next';
import { AdminDashboardClient } from '@/components/admin/AdminDashboardClient';
import { PageMetaBar } from '@/components/PageMetaBar';
import { OFFICIAL_DIRECTORY_URL } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Protected editor workspace for KaamHoGaya.pk administrators.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <>
      <PageMetaBar
        breadcrumbs={[{ label: 'Admin Dashboard', href: '/admin' }]}
        lastUpdated="2026-11-17T00:00:00Z"
        sourceUrl={OFFICIAL_DIRECTORY_URL}
        sourceLabel="Official Portals Reference"
      />
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <AdminDashboardClient />
      </section>
    </>
  );
}
