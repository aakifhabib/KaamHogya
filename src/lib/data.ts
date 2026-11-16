import {
  SEED_CATEGORIES,
  SEED_CITIES,
  SEED_DOCUMENTS,
  SEED_FAQS,
  SEED_MISTAKES,
  SEED_PROCESSES,
  SEED_STEPS,
  SEED_WAIT_TIMES,
} from '@/data/seed-data';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import type {
  Category,
  City,
  OfficeWaitSummary,
  ProcessDocument,
  ProcessFaq,
  ProcessMistake,
  ProcessRecord,
  ProcessStep,
  ProcessSummaryCard,
  ProcessWithDetails,
  WaitTime,
  WaitTimeWithProcess,
} from '@/types/database';

export interface DataResult<T> {
  data: T;
  source: 'supabase' | 'fallback';
}

export function buildProcessSummaries(
  processes: ProcessRecord[],
  documents: ProcessDocument[],
  waitTimes: WaitTime[]
): ProcessSummaryCard[] {
  const docCounts = new Map<string, number>();
  for (const doc of documents) {
    docCounts.set(doc.process_id, (docCounts.get(doc.process_id) ?? 0) + 1);
  }

  const waitMap = new Map<string, WaitTime[]>();
  for (const wt of waitTimes) {
    if (wt.status !== 'approved') continue;
    const list = waitMap.get(wt.process_id) ?? [];
    list.push(wt);
    waitMap.set(wt.process_id, list);
  }

  return processes
    .map((p) => {
      const approved = waitMap.get(p.id) ?? [];
      const avgWait =
        approved.length > 0
          ? Math.round(
              approved.reduce((acc, w) => acc + w.wait_minutes, 0) / approved.length
            )
          : null;
      const avgRating =
        approved.length > 0
          ? Number(
              (
                approved.reduce((acc, w) => acc + w.rating, 0) / approved.length
              ).toFixed(1)
            )
          : null;

      return {
        ...p,
        documents_count: docCounts.get(p.id) ?? 0,
        avg_wait_minutes: avgWait,
        wait_reports_count: approved.length,
        avg_rating: avgRating,
      };
    })
    .sort((a, b) => a.popularity_rank - b.popularity_rank);
}

export function buildOfficeWaitSummaries(
  processes: ProcessRecord[],
  waitTimes: WaitTime[]
): OfficeWaitSummary[] {
  const approvedByProcess = new Map<string, WaitTime[]>();
  for (const wt of waitTimes) {
    if (wt.status !== 'approved') continue;
    const list = approvedByProcess.get(wt.process_id) ?? [];
    list.push(wt);
    approvedByProcess.set(wt.process_id, list);
  }

  return processes.map((p) => {
    const reports = (approvedByProcess.get(p.id) ?? []).sort((a, b) =>
      b.created_at.localeCompare(a.created_at)
    );
    const avgWait =
      reports.length > 0
        ? Math.round(
            reports.reduce((acc, r) => acc + r.wait_minutes, 0) / reports.length
          )
        : null;
    const avgRating =
      reports.length > 0
        ? Number(
            (reports.reduce((acc, r) => acc + r.rating, 0) / reports.length).toFixed(1)
          )
        : null;

    return {
      process_id: p.id,
      process_slug: p.slug,
      process_title: p.title,
      office_name: p.office_name,
      office_address: p.office_address,
      office_timings: p.office_timings,
      best_day_to_go: p.best_day_to_go,
      city: p.city,
      category: p.category,
      avg_wait_minutes: avgWait,
      avg_rating: avgRating,
      report_count: reports.length,
      last_reported_date: reports[0]?.visit_date ?? null,
      last_reported_at: reports[0]?.created_at ?? null,
      latest_tip: reports[0]?.tip || null,
    };
  });
}

export async function getCities(): Promise<City[]> {
  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('cities')
        .select('id, name, slug, province')
        .order('name', { ascending: true });
      if (!error && data && data.length > 0) {
        // Keep Rawalpindi first for local focus, then alphabetical or seed order
        const orderMap = new Map(SEED_CITIES.map((c, idx) => [c.slug, idx]));
        return (data as City[]).sort(
          (a, b) => (orderMap.get(a.slug) ?? 99) - (orderMap.get(b.slug) ?? 99)
        );
      }
    } catch {
      // Fallback below
    }
  }
  return SEED_CITIES;
}

export async function getCategories(): Promise<Category[]> {
  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name, slug, urdu_label, description');
      if (!error && data && data.length > 0) {
        const orderMap = new Map(SEED_CATEGORIES.map((c, idx) => [c.slug, idx]));
        return (data as Category[]).sort(
          (a, b) => (orderMap.get(a.slug) ?? 99) - (orderMap.get(b.slug) ?? 99)
        );
      }
    } catch {
      // Fallback below
    }
  }
  return SEED_CATEGORIES;
}

export async function getProcessSummaries(): Promise<DataResult<ProcessSummaryCard[]>> {
  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      const [procRes, docRes, waitRes] = await Promise.all([
        supabase
          .from('processes')
          .select('*')
          .order('popularity_rank', { ascending: true }),
        supabase.from('documents').select('id, process_id, name, type, copies_needed, note, sort_order'),
        supabase
          .from('wait_times')
          .select('*')
          .eq('status', 'approved')
          .order('visit_date', { ascending: false }),
      ]);

      if (!procRes.error && procRes.data && procRes.data.length > 0) {
        return {
          data: buildProcessSummaries(
            procRes.data as ProcessRecord[],
            (docRes.data ?? []) as ProcessDocument[],
            (waitRes.data ?? []) as WaitTime[]
          ),
          source: 'supabase',
        };
      }
    } catch {
      // Fallback below
    }
  }

  return {
    data: buildProcessSummaries(SEED_PROCESSES, SEED_DOCUMENTS, SEED_WAIT_TIMES),
    source: 'fallback',
  };
}

export async function getProcessBySlug(
  slug: string
): Promise<DataResult<ProcessWithDetails | null>> {
  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      const { data: processData, error: procError } = await supabase
        .from('processes')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (!procError && processData) {
        const proc = processData as ProcessRecord;
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

        return {
          data: {
            ...proc,
            documents: (docsRes.data ?? []) as ProcessDocument[],
            steps: (stepsRes.data ?? []) as ProcessStep[],
            mistakes: (mistakesRes.data ?? []) as ProcessMistake[],
            faqs: (faqsRes.data ?? []) as ProcessFaq[],
            wait_times: (waitsRes.data ?? []) as WaitTime[],
          },
          source: 'supabase',
        };
      }
    } catch {
      // Fallback below
    }
  }

  const seedProc = SEED_PROCESSES.find((p) => p.slug === slug);
  if (!seedProc) {
    return { data: null, source: 'fallback' };
  }

  return {
    data: {
      ...seedProc,
      documents: SEED_DOCUMENTS.filter((d) => d.process_id === seedProc.id).sort(
        (a, b) => a.sort_order - b.sort_order
      ),
      steps: SEED_STEPS.filter((s) => s.process_id === seedProc.id).sort(
        (a, b) => a.step_number - b.step_number
      ),
      mistakes: SEED_MISTAKES.filter((m) => m.process_id === seedProc.id).sort(
        (a, b) => a.sort_order - b.sort_order
      ),
      faqs: SEED_FAQS.filter((f) => f.process_id === seedProc.id).sort(
        (a, b) => a.sort_order - b.sort_order
      ),
      wait_times: SEED_WAIT_TIMES.filter(
        (w) => w.process_id === seedProc.id && w.status === 'approved'
      ).sort((a, b) => b.visit_date.localeCompare(a.visit_date)),
    },
    source: 'fallback',
  };
}

export async function getRelatedProcesses(
  currentProcess: ProcessRecord,
  limit = 3
): Promise<ProcessSummaryCard[]> {
  const { data: all } = await getProcessSummaries();
  const others = all.filter((p) => p.id !== currentProcess.id);

  const scored = others.map((p) => {
    let score = 0;
    if (p.category === currentProcess.category) score += 3;
    if (p.city === currentProcess.city) score += 2;
    if (p.is_verified) score += 1;
    return { p, score };
  });

  scored.sort((a, b) => b.score - a.score || a.p.popularity_rank - b.p.popularity_rank);
  return scored.slice(0, limit).map((item) => item.p);
}

export async function getLatestWaitTimes(
  limit = 8
): Promise<DataResult<WaitTimeWithProcess[]>> {
  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      const [waitRes, procRes] = await Promise.all([
        supabase
          .from('wait_times')
          .select('*')
          .eq('status', 'approved')
          .order('created_at', { ascending: false })
          .limit(limit),
        supabase.from('processes').select('id, title, slug'),
      ]);

      if (!waitRes.error && waitRes.data && waitRes.data.length > 0) {
        const procMap = new Map(
          ((procRes.data ?? []) as Array<{ id: string; title: string; slug: string }>).map(
            (p) => [p.id, p]
          )
        );
        const enriched = (waitRes.data as WaitTime[]).map((wt) => {
          const proc = procMap.get(wt.process_id);
          return {
            ...wt,
            process_title: proc?.title,
            process_slug: proc?.slug,
          };
        });
        return { data: enriched, source: 'supabase' };
      }
    } catch {
      // Fallback below
    }
  }

  const procMap = new Map(SEED_PROCESSES.map((p) => [p.id, p]));
  const approved = SEED_WAIT_TIMES.filter((w) => w.status === 'approved')
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .slice(0, limit)
    .map((wt) => {
      const proc = procMap.get(wt.process_id);
      return {
        ...wt,
        process_title: proc?.title,
        process_slug: proc?.slug,
      };
    });

  return { data: approved, source: 'fallback' };
}

export async function getOfficeWaitSummaries(): Promise<
  DataResult<{
    offices: OfficeWaitSummary[];
    recentReports: WaitTimeWithProcess[];
  }>
> {
  const supabase = getSupabaseServerClient();
  if (supabase) {
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

      if (!procRes.error && procRes.data && procRes.data.length > 0) {
        const procs = procRes.data as ProcessRecord[];
        const waits = (waitRes.data ?? []) as WaitTime[];
        const procMap = new Map(procs.map((p) => [p.id, p]));
        return {
          data: {
            offices: buildOfficeWaitSummaries(procs, waits),
            recentReports: waits.slice(0, 20).map((w) => ({
              ...w,
              process_title: procMap.get(w.process_id)?.title,
              process_slug: procMap.get(w.process_id)?.slug,
            })),
          },
          source: 'supabase',
        };
      }
    } catch {
      // Fallback below
    }
  }

  const procMap = new Map(SEED_PROCESSES.map((p) => [p.id, p]));
  const approved = SEED_WAIT_TIMES.filter((w) => w.status === 'approved').sort((a, b) =>
    b.created_at.localeCompare(a.created_at)
  );
  return {
    data: {
      offices: buildOfficeWaitSummaries(SEED_PROCESSES, SEED_WAIT_TIMES),
      recentReports: approved.slice(0, 20).map((w) => ({
        ...w,
        process_title: procMap.get(w.process_id)?.title,
        process_slug: procMap.get(w.process_id)?.slug,
      })),
    },
    source: 'fallback',
  };
}

export interface ChecklistProcessBundle extends ProcessRecord {
  documents: ProcessDocument[];
}

export async function getAllProcessesWithDocuments(): Promise<ChecklistProcessBundle[]> {
  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      const [procRes, docRes] = await Promise.all([
        supabase
          .from('processes')
          .select('*')
          .order('popularity_rank', { ascending: true }),
        supabase.from('documents').select('*').order('sort_order', { ascending: true }),
      ]);
      if (!procRes.error && procRes.data && procRes.data.length > 0) {
        const docsByProcess = new Map<string, ProcessDocument[]>();
        for (const doc of (docRes.data ?? []) as ProcessDocument[]) {
          const list = docsByProcess.get(doc.process_id) ?? [];
          list.push(doc);
          docsByProcess.set(doc.process_id, list);
        }
        return (procRes.data as ProcessRecord[]).map((p) => ({
          ...p,
          documents: docsByProcess.get(p.id) ?? [],
        }));
      }
    } catch {
      // Fallback below
    }
  }

  return SEED_PROCESSES.map((p) => ({
    ...p,
    documents: SEED_DOCUMENTS.filter((d) => d.process_id === p.id).sort(
      (a, b) => a.sort_order - b.sort_order
    ),
  }));
}

export async function getSiteLastUpdated(): Promise<string> {
  const { data } = await getProcessSummaries();
  if (data.length === 0) return '2026-11-16T08:00:00Z';
  return data.reduce(
    (latest, p) => (p.last_updated > latest ? p.last_updated : latest),
    data[0].last_updated
  );
}
