import type { Metadata } from 'next';
import {
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  ShieldAlert,
} from 'lucide-react';
import { ContactFeedbackForm } from '@/components/ContactFeedbackForm';
import { DisclaimerBox } from '@/components/DisclaimerBox';
import { PageMetaBar } from '@/components/PageMetaBar';
import { OFFICIAL_DIRECTORY_URL, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact Us — KaamHoGaya.pk',
  description:
    'Contact KaamHoGaya.pk at hello@kaamhogya.pk to report a wrong fee, submit a city correction, ask about the document check service, request data deletion, or report a scam.',
  alternates: { canonical: `${SITE_URL}/contact` },
};

const CONTACT_USE_CASES = [
  'Report a wrong fee or outdated guide',
  'Submit a correction for your city',
  'Ask about a guide',
  'Request data deletion',
  'Report a scam using our name',
];

export default function ContactPage() {
  return (
    <>
      <PageMetaBar
        breadcrumbs={[{ label: 'Contact Us', href: '/contact' }]}
        lastUpdated="2026-11-17T00:00:00Z"
        sourceUrl={OFFICIAL_DIRECTORY_URL}
        sourceLabel="pakistan.gov.pk"
      />

      <section className="mx-auto max-w-5xl space-y-6 px-4 py-10 sm:px-6">
        <header>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Contact Us
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-600 sm:text-base">
            Responses depend on mailbox availability.
          </p>
        </header>

        {/* Security Warning Banner */}
        <div
          role="alert"
          className="rounded-2xl border-2 border-red-200 bg-red-50/80 p-4 sm:p-5"
        >
          <div className="flex items-start gap-3">
            <ShieldAlert
              className="mt-0.5 h-5 w-5 shrink-0 text-red-700"
              aria-hidden="true"
            />
            <p className="text-sm leading-relaxed text-red-950">
              <strong>Do not send us:</strong> Your CNIC number, passport number, OTP,
              bank PIN, or password. We will never ask for these.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5">
            {/* Direct Contact Details */}
            <div className="space-y-4 rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-brand">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Email
                  </h2>
                  <a
                    href="mailto:hello@kaamhogya.pk"
                    className="mt-0.5 block text-sm font-bold text-brand hover:underline"
                  >
                    hello@kaamhogya.pk
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-gray-100 pt-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-brand">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Location
                  </h2>
                  <p className="mt-0.5 text-sm font-semibold text-ink">
                    Rawalpindi, Punjab, Pakistan
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-gray-100 pt-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-brand">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    WhatsApp
                  </h2>
                  <p className="mt-0.5 text-sm text-gray-700">
                    Available after launch, link will be here
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 border-t border-gray-100 pt-4 text-xs font-semibold text-ink">
                <Clock className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                <span>Responses depend on mailbox availability.</span>
              </div>
            </div>

            {/* Use this page for */}
            <div className="rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm">
              <h2 className="text-base font-bold text-ink">Use this page for:</h2>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                {CONTACT_USE_CASES.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactFeedbackForm />
          </div>
        </div>

        <DisclaimerBox />
      </section>
    </>
  );
}
