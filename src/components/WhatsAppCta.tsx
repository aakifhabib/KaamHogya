import { ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';
import { WHATSAPP_CTA_TEXT, WHATSAPP_URL } from '@/lib/constants';

interface WhatsAppCtaProps {
  compact?: boolean;
  className?: string;
}

export function WhatsAppCta({ compact = false, className = '' }: WhatsAppCtaProps) {
  return (
    <div
      className={`no-print group relative overflow-hidden rounded-2xl border border-emerald-900/15 bg-gradient-to-br from-brand via-brand to-brand-dark text-white shadow-sm transition-shadow duration-300 ease-spring hover:shadow-card-hover ${
        compact ? 'p-4' : 'p-5 sm:p-6'
      } ${className}`}
    >
      {/* Ambient soft gold glow corner */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-accent-yellow/15 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="relative flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-yellow text-brand-dark shadow-sm transition-transform duration-300 ease-pop group-hover:scale-105 group-hover:-rotate-3">
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-accent-yellow">
            Personal Document Review
          </p>
          <h3 className="mt-0.5 text-base font-bold leading-snug text-white">
            {WHATSAPP_CTA_TEXT}
          </h3>
          {!compact && (
            <p className="mt-1.5 text-xs leading-relaxed text-emerald-100">
              Send photos of your file before leaving home — our independent document
              assistants check missing papers, attestation rules, and challan steps in 15
              minutes.
            </p>
          )}
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="khg-btn-sheen inline-flex items-center gap-2 rounded-xl bg-accent-yellow px-4 py-2.5 text-xs font-bold text-brand-dark shadow-sm hover:bg-amber-400 sm:text-sm"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>Chat on WhatsApp (Rs. 500)</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-spring group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-200">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Independent advisory service
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
