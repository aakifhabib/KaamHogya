'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import {
  BookmarkCheck,
  Check,
  Download,
  ExternalLink,
  MessageCircle,
  Plus,
  Printer,
  RotateCcw,
  Trash2,
  WifiOff,
} from 'lucide-react';
import { WhatsAppCta } from '@/components/WhatsAppCta';
import { SITE_URL } from '@/lib/constants';
import type { ChecklistProcessBundle } from '@/lib/data';
import { formatDate, formatPKR, sanitizeText } from '@/lib/format';
import { downloadChecklistPdf } from '@/lib/pdf-checklist';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import type { City, ProcessDocument, ProcessRecord } from '@/types/database';

interface ChecklistGeneratorProps {
  initialBundles: ChecklistProcessBundle[];
  cities: City[];
}

interface CustomChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

interface SavedChecklistRecord {
  slug: string;
  title: string;
  city: string;
  savedAt: string;
  checkedCount: number;
  totalCount: number;
}

const OFFLINE_BUNDLES_KEY = 'khg_offline_bundles_v1';
const SAVED_INDEX_KEY = 'khg_saved_checklists_v1';

export function ChecklistGenerator({
  initialBundles,
  cities,
}: ChecklistGeneratorProps) {
  const searchParams = useSearchParams();
  const initialSlugParam = searchParams.get('process');
  const initialCityParam = searchParams.get('city');

  const [bundles, setBundles] = useState<ChecklistProcessBundle[]>(initialBundles);
  const [selectedSlug, setSelectedSlug] = useState<string>(() => {
    if (initialSlugParam && initialBundles.some((b) => b.slug === initialSlugParam)) {
      return initialSlugParam;
    }
    return initialBundles[0]?.slug ?? '';
  });
  const [selectedCity, setSelectedCity] = useState<string>(() => {
    if (
      initialCityParam &&
      cities.some((c) => c.name.toLowerCase() === initialCityParam.toLowerCase())
    ) {
      return (
        cities.find((c) => c.name.toLowerCase() === initialCityParam.toLowerCase())
          ?.name ?? 'Rawalpindi'
      );
    }
    return 'Rawalpindi';
  });

  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});
  const [customItems, setCustomItems] = useState<CustomChecklistItem[]>([]);
  const [newReminder, setNewReminder] = useState('');
  const [savedList, setSavedList] = useState<SavedChecklistRecord[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  // Cache initial bundles to localStorage & sync latest from Supabase when online
  useEffect(() => {
    try {
      const cachedRaw = window.localStorage.getItem(OFFLINE_BUNDLES_KEY);
      if (cachedRaw && bundles.length === 0) {
        setBundles(JSON.parse(cachedRaw));
      } else if (initialBundles.length > 0) {
        window.localStorage.setItem(OFFLINE_BUNDLES_KEY, JSON.stringify(initialBundles));
      }

      const savedRaw = window.localStorage.getItem(SAVED_INDEX_KEY);
      if (savedRaw) {
        setSavedList(JSON.parse(savedRaw));
      }
    } catch {
      // ignore storage issues
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    let cancelled = false;
    (async () => {
      try {
        const [procRes, docRes] = await Promise.all([
          supabase
            .from('processes')
            .select('*')
            .order('popularity_rank', { ascending: true }),
          supabase.from('documents').select('*').order('sort_order', { ascending: true }),
        ]);
        if (!cancelled && !procRes.error && procRes.data && procRes.data.length > 0) {
          const docsByProc = new Map<string, ProcessDocument[]>();
          for (const d of (docRes.data ?? []) as ProcessDocument[]) {
            const list = docsByProc.get(d.process_id) ?? [];
            list.push(d);
            docsByProc.set(d.process_id, list);
          }
          const merged: ChecklistProcessBundle[] = (procRes.data as ProcessRecord[]).map(
            (p) => ({
              ...p,
              documents: docsByProc.get(p.id) ?? [],
            })
          );
          setBundles(merged);
          try {
            window.localStorage.setItem(OFFLINE_BUNDLES_KEY, JSON.stringify(merged));
          } catch {
            // ignore
          }
        }
      } catch {
        // Offline or unreachable — cached bundles already active
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentProcess = useMemo(
    () => bundles.find((b) => b.slug === selectedSlug) ?? bundles[0],
    [bundles, selectedSlug]
  );

  // Load saved ticks & custom items whenever selected process changes
  useEffect(() => {
    if (!currentProcess) return;
    try {
      const rawChecked = window.localStorage.getItem(
        `khg_checklist_${currentProcess.slug}`
      );
      setCheckedIds(rawChecked ? JSON.parse(rawChecked) : {});

      const rawCustom = window.localStorage.getItem(
        `khg_checklist_custom_${currentProcess.slug}`
      );
      setCustomItems(rawCustom ? JSON.parse(rawCustom) : []);
    } catch {
      setCheckedIds({});
      setCustomItems([]);
    }
  }, [currentProcess]);

  const toggleDoc = (docId: string) => {
    if (!currentProcess) return;
    const next = { ...checkedIds, [docId]: !checkedIds[docId] };
    setCheckedIds(next);
    try {
      window.localStorage.setItem(
        `khg_checklist_${currentProcess.slug}`,
        JSON.stringify(next)
      );
    } catch {
      // ignore
    }
  };

  const addCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProcess) return;
    const clean = sanitizeText(newReminder, 120);
    if (!clean) return;
    const next = [
      ...customItems,
      { id: `custom-${Date.now()}`, text: clean, checked: false },
    ];
    setCustomItems(next);
    setNewReminder('');
    try {
      window.localStorage.setItem(
        `khg_checklist_custom_${currentProcess.slug}`,
        JSON.stringify(next)
      );
    } catch {
      // ignore
    }
  };

  const toggleCustomItem = (id: string) => {
    if (!currentProcess) return;
    const next = customItems.map((ci) =>
      ci.id === id ? { ...ci, checked: !ci.checked } : ci
    );
    setCustomItems(next);
    try {
      window.localStorage.setItem(
        `khg_checklist_custom_${currentProcess.slug}`,
        JSON.stringify(next)
      );
    } catch {
      // ignore
    }
  };

  const removeCustomItem = (id: string) => {
    if (!currentProcess) return;
    const next = customItems.filter((ci) => ci.id !== id);
    setCustomItems(next);
    try {
      window.localStorage.setItem(
        `khg_checklist_custom_${currentProcess.slug}`,
        JSON.stringify(next)
      );
    } catch {
      // ignore
    }
  };

  const handleSaveSnapshot = () => {
    if (!currentProcess) return;
    const done = currentProcess.documents.filter((d) => checkedIds[d.id]).length;
    const entry: SavedChecklistRecord = {
      slug: currentProcess.slug,
      title: currentProcess.title,
      city: selectedCity,
      savedAt: new Date().toISOString(),
      checkedCount: done,
      totalCount: currentProcess.documents.length,
    };
    const next = [entry, ...savedList.filter((s) => s.slug !== currentProcess.slug)].slice(
      0,
      20
    );
    setSavedList(next);
    try {
      window.localStorage.setItem(SAVED_INDEX_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
    setToast('Saved on your device for offline use!');
    setTimeout(() => setToast(null), 3500);
  };

  const handleDownloadPdf = async () => {
    if (!currentProcess) return;
    await downloadChecklistPdf({
      process: currentProcess,
      selectedCity,
      documents: currentProcess.documents,
      checkedIds,
      customItems,
    });
    setToast('PDF checklist downloaded!');
    setTimeout(() => setToast(null), 3500);
  };

  const handleShareWhatsApp = () => {
    if (!currentProcess) return;
    const lines = [
      `*KaamHoGaya.pk Document Checklist*`,
      `${currentProcess.title} (${selectedCity})`,
      `Official Fee (Normal): ${formatPKR(currentProcess.fee_normal)}`,
      `Office: ${currentProcess.office_name}`,
      '',
      '*Documents Required:*',
      ...currentProcess.documents.map((doc) => {
        const mark = checkedIds[doc.id] ? '✅' : '⬜';
        const kind = doc.type === 'original' ? 'Original' : 'Photocopy';
        return `${mark} ${doc.name} (${kind} × ${doc.copies_needed})`;
      }),
      ...(customItems.length > 0
        ? [
            '',
            '*Personal Notes:*',
            ...customItems.map((ci) => `${ci.checked ? '✅' : '⬜'} ${ci.text}`),
          ]
        : []),
      '',
      `Full step-by-step guide: ${
        typeof window !== 'undefined' && window.location.origin
          ? window.location.origin
          : SITE_URL
      }/process/${currentProcess.slug}`,
    ];
    const url = `https://wa.me/?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!currentProcess) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-600">
        No processes available yet.
      </div>
    );
  }

  const totalDocs = currentProcess.documents.length + customItems.length;
  const completedDocs =
    currentProcess.documents.filter((d) => checkedIds[d.id]).length +
    customItems.filter((c) => c.checked).length;
  const pct = totalDocs > 0 ? Math.round((completedDocs / totalDocs) * 100) : 0;

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* Main Checklist Builder */}
      <div className="space-y-6 lg:col-span-8">
        {/* Process + City Selector Card */}
        <div className="no-print rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="cl-process"
                className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-600"
              >
                1. Select Process
              </label>
              <select
                id="cl-process"
                value={currentProcess.slug}
                onChange={(e) => setSelectedSlug(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-surface px-3.5 py-2.5 text-sm font-semibold text-ink focus:border-brand focus:bg-white focus:outline-none"
              >
                {bundles.map((proc) => (
                  <option key={proc.id} value={proc.slug}>
                    {proc.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="cl-city"
                className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-600"
              >
                2. Select Your City
              </label>
              <select
                id="cl-city"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-surface px-3.5 py-2.5 text-sm font-semibold text-ink focus:border-brand focus:bg-white focus:outline-none"
              >
                {cities.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-emerald-50/70 px-3.5 py-2.5 text-xs text-brand-dark">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <WifiOff className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
              Works offline automatically once loaded — saved to your phone’s local storage.
            </span>
            <Link
              href={`/process/${currentProcess.slug}`}
              className="inline-flex items-center gap-1 font-bold text-brand hover:underline"
            >
              Read full guide
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Printable Checklist Sheet */}
        <div className="rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-gray-100 pb-4">
            <div>
              <span className="inline-block rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-brand">
                {selectedCity} • {currentProcess.category}
              </span>
              <h2 className="mt-2 text-xl font-extrabold text-ink sm:text-2xl">
                {currentProcess.title}
              </h2>
              <p className="mt-1 text-xs text-gray-600">
                <strong>Office:</strong> {currentProcess.office_name} •{' '}
                <strong>Fee:</strong> {formatPKR(currentProcess.fee_normal)} (Normal)
              </p>
            </div>

            <div className="text-right">
              <p className="text-2xl font-extrabold text-brand">
                {completedDocs}/{totalDocs}
              </p>
              <p className="text-[11px] font-semibold text-gray-500">Items Ready</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-brand transition-all duration-300"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          {/* Required Documents */}
          <ul className="mt-5 divide-y divide-gray-100 rounded-xl border border-gray-200">
            {currentProcess.documents.map((doc) => {
              const checked = Boolean(checkedIds[doc.id]);
              return (
                <li
                  key={doc.id}
                  className={checked ? 'bg-emerald-50/50' : 'bg-white hover:bg-surface/60'}
                >
                  <label className="flex cursor-pointer items-start gap-3 p-3.5 sm:p-4">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleDoc(doc.id)}
                      className="sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 ${
                        checked
                          ? 'border-brand bg-brand text-white'
                          : 'border-gray-300 bg-white'
                      }`}
                    >
                      {checked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span
                          className={`text-sm font-semibold ${
                            checked ? 'text-gray-500 line-through' : 'text-ink'
                          }`}
                        >
                          {doc.name}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`rounded-md px-2 py-0.5 text-[11px] font-bold uppercase ${
                              doc.type === 'original'
                                ? 'bg-emerald-100 text-brand-dark'
                                : 'bg-amber-100 text-amber-900'
                            }`}
                          >
                            {doc.type}
                          </span>
                          <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-700">
                            × {doc.copies_needed}
                          </span>
                        </div>
                      </div>
                      {doc.note && (
                        <p className="mt-1 text-xs text-gray-600">{doc.note}</p>
                      )}
                    </div>
                  </label>
                </li>
              );
            })}
          </ul>

          {/* Custom Personal Reminders */}
          {customItems.length > 0 && (
            <div className="mt-5">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500">
                My Personal Notes
              </p>
              <ul className="divide-y divide-gray-100 rounded-xl border border-gray-200">
                {customItems.map((ci) => (
                  <li key={ci.id} className="flex items-center justify-between gap-2 p-3">
                    <label className="flex flex-1 cursor-pointer items-center gap-3">
                      <input
                        type="checkbox"
                        checked={ci.checked}
                        onChange={() => toggleCustomItem(ci.id)}
                        className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
                      />
                      <span
                        className={`text-sm ${
                          ci.checked ? 'text-gray-400 line-through' : 'text-ink'
                        }`}
                      >
                        {ci.text}
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={() => removeCustomItem(ci.id)}
                      aria-label="Remove reminder"
                      className="no-print rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-danger"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Add Custom Reminder */}
          <form onSubmit={addCustomItem} className="no-print mt-4 flex gap-2">
            <input
              type="text"
              maxLength={120}
              value={newReminder}
              onChange={(e) => setNewReminder(e.target.value)}
              placeholder="Add personal reminder (e.g. Carry black pen & Rs. 500 cash)..."
              aria-label="Add personal checklist reminder"
              className="flex-1 rounded-xl border border-gray-300 bg-surface px-3.5 py-2 text-xs text-ink placeholder:text-gray-400 focus:border-brand focus:bg-white focus:outline-none sm:text-sm"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1 rounded-xl border border-brand/25 bg-emerald-50 px-3.5 py-2 text-xs font-bold text-brand hover:bg-emerald-100 sm:text-sm"
            >
              <Plus className="h-4 w-4" />
              Add
            </button>
          </form>

          {/* Primary Actions: Download PDF, Share on WhatsApp, Print, Save */}
          <div className="no-print mt-6 flex flex-wrap items-center gap-2.5 border-t border-gray-100 pt-5">
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-brand-dark sm:text-sm"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download PDF
            </button>

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="inline-flex items-center gap-2 rounded-xl bg-[#16A34A] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#15803D] sm:text-sm"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Share on WhatsApp
            </button>

            <button
              type="button"
              onClick={handleSaveSnapshot}
              className="inline-flex items-center gap-2 rounded-xl border border-brand/30 bg-emerald-50 px-4 py-2.5 text-xs font-bold text-brand hover:bg-emerald-100 sm:text-sm"
            >
              <BookmarkCheck className="h-4 w-4" aria-hidden="true" />
              Save Offline
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-xs font-semibold text-ink hover:bg-gray-50 sm:text-sm"
            >
              <Printer className="h-4 w-4 text-gray-600" aria-hidden="true" />
              Print
            </button>

            {completedDocs > 0 && (
              <button
                type="button"
                onClick={() => {
                  setCheckedIds({});
                  try {
                    window.localStorage.removeItem(
                      `khg_checklist_${currentProcess.slug}`
                    );
                  } catch {
                    // ignore
                  }
                }}
                className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-ink"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </button>
            )}
          </div>

          {toast && (
            <div
              role="status"
              className="no-print mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-semibold text-brand-dark"
            >
              {toast}
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Saved Offline Checklists + WhatsApp CTA */}
      <aside className="no-print space-y-6 lg:col-span-4">
        <div className="rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm">
          <h3 className="text-base font-bold text-ink">My Saved Offline Checklists</h3>
          <p className="mt-1 text-xs text-gray-600">
            Stored safely on this browser — open anytime at the office without mobile data.
          </p>

          {savedList.length === 0 ? (
            <p className="mt-4 rounded-xl bg-surface p-4 text-xs text-gray-500">
              No saved checklists yet. Tick your documents and click{' '}
              <strong>Save Offline</strong> to keep them here.
            </p>
          ) : (
            <ul className="mt-4 space-y-2.5">
              {savedList.map((item) => (
                <li key={item.slug}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSlug(item.slug);
                      setSelectedCity(item.city);
                    }}
                    className={`w-full rounded-xl border p-3 text-left transition-colors ${
                      item.slug === currentProcess.slug
                        ? 'border-brand bg-emerald-50/70'
                        : 'border-gray-200 bg-white hover:bg-surface'
                    }`}
                  >
                    <p className="text-xs font-bold text-ink">{item.title}</p>
                    <p className="mt-1 flex items-center justify-between text-[11px] text-gray-500">
                      <span>
                        {item.city} • {item.checkedCount}/{item.totalCount} ready
                      </span>
                      <span>{formatDate(item.savedAt)}</span>
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <WhatsAppCta />
      </aside>
    </div>
  );
}
