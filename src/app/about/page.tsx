import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { DisclaimerBox } from '@/components/DisclaimerBox';
import { PageMetaBar } from '@/components/PageMetaBar';
import { WhatsAppCta } from '@/components/WhatsAppCta';
import { OFFICIAL_DIRECTORY_URL, SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About KaamHoGaya.pk — Pakistan’s Citizen Process Library',
  description:
    'Learn how KaamHoGaya.pk helps Pakistani citizens prepare documents, check official PKR fees, and avoid wasted office trips across Rawalpindi, Islamabad, Lahore, Karachi, and beyond.',
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutPage() {
  return (
    <>
      <PageMetaBar
        breadcrumbs={[{ label: 'About', href: '/about' }]}
        lastUpdated="2026-11-17T00:00:00Z"
        sourceUrl={OFFICIAL_DIRECTORY_URL}
        sourceLabel="pakistan.gov.pk"
      />

      <article className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6">
        <header className="rounded-2xl border border-emerald-950/10 bg-white p-6 shadow-sm sm:p-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-brand">
            <ShieldCheck className="h-3.5 w-3.5" />
            Independent Civic Initiative
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            About {SITE_NAME}
          </h1>
          <p className="mt-2 font-urdu text-base text-brand" dir="rtl">
            ہر سرکاری کام، قدم بہ قدم آسان رہنمائی
          </p>
          <p className="mt-4 text-sm leading-relaxed text-gray-700 sm:text-base">
            Every day across Pakistan, thousands of citizens take leave from work, pay
            careem or petrol fares, wait in long queues at Passport Offices, NADRA Mega
            Centers, Traffic Licensing Branches, or Union Councils — only to be told at
            the counter: <em>&ldquo;Yeh copy missing hai, kal dobara aayein.&rdquo;</em>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-gray-700 sm:text-base">
            We built <strong>{SITE_NAME}</strong> to end that frustration. We turn
            scattered official circulars, fee schedules, and real citizen experiences
            into clear, mobile-first, step-by-step checklists written in plain English
            with familiar Urdu terms.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: ClipboardCheck,
              title: 'Exact Fees & Documents',
              desc: 'We break down Normal, Urgent, and Executive official PKR fees and mark every document clearly as Original vs Photocopy with exact counts.',
            },
            {
              icon: Clock,
              title: 'Crowdsourced Wait Times',
              desc: 'Real citizens share how long they waited at GT Road RPO, Saddar NADRA Mega Center, or Police Khidmat Markaz so you pick the right day and hour.',
            },
            {
              icon: CheckCircle2,
              title: 'Direct Official Sources',
              desc: 'Every single guide links straight to the relevant .gov.pk portal (DGIP, NADRA, FBR IRIS, Punjab DLIMS, PSCA) so you can always double-check.',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-brand">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-3 text-base font-bold text-ink">{item.title}</h2>
                <p className="mt-1.5 text-xs leading-relaxed text-gray-600">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </section>

        <section className="rounded-2xl border border-emerald-950/10 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-ink">How We Verify Our Guides</h2>
          <ol className="mt-4 space-y-3 text-sm leading-relaxed text-gray-700">
            <li>
              <strong>1. Official Portal Cross-Check:</strong> Fee schedules,
              document requirements and office addresses should be confirmed against current official
              government announcements (DGIP, NADRA, FBR, Punjab PITB/DLIMS/PKM).
            </li>
            <li>
              <strong>2. Citizen Feedback Moderation:</strong> Submitted wait times and
              office tips go through quick human moderation before publication to filter
              spam and outdated reports.
            </li>
            <li>
              <strong>3. Visible Last Updated Stamps:</strong> Every edit automatically
              refreshes the guide’s <em>Last Updated</em> date so you know how fresh the
              data is.
            </li>
          </ol>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/processes"
              className="inline-flex items-center gap-1.5 rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-dark"
            >
              Browse All Guides
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-ink hover:bg-gray-50"
            >
              Suggest a Guide or Correction
            </Link>
          </div>
        </section>

        <WhatsAppCta />
        <DisclaimerBox />
      </article>
    </>
  );
}
