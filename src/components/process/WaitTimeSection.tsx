'use client';

import { useMemo, useState } from 'react';
import {
  CheckCircle2,
  Clock,
  MessageSquareQuote,
  Send,
  Star,
  AlertCircle,
} from 'lucide-react';
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
import type { ProcessRecord, WaitTime } from '@/types/database';

interface WaitTimeSectionProps {
  process: ProcessRecord;
  waitTimes: WaitTime[];
}

export function WaitTimeSection({ process, waitTimes }: WaitTimeSectionProps) {
  const [visitDate, setVisitDate] = useState(getTodayDateString());
  const [waitMinutes, setWaitMinutes] = useState('45');
  const [rating, setRating] = useState(4);
  const [tip, setTip] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const approved = useMemo(
    () => waitTimes.filter((w) => w.status === 'approved'),
    [waitTimes]
  );

  const avgWait = useMemo(() => {
    if (approved.length === 0) return null;
    return Math.round(
      approved.reduce((acc, w) => acc + w.wait_minutes, 0) / approved.length
    );
  }, [approved]);

  const avgRating = useMemo(() => {
    if (approved.length === 0) return null;
    return (
      approved.reduce((acc, w) => acc + w.rating, 0) / approved.length
    ).toFixed(1);
  }, [approved]);

  // Build 7-day bar chart dataset ending on the latest reported date (or today)
  const sevenDaySeries = useMemo(() => {
    const anchorDateStr =
      approved.length > 0
        ? approved.reduce(
            (max, w) => (w.visit_date > max ? w.visit_date : max),
            approved[0].visit_date
          )
        : getTodayDateString();

    const anchor = new Date(`${anchorDateStr}T00:00:00Z`);
    const days: Array<{ date: string; label: string; avgMinutes: number | null; count: number }> =
      [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(anchor);
      d.setUTCDate(anchor.getUTCDate() - i);
      const iso = d.toISOString().slice(0, 10);
      const dayReports = approved.filter((w) => w.visit_date === iso);
      const dayAvg =
        dayReports.length > 0
          ? Math.round(
              dayReports.reduce((acc, w) => acc + w.wait_minutes, 0) / dayReports.length
            )
          : null;
      days.push({
        date: iso,
        label: formatShortDate(iso),
        avgMinutes: dayAvg,
        count: dayReports.length,
      });
    }
    return days;
  }, [approved]);

  const maxChartMinutes = useMemo(() => {
    const maxVal = Math.max(
      ...sevenDaySeries.map((d) => d.avgMinutes ?? 0),
      60
    );
    return Math.ceil(maxVal / 15) * 15;
  }, [sevenDaySeries]);

  const waitBadge = getWaitTimeBadgeColor(avgWait);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const parsedMinutes = Number.parseInt(waitMinutes, 10);
    const validation = validateWaitTimeInput({
      visitDate,
      waitMinutes: parsedMinutes,
      rating,
      tip,
    });

    if (!validation.valid) {
      setErrorMsg(validation.error || 'Please check your inputs.');
      return;
    }

    const rateLimitError = checkClientWaitTimeRateLimit(process.id);
    if (rateLimitError) {
      setErrorMsg(rateLimitError);
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setErrorMsg(
        'Database connection is not configured right now. Please try again later.'
      );
      return;
    }

    setSubmitting(true);
    try {
      const clientHash = getOrCreateClientHash();
      const { error } = await supabase.rpc('submit_wait_time', {
        p_process_id: process.id,
        p_visit_date: visitDate,
        p_wait_minutes: parsedMinutes,
        p_rating: rating,
        p_tip: validation.cleanTip,
        p_client_hash: clientHash,
      });

      if (error) {
        setErrorMsg(
          error.message ||
            'Could not save your wait time report. Please check your entries and try again.'
        );
        return;
      }

      recordClientWaitTimeSubmission(process.id);
      setSuccessMsg(
        'Shukriya! Your wait time report has been submitted and is queued for quick admin verification.'
      );
      setTip('');
    } catch {
      setErrorMsg(
        'Network error while submitting your report. Please check your internet connection and retry.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="wait-times"
      aria-labelledby="wait-times-heading"
      className="no-print rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 id="wait-times-heading" className="text-xl font-bold text-ink sm:text-2xl">
            Live Office Wait Times
          </h2>
          <p className="mt-1 text-xs text-gray-600 sm:text-sm">
            Crowdsourced wait duration at <strong>{process.office_name}</strong> ({process.city}).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className={`rounded-xl px-3.5 py-2 text-right ${waitBadge.bg}`}>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-600">
              Reported Average
            </p>
            <p className={`text-lg font-extrabold ${waitBadge.text}`}>
              {formatWaitMinutes(avgWait)}
            </p>
          </div>
          {avgRating && (
            <div className="rounded-xl bg-amber-50 px-3.5 py-2 text-right">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-800">
                Citizen Rating
              </p>
              <p className="inline-flex items-center gap-1 text-lg font-extrabold text-amber-900">
                <Star className="h-4 w-4 fill-accent-yellow text-accent-yellow" />
                {avgRating}/5
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 7-Day Bar Chart */}
      <div className="mt-6 rounded-xl border border-gray-200 bg-surface p-4">
        <div className="mb-3 flex items-center justify-between text-xs">
          <span className="font-semibold text-ink">Last 7 Days Wait Time Trend</span>
          <span className="text-gray-500">
            Based on {approved.length} approved report{approved.length === 1 ? '' : 's'}
          </span>
        </div>

        <div className="grid h-40 grid-cols-7 items-end gap-2 pt-4">
          {sevenDaySeries.map((day, idx) => {
            const pct =
              day.avgMinutes !== null
                ? Math.max(12, Math.round((day.avgMinutes / maxChartMinutes) * 100))
                : 0;
            const barColor =
              day.avgMinutes === null
                ? 'bg-gray-200'
                : day.avgMinutes <= 30
                ? 'bg-emerald-600'
                : day.avgMinutes <= 65
                ? 'bg-accent-yellow'
                : 'bg-danger';

            return (
              <div
                key={day.date}
                className="group flex h-full flex-col items-center justify-end gap-1.5"
              >
                <span className="text-[10px] font-bold tabular-nums text-gray-700 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:text-brand">
                  {day.avgMinutes !== null ? `${day.avgMinutes}m` : '—'}
                </span>
                <div className="flex h-24 w-full max-w-[36px] items-end rounded-lg bg-gray-200/70 p-0.5">
                  <div
                    className={`animate-bar-rise w-full origin-bottom rounded-md transition-all duration-300 ease-spring group-hover:brightness-110 ${barColor}`}
                    style={{
                      height: day.avgMinutes !== null ? `${pct}%` : '4px',
                      animationDelay: `${idx * 55}ms`,
                    }}
                    title={`${day.label}: ${
                      day.avgMinutes !== null
                        ? `${day.avgMinutes} mins (${day.count} report${day.count === 1 ? '' : 's'})`
                        : 'No reports'
                    }`}
                  />
                </div>
                <span className="truncate text-[10px] font-medium text-gray-500">
                  {day.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Citizen Tips */}
      {approved.length > 0 && (
        <div className="mt-5 space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Recent Approved Citizen Reports
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {approved.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-gray-200 bg-white p-3.5 text-xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 font-bold text-brand">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {formatWaitMinutes(item.wait_minutes)}
                  </span>
                  <span className="text-gray-500">{formatShortDate(item.visit_date)}</span>
                </div>
                {item.tip && (
                  <p className="mt-2 flex items-start gap-1.5 leading-relaxed text-gray-700">
                    <MessageSquareQuote
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <span>{item.tip}</span>
                  </p>
                )}
                <div className="mt-2 flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < item.rating
                          ? 'fill-accent-yellow text-accent-yellow'
                          : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submit Your Wait Time Form */}
      <div className="mt-6 rounded-2xl border border-emerald-900/15 bg-surface p-4 sm:p-5">
        <h3 className="text-base font-bold text-ink">
          Visited Recently? Report Your Wait Time
        </h3>
        <p className="mt-0.5 text-xs text-gray-600">
          Share a past visit. Reports are reviewed but not independently verified and cannot predict today’s queue.
        </p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4" noValidate>
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label
                htmlFor="wt-visit-date"
                className="mb-1 block text-xs font-semibold text-gray-700"
              >
                Visit Date
              </label>
              <input
                id="wt-visit-date"
                type="date"
                max={getTodayDateString()}
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="wt-minutes"
                className="mb-1 block text-xs font-semibold text-gray-700"
              >
                Wait Time (5–480 mins)
              </label>
              <input
                id="wt-minutes"
                type="number"
                min={5}
                max={480}
                step={5}
                value={waitMinutes}
                onChange={(e) => setWaitMinutes(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <span className="mb-1 block text-xs font-semibold text-gray-700">
                Experience Rating (1–5)
              </span>
              <div
                className="flex h-[38px] items-center gap-1 rounded-xl border border-gray-300 bg-white px-3"
                role="radiogroup"
                aria-label="Office experience rating"
              >
                {[1, 2, 3, 4, 5].map((starVal) => (
                  <button
                    key={starVal}
                    type="button"
                    onClick={() => setRating(starVal)}
                    aria-label={`Rate ${starVal} out of 5 stars`}
                    aria-pressed={rating === starVal}
                    className="p-0.5 focus:outline-none"
                  >
                    <Star
                      className={`h-5 w-5 transition-colors ${
                        starVal <= rating
                          ? 'fill-accent-yellow text-accent-yellow'
                          : 'text-gray-300 hover:text-amber-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-auto text-xs font-bold text-gray-700">{rating}/5</span>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between text-xs">
              <label htmlFor="wt-tip" className="font-semibold text-gray-700">
                Helpful Tip for Others (Optional, max 200 chars)
              </label>
              <span
                className={`font-medium ${
                  tip.length > 180 ? 'text-danger' : 'text-gray-500'
                }`}
              >
                {tip.length}/200
              </span>
            </div>
            <textarea
              id="wt-tip"
              rows={2}
              maxLength={200}
              value={tip}
              onChange={(e) => setTip(e.target.value)}
              placeholder="e.g. Paid fee on Passport Fee Asaan app first — skipped 45 mins bank queue!"
              className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-sm text-ink placeholder:text-gray-400 focus:border-brand focus:outline-none"
            />
          </div>

          {errorMsg && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-danger"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div
              role="status"
              className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-xs font-semibold text-brand-dark"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
              <span>{successMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            <span>{submitting ? 'Submitting Report...' : 'Submit Wait Time'}</span>
          </button>
        </form>
      </div>
    </section>
  );
}
