import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  Calendar,
  Clock,
  FileText,
  Hourglass,
  MapPin,
} from 'lucide-react';
import {
  formatDate,
  formatPKR,
  formatWaitMinutes,
  getWaitTimeBadgeColor,
} from '@/lib/format';
import type { ProcessSummaryCard } from '@/types/database';

interface ProcessCardProps {
  process: ProcessSummaryCard;
}

export function ProcessCard({ process }: ProcessCardProps) {
  const waitBadge = getWaitTimeBadgeColor(process.avg_wait_minutes);

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md">
      {/* Top badges */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-brand">
            <MapPin className="h-3 w-3" aria-hidden="true" />
            {process.city}
          </span>
          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
            {process.category}
          </span>
        </div>
        {process.is_verified && (
          <span
            className="inline-flex items-center gap-1 rounded-full bg-emerald-100/80 px-2 py-0.5 text-[11px] font-semibold text-brand-dark"
            title="Verified against official portal"
          >
            <BadgeCheck className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
            Verified
          </span>
        )}
      </div>

      {/* Title & Urdu subtitle */}
      <div className="mt-3">
        <h3 className="text-lg font-bold leading-snug text-ink transition-colors group-hover:text-brand">
          <Link href={`/process/${process.slug}`} className="focus:outline-none">
            {process.title}
          </Link>
        </h3>
        {process.urdu_title && (
          <p className="mt-1 font-urdu text-xs leading-loose text-gray-500" dir="rtl">
            {process.urdu_title}
          </p>
        )}
      </div>

      {/* Key metrics grid */}
      <dl className="mt-4 grid grid-cols-2 gap-2.5 rounded-xl bg-surface p-3 text-xs">
        <div>
          <dt className="text-gray-500">
            {process.slug === 'e-challan-check-and-payment'
              ? 'Typical Fine'
              : 'Official Fee'}
          </dt>
          <dd className="mt-0.5 font-bold text-ink">
            {process.slug === 'e-challan-check-and-payment' &&
            process.fee_normal === 2000 &&
            process.fee_executive === 10000
              ? 'PKR 2,000 – 10,000'
              : formatPKR(process.fee_normal)}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500">Time Needed</dt>
          <dd className="mt-0.5 flex items-center gap-1 font-semibold text-ink">
            <Hourglass className="h-3.5 w-3.5 shrink-0 text-brand" aria-hidden="true" />
            <span className="truncate">{process.time_required}</span>
          </dd>
        </div>
        <div>
          <dt className="text-gray-500">Documents</dt>
          <dd className="mt-0.5 flex items-center gap-1 font-semibold text-ink">
            <FileText className="h-3.5 w-3.5 shrink-0 text-brand" aria-hidden="true" />
            <span>{process.documents_count} required</span>
          </dd>
        </div>
        <div>
          <dt className="text-gray-500">Avg Wait Time</dt>
          <dd className="mt-0.5 flex items-center gap-1">
            <span
              className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-semibold ${waitBadge.bg} ${waitBadge.text}`}
            >
              <Clock className="h-3 w-3 shrink-0" aria-hidden="true" />
              {formatWaitMinutes(process.avg_wait_minutes)}
            </span>
          </dd>
        </div>
      </dl>

      {/* Bottom meta & CTA */}
      <div className="mt-auto flex items-center justify-between gap-2 border-t border-gray-100 pt-4 text-xs">
        <span className="inline-flex items-center gap-1 text-gray-500">
          <Calendar className="h-3.5 w-3.5 text-gray-400" aria-hidden="true" />
          Updated {formatDate(process.last_updated)}
        </span>
        <Link
          href={`/process/${process.slug}`}
          className="inline-flex items-center gap-1 font-bold text-brand hover:text-brand-dark"
        >
          View Guide
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
