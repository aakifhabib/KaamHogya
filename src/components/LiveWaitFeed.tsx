'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, Clock, MapPin, MessageSquareQuote, Star } from 'lucide-react';
import { formatShortDate, formatWaitMinutes, getWaitTimeBadgeColor } from '@/lib/format';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import type { WaitTime, WaitTimeWithProcess } from '@/types/database';

interface LiveWaitFeedProps {
  initialReports: WaitTimeWithProcess[];
}

export function LiveWaitFeed({ initialReports }: LiveWaitFeedProps) {
  const [reports, setReports] = useState<WaitTimeWithProcess[]>(initialReports);
  const [liveConnected, setLiveConnected] = useState(false);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    let cancelled = false;
    (async () => {
      try {
        const [waitRes, procRes] = await Promise.all([
          supabase
            .from('wait_times')
            .select('*')
            .eq('status', 'approved')
            .order('created_at', { ascending: false })
            .limit(6),
          supabase.from('processes').select('id, title, slug'),
        ]);
        if (!cancelled && !waitRes.error && waitRes.data && waitRes.data.length > 0) {
          const procMap = new Map(
            ((procRes.data ?? []) as Array<{ id: string; title: string; slug: string }>).map(
              (p) => [p.id, p]
            )
          );
          setReports(
            (waitRes.data as WaitTime[]).map((wt) => ({
              ...wt,
              process_title: procMap.get(wt.process_id)?.title,
              process_slug: procMap.get(wt.process_id)?.slug,
            }))
          );
          setLiveConnected(true);
        }
      } catch {
        // Keep initial SSR reports gracefully
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-brand">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            {liveConnected ? 'Live Citizen Reports' : 'Recent Citizen Reports'}
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Latest Office Wait Times
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Real waiting times and tips reported by citizens who visited offices this week.
          </p>
        </div>
        <Link
          href="/wait-times"
          className="inline-flex items-center gap-1.5 rounded-xl border border-brand/25 bg-white px-4 py-2.5 text-sm font-semibold text-brand transition-colors hover:bg-emerald-50"
        >
          <span>Full Wait Time Tracker</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reports.slice(0, 6).map((report) => {
          const badge = getWaitTimeBadgeColor(report.wait_minutes);
          return (
            <article
              key={report.id}
              className="flex flex-col rounded-2xl border border-emerald-950/10 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-ink">
                    {report.office_name}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-500">
                    <MapPin className="h-3 w-3 text-brand" aria-hidden="true" />
                    <span>{report.city}</span>
                    <span>•</span>
                    <span>Visited {formatShortDate(report.visit_date)}</span>
                  </p>
                </div>
                <span
                  className={`inline-flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold ${badge.bg} ${badge.text}`}
                >
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {formatWaitMinutes(report.wait_minutes)}
                </span>
              </div>

              {report.tip && (
                <p className="mt-3 flex items-start gap-2 rounded-xl bg-surface p-3 text-xs leading-relaxed text-gray-700">
                  <MessageSquareQuote
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  <span>&ldquo;{report.tip}&rdquo;</span>
                </p>
              )}

              <div className="mt-auto flex items-center justify-between gap-2 pt-3 text-xs">
                <div
                  className="inline-flex items-center gap-0.5 text-amber-500"
                  aria-label={`Rated ${report.rating} out of 5`}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < report.rating ? 'fill-accent-yellow text-accent-yellow' : 'text-gray-200'
                      }`}
                    />
                  ))}
                  <span className="ml-1 font-semibold text-gray-600">
                    {report.rating}/5
                  </span>
                </div>

                {report.process_slug && (
                  <Link
                    href={`/process/${report.process_slug}#wait-times`}
                    className="font-semibold text-brand hover:underline"
                  >
                    View guide →
                  </Link>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
