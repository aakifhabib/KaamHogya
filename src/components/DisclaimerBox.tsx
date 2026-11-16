import Link from 'next/link';
import { ExternalLink, Info } from 'lucide-react';
import {
  DISCLAIMER_SHORT,
  FEE_CHECK_DISCLAIMER,
  OFFICIAL_DIRECTORY_URL,
} from '@/lib/constants';
import { sanitizeHttpUrl } from '@/lib/format';

interface DisclaimerBoxProps {
  officialSourceUrl?: string;
  compact?: boolean;
}

export function DisclaimerBox({
  officialSourceUrl,
  compact = false,
}: DisclaimerBoxProps) {
  const safeUrl = sanitizeHttpUrl(officialSourceUrl || OFFICIAL_DIRECTORY_URL);
  return (
    <aside
      aria-label="Fee schedule and non-government disclaimer"
      className={`rounded-xl border border-amber-300/80 bg-amber-50/70 ${
        compact ? 'p-4' : 'p-5 sm:p-6'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-yellow/25 text-amber-900">
          <Info className="h-4 w-4" aria-hidden="true" />
        </div>
        <div className="space-y-1.5 text-xs leading-relaxed text-amber-950 sm:text-sm">
          <h3 className="font-bold text-ink">
            Important Notice: Fee Verification &amp; Non-Government Disclaimer
          </h3>
          <p className="font-semibold text-ink">{FEE_CHECK_DISCLAIMER}</p>
          <p>{DISCLAIMER_SHORT}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs font-semibold">
            <a
              href={safeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-brand hover:underline"
            >
              Verify on Official Government Portal
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <Link href="/disclaimer" className="text-amber-900 hover:underline">
              Read Full Disclaimer
            </Link>
            <Link href="/contact" className="text-amber-900 hover:underline">
              Report an Outdated Fee
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
