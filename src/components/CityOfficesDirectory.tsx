'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Calendar,
  ExternalLink,
  Landmark,
  MapPin,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import {
  ALL_CITY_DIRECTORIES,
  OFFICIAL_HELPLINES,
  type CityOfficialDirectory,
} from '@/data/city-offices';

interface CityOfficialOfficesSectionProps {
  directory: CityOfficialDirectory;
}

/**
 * Full official NADRA & FBR directory card pair rendered on every /city/[slug] page.
 */
export function CityOfficialOfficesSection({
  directory,
}: CityOfficialOfficesSectionProps) {
  return (
    <section
      aria-labelledby="official-offices-heading"
      className="rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm sm:p-7"
    >
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-gray-100 pb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-brand">
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Local Office Listings · NADRA &amp; FBR
          </span>
          <h2
            id="official-offices-heading"
            className="mt-2 text-xl font-bold text-ink sm:text-2xl"
          >
            NADRA &amp; FBR Office Listings in {directory.cityName}
          </h2>
          <p className="mt-1 text-xs text-gray-600 sm:text-sm">
            These listings are leads, not a live official directory. Confirm address, hours, and service availability with the relevant agency before travelling.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-6 lg:grid-cols-2">
        {/* NADRA Card */}
        <div className="flex flex-col rounded-2xl border border-emerald-950/10 bg-surface/60 p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white shadow-sm">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-base font-bold text-ink sm:text-lg">
                  NADRA Centers in {directory.cityName}
                </h3>
                <p className="text-xs font-medium text-brand">
                  CNIC · Smart NIC · CRC / B-Form · FRC
                </p>
              </div>
            </div>
            <a
              href={OFFICIAL_HELPLINES.nadra.feeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-brand/20 bg-white px-2.5 py-1 text-[11px] font-bold text-brand hover:bg-emerald-50"
            >
              nadra.gov.pk
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-gray-700">
            Confirm these listed centres, their hours, and the service you need with NADRA at 1777 before visiting.
          </p>

          <ul className="mt-4 space-y-3">
            {directory.nadraCenters.map((center) => (
              <li
                key={center.name}
                className="khg-card-lift rounded-xl border border-emerald-950/10 bg-white p-3.5"
              >
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-sm font-bold text-ink">{center.name}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      center.badge === 'Mega Center' || center.badge === 'Big NRC'
                        ? 'bg-emerald-100 text-brand-dark'
                        : center.badge === 'Executive Centre'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {center.badge}
                  </span>

                </div>

                <p className="mt-1.5 flex items-start gap-1.5 text-xs text-gray-700">
                  <MapPin
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  <span>{center.address}</span>
                </p>

                <p className="mt-1 text-[11px] text-gray-500">Address and hours should be confirmed with NADRA.</p>
              </li>
            ))}
          </ul>

          <div className="mt-4 rounded-xl border border-brand/15 bg-emerald-50/70 p-3 text-xs text-brand-dark">
            <p className="font-bold">
              Official NADRA 24/7 Helpline: {OFFICIAL_HELPLINES.nadra.mobile} (Mobile) ·{' '}
              {OFFICIAL_HELPLINES.nadra.landline}
            </p>
            <p className="mt-0.5 text-[11px] text-emerald-900/80">
              Confirm fees and processing times with NADRA. Its published Smart NIC timeline tables differ; PakID availability depends on your case.
            </p>
          </div>

          <div className="mt-4 pt-1">
            <Link
              href={`/process/${directory.cnicGuideSlug}`}
              className="khg-btn-sheen group inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-brand px-4 py-2.5 text-xs font-bold text-white hover:bg-brand-dark sm:text-sm"
            >
              Open {directory.cityName} CNIC Renewal Guide
              <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-spring group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* FBR Card */}
        <div className="flex flex-col rounded-2xl border border-emerald-950/10 bg-surface/60 p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink text-white shadow-sm">
                <Landmark className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-base font-bold text-ink sm:text-lg">
                  FBR Regional Tax Office in {directory.cityName}
                </h3>
                <p className="text-xs font-medium text-brand">
                  Free Individual NTN · IRIS Form 181 · ATL Facilitation
                </p>
              </div>
            </div>
            <a
              href={OFFICIAL_HELPLINES.fbr.irisUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-brand/20 bg-white px-2.5 py-1 text-[11px] font-bold text-brand hover:bg-emerald-50"
            >
              iris.fbr.gov.pk
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-gray-700">
            {directory.fbrOverview}
          </p>

          <ul className="mt-4 space-y-3">
            {directory.fbrOffices.map((office) => (
              <li
                key={office.name}
                className="khg-card-lift rounded-xl border border-emerald-950/10 bg-white p-4"
              >
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-sm font-bold text-ink">{office.name}</span>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-brand-dark">
                    {office.badge}
                  </span>
                </div>

                <p className="mt-2 flex items-start gap-1.5 text-xs text-gray-700">
                  <MapPin
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  <span>{office.address}</span>
                </p>

                <p className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-ink">
                  <Phone className="h-3.5 w-3.5 shrink-0 text-brand" aria-hidden="true" />
                  <span>
                    RTO: {office.phone}
                    {office.tfcPhone ? ` · Facilitation Desk (TFC): ${office.tfcPhone}` : ''}
                  </span>
                </p>

                <p className="mt-1.5 flex items-center gap-1.5 text-[11px] font-medium text-gray-600">
                  <Calendar className="h-3 w-3 shrink-0 text-gray-500" aria-hidden="true" />
                  <span>{office.timings}</span>
                </p>

                {office.notes && (
                  <p className="mt-2 text-xs leading-relaxed text-gray-600">
                    {office.notes}
                  </p>
                )}
              </li>
            ))}
          </ul>

          {/* Online IRIS fast-track card */}
          <div className="mt-3 rounded-xl border border-emerald-950/10 bg-white p-3.5">
            <p className="text-xs font-bold text-ink">
              Online Alternative (All Pakistani Individuals — Rs. 0 Free)
            </p>
            <p className="mt-1 text-xs leading-relaxed text-gray-600">
              Skip the office line: register directly on{' '}
              <a
                href={OFFICIAL_HELPLINES.fbr.irisUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-brand underline"
              >
                iris.fbr.gov.pk
              </a>{' '}
              using your CNIC, own-CNIC mobile SIM, personal email, and bank account
              maintenance certificate PDF. Your 13-digit CNIC becomes your NTN via Form 181.
            </p>
          </div>

          <div className="mt-auto pt-4">
            <div className="mb-4 rounded-xl border border-brand/15 bg-emerald-50/70 p-3 text-xs text-brand-dark">
              <p className="font-bold">
                FBR National Helpline: {OFFICIAL_HELPLINES.fbr.phone} · Female Line:{' '}
                {OFFICIAL_HELPLINES.fbr.femaleLine}
              </p>
              <p className="mt-0.5 text-[11px] text-emerald-900/80">
                {OFFICIAL_HELPLINES.fbr.hours} · {OFFICIAL_HELPLINES.fbr.email} · Freelancer
                IT Exports (Sec. 154A): 1% final tax (0.25% with PSEB).
              </p>
            </div>

            <Link
              href={`/process/${directory.fbrGuideSlug}`}
              className="khg-btn-sheen group inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-ink px-4 py-2.5 text-xs font-bold text-white hover:bg-brand-dark sm:text-sm"
            >
              Open {directory.cityName} FBR NTN Guide
              <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-spring group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

interface AllCitiesOfficeSwitcherProps {
  agency: 'nadra' | 'fbr';
  currentCityName: string;
  currentProcessSlug: string;
}

/**
 * Interactive 8-city switcher embedded on NADRA (Identity / Family) and FBR (Tax) guides
 * so any citizen in Pakistan can inspect their local city's official Mega Center or RTO.
 */
export function AllCitiesOfficeSwitcher({
  agency,
  currentCityName,
  currentProcessSlug,
}: AllCitiesOfficeSwitcherProps) {
  const initialSlug =
    ALL_CITY_DIRECTORIES.find(
      (d) => d.cityName.toLowerCase() === currentCityName.toLowerCase()
    )?.citySlug ?? 'rawalpindi';

  const [selectedSlug, setSelectedSlug] = useState(initialSlug);

  const selected =
    ALL_CITY_DIRECTORIES.find((d) => d.citySlug === selectedSlug) ??
    ALL_CITY_DIRECTORIES[0];

  const targetGuideSlug =
    agency === 'nadra' ? selected.cnicGuideSlug : selected.fbrGuideSlug;

  return (
    <section
      id="all-cities-offices"
      aria-labelledby="all-cities-offices-heading"
      className="no-print rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-brand">
            <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
            All 8 Major Pakistani Cities Covered
          </span>
          <h2
            id="all-cities-offices-heading"
            className="mt-1.5 text-lg font-bold text-ink sm:text-xl"
          >
            {agency === 'nadra'
              ? 'Official NADRA Centers Across Pakistan'
              : 'Official FBR Regional Tax Offices (RTOs) Across Pakistan'}
          </h2>
          <p className="mt-0.5 text-xs text-gray-600 sm:text-sm">
            Select a city to view listed{' '}
            {agency === 'nadra'
              ? 'NADRA centres (confirm address, hours and services with NADRA)'
              : 'FBR Regional Tax Office addresses, phones & facilitation counters'}
            .
          </p>
        </div>
      </div>

      {/* City Selector Pills */}
      <div
        className="mt-4 flex flex-wrap gap-1.5"
        role="tablist"
        aria-label="Select Pakistani city"
      >
        {ALL_CITY_DIRECTORIES.map((dir) => {
          const isActive = dir.citySlug === selected.citySlug;
          return (
            <button
              key={dir.citySlug}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedSlug(dir.citySlug)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all duration-200 ease-spring active:scale-95 ${
                isActive
                  ? 'bg-brand text-white shadow-sm ring-2 ring-brand/20'
                  : 'border border-gray-200 bg-surface text-gray-700 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-white hover:text-brand'
              }`}
            >
              {dir.cityName}
            </button>
          );
        })}
      </div>

      {/* Selected City Office List */}
      <div
        key={selected.citySlug}
        className="animate-tab-in mt-4 rounded-xl border border-emerald-950/10 bg-surface/60 p-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-ink sm:text-base">
              {selected.cityName} ({selected.province})
            </h3>
            <p className="mt-0.5 text-xs text-gray-600">
              {agency === 'nadra' ? 'Confirm each listed address, hours and service availability with NADRA at 1777 before visiting.' : selected.fbrOverview}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {targetGuideSlug !== currentProcessSlug && (
              <Link
                href={`/process/${targetGuideSlug}`}
                className="inline-flex items-center gap-1 rounded-lg bg-brand px-3 py-1.5 text-xs font-bold text-white hover:bg-brand-dark"
              >
                {selected.cityName} Guide
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            )}
            <Link
              href={`/city/${selected.citySlug}`}
              className="inline-flex items-center gap-1 rounded-lg border border-brand/25 bg-white px-3 py-1.5 text-xs font-bold text-brand hover:bg-emerald-50"
            >
              All {selected.cityName} Offices →
            </Link>
          </div>
        </div>

        {agency === 'nadra' ? (
          <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {selected.nadraCenters.map((c) => (
              <li
                key={c.name}
                className="rounded-lg border border-emerald-950/10 bg-white p-3"
              >
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-bold text-ink">{c.name}</span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-brand">
                    {c.badge}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-700">{c.address}</p>
                <p className="mt-1 text-[11px] text-gray-500">Confirm with NADRA before visiting.</p>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mt-3 space-y-2.5">
            {selected.fbrOffices.map((o) => (
              <li
                key={o.name}
                className="rounded-lg border border-emerald-950/10 bg-white p-3.5"
              >
                <p className="text-xs font-bold text-ink sm:text-sm">{o.name}</p>
                <p className="mt-1 flex items-start gap-1.5 text-xs text-gray-700">
                  <MapPin
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  <span>{o.address}</span>
                </p>
                <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-brand">
                  <span>Tel: {o.phone}</span>
                  {o.tfcPhone && <span>TFC: {o.tfcPhone}</span>}
                  <span className="font-normal text-gray-600">{o.timings}</span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
