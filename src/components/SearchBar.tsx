'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, MapPin, Search } from 'lucide-react';
import { formatPKR } from '@/lib/format';
import type { ProcessSummaryCard } from '@/types/database';

interface SearchBarProps {
  processes: ProcessSummaryCard[];
  placeholder?: string;
  initialQuery?: string;
}

export function SearchBar({
  processes,
  placeholder = 'Search: Passport Renewal in Rawalpindi',
  initialQuery = '',
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return processes.slice(0, 5);
    }
    return processes
      .filter((p) => {
        const haystack =
          `${p.title} ${p.urdu_title} ${p.city} ${p.category} ${p.office_name} ${p.summary}`.toLowerCase();
        return haystack.includes(q);
      })
      .slice(0, 6);
  }, [processes, query]);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
    if (activeIndex >= 0 && suggestions[activeIndex]) {
      router.push(`/process/${suggestions[activeIndex].slug}`);
      return;
    }
    const trimmed = query.trim();
    if (!trimmed) {
      router.push('/processes');
      return;
    }
    router.push(`/processes?q=${encodeURIComponent(trimmed)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setOpen(true);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-2xl">
      <form onSubmit={handleSubmit} role="search" aria-label="Search Pakistani government processes">
        <div className="flex items-center rounded-2xl border-2 border-white/30 bg-white p-1.5 shadow-xl shadow-brand-dark/25 transition-all duration-300 ease-spring focus-within:border-accent-yellow focus-within:ring-4 focus-within:ring-accent-yellow/25">
          <Search
            className="ml-3 h-5 w-5 shrink-0 text-gray-400 transition-colors"
            aria-hidden="true"
          />
          <input
            type="search"
            role="combobox"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(-1);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            aria-label="Search government processes"
            aria-autocomplete="list"
            aria-expanded={open}
            aria-controls="khg-search-suggestions"
            className="w-full bg-transparent px-3 py-2.5 text-sm text-ink placeholder:text-gray-400 focus:outline-none sm:text-base"
          />
          <button
            type="submit"
            className="khg-btn-sheen group inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark sm:px-5"
          >
            <span>Search</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-spring group-hover:translate-x-0.5" aria-hidden="true" />
          </button>
        </div>
      </form>

      {/* Instant autocomplete dropdown */}
      {open && suggestions.length > 0 && (
        <div
          id="khg-search-suggestions"
          role="listbox"
          className="animate-dropdown-in absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-emerald-950/15 bg-white/95 text-left shadow-2xl shadow-emerald-950/15 backdrop-blur-xl"
        >
          <div className="border-b border-gray-100 bg-surface px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
            {query.trim() ? 'Matching Processes' : 'Popular Citizen Guides'}
          </div>
          <ul className="divide-y divide-gray-100">
            {suggestions.map((proc, idx) => (
              <li key={proc.id} role="option" aria-selected={idx === activeIndex}>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    router.push(`/process/${proc.slug}`);
                  }}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors ${
                    idx === activeIndex ? 'bg-emerald-50' : 'hover:bg-surface'
                  }`}
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">
                      {proc.title}
                    </p>
                    <p className="mt-0.5 flex items-center gap-2 text-xs text-gray-500">
                      <span className="inline-flex items-center gap-0.5">
                        <MapPin className="h-3 w-3 text-brand" />
                        {proc.city}
                      </span>
                      <span>•</span>
                      <span>{proc.category}</span>
                      <span>•</span>
                      <span>{proc.documents_count} docs</span>
                    </p>
                  </div>
                  <span className="shrink-0 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-brand">
                    {formatPKR(proc.fee_normal)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          {query.trim() && (
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                setOpen(false);
                router.push(`/processes?q=${encodeURIComponent(query.trim())}`);
              }}
              className="flex w-full items-center justify-center gap-1.5 border-t border-gray-100 bg-gray-50 px-4 py-2.5 text-xs font-semibold text-brand hover:bg-emerald-50"
            >
              View all results for &ldquo;{query.trim()}&rdquo;
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
