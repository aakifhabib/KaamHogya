'use client';

import { useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Plus,
  Save,
  Trash2,
} from 'lucide-react';
import { SEED_CATEGORIES, SEED_CITIES } from '@/data/seed-data';
import { sanitizeHttpUrl, sanitizeText, slugify } from '@/lib/format';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import type { ProcessWithDetails } from '@/types/database';

interface EditableDoc {
  tempId: string;
  name: string;
  type: 'original' | 'photocopy';
  copies_needed: number;
  note: string;
}

interface EditableStep {
  tempId: string;
  title: string;
  description: string;
  time_minutes: number;
}

interface EditableMistake {
  tempId: string;
  title: string;
  description: string;
}

interface EditableFaq {
  tempId: string;
  question: string;
  answer: string;
}

interface ProcessEditorFormProps {
  existing: ProcessWithDetails | null;
  onCancel: () => void;
  onSaved: (savedSlug: string) => void;
}

function makeTempId(prefix: string, idx: number): string {
  return `${prefix}-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 6)}`;
}

export function ProcessEditorForm({
  existing,
  onCancel,
  onSaved,
}: ProcessEditorFormProps) {
  const isEdit = Boolean(existing);

  // Core Process fields
  const [title, setTitle] = useState(existing?.title ?? '');
  const [urduTitle, setUrduTitle] = useState(existing?.urdu_title ?? '');
  const [slug, setSlug] = useState(existing?.slug ?? '');
  const [slugEdited, setSlugEdited] = useState(isEdit);
  const [summary, setSummary] = useState(existing?.summary ?? '');
  const [category, setCategory] = useState(
    existing?.category ?? SEED_CATEGORIES[0].name
  );
  const [city, setCity] = useState(existing?.city ?? SEED_CITIES[0].name);
  const [feeNormal, setFeeNormal] = useState(String(existing?.fee_normal ?? 0));
  const [feeUrgent, setFeeUrgent] = useState(String(existing?.fee_urgent ?? 0));
  const [feeExecutive, setFeeExecutive] = useState(
    String(existing?.fee_executive ?? 0)
  );
  const [feeNotes, setFeeNotes] = useState(existing?.fee_notes ?? '');
  const [timeRequired, setTimeRequired] = useState(
    existing?.time_required ?? '7–14 working days'
  );
  const [officeName, setOfficeName] = useState(existing?.office_name ?? '');
  const [officeAddress, setOfficeAddress] = useState(existing?.office_address ?? '');
  const [officeTimings, setOfficeTimings] = useState(
    existing?.office_timings ?? 'Mon–Fri: 8:00 AM – 3:00 PM'
  );
  const [bestDayToGo, setBestDayToGo] = useState(
    existing?.best_day_to_go ?? 'Tuesday or Wednesday before 9:00 AM'
  );
  const [officialSourceUrl, setOfficialSourceUrl] = useState(
    existing?.official_source_url ?? 'https://'
  );
  const [isVerified, setIsVerified] = useState(existing?.is_verified ?? true);
  const [isNationwide, setIsNationwide] = useState(existing?.is_nationwide ?? false);
  const [popularityRank, setPopularityRank] = useState(
    String(existing?.popularity_rank ?? 20)
  );

  // Child collections
  const [documents, setDocuments] = useState<EditableDoc[]>(() =>
    existing && existing.documents.length > 0
      ? existing.documents.map((d, i) => ({
          tempId: makeTempId('doc', i),
          name: d.name,
          type: d.type,
          copies_needed: d.copies_needed,
          note: d.note,
        }))
      : [
          {
            tempId: makeTempId('doc', 0),
            name: 'Original Valid CNIC',
            type: 'original',
            copies_needed: 1,
            note: 'Must not be expired.',
          },
        ]
  );

  const [steps, setSteps] = useState<EditableStep[]>(() =>
    existing && existing.steps.length > 0
      ? existing.steps.map((s, i) => ({
          tempId: makeTempId('step', i),
          title: s.title,
          description: s.description,
          time_minutes: s.time_minutes,
        }))
      : [
          {
            tempId: makeTempId('step', 0),
            title: 'Arrive at Office & Collect Token',
            description: 'Show original CNIC and fee receipt at the entry counter.',
            time_minutes: 15,
          },
        ]
  );

  const [mistakes, setMistakes] = useState<EditableMistake[]>(() =>
    existing && existing.mistakes.length > 0
      ? existing.mistakes.map((m, i) => ({
          tempId: makeTempId('mistake', i),
          title: m.title,
          description: m.description,
        }))
      : [
          {
            tempId: makeTempId('mistake', 0),
            title: '',
            description: '',
          },
          {
            tempId: makeTempId('mistake', 1),
            title: '',
            description: '',
          },
          {
            tempId: makeTempId('mistake', 2),
            title: '',
            description: '',
          },
        ]
  );

  const [faqs, setFaqs] = useState<EditableFaq[]>(() =>
    existing && existing.faqs.length > 0
      ? existing.faqs.map((f, i) => ({
          tempId: makeTempId('faq', i),
          question: f.question,
          answer: f.answer,
        }))
      : [
          {
            tempId: makeTempId('faq', 0),
            question: '',
            answer: '',
          },
        ]
  );

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slugEdited) {
      setSlug(slugify(val));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const cleanTitle = sanitizeText(title, 160);
    const cleanSlug = slugify(slug || cleanTitle);
    if (!cleanTitle || !cleanSlug) {
      setErrorMsg('Title and URL slug are required.');
      return;
    }
    if (!officeName.trim() || !officeAddress.trim() || !timeRequired.trim()) {
      setErrorMsg('Office Name, Office Address, and Time Required are required.');
      return;
    }

    const nFee = Math.max(0, Number.parseInt(feeNormal, 10) || 0);
    const uFee = Math.max(0, Number.parseInt(feeUrgent, 10) || 0);
    const eFee = Math.max(0, Number.parseInt(feeExecutive, 10) || 0);
    const popRank = Math.max(1, Number.parseInt(popularityRank, 10) || 50);

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setErrorMsg('Supabase client is not configured.');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        slug: cleanSlug,
        title: cleanTitle,
        urdu_title: urduTitle.trim(),
        summary: summary.trim(),
        category,
        city,
        fee_normal: nFee,
        fee_urgent: uFee,
        fee_executive: eFee,
        fee_notes: feeNotes.trim(),
        time_required: timeRequired.trim(),
        office_name: officeName.trim(),
        office_address: officeAddress.trim(),
        office_timings: officeTimings.trim(),
        best_day_to_go: bestDayToGo.trim(),
        official_source_url: sanitizeHttpUrl(officialSourceUrl),
        is_verified: isVerified,
        is_nationwide: isNationwide,
        popularity_rank: popRank,
        last_updated: new Date().toISOString(),
      };

      let processId = existing?.id;

      if (isEdit && processId) {
        const { error: updErr } = await supabase
          .from('processes')
          .update(payload)
          .eq('id', processId);
        if (updErr) throw updErr;
      } else {
        const { data: inserted, error: insErr } = await supabase
          .from('processes')
          .insert(payload)
          .select('id')
          .single();
        if (insErr) throw insErr;
        processId = inserted.id as string;
      }

      if (!processId) throw new Error('Could not resolve process ID after saving.');

      // Sync child collections cleanly (delete existing for this process, then insert ordered rows)
      if (isEdit) {
        await Promise.all([
          supabase.from('documents').delete().eq('process_id', processId),
          supabase.from('steps').delete().eq('process_id', processId),
          supabase.from('mistakes').delete().eq('process_id', processId),
          supabase.from('faqs').delete().eq('process_id', processId),
        ]);
      }

      const validDocs = documents
        .filter((d) => d.name.trim().length > 0)
        .map((d, idx) => ({
          process_id: processId,
          name: d.name.trim(),
          type: d.type,
          copies_needed: Math.min(20, Math.max(1, Number(d.copies_needed) || 1)),
          note: d.note.trim(),
          sort_order: idx + 1,
        }));

      const validSteps = steps
        .filter((s) => s.title.trim().length > 0)
        .map((s, idx) => ({
          process_id: processId,
          step_number: idx + 1,
          title: s.title.trim(),
          description: s.description.trim() || s.title.trim(),
          time_minutes: Math.min(600, Math.max(1, Number(s.time_minutes) || 10)),
        }));

      const validMistakes = mistakes
        .filter((m) => m.title.trim().length > 0)
        .map((m, idx) => ({
          process_id: processId,
          title: m.title.trim(),
          description: m.description.trim() || m.title.trim(),
          sort_order: idx + 1,
        }));

      const validFaqs = faqs
        .filter((f) => f.question.trim().length > 0 && f.answer.trim().length > 0)
        .map((f, idx) => ({
          process_id: processId,
          question: f.question.trim(),
          answer: f.answer.trim(),
          sort_order: idx + 1,
        }));

      const childOps = [];
      if (validDocs.length > 0) {
        childOps.push(supabase.from('documents').insert(validDocs));
      }
      if (validSteps.length > 0) {
        childOps.push(supabase.from('steps').insert(validSteps));
      }
      if (validMistakes.length > 0) {
        childOps.push(supabase.from('mistakes').insert(validMistakes));
      }
      if (validFaqs.length > 0) {
        childOps.push(supabase.from('faqs').insert(validFaqs));
      }

      const results = await Promise.all(childOps);
      for (const res of results) {
        if (res.error) throw res.error;
      }

      setSuccessMsg(
        `Saved "${cleanTitle}" cleanly — last_updated refreshed automatically!`
      );
      setTimeout(() => {
        onSaved(cleanSlug);
      }, 650);
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : typeof err === 'object' && err && 'message' in err
          ? String((err as { message: unknown }).message)
          : 'Failed to save process. Please check your permissions and fields.';
      setErrorMsg(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Top Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-1 rounded-xl border border-gray-300 px-3 py-2 text-xs font-semibold text-ink hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <div>
            <h2 className="text-lg font-bold text-ink">
              {isEdit ? `Edit: ${existing?.title}` : 'Add New Citizen Process'}
            </h2>
            <p className="text-xs text-gray-500">
              All changes write live to Supabase and auto-update <code>last_updated</code>.
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-brand-dark disabled:opacity-60"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {saving ? 'Saving to Supabase...' : 'Save Process'}
        </button>
      </div>

      {errorMsg && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-danger"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div
          role="status"
          className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-semibold text-brand-dark"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* 1. Core Process & Fees */}
      <section className="rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm sm:p-6">
        <h3 className="text-base font-bold text-ink">1. Process Overview, Office &amp; Fees</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">
              Process Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Passport Renewal Rawalpindi"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">
              URL Slug *
            </label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => {
                setSlugEdited(true);
                setSlug(e.target.value);
              }}
              placeholder="passport-renewal-rawalpindi"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 font-mono text-xs focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">
              Urdu Subtitle (Optional)
            </label>
            <input
              type="text"
              dir="rtl"
              value={urduTitle}
              onChange={(e) => setUrduTitle(e.target.value)}
              placeholder="پاسپورٹ کی تجدید — راولپنڈی"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 font-urdu text-sm focus:border-brand focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700">
                City *
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
              >
                {SEED_CITIES.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
              >
                {SEED_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-semibold text-gray-700">
              Short Summary
            </label>
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
            />
          </div>

          {/* Fees */}
          <div className="grid grid-cols-3 gap-3 sm:col-span-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700">
                Normal Fee (PKR) *
              </label>
              <input
                type="number"
                min={0}
                required
                value={feeNormal}
                onChange={(e) => setFeeNormal(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700">
                Urgent Fee (PKR) *
              </label>
              <input
                type="number"
                min={0}
                required
                value={feeUrgent}
                onChange={(e) => setFeeUrgent(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700">
                Executive Fee (PKR) *
              </label>
              <input
                type="number"
                min={0}
                required
                value={feeExecutive}
                onChange={(e) => setFeeExecutive(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-semibold text-gray-700">
              Fee Notes
            </label>
            <input
              type="text"
              value={feeNotes}
              onChange={(e) => setFeeNotes(e.target.value)}
              placeholder="e.g. 36 pages 5-year validity fee; 10-year fee is Rs. 6,700 Normal."
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">
              Time Required *
            </label>
            <input
              type="text"
              required
              value={timeRequired}
              onChange={(e) => setTimeRequired(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">
              Best Day To Go *
            </label>
            <input
              type="text"
              required
              value={bestDayToGo}
              onChange={(e) => setBestDayToGo(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">
              Office Name *
            </label>
            <input
              type="text"
              required
              value={officeName}
              onChange={(e) => setOfficeName(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">
              Office Timings *
            </label>
            <input
              type="text"
              required
              value={officeTimings}
              onChange={(e) => setOfficeTimings(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-semibold text-gray-700">
              Office Address *
            </label>
            <input
              type="text"
              required
              value={officeAddress}
              onChange={(e) => setOfficeAddress(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">
              Official Source URL *
            </label>
            <input
              type="url"
              required
              value={officialSourceUrl}
              onChange={(e) => setOfficialSourceUrl(e.target.value)}
              placeholder="https://dgip.gov.pk"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">
              Popularity Rank (1 = top)
            </label>
            <input
              type="number"
              min={1}
              value={popularityRank}
              onChange={(e) => setPopularityRank(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-ink">
              <input
                type="checkbox"
                checked={isVerified}
                onChange={(e) => setIsVerified(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
              />
              Mark as Verified Guide
            </label>
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-ink">
              <input
                type="checkbox"
                checked={isNationwide}
                onChange={(e) => setIsNationwide(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
              />
              Nationwide / Federal Process (Applies across Pakistan)
            </label>
          </div>
        </div>
      </section>

      {/* 2. Documents Editor */}
      <section className="rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-bold text-ink">
            2. Required Documents ({documents.length})
          </h3>
          <button
            type="button"
            onClick={() =>
              setDocuments((prev) => [
                ...prev,
                {
                  tempId: makeTempId('doc', prev.length),
                  name: '',
                  type: 'photocopy',
                  copies_needed: 1,
                  note: '',
                },
              ])
            }
            className="inline-flex items-center gap-1 rounded-xl bg-emerald-50 px-3 py-1.5 text-xs font-bold text-brand hover:bg-emerald-100"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Document
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {documents.map((doc, idx) => (
            <div
              key={doc.tempId}
              className="grid gap-3 rounded-xl border border-gray-200 bg-surface p-3.5 sm:grid-cols-12"
            >
              <div className="sm:col-span-5">
                <label className="mb-1 block text-[11px] font-semibold text-gray-600">
                  Document Name
                </label>
                <input
                  type="text"
                  value={doc.name}
                  onChange={(e) =>
                    setDocuments((prev) =>
                      prev.map((d, i) =>
                        i === idx ? { ...d, name: e.target.value } : d
                      )
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs focus:border-brand focus:outline-none"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="mb-1 block text-[11px] font-semibold text-gray-600">
                  Type
                </label>
                <select
                  value={doc.type}
                  onChange={(e) =>
                    setDocuments((prev) =>
                      prev.map((d, i) =>
                        i === idx
                          ? { ...d, type: e.target.value as 'original' | 'photocopy' }
                          : d
                      )
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs focus:border-brand focus:outline-none"
                >
                  <option value="original">Original</option>
                  <option value="photocopy">Photocopy</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1 block text-[11px] font-semibold text-gray-600">
                  Copies
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={doc.copies_needed}
                  onChange={(e) =>
                    setDocuments((prev) =>
                      prev.map((d, i) =>
                        i === idx
                          ? { ...d, copies_needed: Number(e.target.value) || 1 }
                          : d
                      )
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs focus:border-brand focus:outline-none"
                />
              </div>

              <div className="flex items-end justify-end sm:col-span-2">
                <button
                  type="button"
                  onClick={() =>
                    setDocuments((prev) => prev.filter((_, i) => i !== idx))
                  }
                  className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-danger hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Remove
                </button>
              </div>

              <div className="sm:col-span-12">
                <input
                  type="text"
                  value={doc.note}
                  onChange={(e) =>
                    setDocuments((prev) =>
                      prev.map((d, i) =>
                        i === idx ? { ...d, note: e.target.value } : d
                      )
                    )
                  }
                  placeholder="Helpful note (e.g. Front & back on one A4 page, no attestation required)"
                  className="w-full rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs focus:border-brand focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Steps Editor */}
      <section className="rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-bold text-ink">
            3. Step-by-Step Guide ({steps.length})
          </h3>
          <button
            type="button"
            onClick={() =>
              setSteps((prev) => [
                ...prev,
                {
                  tempId: makeTempId('step', prev.length),
                  title: '',
                  description: '',
                  time_minutes: 15,
                },
              ])
            }
            className="inline-flex items-center gap-1 rounded-xl bg-emerald-50 px-3 py-1.5 text-xs font-bold text-brand hover:bg-emerald-100"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Step
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {steps.map((step, idx) => (
            <div
              key={step.tempId}
              className="space-y-2 rounded-xl border border-gray-200 bg-surface p-3.5"
            >
              <div className="grid gap-3 sm:grid-cols-12">
                <div className="sm:col-span-8">
                  <label className="mb-1 block text-[11px] font-semibold text-gray-600">
                    Step {idx + 1} Title
                  </label>
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) =>
                      setSteps((prev) =>
                        prev.map((s, i) =>
                          i === idx ? { ...s, title: e.target.value } : s
                        )
                      )
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs focus:border-brand focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-[11px] font-semibold text-gray-600">
                    Minutes
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={600}
                    value={step.time_minutes}
                    onChange={(e) =>
                      setSteps((prev) =>
                        prev.map((s, i) =>
                          i === idx
                            ? { ...s, time_minutes: Number(e.target.value) || 10 }
                            : s
                        )
                      )
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs focus:border-brand focus:outline-none"
                  />
                </div>
                <div className="flex items-end justify-end sm:col-span-2">
                  <button
                    type="button"
                    onClick={() => setSteps((prev) => prev.filter((_, i) => i !== idx))}
                    className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-danger hover:bg-red-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Remove
                  </button>
                </div>
              </div>
              <textarea
                rows={2}
                value={step.description}
                onChange={(e) =>
                  setSteps((prev) =>
                    prev.map((s, i) =>
                      i === idx ? { ...s, description: e.target.value } : s
                    )
                  )
                }
                placeholder="Exact counter instructions..."
                className="w-full rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs focus:border-brand focus:outline-none"
              />
            </div>
          ))}
        </div>
      </section>

      {/* 4. Mistakes Editor */}
      <section className="rounded-2xl border border-danger/25 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-bold text-danger">
            4. 3 Mistakes That Waste Your Day ({mistakes.length})
          </h3>
          <button
            type="button"
            onClick={() =>
              setMistakes((prev) => [
                ...prev,
                { tempId: makeTempId('mistake', prev.length), title: '', description: '' },
              ])
            }
            className="inline-flex items-center gap-1 rounded-xl bg-red-50 px-3 py-1.5 text-xs font-bold text-danger hover:bg-red-100"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Mistake
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {mistakes.map((m, idx) => (
            <div
              key={m.tempId}
              className="space-y-2 rounded-xl border border-red-100 bg-red-50/40 p-3.5"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={m.title}
                  onChange={(e) =>
                    setMistakes((prev) =>
                      prev.map((item, i) =>
                        i === idx ? { ...item, title: e.target.value } : item
                      )
                    )
                  }
                  placeholder={`Mistake #${idx + 1} headline`}
                  className="flex-1 rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs focus:border-brand focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() =>
                    setMistakes((prev) => prev.filter((_, i) => i !== idx))
                  }
                  className="rounded-lg border border-red-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-danger hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <textarea
                rows={2}
                value={m.description}
                onChange={(e) =>
                  setMistakes((prev) =>
                    prev.map((item, i) =>
                      i === idx ? { ...item, description: e.target.value } : item
                    )
                  )
                }
                placeholder="Explain why this wastes the citizen's day and how to avoid it..."
                className="w-full rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs focus:border-brand focus:outline-none"
              />
            </div>
          ))}
        </div>
      </section>

      {/* 5. FAQs Editor */}
      <section className="rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-bold text-ink">
            5. Frequently Asked Questions ({faqs.length})
          </h3>
          <button
            type="button"
            onClick={() =>
              setFaqs((prev) => [
                ...prev,
                { tempId: makeTempId('faq', prev.length), question: '', answer: '' },
              ])
            }
            className="inline-flex items-center gap-1 rounded-xl bg-emerald-50 px-3 py-1.5 text-xs font-bold text-brand hover:bg-emerald-100"
          >
            <Plus className="h-3.5 w-3.5" />
            Add FAQ
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {faqs.map((f, idx) => (
            <div
              key={f.tempId}
              className="space-y-2 rounded-xl border border-gray-200 bg-surface p-3.5"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={f.question}
                  onChange={(e) =>
                    setFaqs((prev) =>
                      prev.map((item, i) =>
                        i === idx ? { ...item, question: e.target.value } : item
                      )
                    )
                  }
                  placeholder={`Question #${idx + 1}`}
                  className="flex-1 rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs focus:border-brand focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setFaqs((prev) => prev.filter((_, i) => i !== idx))}
                  className="rounded-lg border border-red-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-danger hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <textarea
                rows={2}
                value={f.answer}
                onChange={(e) =>
                  setFaqs((prev) =>
                    prev.map((item, i) =>
                      i === idx ? { ...item, answer: e.target.value } : item
                    )
                  )
                }
                placeholder="Clear, accurate citizen answer..."
                className="w-full rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs focus:border-brand focus:outline-none"
              />
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-ink hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-brand-dark disabled:opacity-60"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}
