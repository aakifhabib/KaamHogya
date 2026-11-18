'use client';

import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import {
  AlertTriangle,
  Building2,
  Calendar,
  CalendarCheck,
  Clock,
  ExternalLink,
  Hourglass,
  MapPin,
  Wallet,
} from 'lucide-react';
import { AdSenseSlot, isAdSenseEnabled } from '@/components/AdSenseSlot';
import { AllCitiesOfficeSwitcher } from '@/components/CityOfficesDirectory';
import { DisclaimerBox } from '@/components/DisclaimerBox';
import { ProcessCard } from '@/components/ProcessCard';
import { WhatsAppCta } from '@/components/WhatsAppCta';
import { DocumentChecklistBlock } from '@/components/process/DocumentChecklistBlock';
import { FaqAccordion } from '@/components/process/FaqAccordion';
import { FeeCalculatorBlock } from '@/components/process/FeeCalculatorBlock';
import { WaitTimeSection } from '@/components/process/WaitTimeSection';
import { getRichFeeSchedule } from '@/data/fee-schedules';
import {
  formatDate,
  formatDomain,
  formatPKR,
  sanitizeHttpUrl,
} from '@/lib/format';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import type {
  ProcessDocument,
  ProcessFaq,
  ProcessMistake,
  ProcessRecord,
  ProcessStep,
  ProcessSummaryCard,
  ProcessWithDetails,
  WaitTime,
} from '@/types/database';

interface ProcessDetailViewProps {
  initialProcess: ProcessWithDetails;
  relatedProcesses: ProcessSummaryCard[];
}

/**
 * Renders the Process Detail page in the EXACT required section order (a through k):
 * (a) Title, City badge, Category, Last Updated, Official Source link
 * (b) At A Glance Box (Total Fee, Time Needed, Office Address, Office Timings, Best Day To Go)
 * (c) Fee Breakdown Table (Normal, Urgent, Executive in exact PKR)
 * (d) Documents You Need (interactive localStorage checkboxes + Print & Save buttons)
 * (e) Step By Step (numbered gate-to-collection with minutes/step + mobile AdSense after step 3)
 * (f) 3 Mistakes That Waste Your Day (red alert box)
 * (g) Fee Calculator (type + city -> total fee + photocopy + photo estimate)
 * (h) Wait Time Section (avg wait time, 7-day chart, validated & rate-limited form)
 * (i) FAQ (5 questions accordion)
 * (j) Related Processes (3 cards)
 * (k) Disclaimer
 */
export function ProcessDetailView({
  initialProcess,
  relatedProcesses,
}: ProcessDetailViewProps) {
  const [process, setProcess] = useState<ProcessWithDetails>(initialProcess);

  // Live Supabase sync in browser so admin edits & newly approved wait times reflect immediately
  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    let cancelled = false;
    (async () => {
      try {
        const { data: procData, error } = await supabase
          .from('processes')
          .select('*')
          .eq('slug', initialProcess.slug)
          .maybeSingle();

        if (cancelled || error || !procData) return;

        const proc = procData as ProcessRecord;
        const [docsRes, stepsRes, mistakesRes, faqsRes, waitsRes] = await Promise.all([
          supabase
            .from('documents')
            .select('*')
            .eq('process_id', proc.id)
            .order('sort_order', { ascending: true }),
          supabase
            .from('steps')
            .select('*')
            .eq('process_id', proc.id)
            .order('step_number', { ascending: true }),
          supabase
            .from('mistakes')
            .select('*')
            .eq('process_id', proc.id)
            .order('sort_order', { ascending: true }),
          supabase
            .from('faqs')
            .select('*')
            .eq('process_id', proc.id)
            .order('sort_order', { ascending: true }),
          supabase
            .from('wait_times')
            .select('*')
            .eq('process_id', proc.id)
            .eq('status', 'approved')
            .order('visit_date', { ascending: false }),
        ]);

        if (!cancelled) {
          setProcess({
            ...proc,
            documents: (docsRes.data ?? initialProcess.documents) as ProcessDocument[],
            steps: (stepsRes.data ?? initialProcess.steps) as ProcessStep[],
            mistakes: (mistakesRes.data ?? initialProcess.mistakes) as ProcessMistake[],
            faqs: (faqsRes.data ?? initialProcess.faqs) as ProcessFaq[],
            wait_times: (waitsRes.data ?? initialProcess.wait_times) as WaitTime[],
          });
        }
      } catch {
        // Keep initial SSR data silently
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [initialProcess]);

  const safeOfficialUrl = sanitizeHttpUrl(process.official_source_url);
  const totalStepMinutes = process.steps.reduce((acc, s) => acc + s.time_minutes, 0);
  const richFeeSchedule = getRichFeeSchedule(process.slug, process.fee_normal);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Main Column — EXACT SECTION ORDER (a) through (k) */}
        <div className="space-y-8 lg:col-span-8">
          {(process.category.toLowerCase() === 'identity' || process.category.toLowerCase() === 'family') && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
              Please confirm office addresses, hours, requirements and processing times with NADRA before visiting. NADRA’s published Smart NIC timeline tables differ. <Link href="/nadra" className="font-bold underline">See the updated NADRA service library</Link> and its official sources.
            </div>
          )}
          {/* (a) Header: Title, City badge, Category, Last Updated, Official Source link */}
          <header className="rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm sm:p-7">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/city/${process.city.toLowerCase()}`}
                className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-brand hover:bg-emerald-100"
              >
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {process.city}
              </Link>
              <Link
                href={`/processes?category=${encodeURIComponent(process.category)}`}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-200"
              >
                {process.category}
              </Link>
              {process.is_nationwide && (
                <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-900">
                  Applies All Pakistan
                </span>
              )}
            </div>

            <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-ink sm:text-4xl">
              {process.title}
            </h1>

            {process.urdu_title && (
              <p className="mt-2 font-urdu text-base text-brand sm:text-lg" dir="rtl">
                {process.urdu_title}
              </p>
            )}

            {process.summary && (
              <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                {process.summary}
              </p>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-gray-100 pt-4 text-xs text-gray-600">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-brand" aria-hidden="true" />
                Last Updated:{' '}
                <strong className="font-semibold text-ink">
                  {formatDate(process.last_updated)}
                </strong>
              </span>
              <a
                href={safeOfficialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-bold text-brand underline decoration-brand/40 underline-offset-2 hover:text-brand-dark"
              >
                <span>Official Source: {formatDomain(safeOfficialUrl)}</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </header>

          {/* (b) At A Glance Box */}
          <section
            id="at-a-glance"
            aria-labelledby="at-a-glance-heading"
            className="print-break-avoid rounded-2xl border-2 border-brand/20 bg-gradient-to-br from-emerald-50/70 to-white p-5 shadow-sm sm:p-6"
          >
            <h2
              id="at-a-glance-heading"
              className="text-lg font-bold text-brand-dark sm:text-xl"
            >
              At A Glance
            </h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-xl bg-white p-3.5 shadow-sm ring-1 ring-emerald-950/5">
                <Wallet className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <dt className="text-xs font-medium text-gray-500">Total Fee (Normal)</dt>
                  <dd className="mt-0.5 text-base font-extrabold text-ink">
                    {formatPKR(process.fee_normal)}
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl bg-white p-3.5 shadow-sm ring-1 ring-emerald-950/5">
                <Hourglass className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <dt className="text-xs font-medium text-gray-500">Time Needed</dt>
                  <dd className="mt-0.5 text-sm font-bold text-ink">
                    {process.time_required}
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl bg-white p-3.5 shadow-sm ring-1 ring-emerald-950/5 sm:col-span-2">
                <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <dt className="text-xs font-medium text-gray-500">Office Address</dt>
                  <dd className="mt-0.5 text-sm font-bold text-ink">
                    {process.office_name}
                  </dd>
                  <dd className="mt-0.5 text-xs text-gray-600">
                    {process.office_address}
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl bg-white p-3.5 shadow-sm ring-1 ring-emerald-950/5">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <dt className="text-xs font-medium text-gray-500">Office Timings</dt>
                  <dd className="mt-0.5 text-sm font-bold text-ink">
                    {process.office_timings}
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl bg-white p-3.5 shadow-sm ring-1 ring-emerald-950/5">
                <CalendarCheck
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand"
                  aria-hidden="true"
                />
                <div>
                  <dt className="text-xs font-medium text-gray-500">Best Day To Go</dt>
                  <dd className="mt-0.5 text-sm font-bold text-ink">
                    {process.best_day_to_go}
                  </dd>
                </div>
              </div>
            </dl>
          </section>

          {/* (c) Fee Breakdown Table (Exact PKR) */}
          <section
            id="fees"
            aria-labelledby="fees-heading"
            className="print-break-avoid rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm sm:p-6"
          >
            <h2 id="fees-heading" className="text-xl font-bold text-ink sm:text-2xl">
              Fee Breakdown (Exact PKR)
            </h2>
            <p className="mt-1 text-xs text-gray-600 sm:text-sm">
              {richFeeSchedule?.subtitle ||
                'Official government fee tiers in Pakistani Rupees (PKR).'}
            </p>

            {richFeeSchedule?.alertBanner && (
              <div className="mt-3 rounded-xl border border-brand/25 bg-emerald-50 px-3.5 py-2.5 text-xs font-semibold text-brand-dark">
                {richFeeSchedule.alertBanner}
              </div>
            )}

            <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
              {richFeeSchedule ? (
                <table className="w-full min-w-[320px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="bg-surface text-xs font-bold uppercase tracking-wider text-gray-600">
                      {richFeeSchedule.columns.map((col) => (
                        <th
                          key={col.label}
                          className={`px-4 py-3 ${
                            col.align === 'right' ? 'text-right' : 'text-left'
                          }`}
                        >
                          {col.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {richFeeSchedule.rows.map((row, rIdx) => (
                      <tr
                        key={`${row[0]}-${rIdx}`}
                        className={rIdx % 2 === 1 ? 'bg-surface/40' : ''}
                      >
                        {row.map((cell, cIdx) => {
                          const align = richFeeSchedule.columns[cIdx]?.align;
                          return (
                            <td
                              key={`${rIdx}-${cIdx}`}
                              className={`px-4 py-3.5 ${
                                align === 'right'
                                  ? `text-right font-extrabold ${
                                      cIdx === 1 ? 'text-brand' : 'text-ink'
                                    }`
                                  : 'font-semibold text-ink'
                              }`}
                            >
                              {cell}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="w-full min-w-[320px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="bg-surface text-xs font-bold uppercase tracking-wider text-gray-600">
                      <th className="px-4 py-3">Service Tier</th>
                      <th className="px-4 py-3 text-right">Official Fee (PKR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3.5 font-semibold text-ink">Normal</td>
                      <td className="px-4 py-3.5 text-right font-extrabold text-brand">
                        {formatPKR(process.fee_normal)}
                      </td>
                    </tr>
                    <tr className="bg-surface/40">
                      <td className="px-4 py-3.5 font-semibold text-ink">Urgent</td>
                      <td className="px-4 py-3.5 text-right font-extrabold text-ink">
                        {formatPKR(process.fee_urgent)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3.5 font-semibold text-ink">
                        Executive / Fast Track
                      </td>
                      <td className="px-4 py-3.5 text-right font-extrabold text-ink">
                        {formatPKR(process.fee_executive)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>

            {process.fee_notes && (
              <p className="mt-3 rounded-xl bg-amber-50/70 px-3.5 py-2.5 text-xs leading-relaxed text-amber-950">
                <strong>Fee Note:</strong> {process.fee_notes}
              </p>
            )}
          </section>

          {/* (d) Documents You Need */}
          <DocumentChecklistBlock process={process} documents={process.documents} />

          {/* (e) Step By Step (gate-to-collection with minutes per step + mobile AdSense after step 3) */}
          <section
            id="steps"
            aria-labelledby="steps-heading"
            className="rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm sm:p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 id="steps-heading" className="text-xl font-bold text-ink sm:text-2xl">
                  Step By Step (Gate to Collection)
                </h2>
                <p className="mt-1 text-xs text-gray-600 sm:text-sm">
                  Exact order of counters and actions so you never stand in the wrong line.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1 text-xs font-bold text-brand">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                ~{totalStepMinutes} mins total active time
              </span>
            </div>

            <ol className="relative mt-6 space-y-4">
              {/* Subtle vertical timeline track connecting step numbers */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-6 left-[2.1rem] top-6 hidden w-0.5 bg-gradient-to-b from-brand/30 via-emerald-300/40 to-transparent sm:block"
              />
              {process.steps.map((step, index) => (
                <Fragment key={step.id}>
                  <li className="print-break-avoid group relative flex gap-4 rounded-xl border border-gray-200 bg-surface/55 p-4 transition-all duration-300 ease-spring hover:border-brand/35 hover:bg-white hover:shadow-card">
                    <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-extrabold text-white shadow-sm transition-transform duration-300 ease-pop group-hover:scale-110">
                      {step.step_number}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-sm font-bold text-ink transition-colors group-hover:text-brand-dark sm:text-base">
                          {step.title}
                        </h3>
                        <span className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-0.5 text-xs font-semibold text-brand ring-1 ring-emerald-900/10">
                          <Clock className="h-3 w-3" aria-hidden="true" />~
                          {step.time_minutes} min{step.time_minutes === 1 ? '' : 's'}
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-gray-700 sm:text-sm">
                        {step.description}
                      </p>
                    </div>
                  </li>

                  {/* Mobile AdSense Slot placed right after Step 3 (only rendered when AdSense is active) */}
                  {index === 2 && isAdSenseEnabled() && (
                    <li className="list-none lg:hidden">
                      <AdSenseSlot placement="mobile-after-step-3" />
                    </li>
                  )}
                </Fragment>
              ))}
            </ol>
          </section>

          {/* (f) 3 Mistakes That Waste Your Day (Red Alert Box) */}
          <section
            id="mistakes"
            aria-labelledby="mistakes-heading"
            className="print-break-avoid rounded-2xl border-2 border-danger/30 bg-red-50/70 p-5 shadow-sm sm:p-6"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-danger text-white shadow-sm">
                <AlertTriangle className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h2
                  id="mistakes-heading"
                  className="text-xl font-extrabold text-danger sm:text-2xl"
                >
                  3 Mistakes That Waste Your Day
                </h2>
                <p className="text-xs font-medium text-red-900/80 sm:text-sm">
                  Avoid these top reasons applicants get turned back from counters.
                </p>
              </div>
            </div>

            <ol className="mt-4 space-y-3">
              {process.mistakes.slice(0, 3).map((mistake, idx) => (
                <li
                  key={mistake.id}
                  className="rounded-xl border border-danger/20 bg-white p-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-danger/10 text-xs font-extrabold text-danger">
                      {idx + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-ink">{mistake.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-gray-700 sm:text-sm">
                        {mistake.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* (g) Fee Calculator */}
          <FeeCalculatorBlock process={process} documents={process.documents} />

          {/* (h) Wait Time Section */}
          <WaitTimeSection process={process} waitTimes={process.wait_times} />

          {/* (i) FAQ (5 questions accordion) */}
          <FaqAccordion faqs={process.faqs} />

          {/* Official All-Cities NADRA / FBR Office Switcher */}
          {(process.category === 'Identity' ||
            process.category === 'Family' ||
            process.category === 'Tax') && (
            <AllCitiesOfficeSwitcher
              agency={process.category === 'Tax' ? 'fbr' : 'nadra'}
              currentCityName={process.city}
              currentProcessSlug={process.slug}
            />
          )}

          {/* Mobile WhatsApp CTA */}
          <div className="lg:hidden">
            <WhatsAppCta />
          </div>

          {/* (j) Related Processes (3 cards) */}
          <section id="related" aria-labelledby="related-heading" className="no-print">
            <div className="mb-4 flex items-center justify-between">
              <h2 id="related-heading" className="text-xl font-bold text-ink sm:text-2xl">
                Related Processes
              </h2>
              <Link
                href="/processes"
                className="text-xs font-bold text-brand hover:underline sm:text-sm"
              >
                Browse all →
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProcesses.slice(0, 3).map((rel) => (
                <ProcessCard key={rel.id} process={rel} />
              ))}
            </div>
          </section>

          {/* (k) Disclaimer */}
          <DisclaimerBox officialSourceUrl={process.official_source_url} />
        </div>

        {/* Desktop Sticky Sidebar */}
        <aside className="no-print hidden space-y-6 lg:col-span-4 lg:block">
          <div className="sticky top-28 space-y-5">
            {/* Quick Jump Navigation */}
            <nav
              aria-label="Guide sections"
              className="rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                On This Page
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {[
                  { href: '#at-a-glance', label: 'At A Glance' },
                  { href: '#fees', label: 'Fee Breakdown (PKR)' },
                  { href: '#documents', label: 'Documents Checklist' },
                  { href: '#steps', label: 'Step-by-Step Process' },
                  { href: '#mistakes', label: '3 Mistakes to Avoid' },
                  { href: '#fee-calculator', label: 'Fee Calculator' },
                  { href: '#wait-times', label: 'Live Wait Times' },
                  { href: '#faqs', label: 'FAQs' },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="block rounded-lg px-2.5 py-1.5 font-medium text-gray-700 transition-colors hover:bg-emerald-50 hover:text-brand"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 border-t border-gray-100 pt-4">
                <Link
                  href={`/checklist?process=${encodeURIComponent(process.slug)}`}
                  className="block w-full rounded-xl bg-emerald-50 px-4 py-2.5 text-center text-xs font-bold text-brand hover:bg-emerald-100"
                >
                  Open Full Offline Checklist &amp; PDF →
                </Link>
              </div>
            </nav>

            {/* WhatsApp CTA */}
            <WhatsAppCta />

            {/* Desktop Sidebar AdSense Slot */}
            <AdSenseSlot placement="desktop-sidebar" />
          </div>
        </aside>
      </div>
    </div>
  );
}
