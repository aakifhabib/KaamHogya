'use client';

import { useMemo, useState } from 'react';
import { Calculator } from 'lucide-react';
import { getRichFeeSchedule } from '@/data/fee-schedules';
import { CITY_EXTRA_COST_ESTIMATES } from '@/lib/constants';
import { formatPKR } from '@/lib/format';
import type { ProcessDocument, ProcessRecord } from '@/types/database';

interface FeeCalculatorBlockProps {
  process: ProcessRecord;
  documents: ProcessDocument[];
}

const CITY_OPTIONS = Object.keys(CITY_EXTRA_COST_ESTIMATES);

export function FeeCalculatorBlock({ process, documents }: FeeCalculatorBlockProps) {
  const defaultCity = CITY_OPTIONS.includes(process.city) ? process.city : 'Rawalpindi';

  const feeOptions = useMemo(() => {
    const rich = getRichFeeSchedule(process.slug, process.fee_normal);
    if (rich && rich.calculatorOptions.length > 0) {
      return rich.calculatorOptions;
    }
    return [
      {
        id: 'normal',
        label: `Normal — ${formatPKR(process.fee_normal)}`,
        amount: process.fee_normal,
      },
      {
        id: 'urgent',
        label: `Urgent — ${formatPKR(process.fee_urgent)}`,
        amount: process.fee_urgent,
      },
      {
        id: 'executive',
        label: `Executive / Fast Track — ${formatPKR(process.fee_executive)}`,
        amount: process.fee_executive,
      },
    ];
  }, [process.slug, process.fee_normal, process.fee_urgent, process.fee_executive]);

  const [selectedOptionId, setSelectedOptionId] = useState<string>(
    () => feeOptions[0]?.id ?? 'normal'
  );
  const [selectedCity, setSelectedCity] = useState<string>(defaultCity);
  const [includePhotos, setIncludePhotos] = useState<boolean>(() =>
    documents.some((d) => d.name.toLowerCase().includes('photo'))
  );

  const activeOption = useMemo(
    () => feeOptions.find((o) => o.id === selectedOptionId) ?? feeOptions[0],
    [feeOptions, selectedOptionId]
  );

  const photocopySheetCount = useMemo(() => {
    return documents
      .filter((d) => d.type === 'photocopy')
      .reduce((acc, d) => acc + d.copies_needed, 0);
  }, [documents]);

  const calculation = useMemo(() => {
    const officialFee = activeOption?.amount ?? process.fee_normal;

    const cityRates =
      CITY_EXTRA_COST_ESTIMATES[selectedCity] ?? CITY_EXTRA_COST_ESTIMATES.Rawalpindi;

    const photocopyCost = photocopySheetCount * cityRates.photocopyPerSheet;
    const photoCost = includePhotos ? cityRates.photoSetCost : 0;
    const total = officialFee + photocopyCost + photoCost;

    return {
      officialFee,
      photocopyCost,
      photoCost,
      total,
      cityNote: cityRates.transportNote,
    };
  }, [activeOption, selectedCity, includePhotos, process.fee_normal, photocopySheetCount]);

  return (
    <section
      id="fee-calculator"
      aria-labelledby="fee-calculator-heading"
      className="no-print rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-brand">
          <Calculator className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h2
            id="fee-calculator-heading"
            className="text-xl font-bold text-ink sm:text-2xl"
          >
            Total Cost &amp; Fee Calculator
          </h2>
          <p className="mt-1 text-xs text-gray-600 sm:text-sm">
            Estimate your total pocket budget in PKR — official fee plus photocopies &amp;
            passport photos.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {/* Service Type */}
        <div>
          <label
            htmlFor="calc-tier"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-600"
          >
            Service Option / Tier
          </label>
          <select
            id="calc-tier"
            value={activeOption?.id ?? ''}
            onChange={(e) => setSelectedOptionId(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-surface px-3.5 py-2.5 text-sm font-medium text-ink focus:border-brand focus:bg-white focus:outline-none"
          >
            {feeOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* City */}
        <div>
          <label
            htmlFor="calc-city"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-600"
          >
            Your City
          </label>
          <select
            id="calc-city"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-surface px-3.5 py-2.5 text-sm font-medium text-ink focus:border-brand focus:bg-white focus:outline-none"
          >
            {CITY_OPTIONS.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      <label className="mt-4 inline-flex cursor-pointer items-center gap-2 text-xs font-medium text-gray-700">
        <input
          type="checkbox"
          checked={includePhotos}
          onChange={(e) => setIncludePhotos(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
        />
        Include passport-size studio photographs estimate (
        {formatPKR(CITY_EXTRA_COST_ESTIMATES[selectedCity]?.photoSetCost ?? 250, false)})
      </label>

      {/* Output Breakdown */}
      <div className="mt-5 rounded-2xl border border-emerald-900/15 bg-surface p-4 sm:p-5">
        <dl className="space-y-2.5 text-sm">
          <div className="flex items-center justify-between gap-4 text-gray-700">
            <dt className="truncate">Official Fee ({activeOption?.label.split('—')[0].trim()})</dt>
            <dd className="shrink-0 font-semibold text-ink">
              {formatPKR(calculation.officialFee)}
            </dd>
          </div>
          <div className="flex items-center justify-between text-gray-700">
            <dt>
              Photocopies Estimate ({photocopySheetCount}{' '}
              {photocopySheetCount === 1 ? 'sheet' : 'sheets'} in {selectedCity})
            </dt>
            <dd className="font-semibold text-ink">
              {formatPKR(calculation.photocopyCost, false)}
            </dd>
          </div>
          <div className="flex items-center justify-between text-gray-700">
            <dt>Passport Photo Estimate</dt>
            <dd className="font-semibold text-ink">
              {includePhotos
                ? formatPKR(calculation.photoCost, false)
                : 'Rs. 0 (Taken at counter / not needed)'}
            </dd>
          </div>
          <div className="flex items-center justify-between border-t border-emerald-900/15 pt-3 text-base font-extrabold text-brand-dark">
            <dt>Estimated Total Budget</dt>
            <dd className="text-xl text-brand">
              {formatPKR(calculation.total)}
            </dd>
          </div>
        </dl>
        <p className="mt-3 text-[11px] text-gray-500">
          Local note: {calculation.cityNote}. Never pay agents or touts outside offices —
          official fees are always paid at banks, PSID apps, or official counters.
        </p>
      </div>
    </section>
  );
}
