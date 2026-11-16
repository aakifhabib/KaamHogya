'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  MessageSquareQuote,
  Plus,
  Search,
  Send,
  Star,
  X,
} from 'lucide-react';
import { buildOfficeWaitSummaries } from '@/lib/data';
import {
  checkClientWaitTimeRateLimit,
  formatShortDate,
  formatWaitMinutes,
  getOrCreateClientHash,
  getTodayDateString,
  getWaitTimeBadgeColor,
  recordClientWaitTimeSubmission,
  validateWaitTimeInput,
} from '@/lib/format';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import type {
  City,
  OfficeWaitSummary,
  ProcessRecord,
  WaitTime,
  WaitTimeWithProcess,
} from '@/types/database';

interface WaitTimeTrackerProps {
  initialOffices: OfficeWaitSummary[];
  initialRecentReports: WaitTimeWithProcess[];
  cities: City[];
}

export function WaitTimeTracker({
  initialOffices,
  initialRecentReports,
  cities,
}: WaitTimeTrackerProps) {
  const [offices, setOffices] = useState<OfficeWaitSummary[]>(initialOffices);
  const [recentReports, setRecentReports] =
    useState<WaitTimeWithProcess[]>(initialRecentReports);
  const [selectedCity, setSelectedCity] = useState('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'shortest' | 'longest' | 'recent'>('shortest');
  const [liveSynced, setLiveSynced] = useState(false);

  // Inline report drawer state
  const [showReportForm, setShowReportForm] = useState(false);
  const [selectedProcessId, setSelectedProcessId] = useState(
    initialOffices[0]?.process_id ?? ''
  );
  const [visitDate, setVisitDate] = useState(getTodayDateString());
  const [waitMinutes, setWaitMinutes] = useState('45');
  const [rating, setRating] = useState(4);
  const [tip, setTip] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    let cancelled = false;
    (async () => {
      try {
        const [procRes, waitRes] = await Promise.all([
          supabase
            .from('processes')
            .select('*')
            .order('popularity_rank', { ascending: true }),
          supabase
            .from('wait_times')
            .select('*')
            .eq('status', 'approved')
            .order('created_at', { ascending: false }),
        ]);

        if (!cancelled && !procRes.error && procRes.data && procRes.data.length > 0) {
          const procs = procRes.data as ProcessRecord[];
          const waits = (waitRes.data ?? []) as WaitTime[];
          const procMap = new Map(procs.map((p) => [p.id, p]));
          setOffices(buildOfficeWaitSummaries(procs, waits));
          setRecentReports(
            waits.slice(0, 15).map((w) => ({
              ...w,
              process_title: procMap.get(w.process_id)?.title,
              process_slug: procMap.get(w.process_id)?.slug,
            }))
          );
          setLiveSynced(true);
        }
      } catch {
        // Keep SSR snapshot gracefully
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredOffices = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = offices.filter((o) => {
      if (
        selectedCity !== 'all' &&
        o.city.toLowerCase() !== selectedCity.toLowerCase()
      ) {
        return false;
      }
      if (q) {
        const hay =
          `${o.office_name} ${o.office_address} ${o.city} ${o.process_title} ${o.category}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    return [...list].sort((a, b) => {
      if (sortBy === 'shortest') {
        return (a.avg_wait_minutes ?? 999) - (b.avg_wait_minutes ?? 999);
      }
      if (sortBy === 'longest') {
        return (b.avg_wait_minutes ?? -1) - (a.avg_wait_minutes ?? -1);
      }
      return (b.last_reported_at ?? '').localeCompare(a.last_reported_at ?? '');
    });
  }, [offices, selectedCity, search, sortBy]);

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!selectedProcessId) {
      setErrorMsg('Please select an office/process.');
      return;
    }

    const parsedMins = Number.parseInt(waitMinutes, 10);
    const validation = validateWaitTimeInput({
      visitDate,
      waitMinutes: parsedMins,
      rating,
      tip,
    });
    if (!validation.valid) {
      setErrorMsg(validation.error || 'Please check your input.');
      return;
    }

    const rateErr = checkClientWaitTimeRateLimit(selectedProcessId);
    if (rateErr) {
      setErrorMsg(rateErr);
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setErrorMsg('Database connection is currently unavailable.');
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.rpc('submit_wait_time', {
        p_process_id: selectedProcessId,
        p_visit_date: visitDate,
        p_wait_minutes: parsedMins,
        p_rating: rating,
        p_tip: validation.cleanTip,
        p_client_hash: getOrCreateClientHash(),
      });
      if (error) {
        setErrorMsg(error.message || 'Could not submit wait time report.');
        return;
      }
      recordClientWaitTimeSubmission(selectedProcessId);
      setSuccessMsg(
        'Shukriya! Your wait time report was submitted and is awaiting quick admin approval.'
      );
      setTip('');
    } catch {
      setErrorMsg('Network error while submitting report. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Filter & Submit Action Bar */}
      <div className="rounded-2xl border border-emerald-950/10 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search office name, NADRA, Passport, Police Khidmat..."
              aria-label="Search offices"
              className="w-full rounded-xl border border-gray-300 bg-surface py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-gray-400 focus:border-brand focus:bg-white focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <select
              aria-label="Filter by city"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm font-medium text-ink focus:border-brand focus:outline-none"
            >
              <option value="all">All Cities</option>
              {cities.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              aria-label="Sort offices"
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as 'shortest' | 'longest' | 'recent')
              }
              className="rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm font-medium text-ink focus:border-brand focus:outline-none"
            >
              <option value="shortest">Sort: Shortest Wait</option>
              <option value="longest">Sort: Longest Wait</option>
              <option value="recent">Sort: Most Recently Reported</option>
            </select>

            <button
              type="button"
              onClick={() => setShowReportForm((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-dark"
            >
              {showReportForm ? (
                <>
                  <X className="h-4 w-4" />
                  Close Form
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Report Wait Time
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
          <span>
            Showing <strong className="text-ink">{filteredOffices.length}</strong> offices
            {liveSynced ? ' • Live Supabase data' : ''}
          </span>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-600" /> ≤ 30m Fast
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-accent-yellow" /> 31–60m Moderate
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-danger" /> 60m+ Busy
            </span>
          </div>
        </div>

        {/* Collapsible Submit Wait Time Form */}
        {showReportForm && (
          <form
            onSubmit={handleSubmitReport}
            className="mt-5 space-y-4 rounded-2xl border border-emerald-900/15 bg-surface p-4 sm:p-5"
            noValidate
          >
            <h2 className="text-base font-bold text-ink">
              Share Your Office Visit Wait Time
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="sm:col-span-2 lg:col-span-1">
                <label
                  htmlFor="tracker-office"
                  className="mb-1 block text-xs font-semibold text-gray-700"
                >
                  Office / Process
                </label>
                <select
                  id="tracker-office"
                  value={selectedProcessId}
                  onChange={(e) => setSelectedProcessId(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none"
                >
                  {offices.map((o) => (
                    <option key={o.process_id} value={o.process_id}>
                      {o.office_name} ({o.city})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="tracker-date"
                  className="mb-1 block text-xs font-semibold text-gray-700"
                >
                  Visit Date
                </label>
                <input
                  id="tracker-date"
                  type="date"
                  max={getTodayDateString()}
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="tracker-mins"
                  className="mb-1 block text-xs font-semibold text-gray-700"
                >
                  Wait Minutes (5–480)
                </label>
                <input
                  id="tracker-mins"
                  type="number"
                  min={5}
                  max={480}
                  value={waitMinutes}
                  onChange={(e) => setWaitMinutes(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none"
                />
              </div>

              <div>
                <span className="mb-1 block text-xs font-semibold text-gray-700">
                  Rating (1–5)
                </span>
                <div className="flex h-[38px] items-center gap-1 rounded-xl border border-gray-300 bg-white px-3">
                  {[1, 2, 3, 4, 5].map((starVal) => (
                    <button
                      key={starVal}
                      type="button"
                      onClick={() => setRating(starVal)}
                      aria-label={`Rate ${starVal} stars`}
                    >
                      <Star
                        className={`h-5 w-5 ${
                          starVal <= rating
                            ? 'fill-accent-yellow text-accent-yellow'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="mb-1 flex justify-between text-xs">
                <label htmlFor="tracker-tip" className="font-semibold text-gray-700">
                  Tip for fellow citizens (optional, max 200 chars)
                </label>
                <span className="text-gray-500">{tip.length}/200</span>
              </div>
              <input
                id="tracker-tip"
                type="text"
                maxLength={200}
                value={tip}
                onChange={(e) => setTip(e.target.value)}
                placeholder="e.g. Afternoon after 2 PM was empty, parking easily available."
                className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-sm text-ink focus:border-brand focus:outline-none"
              />
            </div>

            {errorMsg && (
              <div
                role="alert"
                className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-danger"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div
                role="status"
                className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-xs font-semibold text-brand-dark"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-brand" />
                {successMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-dark disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {submitting ? 'Submitting...' : 'Submit Report'}
            </button>
          </form>
        )}
      </div>

      {/* Offices Grid / Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredOffices.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-600 md:col-span-2">
            No offices match your current city or search filter. Try selecting{' '}
            <button
              type="button"
              onClick={() => {
                setSelectedCity('all');
                setSearch('');
              }}
              className="font-bold text-brand underline"
            >
              All Cities
            </button>
            .
          </div>
        ) : (
          filteredOffices.map((office) => {
            const badge = getWaitTimeBadgeColor(office.avg_wait_minutes);
            return (
              <article
                key={office.process_id}
                className="flex flex-col rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-brand">
                      <Building2 className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-ink">
                        {office.office_name}
                      </h2>
                      <p className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
                        <span className="inline-flex items-center gap-0.5 font-semibold text-brand">
                          <MapPin className="h-3 w-3" />
                          {office.city}
                        </span>
                        <span>•</span>
                        <span>{office.process_title}</span>
                      </p>
                    </div>
                  </div>

                  <div className={`shrink-0 rounded-xl px-3 py-1.5 text-right ${badge.bg}`}>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-600">
                      Avg Wait
                    </p>
                    <p className={`text-sm font-extrabold ${badge.text}`}>
                      {formatWaitMinutes(office.avg_wait_minutes)}
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-xs text-gray-600">{office.office_address}</p>

                {office.latest_tip && (
                  <p className="mt-3 flex items-start gap-1.5 rounded-xl bg-surface p-3 text-xs leading-relaxed text-gray-700">
                    <MessageSquareQuote className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                    <span>&ldquo;{office.latest_tip}&rdquo;</span>
                  </p>
                )}

                <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-3.5 text-xs">
                  <div className="flex flex-wrap items-center gap-3 text-gray-500">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      Last reported:{' '}
                      <strong className="text-ink">
                        {office.last_reported_date
                          ? formatShortDate(office.last_reported_date)
                          : 'Pending'}
                      </strong>
                    </span>
                    {office.avg_rating && (
                      <span className="inline-flex items-center gap-0.5 font-semibold text-ink">
                        <Star className="h-3.5 w-3.5 fill-accent-yellow text-accent-yellow" />
                        {office.avg_rating}
                      </span>
                    )}
                    <span>({office.report_count} reports)</span>
                  </div>

                  <Link
                    href={`/process/${office.process_slug}#wait-times`}
                    className="font-bold text-brand hover:underline"
                  >
                    7-Day Chart →
                  </Link>
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* Recent Citizen Feed */}
      <section aria-labelledby="recent-reports-heading">
        <h2 id="recent-reports-heading" className="text-xl font-bold text-ink">
          Latest Approved Citizen Check-Ins
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {recentReports.slice(0, 9).map((rep) => (
            <div
              key={rep.id}
              className="rounded-xl border border-gray-200 bg-white p-4 text-xs shadow-sm"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-ink">{rep.office_name}</span>
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 font-bold text-brand">
                  <Clock className="h-3 w-3" />
                  {formatWaitMinutes(rep.wait_minutes)}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-gray-500">
                {rep.city} • Visited {formatShortDate(rep.visit_date)} • Rated {rep.rating}/5
              </p>
              {rep.tip && (
                <p className="mt-2 leading-relaxed text-gray-700">&ldquo;{rep.tip}&rdquo;</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
