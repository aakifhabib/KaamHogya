import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  Building2,
  CalendarCheck,
  Clock,
  MapPin,
  Star,
} from 'lucide-react';
import { CityOfficialOfficesSection } from '@/components/CityOfficesDirectory';
import { DisclaimerBox } from '@/components/DisclaimerBox';
import {
  AnimatedCounter,
  HeroAmbientOrbs,
  Reveal,
} from '@/components/MotionPrimitives';
import { PageMetaBar } from '@/components/PageMetaBar';
import { NadraServiceCards } from '@/components/NadraServiceCards';
import { ProcessCard } from '@/components/ProcessCard';
import { WhatsAppCta } from '@/components/WhatsAppCta';
import { getCityOfficialDirectory } from '@/data/city-offices';
import { CITY_PORTAL_LINKS, OFFICIAL_DIRECTORY_URL, SITE_URL } from '@/lib/constants';
import { getCities, getOfficeWaitSummaries, getProcessSummaries } from '@/lib/data';
import {
  formatShortDate,
  formatWaitMinutes,
  getWaitTimeBadgeColor,
} from '@/lib/format';

export const dynamic = 'force-dynamic';

interface CityPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const cities = await getCities();
  const { slug } = await params;
  const city = cities.find((c) => c.slug === slug.toLowerCase());
  if (!city) {
    return { title: 'City Guide Not Found' };
  }
  const canonical = `${SITE_URL}/city/${city.slug}`;
  return {
    title: `${city.name} NADRA Centers, FBR RTO & Citizen Document Guides`,
    description: `NADRA service summaries, local office listings, CNIC renewal fees, free IRIS NTN registration, and government document guides in ${city.name}, ${city.province}.`,
    alternates: { canonical },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const [cities, { data: allProcesses }, { data: waitSummaryData }] = await Promise.all([
    getCities(),
    getProcessSummaries(),
    getOfficeWaitSummaries(),
  ]);

  const { slug } = await params;
  const city = cities.find((c) => c.slug === slug.toLowerCase());
  if (!city) {
    notFound();
  }

  const citySpecificProcesses = allProcesses.filter(
    (p) => p.city.toLowerCase() === city.name.toLowerCase()
  );
  const nationwideProcesses = allProcesses.filter(
    (p) => p.is_nationwide && p.city.toLowerCase() !== city.name.toLowerCase()
  );

  const cityOffices = waitSummaryData.offices.filter(
    (o) => o.city.toLowerCase() === city.name.toLowerCase()
  );

  const ratedOffices = cityOffices.filter((o) => o.avg_wait_minutes !== null);
  const cityAvgWait =
    ratedOffices.length > 0
      ? Math.round(
          ratedOffices.reduce((acc, o) => acc + (o.avg_wait_minutes ?? 0), 0) /
            ratedOffices.length
        )
      : null;

  const lastUpdated =
    citySpecificProcesses.reduce(
      (latest, p) => (p.last_updated > latest ? p.last_updated : latest),
      allProcesses[0]?.last_updated ?? '2026-11-17T00:00:00Z'
    ) || '2026-11-17T00:00:00Z';

  const officialDirectory = getCityOfficialDirectory(city.slug);
  const officialOfficeCount = officialDirectory
    ? officialDirectory.nadraCenters.length + officialDirectory.fbrOffices.length
    : cityOffices.length;

  const portal = CITY_PORTAL_LINKS[city.slug] ?? {
    label: 'pakistan.gov.pk',
    url: OFFICIAL_DIRECTORY_URL,
  };

  return (
    <>
      <PageMetaBar
        breadcrumbs={[
          { label: 'Cities', href: '/processes' },
          { label: city.name },
        ]}
        lastUpdated={lastUpdated}
        sourceUrl={portal.url}
        sourceLabel={portal.label}
      />

      {/* City Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand to-[#0E6D4B] text-white">
        <HeroAmbientOrbs />
        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="animate-fade-up max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-semibold text-emerald-50 backdrop-blur-sm">
                <MapPin className="h-3.5 w-3.5 text-accent-yellow" aria-hidden="true" />
                {city.province}, Pakistan
              </span>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {city.name} Citizen Process Library
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-emerald-100 sm:text-base">
                Citizen guides, fee information, office listings, and
                historical citizen reports where available for {city.name} offices and nationwide portals.
              </p>
            </div>

            {/* City Stats */}
            <div
              className="animate-fade-up grid grid-cols-3 gap-3 text-center"
              style={{ animationDelay: '110ms' }}
            >
              <div className="khg-glass-panel rounded-xl px-4 py-3">
                <p className="text-2xl font-extrabold tabular-nums text-white">
                  <AnimatedCounter
                    value={citySpecificProcesses.length + nationwideProcesses.length}
                  />
                </p>
                <p className="text-[11px] text-emerald-100">Applicable Guides</p>
              </div>
              <div className="khg-glass-panel rounded-xl px-4 py-3">
                <p className="text-2xl font-extrabold tabular-nums text-white">
                  <AnimatedCounter value={officialOfficeCount} />
                </p>
                <p className="text-[11px] text-emerald-100">Listed Offices</p>
              </div>
              <div className="khg-glass-panel rounded-xl px-4 py-3">
                <p className="text-2xl font-extrabold tabular-nums text-accent-yellow">
                  {cityAvgWait !== null ? `${cityAvgWait}m` : '—'}
                </p>
                <p className="text-[11px] text-emerald-100">
                  {cityAvgWait !== null ? 'Reported Avg Wait' : 'No Wait Data'}
                </p>
              </div>
            </div>
          </div>

          {/* Switch City Strip */}
          <div
            className="animate-fade-up mt-8 flex flex-wrap items-center gap-2 border-t border-white/15 pt-5 text-xs"
            style={{ animationDelay: '180ms' }}
          >
            <span className="font-semibold text-emerald-200">Other cities:</span>
            {cities.map((c) => (
              <Link
                key={c.id}
                href={`/city/${c.slug}`}
                className={`rounded-full px-3 py-1 font-semibold transition-all duration-200 ease-spring active:scale-95 ${
                  c.slug === city.slug
                    ? 'bg-accent-yellow text-brand-dark shadow-sm'
                    : 'bg-white/10 text-white hover:-translate-y-0.5 hover:bg-white/20'
                }`}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6">
        <section aria-labelledby="nadra-services-heading">
          <h2 id="nadra-services-heading" className="text-2xl font-bold text-ink">NADRA services for {city.name} residents</h2>
          <p className="mb-5 mt-2 text-sm leading-relaxed text-gray-600">Explore nationwide NADRA guidance by service. Local counter availability and hours vary; confirm with NADRA before visiting. These research summaries are separate from the process counts below.</p>
          <NadraServiceCards citySlug={city.slug} />
          <Link href="/nadra" className="mt-5 inline-block font-semibold text-brand underline">NADRA support, mobile services and other cities →</Link>
        </section>

        {/* Verified Official NADRA & FBR Directory for This City */}
        {officialDirectory && (
          <Reveal>
            <CityOfficialOfficesSection directory={officialDirectory} />
          </Reveal>
        )}

        {/* City-Specific Processes */}
        {citySpecificProcesses.length > 0 && (
          <section aria-labelledby="city-processes-heading">
            <Reveal>
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2
                    id="city-processes-heading"
                    className="text-2xl font-bold tracking-tight text-ink"
                  >
                    Processes in {city.name} ({citySpecificProcesses.length})
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Local {city.name} counter addresses, timings, fees, and checklists.
                  </p>
                </div>
                <Link
                  href={`/checklist?city=${encodeURIComponent(city.name)}`}
                  className="group inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 px-4 py-2 text-xs font-bold text-brand transition-all duration-200 ease-spring hover:-translate-y-0.5 hover:bg-emerald-100 sm:text-sm"
                >
                  Generate {city.name} PDF Checklist
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-spring group-hover:translate-x-0.5" />
                </Link>
              </div>
            </Reveal>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {citySpecificProcesses.map((proc, idx) => (
                <Reveal key={proc.id} delay={idx * 65}>
                  <ProcessCard process={proc} />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Offices & Avg Wait Times in this City */}
        {cityOffices.length > 0 && (
          <section aria-labelledby="city-offices-heading">
            <Reveal>
              <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2
                    id="city-offices-heading"
                    className="text-2xl font-bold tracking-tight text-ink"
                  >
                    {city.name} Offices &amp; Live Wait Times
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Office listings and reported queue durations. Confirm office details with the relevant agency before visiting.
                  </p>
                </div>
                <Link
                  href="/wait-times"
                  className="text-sm font-semibold text-brand hover:underline"
                >
                  Compare all Pakistan offices →
                </Link>
              </div>
            </Reveal>

            <div className="grid gap-4 md:grid-cols-2">
              {cityOffices.map((office, idx) => {
                const badge = getWaitTimeBadgeColor(office.avg_wait_minutes);
                return (
                  <Reveal key={office.process_id} delay={idx * 65}>
                    <div className="khg-card-lift h-full rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-card">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-brand">
                          <Building2 className="h-4 w-4" aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-ink">
                            {office.office_name}
                          </h3>
                          <p className="mt-0.5 text-xs text-gray-600">
                            {office.office_address}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`inline-flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold ${badge.bg} ${badge.text}`}
                      >
                        <Clock className="h-3.5 w-3.5" />
                        {formatWaitMinutes(office.avg_wait_minutes)}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-surface p-3 text-xs">
                      <div>
                        <span className="text-gray-500">Timings</span>
                        <p className="mt-0.5 font-semibold text-ink">
                          {office.office_timings}
                        </p>
                      </div>
                      <div>
                        <span className="flex items-center gap-1 text-gray-500">
                          <CalendarCheck className="h-3 w-3 text-brand" />
                          Best Day
                        </span>
                        <p className="mt-0.5 font-semibold text-ink">
                          {office.best_day_to_go}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-3 text-gray-500">
                        {office.avg_rating && (
                          <span className="inline-flex items-center gap-1 font-semibold text-ink">
                            <Star className="h-3.5 w-3.5 fill-accent-yellow text-accent-yellow" />
                            {office.avg_rating}/5
                          </span>
                        )}
                        <span>
                          {office.report_count} report{office.report_count === 1 ? '' : 's'}
                          {office.last_reported_date
                            ? ` • Last ${formatShortDate(office.last_reported_date)}`
                            : ''}
                        </span>
                      </div>
                      <Link
                        href={`/process/${office.process_slug}`}
                        className="font-bold text-brand hover:underline"
                      >
                        Full Guide →
                      </Link>
                    </div>
                  </div>
                  </Reveal>
                );
              })}
            </div>
          </section>
        )}

        {/* Nationwide / Federal Guides Applicable in this City */}
        <section aria-labelledby="nationwide-heading">
          <Reveal>
            <div className="mb-5">
              <h2
                id="nationwide-heading"
                className="text-2xl font-bold tracking-tight text-ink"
              >
                {citySpecificProcesses.length > 0
                  ? `Nationwide & Online Processes Available in ${city.name}`
                  : `Available Citizen Guides for ${city.name} Residents`}
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                {citySpecificProcesses.length > 0
                  ? `Federal and online Pakistani processes you can complete from ${city.name} with the same official PKR fee schedule.`
                  : `Federal guides (NADRA, DGIP Passport, FBR IRIS NTN) apply across all of Pakistan including ${city.name} with identical official fees. We are expanding dedicated ${city.name} local office guides next!`}
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {(nationwideProcesses.length > 0 ? nationwideProcesses : allProcesses.slice(0, 6)).map(
              (proc, idx) => (
                <Reveal key={proc.id} delay={idx * 60}>
                  <ProcessCard process={proc} />
                </Reveal>
              )
            )}
          </div>
        </section>

        <WhatsAppCta />
        <DisclaimerBox officialSourceUrl={portal.url} />
      </div>
    </>
  );
}
