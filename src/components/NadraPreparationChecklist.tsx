'use client';

import { useEffect, useState } from 'react';
import { CheckSquare, Printer, RotateCcw } from 'lucide-react';

/** Personal preparation only; the official agency decides case-specific requirements. */
export function NadraPreparationChecklist({ slug, items }: { slug: string; items: string[] }) {
  const key = `khg_nadra_preparation_v1_${slug}`;
  const [checked, setChecked] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored: unknown = JSON.parse(localStorage.getItem(key) ?? '[]');
      setChecked(Array.isArray(stored) ? stored.filter((item): item is string => typeof item === 'string' && items.includes(item)) : []);
    } catch { setChecked([]); }
    setReady(true);
  }, [key, items]);

  function update(next: string[]) {
    setChecked(next);
    try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* Available for this session even if storage is blocked. */ }
  }

  return <section aria-labelledby="preparation-checklist" className="rounded-2xl border border-emerald-200 bg-white p-6">
    <div className="flex flex-wrap items-start justify-between gap-3"><div>
      <h2 id="preparation-checklist" className="flex items-center gap-2 text-xl font-bold text-ink"><CheckSquare className="h-5 w-5 text-brand" aria-hidden="true" /> My preparation checklist</h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">Use these as reminders, not a complete or mandatory list. NADRA determines what applies to your case. Your ticks stay on this device when browser storage is available.</p>
    </div><span aria-live="polite" className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-brand">{checked.length} / {items.length} reviewed</span></div>
    <ul className="mt-4 space-y-3">{items.map((item) => <li key={item}>
      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-3 text-sm leading-relaxed text-gray-700 hover:border-brand/40">
        <input type="checkbox" checked={checked.includes(item)} disabled={!ready} onChange={event => update(event.target.checked ? [...checked, item] : checked.filter(value => value !== item))} className="mt-1 h-4 w-4 shrink-0 accent-emerald-700" />
        <span>{item}</span>
      </label>
    </li>)}</ul>
    <div className="no-print mt-4 flex flex-wrap gap-3"><button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"><Printer className="h-4 w-4" /> Print / save as PDF</button><button type="button" onClick={() => update([])} className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"><RotateCcw className="h-4 w-4" /> Clear ticks</button></div>
  </section>;
}
