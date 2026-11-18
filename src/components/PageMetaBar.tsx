import Link from 'next/link';
import { Calendar, ChevronRight, ExternalLink, Home } from 'lucide-react';
import { OFFICIAL_DIRECTORY_URL, SITE_URL } from '@/lib/constants';
import { formatDate, formatDomain, sanitizeHttpUrl } from '@/lib/format';
import { serializeJsonLd } from '@/lib/json-ld';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageMetaBarProps {
  breadcrumbs: BreadcrumbItem[];
  lastUpdated: string;
  sourceUrl?: string;
  sourceLabel?: string;
}

/**
 * Reusable metadata bar rendered on EVERY page so every route consistently
 * provides Breadcrumbs (with BreadcrumbList JSON-LD), Last Updated date, and
 * Official Source link.
 */
export function PageMetaBar({
  breadcrumbs,
  lastUpdated,
  sourceUrl = OFFICIAL_DIRECTORY_URL,
  sourceLabel,
}: PageMetaBarProps) {
  const safeSource = sanitizeHttpUrl(sourceUrl);
  const displaySource = sourceLabel || formatDomain(safeSource);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      ...breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: crumb.label,
        ...(crumb.href ? { item: `${SITE_URL}${crumb.href}` } : {}),
      })),
    ],
  };

  return (
    <div className="no-print border-b border-emerald-900/10 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2.5 text-xs sm:px-6">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-gray-600">
          <Link
            href="/"
            className="inline-flex items-center gap-1 font-medium text-gray-600 hover:text-brand"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <span key={`${crumb.label}-${idx}`} className="inline-flex items-center gap-1">
                <ChevronRight className="h-3.5 w-3.5 text-gray-400" aria-hidden="true" />
                {crumb.href && !isLast ? (
                  <Link href={crumb.href} className="font-medium hover:text-brand">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-semibold text-ink" aria-current="page">
                    {crumb.label}
                  </span>
                )}
              </span>
            );
          })}
        </nav>

        {/* Last Updated + Official Source */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-600">
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
            <span>
              Last updated:{' '}
              <strong className="font-semibold text-ink">{formatDate(lastUpdated)}</strong>
            </span>
          </span>
          <a
            href={safeSource}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-brand underline decoration-brand/40 underline-offset-2 hover:text-brand-dark"
          >
            <span>Source: {displaySource}</span>
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
