'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowLeft, FileSearch, Loader2 } from 'lucide-react';
import { PageMetaBar } from '@/components/PageMetaBar';
import { ProcessDetailView } from '@/components/process/ProcessDetailView';
import { OFFICIAL_DIRECTORY_URL } from '@/lib/constants';
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

interface ClientProcessFallbackProps {
  slug: string;
  fallbackRelated: ProcessSummaryCard[];
}

export function ClientProcessFallback({
  slug,
  fallbackRelated,
}: ClientProcessFallbackProps) {
  const [loading, setLoading] = useState(true);
  const [process, setProcess] = useState<ProcessWithDetails | null>(null);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const { data: procData, error } = await supabase
          .from('processes')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        if (cancelled || error || !procData) {
          setLoading(false);
          return;
        }

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
            documents: (docsRes.data ?? []) as ProcessDocument[],
            steps: (stepsRes.data ?? []) as ProcessStep[],
            mistakes: (mistakesRes.data ?? []) as ProcessMistake[],
            faqs: (faqsRes.data ?? []) as ProcessFaq[],
            wait_times: (waitsRes.data ?? []) as WaitTime[],
          });
          setLoading(false);
        }
      } catch {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-24 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand" />
        <p className="mt-3 text-sm font-medium text-gray-600">
          Loading latest process guide from KaamHoGaya database...
        </p>
      </div>
    );
  }

  if (!process) {
    return (
      <>
        <PageMetaBar
          breadcrumbs={[
            { label: 'All Processes', href: '/processes' },
            { label: 'Not Found' },
          ]}
          lastUpdated="2026-11-17T00:00:00Z"
          sourceUrl={OFFICIAL_DIRECTORY_URL}
        />
        <section className="mx-auto max-w-2xl px-4 py-20 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-brand">
            <FileSearch className="h-7 w-7" />
          </div>
          <h1 className="mt-5 text-2xl font-bold text-ink">Process Guide Not Found</h1>
          <p className="mt-2 text-sm text-gray-600">
            We couldn’t find a guide matching &ldquo;{slug}&rdquo;. Browse all verified
            Pakistani citizen processes below.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              href="/processes"
              className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              All Processes
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-ink hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Home
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageMetaBar
        breadcrumbs={[
          { label: 'All Processes', href: '/processes' },
          { label: process.city, href: `/city/${process.city.toLowerCase()}` },
          { label: process.title },
        ]}
        lastUpdated={process.last_updated}
        sourceUrl={process.official_source_url}
      />
      <ProcessDetailView
        initialProcess={process}
        relatedProcesses={fallbackRelated.filter((r) => r.id !== process.id).slice(0, 3)}
      />
    </>
  );
}
