'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Filter, RotateCcw, Search, SlidersHorizontal } from 'lucide-react';
import { ProcessCard } from '@/components/ProcessCard';
import { WhatsAppCta } from '@/components/WhatsAppCta';
import { buildProcessSummaries } from '@/lib/data';
import { matchesFeeFilter, matchesTimeFilter } from '@/lib/format';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import type {
  Category,
  City,
  ProcessDocument,
  ProcessRecord,
  ProcessSummaryCard,
  WaitTime,
} from '@/types/database';

interface ProcessesExplorerProps {
  initialProcesses: ProcessSummaryCard[];
  cities: City[];
  categories: Category[];
}

export function ProcessesExplorer({
  initialProcesses,
  cities,
  categories,
}: ProcessesExplorerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [processes, setProcesses] = useState<ProcessSummaryCard[]>(initialProcesses);
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [city, setCity] = useState(searchParams.get('city') ?? 'all');
  const [category, setCategory] = useState(searchParams.get('category') ?? 'all');
  const [feeRange, setFeeRange] = useState(searchParams.get('fee') ?? 'all');
  const [timeRange, setTimeRange] = useState(searchParams.get('time') ?? 'all');
  const [sortBy, setSortBy] = useState<'popular' | 'fee_asc' | 'wait_asc' | 'updated'>(
    'popular'
  );
  const [dbError, setDbError] = useState<string | null>(null);

  // Sync live updates from Supabase in the browser so new Admin processes appear immediately
  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    let cancelled = false;
    (async () => {
      try {
        const [procRes, docRes, waitRes] = await Promise.all([
          supabase
            .from('processes')
            .select('*')
            .order('popularity_rank', { ascending: true }),
          supabase.from('documents').select('*'),
          supabase.from('wait_times').select('*').eq('status', 'approved'),
        ]);
        if (!cancelled && !procRes.error && procRes.data && procRes.data.length > 0) {
          setProcesses(
            buildProcessSummaries(
              procRes.data as ProcessRecord[],
              (docRes.data ?? []) as ProcessDocument[],
              (waitRes.data ?? []) as WaitTime[]
            )
          );
          setDbError(null);
        }
      } catch {
        if (!cancelled) {
          setDbError(
            'Showing cached citizen guides while live database connection reconnects.'
          );
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Update URL params cleanly without page reload
  useEffect(() => {
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (city !== 'all') params.set('city', city);
    if (category !== 'all') params.set('category', category);
    if (feeRange !== 'all') params.set('fee', feeRange);
    if (timeRange !== 'all') params.set('time', timeRange);

    const qs = params.toString();
    const nextUrl = qs ? `/processes?${qs}` : '/processes';
    router.replace(nextUrl, { scroll: false });
  }, [query, city, category, feeRange, timeRange, router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const list = processes.filter((p) => {
      if (q) {
        const hay =
          `${p.title} ${p.urdu_title} ${p.summary} ${p.city} ${p.category} ${p.office_name} ${p.office_address}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }

      if (city !== 'all') {
        // Show exact city processes AND nationwide/online processes tagged to all cities
        if (p.city.toLowerCase() !== city.toLowerCase() && !p.is_nationwide) {
          return false;
        }
      }

      if (category !== 'all' && p.category.toLowerCase() !== category.toLowerCase()) {
        return false;
      }

      if (!matchesFeeFilter(p.fee_normal, feeRange)) {
        return false;
      }

      if (!matchesTimeFilter(p.time_required, timeRange)) {
        return false;
      }

      return true;
    });

    return [...list].sort((a, b) => {
      if (sortBy === 'fee_asc') return a.fee_normal - b.fee_normal;
      if (sortBy === 'wait_asc') {
        return (a.avg_wait_minutes ?? 999) - (b.avg_wait_minutes ?? 999);
      }
      if (sortBy === 'updated') return b.last_updated.localeCompare(a.last_updated);
      return a.popularity_rank - b.popularity_rank;
    });
  }, [processes, query, city, category, feeRange, timeRange, sortBy]);

  const hasActiveFilters =
    query.trim() !== '' ||
    city !== 'all' ||
    category !== 'all' ||
    feeRange !== 'all' ||
    timeRange !== 'all';

  const resetAll = () => {
    setQuery('');
    setCity('all');
    setCategory('all');
    setFeeRange('all');
    setTimeRange('all');
    setSortBy('popular');
  };

  return (
    <div className="space-y-6">
      {dbError && (
        <div
          role="status"
          className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs font-medium text-amber-900"
        >
          {dbError}
        </div>
      )}

      {/* Live Search & Filter Panel */}
      <div className="rounded-2xl border border-emerald-950/10 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search: Passport Renewal, CNIC, NTN, Domicile, Rawalpindi..."
              aria-label="Filter processes by keyword"
              className="w-full rounded-xl border border-gray-300 bg-surface py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-gray-400 focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sort-processes" className="sr-only">
              Sort processes
            </label>
            <div className="relative">
              <SlidersHorizontal
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                aria-hidden="true"
              />
              <select
                id="sort-processes"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as 'popular' | 'fee_asc' | 'wait_asc' | 'updated'
                  )
                }
                className="rounded-xl border border-gray-300 bg-white py-2.5 pl-9 pr-8 text-sm font-medium text-ink focus:border-brand focus:outline-none"
              >
                <option value="popular">Sort: Most Popular</option>
                <option value="fee_asc">Sort: Lowest Fee</option>
                <option value="wait_asc">Sort: Shortest Wait</option>
                <option value="updated">Sort: Recently Updated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filter dropdown row */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label
              htmlFor="filter-city"
              className="mb-1 block text-xs font-semibold text-gray-600"
            >
              City
            </label>
            <select
              id="filter-city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none"
            >
              <option value="all">All Cities (Pakistan)</option>
              {cities.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="filter-category"
              className="mb-1 block text-xs font-semibold text-gray-600"
            >
              Category
            </label>
            <select
              id="filter-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="filter-fee"
              className="mb-1 block text-xs font-semibold text-gray-600"
            >
              Fee Range (PKR)
            </label>
            <select
              id="filter-fee"
              value={feeRange}
              onChange={(e) => setFeeRange(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none"
            >
              <option value="all">Any Fee</option>
              <option value="free">Free (Rs. 0)</option>
              <option value="under1000">Under Rs. 1,000</option>
              <option value="1000to5000">Rs. 1,000 – Rs. 5,000</option>
              <option value="over5000">Over Rs. 5,000</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="filter-time"
              className="mb-1 block text-xs font-semibold text-gray-600"
            >
              Time Required
            </label>
            <select
              id="filter-time"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none"
            >
              <option value="all">Any Duration</option>
              <option value="instant">Online / Instant / Same Day</option>
              <option value="week">3–10 Working Days</option>
              <option value="weeks">2–4 Weeks</option>
            </select>
          </div>
        </div>

        {/* Status Bar */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-3 text-xs text-gray-600">
          <span className="inline-flex items-center gap-1.5 font-medium">
            <Filter className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
            Showing <strong className="text-ink">{filtered.length}</strong> of{' '}
            {processes.length} verified processes
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetAll}
              className="inline-flex items-center gap-1 font-semibold text-brand hover:underline"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset all filters
            </button>
          )}
        </div>
      </div>

      {/* Results Grid */}
      {filtered.length > 0 ? (
        <div
          key={`${city}-${category}-${feeRange}-${sortBy}`}
          className="animate-tab-in grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((proc) => (
            <ProcessCard key={proc.id} process={proc} />
          ))}
        </div>
      ) : (
        <div className="animate-fade-up rounded-2xl border border-emerald-950/10 bg-white p-10 text-center shadow-sm">
          <p className="text-lg font-bold text-ink">No matching processes found</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
            Try clearing one of your filters or search with simpler keywords like
            &ldquo;Passport&rdquo;, &ldquo;CNIC&rdquo;, or &ldquo;NTN&rdquo;.
          </p>
          <button
            type="button"
            onClick={resetAll}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            <RotateCcw className="h-4 w-4" />
            Show All Processes
          </button>
        </div>
      )}

      {/* Helpful WhatsApp CTA */}
      <div className="pt-4">
        <WhatsAppCta />
      </div>
    </div>
  );
}
