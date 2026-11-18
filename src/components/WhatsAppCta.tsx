import Link from 'next/link';
import { ShieldCheck, ArrowRight } from 'lucide-react';

// Do not offer paid document review or collect sensitive documents without a configured service.
export function WhatsAppCta({ compact = false, className = '' }: { compact?: boolean; className?: string }) {
  return <div className={`no-print rounded-2xl bg-brand-dark text-white ${compact ? 'p-4' : 'p-5 sm:p-6'} ${className}`}>
    <div className="flex items-start gap-3"><ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-accent-yellow" aria-hidden="true" /><div>
      <h3 className="text-base font-bold">Check official requirements before you apply</h3>
      <p className="mt-1 text-sm text-emerald-100">For NADRA identity services, review the official sources or contact NADRA at 1777. Never share your CNIC, OTP or payment information with an unverified contact.</p>
      <Link href="/nadra" className="mt-3 inline-flex items-center gap-2 rounded-xl bg-accent-yellow px-4 py-2 text-sm font-bold text-brand-dark">Explore NADRA guides <ArrowRight className="h-4 w-4" /></Link>
    </div></div>
  </div>;
}
