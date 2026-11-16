import type { Metadata } from 'next';
import { Clock, Mail, MapPin, MessageCircle } from 'lucide-react';
import { ContactFeedbackForm } from '@/components/ContactFeedbackForm';
import { DisclaimerBox } from '@/components/DisclaimerBox';
import { PageMetaBar } from '@/components/PageMetaBar';
import { WhatsAppCta } from '@/components/WhatsAppCta';
import {
  OFFICIAL_DIRECTORY_URL,
  SITE_URL,
  WHATSAPP_URL,
} from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact KaamHoGaya.pk — WhatsApp Document Review & Corrections',
  description:
    'Contact KaamHoGaya.pk on WhatsApp for Rs. 500 personal document checking, report an updated government fee, or request a new Pakistani city guide.',
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <PageMetaBar
        breadcrumbs={[{ label: 'Contact', href: '/contact' }]}
        lastUpdated="2026-11-17T00:00:00Z"
        sourceUrl={OFFICIAL_DIRECTORY_URL}
        sourceLabel="pakistan.gov.pk"
      />

      <section className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Contact KaamHoGaya.pk
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-600 sm:text-base">
            Need help checking your documents before visiting an office, or spotted a fee
            change? Reach out via WhatsApp or the form below.
          </p>
        </div>

        {/* Highlighted WhatsApp CTA */}
        <WhatsAppCta />

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5">
            <div className="rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-brand">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-ink">WhatsApp Support</h2>
                  <p className="mt-1 text-xs leading-relaxed text-gray-600">
                    Fastest way to get your documents reviewed before your visit (Rs. 500
                    optional document check service).
                  </p>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-xs font-bold text-white hover:bg-brand-dark"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    Message on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-brand">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-ink">Editorial Corrections</h2>
                  <p className="mt-1 text-xs text-gray-600">
                    Email fee updates or official notification circulars to:
                  </p>
                  <p className="mt-1 text-sm font-bold text-brand">
                    support@kaamhogaya.pk
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm text-xs text-gray-600 space-y-2">
              <p className="flex items-center gap-2 font-semibold text-ink">
                <Clock className="h-4 w-4 text-brand" />
                Response Hours: Mon–Sat, 9:00 AM – 7:00 PM PKT
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand" />
                Independent editorial team based in Rawalpindi / Islamabad, Pakistan.
              </p>
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
