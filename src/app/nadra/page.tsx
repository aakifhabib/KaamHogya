import type { Metadata } from 'next';
import Link from 'next/link';
import { NadraServiceCards } from '@/components/NadraServiceCards';
import { PageMetaBar } from '@/components/PageMetaBar';
import { NADRA_REVIEWED } from '@/data/nadra-services';
import { getCities } from '@/lib/data';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'NADRA Services: CNIC, CRC, FRC, NICOP and More',
  description: 'Research-based NADRA identity and family service guides, with official sources and city links.',
  alternates: { canonical: `${SITE_URL}/nadra` },
};

export default async function NadraPage() {
  const cities = await getCities();
  return <>
    <PageMetaBar breadcrumbs={[{ label: 'NADRA services' }]} lastUpdated={NADRA_REVIEWED} sourceUrl="https://www.nadra.gov.pk/" sourceLabel="NADRA" />
    <section className="bg-brand-dark px-4 py-12 text-white sm:px-6"><div className="mx-auto max-w-6xl">
      <p className="text-sm font-semibold text-emerald-200">NADRA SERVICE LIBRARY · PAKISTAN</p>
      <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">Find the right identity service</h1>
      <p className="mt-3 max-w-3xl leading-relaxed text-emerald-100">Explore CNIC, children’s documents, family certificates, overseas identity and succession. These are nationwide summaries of NADRA’s published guidance, not a guarantee that every service is offered at every local office.</p>
    </div></section>
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6">
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">Information reviewed 16 November 2026. Requirements, fees, office hours and availability can change. NADRA’s fee page contains conflicting duplicate entries for some services; confirm your case with <a href="https://www.nadra.gov.pk/customer-support" className="font-bold underline">NADRA support</a> before visiting or paying. This site is independent of NADRA.</div>
      <section aria-labelledby="services"><h2 id="services" className="mb-5 text-2xl font-bold text-ink">Browse NADRA services</h2><NadraServiceCards /></section>
      <section className="rounded-2xl bg-emerald-50 p-6"><h2 className="text-xl font-bold text-ink">Find a city guide</h2><p className="mt-1 text-sm text-gray-700">Local pages currently cover these eight cities. The service information above also applies nationally, subject to eligibility and local availability.</p><div className="mt-4 flex flex-wrap gap-2">{cities.map(city => <Link key={city.id} href={`/city/${city.slug}`} className="rounded-full border border-brand/20 bg-white px-4 py-2 text-sm font-semibold text-brand hover:bg-emerald-100">{city.name}</Link>)}</div></section>
      <section className="grid gap-4 md:grid-cols-2"><div className="rounded-2xl border border-gray-200 p-5"><h2 className="font-bold text-ink">Mobile registration</h2><p className="mt-2 text-sm text-gray-700">NADRA lists identity, child, family and cancellation services through mobile registration vans. Visits can be rescheduled; check the official schedule first.</p><a className="mt-3 inline-block text-sm font-bold text-brand underline" href="https://www.nadra.gov.pk/mrvServices">NADRA mobile services and schedule →</a></div><div className="rounded-2xl border border-gray-200 p-5"><h2 className="font-bold text-ink">Accessibility &amp; support</h2><p className="mt-2 text-sm text-gray-700">NADRA describes special facilitation for persons with disabilities, women, orphans and other communities. Contact 1777 to confirm assistance for your case.</p><a className="mt-3 inline-block text-sm font-bold text-brand underline" href="https://www.nadra.gov.pk/inclusiveRegistration">NADRA inclusive registration →</a></div></section>
    </div>
  </>;
}
