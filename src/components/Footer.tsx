import Link from 'next/link';
import { ExternalLink, Info } from 'lucide-react';
import { BrandMark } from '@/components/BrandMark';
import {
  DISCLAIMER_SHORT,
  FEE_CHECK_DISCLAIMER,
  SITE_NAME,
  SITE_TAGLINE,
} from '@/lib/constants';

const POPULAR_CITIES = [
  { name: 'Rawalpindi', slug: 'rawalpindi' },
  { name: 'Islamabad', slug: 'islamabad' },
  { name: 'Lahore', slug: 'lahore' },
  { name: 'Karachi', slug: 'karachi' },
  { name: 'Peshawar', slug: 'peshawar' },
  { name: 'Quetta', slug: 'quetta' },
  { name: 'Hyderabad', slug: 'hyderabad' },
  { name: 'Multan', slug: 'multan' },
];

export function Footer() {
  return (
    <footer className="no-print mt-16">
      {/* Site-wide Fee Disclaimer Strip rendered on EVERY page */}
      <div className="border-y border-amber-300/80 bg-amber-50">
        <div className="mx-auto flex max-w-6xl items-start gap-2.5 px-4 py-3 text-xs leading-relaxed text-amber-950 sm:items-center sm:px-6">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-800 sm:mt-0" aria-hidden="true" />
          <p>
            <strong className="font-bold text-ink">Disclaimer:</strong>{' '}
            {FEE_CHECK_DISCLAIMER}
          </p>
        </div>
      </div>

      <div className="bg-brand-dark text-emerald-50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand column */}
            <div className="space-y-4">
              <Link href="/" className="group inline-flex items-center gap-2.5">
                <BrandMark className="h-9 w-9 transition-transform duration-300 ease-pop group-hover:-rotate-3 group-hover:scale-105" />
                <div>
                  <p className="text-lg font-bold text-white">{SITE_NAME}</p>
                  <p className="text-xs text-emerald-200">{SITE_TAGLINE}</p>
                </div>
              </Link>
              <p className="font-urdu text-sm leading-loose text-emerald-100/90" dir="rtl">
                ہر سرکاری کام، قدم بہ قدم آسان رہنمائی
              </p>
              <Link href="/nadra" className="inline-flex items-center gap-2 rounded-lg bg-accent-yellow px-3.5 py-2 text-xs font-bold text-brand-dark hover:bg-amber-400">Browse NADRA services →</Link>
            </div>

            {/* Tools & Guides */}
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-emerald-200">
                Citizen Tools
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <Link href="/processes" className="text-emerald-100 hover:text-white">
                    All Government Processes
                  </Link>
                </li>
                <li>
                  <Link href="/checklist" className="text-emerald-100 hover:text-white">
                    Document Checklist &amp; PDF Generator
                  </Link>
                </li>
                <li>
                  <Link href="/wait-times" className="text-emerald-100 hover:text-white">
                    Live Office Wait Time Tracker
                  </Link>
                </li>
                <li>
                  <Link
                    href="/process/passport-renewal-rawalpindi"
                    className="text-emerald-100 hover:text-white"
                  >
                    Passport Renewal Rawalpindi
                  </Link>
                </li>
                <li>
                  <Link
                    href="/process/fbr-ntn-for-freelancers"
                    className="text-emerald-100 hover:text-white"
                  >
                    FBR NTN for Freelancers
                  </Link>
                </li>
              </ul>
            </div>

            {/* Cities */}
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-emerald-200">
                Cities Across Pakistan
              </h2>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {POPULAR_CITIES.map((city) => (
                  <li key={city.slug}>
                    <Link
                      href={`/city/${city.slug}`}
                      className="text-emerald-100 hover:text-white"
                    >
                      {city.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info & Legal */}
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-emerald-200">
                About &amp; Legal
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <Link href="/about" className="text-emerald-100 hover:text-white">
                    About KaamHoGaya.pk
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-emerald-100 hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimer" className="text-emerald-100 hover:text-white">
                    Disclaimer
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-emerald-100 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-emerald-100 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/cookie-policy" className="text-emerald-100 hover:text-white">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <a
                    href="https://pakistan.gov.pk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-200 hover:text-white"
                  >
                    Official Pakistan.gov.pk
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Non-Government Disclaimer Box */}
          <div className="mt-10 rounded-xl border border-emerald-700/70 bg-emerald-950/60 p-4 text-xs leading-relaxed text-emerald-100">
            <p>
              <strong className="text-accent-yellow">Fee &amp; Source Notice:</strong>{' '}
              {FEE_CHECK_DISCLAIMER}
            </p>
            <p className="mt-1.5 text-emerald-200/90">{DISCLAIMER_SHORT}</p>
          </div>

          <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-emerald-800/80 pt-6 text-xs text-emerald-200/80 sm:flex-row">
            <p>
              © {new Date().getFullYear()} {SITE_NAME}. Built independently for Pakistani
              citizens.
            </p>
            <p>Fees listed in Pakistani Rupees (PKR) • Always verify on official portals</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
