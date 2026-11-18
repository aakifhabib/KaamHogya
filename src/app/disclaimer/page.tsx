import type { Metadata } from 'next';
import { ExternalLink, ShieldAlert } from 'lucide-react';
import { PageMetaBar } from '@/components/PageMetaBar';
import {
  FEE_CHECK_DISCLAIMER,
  OFFICIAL_DIRECTORY_URL,
  SITE_NAME,
  SITE_URL,
} from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Disclaimer — Independent Information Website (Not a Government Website)',
  description:
    'Legal disclaimer for KaamHoGaya.pk: independent citizen information guide not affiliated with NADRA, DGIP, FBR, Punjab Police, or e-Khidmat Markaz.',
  alternates: { canonical: `${SITE_URL}/disclaimer` },
};

const OFFICIAL_PORTALS = [
  { name: 'Government of Pakistan Portal', url: 'https://pakistan.gov.pk' },
  { name: 'NADRA (Identity, CNIC, B-Form, FRC)', url: 'https://www.nadra.gov.pk' },
  {
    name: 'DGIP (Directorate General of Immigration & Passports)',
    url: 'https://dgip.gov.pk',
  },
  { name: 'FBR IRIS (Tax & NTN Registration)', url: 'https://iris.fbr.gov.pk' },
  { name: 'Punjab DLIMS (Driving Licences)', url: 'https://dlims.punjab.gov.pk' },
  { name: 'Punjab e-Khidmat Markaz', url: 'https://ekhidmat.punjab.gov.pk' },
  { name: 'Punjab Police Khidmat Markaz', url: 'https://pkm.punjab.gov.pk' },
  { name: 'PSCA E-Challan Portal', url: 'https://echallan.psca.gop.pk' },
];

export default function DisclaimerPage() {
  return (
    <>
      <PageMetaBar
        breadcrumbs={[{ label: 'Disclaimer', href: '/disclaimer' }]}
        lastUpdated="2026-11-17T00:00:00Z"
        sourceUrl={OFFICIAL_DIRECTORY_URL}
        sourceLabel="pakistan.gov.pk"
      />

      <article className="mx-auto max-w-4xl space-y-6 px-4 py-10 sm:px-6">
        <header className="rounded-2xl border-2 border-amber-300 bg-amber-50/80 p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-yellow text-brand-dark">
              <ShieldAlert className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="space-y-3">
              <div>
                <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
                  Disclaimer
                </h1>
                <p className="mt-1 text-xs font-medium text-amber-900 sm:text-sm">
                  <strong>Last Updated:</strong> 17 November 2026
                </p>
              </div>

              <p className="rounded-xl bg-white/95 px-4 py-3 text-sm font-bold leading-relaxed text-ink shadow-sm ring-1 ring-amber-300/80">
                {FEE_CHECK_DISCLAIMER}
              </p>

              <p className="text-sm font-semibold leading-relaxed text-amber-950 sm:text-base">
                {SITE_NAME} is an independent, privately run information website. It is{' '}
                <strong>NOT</strong> an official government website.
              </p>

              <p className="text-sm leading-relaxed text-amber-950">
                We are not affiliated with, endorsed by, or connected to NADRA,
                Directorate General of Immigration and Passports, Federal Board of
                Revenue, Punjab Police, e-Khidmat Markaz, or any other government
                department.
              </p>
            </div>
          </div>
        </header>

        <section className="space-y-6 rounded-2xl border border-emerald-950/10 bg-white p-6 text-sm leading-relaxed text-gray-700 shadow-sm sm:p-8">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-ink">1. Not legal or official advice</h2>
            <p>
              All guides are general information, not legal advice, not tax advice, and
              not official instructions. Government rules change often. Fees in our
              guides are based on public schedules checked on the date shown on each
              guide. Always verify the current fee, documents, and office timing on the
              official government website or by calling the office before you go.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-ink">2. Fees and processing times</h2>
            <p>
              Fees and processing times shown are estimates based on public information
              and user reports. The actual fee you pay may be different due to service
              charges, courier charges, late fines, or new notifications. We are not
              responsible if the fee at the counter is different from the fee on our
              site.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-ink">3. Wait times</h2>
            <p>
              Wait times are submitted by users and are averages, not guarantees. Your
              wait time may be longer or shorter depending on day, crowd, system
              downtime, or load shedding.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-ink">4. No guarantee of approval</h2>
            <p>
              Following our guide does not guarantee that your passport, CNIC, licence,
              domicile, or other application will be approved. Approval is decided
              solely by the relevant government office.
            </p>
          </div>

          <div className="rounded-xl border border-red-200 bg-red-50/70 p-4 sm:p-5">
            <h2 className="text-base font-bold text-red-950">
              5. No collection of sensitive data
            </h2>
            <p className="mt-1.5 text-red-950">
              We will never ask you for your CNIC number, passport number, bank OTP, or
              password. If someone contacts you claiming to be from KaamHoGaya.pk and
              asks for these, do not share them. It is a scam.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-ink">6. Use at your own risk</h2>
            <p>
              You use the information on this site at your own risk. KaamHoGaya.pk is
              not liable for any loss, cost, or delay caused by using our guides.
            </p>
          </div>

          <div className="border-t border-gray-100 pt-5">
            <h2 className="text-base font-bold text-ink">
              Official Government Portals Directory
            </h2>
            <p className="mt-1 text-xs text-gray-600">
              Always verify current statutory fees and rules directly on the official
              portal before paying:
            </p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {OFFICIAL_PORTALS.map((portal) => (
                <li key={portal.url}>
                  <a
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl border border-gray-200 bg-surface px-3.5 py-2.5 text-xs font-semibold text-brand hover:border-brand hover:bg-emerald-50"
                  >
                    <span>{portal.name}</span>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </article>
    </>
  );
}
