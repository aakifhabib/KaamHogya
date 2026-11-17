'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  BookmarkCheck,
  Check,
  CheckSquare,
  Download,
  Printer,
  RotateCcw,
} from 'lucide-react';
import { downloadChecklistPdf } from '@/lib/pdf-checklist';
import type { ProcessDocument, ProcessRecord } from '@/types/database';

interface DocumentChecklistBlockProps {
  process: ProcessRecord;
  documents: ProcessDocument[];
}

interface SavedChecklistRecord {
  slug: string;
  title: string;
  city: string;
  savedAt: string;
  checkedCount: number;
  totalCount: number;
}

export function DocumentChecklistBlock({
  process,
  documents,
}: DocumentChecklistBlockProps) {
  const storageKey = `khg_checklist_${process.slug}`;
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        setCheckedIds(JSON.parse(raw));
      }
    } catch {
      // ignore localStorage errors
    } finally {
      setHydrated(true);
    }
  }, [storageKey]);

  const persistChecked = (next: Record<string, boolean>) => {
    setCheckedIds(next);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // ignore quota errors
    }
  };

  const toggleDoc = (id: string) => {
    const next = { ...checkedIds, [id]: !checkedIds[id] };
    persistChecked(next);
  };

  const checkedCount = documents.filter((d) => checkedIds[d.id]).length;
  const progressPct =
    documents.length > 0 ? Math.round((checkedCount / documents.length) * 100) : 0;

  const handleSaveMyChecklist = () => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(checkedIds));

      // Also save into user's saved checklists index for offline access in /checklist
      const indexKey = 'khg_saved_checklists_v1';
      const rawIndex = window.localStorage.getItem(indexKey);
      const existing: SavedChecklistRecord[] = rawIndex ? JSON.parse(rawIndex) : [];
      const entry: SavedChecklistRecord = {
        slug: process.slug,
        title: process.title,
        city: process.city,
        savedAt: new Date().toISOString(),
        checkedCount,
        totalCount: documents.length,
      };
      const updated = [entry, ...existing.filter((item) => item.slug !== process.slug)].slice(
        0,
        20
      );
      window.localStorage.setItem(indexKey, JSON.stringify(updated));

      // Cache process documents bundle for offline checklist usage
      window.localStorage.setItem(
        `khg_process_cache_${process.slug}`,
        JSON.stringify({ process, documents })
      );

      setSavedNotice(
        `Checklist saved on this device (${checkedCount}/${documents.length} ready) — works offline!`
      );
      setTimeout(() => setSavedNotice(null), 4500);
    } catch {
      setSavedNotice('Could not access device storage. Please use Print or Download PDF.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    await downloadChecklistPdf({
      process,
      selectedCity: process.city,
      documents,
      checkedIds,
    });
  };

  const handleReset = () => {
    persistChecked({});
  };

  return (
    <section
      id="documents"
      aria-labelledby="documents-heading"
      className="print-break-avoid rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="documents-heading" className="text-xl font-bold text-ink sm:text-2xl">
            Documents You Need
          </h2>
          <p className="mt-1 text-xs text-gray-600 sm:text-sm">
            Tick off each document as you place it in your folder — your progress saves
            automatically on this phone/browser.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-all duration-300 ease-spring ${
              progressPct === 100 && hydrated
                ? 'animate-check-pop bg-brand text-white shadow-sm'
                : 'bg-emerald-50 text-brand'
            }`}
          >
            <CheckSquare className="h-3.5 w-3.5" aria-hidden="true" />
            {hydrated
              ? progressPct === 100
                ? `${checkedCount}/${documents.length} Folder Ready!`
                : `${checkedCount}/${documents.length} Ready`
              : `${documents.length} Docs`}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div
          className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100"
          role="progressbar"
          aria-valuenow={progressPct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Document preparation progress"
        >
          <div
            className={`h-full rounded-full transition-all duration-500 ease-spring ${
              progressPct === 100
                ? 'bg-gradient-to-r from-brand via-emerald-500 to-accent-yellow'
                : 'bg-gradient-to-r from-brand-dark to-brand'
            }`}
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Interactive Document List */}
      <ul className="mt-4 divide-y divide-gray-100 overflow-hidden rounded-xl border border-gray-200">
        {documents.map((doc) => {
          const isChecked = Boolean(checkedIds[doc.id]);
          return (
            <li
              key={doc.id}
              className={`transition-colors duration-200 ${
                isChecked ? 'bg-emerald-50/55' : 'bg-white hover:bg-surface/70'
              }`}
            >
              <label className="group flex cursor-pointer items-start gap-3 p-3.5 sm:p-4">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleDoc(doc.id)}
                  className="sr-only"
                />
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200 ease-pop ${
                    isChecked
                      ? 'animate-check-pop border-brand bg-brand text-white shadow-sm'
                      : 'border-gray-300 bg-white group-hover:border-brand/60'
                  }`}
                >
                  {isChecked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span
                      className={`text-sm font-semibold ${
                        isChecked ? 'text-gray-500 line-through' : 'text-ink'
                      }`}
                    >
                      {doc.name}
                    </span>

                    <div className="flex shrink-0 items-center gap-1.5">
                      <span
                        className={`rounded-md px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${
                          doc.type === 'original'
                            ? 'bg-emerald-100 text-brand-dark'
                            : 'bg-amber-100 text-amber-900'
                        }`}
                      >
                        {doc.type === 'original' ? 'Original' : 'Photocopy'}
                      </span>
                      <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-700">
                        {doc.copies_needed}{' '}
                        {doc.copies_needed === 1 ? 'copy' : 'copies'}
                      </span>
                    </div>
                  </div>
                  {doc.note && (
                    <p className="mt-1 text-xs leading-relaxed text-gray-600">
                      {doc.note}
                    </p>
                  )}
                </div>
              </label>
            </li>
          );
        })}
      </ul>

      {/* Action Buttons: Print Checklist, Save My Checklist, Download PDF */}
      <div className="no-print mt-4 flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-xs font-semibold text-ink transition-colors hover:bg-gray-50 sm:text-sm"
        >
          <Printer className="h-4 w-4 text-brand" aria-hidden="true" />
          Print Checklist
        </button>

        <button
          type="button"
          onClick={handleSaveMyChecklist}
          className="khg-btn-sheen inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-xs font-semibold text-white hover:bg-brand-dark sm:text-sm"
        >
          <BookmarkCheck className="h-4 w-4" aria-hidden="true" />
          Save My Checklist
        </button>

        <button
          type="button"
          onClick={handleDownloadPdf}
          className="inline-flex items-center gap-2 rounded-xl border border-brand/25 bg-emerald-50 px-4 py-2.5 text-xs font-semibold text-brand transition-colors hover:bg-emerald-100 sm:text-sm"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Download PDF
        </button>

        {checkedCount > 0 && (
          <button
            type="button"
            onClick={handleReset}
            className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-ink"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Uncheck all
          </button>
        )}
      </div>

      {savedNotice && (
        <div
          role="status"
          aria-live="polite"
          className="animate-fade-up no-print mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-semibold text-brand-dark"
        >
          <span>{savedNotice}</span>
          <Link
            href={`/checklist?process=${encodeURIComponent(process.slug)}`}
            className="underline hover:text-brand"
          >
            Open in Checklist Tool →
          </Link>
        </div>
      )}
    </section>
  );
}
