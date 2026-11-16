# KaamHoGaya.pk

> **"Kaam Ho Gaya - Har Sarkari Kaam, Step by Step"**

Pakistan’s independent, mobile-first **Citizen Process Library** for government documents — built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Supabase (Postgres + Auth + Row Level Security)**, **jsPDF**, and **PWA offline support**.

> **Disclaimer:** KaamHoGaya.pk is an independent private informational website and is **NOT** affiliated with the Government of Pakistan, NADRA, DGIP (Passport Office), FBR, Punjab Police, or any federal, provincial, or municipal agency.

---

## Key Features

- **Homepage (`/`)**: Centered instant-search hero (`"Search: Passport Renewal in Rawalpindi"`), 8-city selector (Rawalpindi, Islamabad, Lahore, Karachi, Peshawar, Quetta, Hyderabad, Multan), 6 category cards (Identity, Passport, Driving, Tax, Certificates, Family), Popular This Week, 3-step How It Works, live crowdsourced Wait Times feed, and Trust & Disclaimer section.
- **All Processes (`/processes`)**: Instant no-reload search, City, Category, PKR Fee Range, and Time Required filters with live Supabase sync.
- **Process Detail (`/process/[slug]`)**: Structured in exact citizen-friendly order:
  1. Header (Title, Urdu subtitle, City & Category badges, Verified badge, Last Updated, Official Source link)
  2. At A Glance Box (Normal Fee, Time Needed, Office Address, Timings, Best Day To Go)
  3. Fee Breakdown Table (Normal, Urgent, Executive in exact PKR)
  4. Interactive Document Checklist (`localStorage` persistence, Original vs Photocopy + Copy count, Print Checklist, Save My Checklist, Download PDF)
  5. Gate-to-Collection Step-by-Step Guide (with per-step minutes & mobile AdSense slot after Step 3)
  6. **3 Mistakes That Waste Your Day** (red alert box)
  7. Interactive **Fee Calculator** (Service type + City → Official fee + Photocopy + Photo estimate)
  8. **Live Wait Times** (average wait time, 7-day chart, approved citizen tips, validated & rate-limited submission form)
  9. **FAQ Accordion** (5 questions per process)
  10. **Related Processes** (3 cards)
  11. **Non-Government Disclaimer** + WhatsApp Rs. 500 Document Check CTA (`https://wa.me/923000000000`) + desktop sidebar AdSense slot
- **City Pages (`/city/[slug]`)**: Dedicated pages for all 8 major Pakistani cities showing local processes, applicable nationwide guides, office addresses, and live wait times.
- **Document Checklist & PDF Generator (`/checklist`)**: Select any process + city, tick off documents (persisted offline in `localStorage`), add personal reminders, **Download PDF** (works on mobile & desktop), print, or **Share on WhatsApp**.
- **Wait Time Tracker (`/wait-times`)**: Filterable directory of offices across Pakistan with average wait times, last reported dates, and an inline submission drawer.
- **Protected Admin Dashboard (`/admin`)**: Email/password login via Supabase Auth (public signup disabled, enforced by `public.is_admin()` RLS):
  - Add new processes or edit existing processes, fees, documents, steps, mistakes, and FAQs
  - One-click **Mark Verified / Unverified** toggle
  - Approve, reject, or delete crowdsourced wait time reports
  - Automatic `last_updated` timestamp updates via PostgreSQL triggers
- **Static & Legal Pages**: `/about`, `/contact`, `/disclaimer`, `/privacy-policy`, `/terms` — every page includes Breadcrumbs (`BreadcrumbList` JSON-LD), Last Updated date, and Official Source link.
- **SEO & PWA**: Dynamic metadata, canonical URLs, dynamic OpenGraph images (`/opengraph-image`, `/process/[slug]/opengraph-image`), Schema.org `HowTo` + `FAQPage`, `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, service worker (`/sw.js`), and Google Analytics 4 placeholder (`NEXT_PUBLIC_GA_MEASUREMENT_ID`).

---

## Seeded Pakistani Processes (10 Real Guides)

1. `passport-renewal-rawalpindi` — Passport Renewal in Rawalpindi
2. `cnic-renewal-rawalpindi` — CNIC Renewal in Rawalpindi (NADRA Mega Center)
3. `driving-licence-renewal-rawalpindi` — Driving Licence Renewal in Rawalpindi (DLIMS)
4. `fbr-ntn-for-freelancers` — FBR NTN Registration for Freelancers (Free / Online)
5. `domicile-certificate-rawalpindi` — Domicile Certificate in Rawalpindi (e-Khidmat)
6. `birth-certificate-rawalpindi` — Birth Certificate in Rawalpindi (Union Council / RCB)
7. `police-character-certificate-rawalpindi` — Police Character Certificate in Rawalpindi (PKM)
8. `child-passport-under-18` — Child Passport Under 18 (Minor MRP)
9. `name-change-cnic-after-marriage` — Name Change on CNIC After Marriage (NADRA)
10. `e-challan-check-and-payment` — E-Challan Check and Online Payment (PSCA)

---

## Local Development Setup

```bash
npm install
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Useful Scripts

- `npm run dev` — Start local development server
- `npm run typecheck` — Run strict TypeScript check (`tsc --noEmit`)
- `npm run lint` — Run Next.js ESLint (`next lint`)
- `npm run build` — Production build
- `npm run start` — Start production server
- `node scripts/generate-seed-sql.mjs` — Regenerate `supabase/seed.sql` from `src/data/seed-data.ts`

---

## Database Schema & Seed (Supabase)

- **Schema & RLS Migration**: `supabase/migrations/20261116000001_initial_schema.sql`
  - Tables: `cities`, `categories`, `processes`, `documents`, `steps`, `mistakes`, `faqs`, `wait_times`, `admin_users`, `wait_time_rate_limits`
  - Triggers: Auto-updates `processes.last_updated` whenever a process or any child document/step/mistake/FAQ is modified
  - RPC: `public.submit_wait_time(...)` validates visit date (`<= CURRENT_DATE`, within 90 days), wait minutes (`5–480`), rating (`1–5`), strips HTML tags, caps tips at 200 characters, and enforces rate limiting (max 3 reports/hour, max 1 per 15 min per office)
  - RLS: Public read on processes/cities/categories/approved wait times; public insert via `submit_wait_time`; admin-only writes checked by `public.is_admin()`
- **Seed File**: `supabase/seed.sql` (idempotent `ON CONFLICT DO NOTHING`)

### Admin Login (`/admin`)

Public signup is disabled in Supabase Auth. Only users registered in both `auth.users` and `public.admin_users` can sign in to `/admin`.

- **Seeded Admin Email**: `admin@kaamhogaya.pk`
- **Initial Password**: `KaamHoGaya@2026` *(rotate immediately in Supabase Auth before public launch)*

---

## Deploying to Vercel

1. Push this repository to GitHub and import into [Vercel](https://vercel.com).
2. Add the following Environment Variables in Vercel Project Settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` (e.g. `https://kaamhogaya.pk`)
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID` *(optional — enables Google Analytics 4)*
3. Deploy — Next.js 14 builds out of the box with zero extra configuration.
