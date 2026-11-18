import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { NadraPreparationChecklist } from '@/components/NadraPreparationChecklist';
import { PageMetaBar } from '@/components/PageMetaBar';
import { NADRA_FEES, NADRA_REVIEWED, NADRA_SERVICES, NADRA_SUPPORT } from '@/data/nadra-services';
import { SEED_CITIES } from '@/data/seed-data';
import { SITE_URL } from '@/lib/constants';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ city?: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = NADRA_SERVICES.find(item => item.slug === slug);
  return service ? { title: `${service.title} | NADRA Service Guide`, description: service.summary, alternates: { canonical: `${SITE_URL}/nadra/${service.slug}` } } : { title: 'NADRA service not found' };
}

export default async function NadraServicePage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { city: citySlug } = await searchParams;
  const service = NADRA_SERVICES.find(item => item.slug === slug);
  if (!service) notFound();
  const city = SEED_CITIES.find(item => item.slug === citySlug);
  return <>
    <PageMetaBar breadcrumbs={[{ label: 'NADRA services', href: '/nadra' }, { label: service.title }]} lastUpdated={NADRA_REVIEWED} sourceUrl={service.sources[0].url} sourceLabel="NADRA service page" />
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-10 sm:px-6">
      <header><p className="text-sm font-bold uppercase tracking-wide text-brand">{service.category} · NADRA</p><h1 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">{service.title}</h1><p className="mt-3 text-base leading-relaxed text-gray-700">{service.summary}</p>{city && <p className="mt-3 text-sm text-gray-600">Viewing from {city.name} · <Link className="font-bold text-brand underline" href={`/city/${city.slug}`}>Return to {city.name} guide</Link></p>}</header>
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">Nationwide NADRA guidance, reviewed 16 November 2026. Confirm your eligibility, required documents, fees, centre availability and hours with NADRA before applying. This independent guide is not an official application.</div>
      <section className="rounded-2xl border border-gray-200 bg-white p-6"><h2 className="text-xl font-bold text-ink">Who it is for</h2><p className="mt-2 leading-relaxed text-gray-700">{service.eligibility}</p></section>
      <NadraPreparationChecklist key={service.slug} slug={service.slug} items={service.documents} />
      <section className="rounded-2xl border border-gray-200 bg-white p-6"><h2 className="text-xl font-bold text-ink">How to proceed</h2><ol className="mt-3 list-decimal space-y-2 pl-5 leading-relaxed text-gray-700">{service.steps.map(item => <li key={item}>{item}</li>)}</ol></section>
      <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6"><h2 className="text-xl font-bold text-ink">Fees &amp; timing</h2><p className="mt-2 leading-relaxed text-gray-700">{service.fees}</p><p className="mt-3 text-sm text-gray-700">{service.caution}</p><a href={NADRA_FEES} className="mt-3 inline-block font-bold text-brand underline">Check NADRA’s current fee schedule →</a></section>
      <section className="rounded-2xl border border-gray-200 p-6"><h2 className="text-xl font-bold text-ink">Official sources &amp; help</h2><ul className="mt-3 space-y-2">{service.sources.map(source => <li key={source.url}><a href={source.url} className="font-semibold text-brand underline">{source.label} ↗</a></li>)}<li><a href={NADRA_SUPPORT} className="font-semibold text-brand underline">NADRA support and complaints ↗</a> · Call 1777</li></ul><p className="mt-4 text-sm text-gray-600">Centre services vary. Ask NADRA which location offers your service and verify hours before travelling. <Link className="font-semibold text-brand underline" href="/nadra">Browse all NADRA services</Link>.</p></section>
    </div>
  </>;
}
