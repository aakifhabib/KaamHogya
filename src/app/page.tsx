import Link from 'next/link';
import {
  ArrowRight,
  BookOpenCheck,
  Car,
  CheckCircle2,
  ClipboardCheck,
  FileBadge,
  IdCard,
  MapPin,
  Receipt,
  Search,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { DisclaimerBox } from '@/components/DisclaimerBox';
import { LiveWaitFeed } from '@/components/LiveWaitFeed';
import {
  AnimatedCounter,
  HeroAmbientOrbs,
  Reveal,
} from '@/components/MotionPrimitives';
import { PageMetaBar } from '@/components/PageMetaBar';
import { ProcessCard } from '@/components/ProcessCard';
import { SearchBar } from '@/components/SearchBar';
import { WhatsAppCta } from '@/components/WhatsAppCta';
import { OFFICIAL_DIRECTORY_URL, SITE_TAGLINE } from '@/lib/constants';
import {
  getCategories,
  getCities,
  getLatestWaitTimes,
  getProcessSummaries,
} from '@/lib/data';

export const dynamic = 'force-dynamic';

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  identity: IdCard,
  passport: BookOpenCheck,
  driving: Car,
  tax: Receipt,
  certificates: FileBadge,
  family: Users,
};

export default async function HomePage() {
  const [cities, categories, { data: processes }, { data: latestWaits }] =
    await Promise.all([
      getCities(),
      getCategories(),
      getProcessSummaries(),
      getLatestWaitTimes(6),
    ]);

  const popularProcesses = processes.slice(0, 6);
  const lastUpdated =
    processes.reduce(
      (latest, p) => (p.last_updated > latest ? p.last_updated : latest),
      processes[0]?.last_updated ?? '2026-11-17T00:00:00Z'
    ) || '2026-11-17T00:00:00Z';

  const categoryCounts = new Map<string, number>();
  for (const proc of processes) {
    categoryCounts.set(proc.category, (categoryCounts.get(proc.category) ?? 0) + 1);
  }

  return (
    <>
      <PageMetaBar
        breadcrumbs={[{ label: 'Pakistan Process Library' }]}
        lastUpdated={lastUpdated}
        sourceUrl={OFFICIAL_DIRECTORY_URL}
        sourceLabel="Official Portals (NADRA, DGIP, FBR, Punjab)"
      />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand to-[#0E6D4B] text-white">
        <HeroAmbientOrbs />
        <div className="relative mx-auto max-w-6xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:py-20">
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1 text-xs font-semibold text-emerald-50 backdrop-blur-md">
            <ShieldCheck className="h-3.5 w-3.5 text-accent-yellow" aria-hidden="true" />
            <span>Pakistan’s Citizen Process Library • Exact PKR Fees &amp; Checklists</span>
          </div>

          <h1
            className="animate-fade-up mx-auto mt-5 max-w-4xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl"
            style={{ animationDelay: '70ms' }}
          >
            {SITE_TAGLINE}
          </h1>

          <p
            className="animate-fade-up mx-auto mt-3 font-urdu text-lg text-emerald-100 sm:text-xl"
            style={{ animationDelay: '130ms' }}
            dir="rtl"
          >
            شناختی کارڈ، پاسپورٹ، لائسنس، ڈومیسائل اور ٹیکس — ہر کام کی مکمل فہرست اور فیس
          </p>

          <p
            className="animate-fade-up mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-emerald-100/95 sm:text-base"
            style={{ animationDelay: '180ms' }}
          >
            Stop wasting full days at government counters due to one missing photocopy.
            Check exact PKR fees, required originals, counter-by-counter steps, and real
            office wait times before you leave home.
          </p>

          {/* Centered Search Bar */}
          <div className="animate-fade-up relative z-20 mt-8" style={{ animationDelay: '230ms' }}>
            <SearchBar
              processes={processes}
              placeholder="Search: Passport Renewal in Rawalpindi"
            />
          </div>

          {/* Quick Popular Search Pills */}
          <div
            className="animate-fade-up mt-4 flex flex-wrap items-center justify-center gap-2 text-xs"
            style={{ animationDelay: '290ms' }}
          >
            <span className="text-emerald-200">Quick guides:</span>
            {[
              { label: 'Passport Renewal', href: '/process/passport-renewal-rawalpindi' },
              { label: 'NADRA Services', href: '/nadra' },
              { label: 'CNIC Renewal', href: '/process/cnic-renewal-rawalpindi' },
              { label: 'FBR NTN (Free)', href: '/process/fbr-ntn-for-freelancers' },
              { label: 'Police Character', href: '/process/police-character-certificate-rawalpindi' },
            ].map((pill) => (
              <Link
                key={pill.href}
                href={pill.href}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 font-medium text-white backdrop-blur-sm transition-all duration-200 ease-spring hover:-translate-y-0.5 hover:border-accent-yellow/60 hover:bg-white/20 active:scale-95"
              >
                {pill.label}
              </Link>
            ))}
          </div>

          {/* 8-City Selector */}
          <div
            className="animate-fade-up khg-glass-panel mx-auto mt-10 max-w-4xl rounded-2xl p-4 sm:p-5"
            style={{ animationDelay: '340ms' }}
          >
            <p className="mb-3 flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent-yellow">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              Official NADRA &amp; FBR Offices &amp; Guides — All 8 Cities
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {cities.map((city) => (
                <Link
                  key={city.id}
                  href={`/city/${city.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-white/15 bg-white/10 px-3.5 py-2.5 text-left text-sm font-semibold text-white transition-all duration-200 ease-spring hover:-translate-y-0.5 hover:border-accent-yellow/80 hover:bg-white hover:text-brand-dark hover:shadow-md active:scale-[0.98]"
                >
                  <span>{city.name}</span>
                  <ArrowRight
                    className="h-3.5 w-3.5 opacity-70 transition-transform duration-200 ease-spring group-hover:translate-x-1 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. 6 CATEGORY CARDS */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <Reveal>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Browse by Category
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Choose the type of sarkari document or certificate you need.
              </p>
            </div>
            <Link
              href="/processes"
              className="group inline-flex items-center gap-1 text-sm font-semibold text-brand transition-colors hover:text-brand-dark"
            >
              Explore all {processes.length} guides
              <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-spring group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, idx) => {
            const Icon = CATEGORY_ICONS[cat.slug] ?? FileBadge;
            const count = categoryCounts.get(cat.name) ?? 0;
            return (
              <Reveal key={cat.id} delay={idx * 60}>
                <Link
                  href={`/processes?category=${encodeURIComponent(cat.name)}`}
                  className="khg-card-lift group flex h-full items-start gap-4 rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-card"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-brand transition-all duration-300 ease-pop group-hover:-rotate-3 group-hover:scale-105 group-hover:bg-brand group-hover:text-white group-hover:shadow-sm">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-base font-bold text-ink transition-colors group-hover:text-brand">
                        {cat.name}
                      </h3>
                      <span className="rounded-full bg-surface px-2 py-0.5 text-xs font-semibold text-gray-600 transition-colors group-hover:bg-emerald-50 group-hover:text-brand">
                        {count} {count === 1 ? 'guide' : 'guides'}
                      </span>
                    </div>
                    {cat.urdu_label && (
                      <p className="mt-0.5 font-urdu text-xs text-brand" dir="rtl">
                        {cat.urdu_label}
                      </p>
                    )}
                    <p className="mt-1.5 text-xs leading-relaxed text-gray-600">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* 3. POPULAR THIS WEEK (6 PROCESSES) */}
      <section className="border-y border-emerald-950/10 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">
                  Most Searched in Pakistan
                </span>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  Popular This Week
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  Fee information, document counts, and citizen-reported wait times where available.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/checklist"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-brand/25 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-brand transition-all duration-200 ease-spring hover:-translate-y-0.5 hover:bg-emerald-100"
                >
                  <ClipboardCheck className="h-4 w-4" />
                  Checklist PDF Tool
                </Link>
                <Link
                  href="/processes"
                  className="khg-btn-sheen group inline-flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
                >
                  All Processes
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-spring group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {popularProcesses.map((proc, idx) => (
              <Reveal key={proc.id} delay={idx * 65}>
                <ProcessCard process={proc} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS (3 STEPS) */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <Reveal>
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              How KaamHoGaya Works
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-gray-600">
              Three simple steps so you never get turned away from a counter for a missing
              copy or wrong challan.
            </p>
          </div>
        </Reveal>

        <div className="relative mt-10 grid gap-6 md:grid-cols-3">
          {/* Connecting dashed emerald line on desktop */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-[16%] right-[16%] top-12 hidden border-t-2 border-dashed border-emerald-900/15 md:block"
          />
          {[
            {
              step: '01',
              title: '1. Search Your Process',
              urdu: 'اپنا کام تلاش کریں',
              icon: Search,
              desc: 'Find your exact document and city — see official Normal, Urgent, and Executive fees in exact PKR plus office address and best day to visit.',
            },
            {
              step: '02',
              title: '2. Check Documents',
              urdu: 'کاغذات کی فہرست مکمل کریں',
              icon: ClipboardCheck,
              desc: 'Tick off every Original and Photocopy in our interactive checklist. Save offline on your phone, download a clean PDF, or share on WhatsApp.',
            },
            {
              step: '03',
              title: '3. Go Prepared',
              urdu: 'مکمل تیاری کے ساتھ جائیں',
              icon: CheckCircle2,
              desc: 'Follow our gate-to-collection steps, avoid the 3 common day-wasting mistakes, check real wait times — aur kaam ek hi chakkar mein mukammal karein!',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.step} delay={idx * 90}>
                <div className="khg-card-lift group relative h-full rounded-2xl border border-emerald-950/10 bg-white p-6 shadow-card">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white shadow-sm transition-transform duration-300 ease-pop group-hover:-rotate-3 group-hover:scale-110">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <span className="text-3xl font-black text-emerald-900/10 transition-colors duration-300 group-hover:text-brand/20">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-0.5 font-urdu text-xs text-brand" dir="rtl">
                    {item.urdu}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* 5. LATEST WAIT TIMES LIVE FEED */}
      <section className="border-y border-emerald-950/10 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <LiveWaitFeed initialReports={latestWaits} />
        </div>
      </section>

      {/* 6. TRUST SECTION + WHATSAPP CTA + DISCLAIMER */}
      <section className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 sm:pt-16">
        <div className="grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="h-full rounded-2xl border border-emerald-950/10 bg-white p-6 shadow-card sm:p-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-brand">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Built for Citizens, Independent &amp; Transparent
              </div>
              <h2 className="mt-3 text-2xl font-bold text-ink">
                Guidance for Pakistani Citizens
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Government websites are often scattered across federal and provincial
                departments. We organize official fee schedules, required originals, and
                citizen experiences into plain English and simple Urdu — and always link you
                directly to the official <code>.gov.pk</code> source.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <div className="khg-card-lift rounded-xl bg-surface p-3.5">
                  <p className="text-2xl font-extrabold tabular-nums text-brand">
                    <AnimatedCounter value={processes.length} />
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-gray-600">
                    Citizen Guides
                  </p>
                </div>
                <div className="khg-card-lift rounded-xl bg-surface p-3.5">
                  <p className="text-2xl font-extrabold tabular-nums text-brand">
                    <AnimatedCounter value={100} suffix="%" />
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-gray-600">
                    Official Source Links
                  </p>
                </div>
                <div className="khg-card-lift rounded-xl bg-surface p-3.5">
                  <p className="text-2xl font-extrabold text-brand">Offline</p>
                  <p className="mt-0.5 text-xs font-medium text-gray-600">
                    PDF &amp; Checklists
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100} className="flex flex-col justify-between gap-4 lg:col-span-5">
            <WhatsAppCta />
            <DisclaimerBox compact />
          </Reveal>
        </div>
      </section>
    </>
  );
}
