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
  title: 'Disclaimer — Independent Citizen Guide (Not a Government Website)',
  description:
    'Important legal disclaimer for KaamHoGaya.pk clarifying that this is an independent private informational website not affiliated with NADRA, DGIP, FBR, or any government body.',
  alternates: { canonical: `${SITE_URL}/disclaimer` },
};

const OFFICIAL_PORTALS = [
  { name: 'Government of Pakistan Portal', url: 'https://pakistan.gov.pk' },
  { name: 'NADRA (Identity, CNIC, B-Form, FRC)', url: 'https://www.nadra.gov.pk' },
  { name: 'DGIP (Directorate General of Immigration & Passports)', url: 'https://dgip.gov.pk' },
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
        <header className="rounded-2xl border-2 border-amber-300 bg-amber-50/70 p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-yellow text-brand-dark">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
                Fee Verification &amp; Non-Government Website Disclaimer
              </h1>
              <p className="mt-2 rounded-xl bg-white/90 px-4 py-3 text-sm font-bold leading-relaxed text-ink shadow-sm ring-1 ring-amber-300/70 sm:text-base">
                {FEE_CHECK_DISCLAIMER}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-amber-950 sm:text-base">
                <strong>{SITE_NAME}</strong> is an independent, privately operated
                citizen information resource. We are <strong>NOT</strong> an official
                government website, and we are <strong>NOT</strong> affiliated with,
                endorsed by, or representing the Government of Pakistan, NADRA, DGIP
                (Passport Office), FBR, Punjab Police, Traffic Police, or any provincial
                or municipal authority.
              </p>
            </div>
          </div>
        </header>

        <section className="space-y-4 rounded-2xl border border-emerald-950/10 bg-white p-6 text-sm leading-relaxed text-gray-700 shadow-sm sm:p-8">
          <h2 className="text-lg font-bold text-ink">1. Informational Purpose Only</h2>
          <p>
            All step-by-step instructions, PKR fee breakdowns, document checklists, and
            office timings on {SITE_NAME} are compiled purely for citizen education and
            convenience. Official government fees, forms, policies, and counter timings
            can change without prior notice through official statutory notifications.
          </p>

          <h2 className="text-lg font-bold text-ink">
            2. No Government Processing or Issuing Authority
          </h2>
          <p>
            {SITE_NAME} does not issue CNICs, passports, driving licences, domiciles,
            birth certificates, NTNs, or police certificates. All official applications
            and government fee payments must be completed directly at official
            government portals, banks, PSID apps, or authorized offices.
          </p>

          <h2 className="text-lg font-bold text-ink">
            3. Crowdsourced Wait Times &amp; Tips
          </h2>
          <p>
            Office wait time averages and citizen tips are submitted by real visitors and
            moderated for spam, but represent past visits and cannot guarantee exact
            queue times on the day you visit.
          </p>

          <h2 className="text-lg font-bold text-ink">
            4. Optional WhatsApp Document Review
          </h2>
          <p>
            Our optional Rs. 500 WhatsApp Document Check is a private advisory service to
            help citizens verify their paperwork before visiting an office. It is NOT a
            government fee and does not grant priority access, expedited government
            processing, or agent representation inside any public office.
          </p>

          <h2 className="text-lg font-bold text-ink">
            5. Official Government Sources Directory
          </h2>
          <p>Always cross-verify latest statutory fees directly on official portals:</p>
          <ul className="grid gap-2 pt-2 sm:grid-cols-2">
            {OFFICIAL_PORTALS.map((portal) => (
              <li key={portal.url}>
                <a
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-gray-200 bg-surface px-3.5 py-2.5 text-xs font-semibold text-brand hover:border-brand hover:bg-emerald-50"
                >
                  <span>{portal.name}</span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </>
  );
}
