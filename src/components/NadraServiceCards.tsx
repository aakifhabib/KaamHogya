import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { NADRA_SERVICES } from '@/data/nadra-services';

export function NadraServiceCards({ citySlug }: { citySlug?: string }) {
  const groups = Array.from(new Set(NADRA_SERVICES.map((service) => service.category)));
  return (
    <div className="space-y-7">
      {groups.map((group) => (
        <div key={group}>
          <h3 className="mb-3 text-lg font-bold text-ink">{group}</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {NADRA_SERVICES.filter((service) => service.category === group).map((service) => (
              <Link key={service.slug} href={`/nadra/${service.slug}${citySlug ? `?city=${encodeURIComponent(citySlug)}` : ''}`} className="khg-card-lift group flex flex-col rounded-xl border border-emerald-950/10 bg-white p-4 shadow-sm">
                <span className="font-bold text-ink group-hover:text-brand">{service.title}</span>
                <span className="mt-1 flex-1 text-sm leading-relaxed text-gray-600">{service.summary}</span>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand">Read guide <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
