export interface FeeScheduleColumn {
  label: string;
  align?: 'left' | 'right';
}

export interface FeeCalculatorOption {
  id: string;
  label: string;
  amount: number;
}

export interface RichFeeSchedule {
  expectedSeedNormalFee: number;
  subtitle?: string;
  alertBanner?: string;
  columns: FeeScheduleColumn[];
  rows: string[][];
  calculatorOptions: FeeCalculatorOption[];
}

/**
 * Detailed official fee schedules (checked 17 Nov 2026) matching the exact
 * multi-tier / category tables for our verified Pakistan guides across all 8 cities.
 * If an admin later updates a process's fee_normal in Supabase, the UI
 * automatically falls back to the live DB fee_normal / fee_urgent / fee_executive.
 */
export const RICH_FEE_SCHEDULES: Record<string, RichFeeSchedule> = {
  'passport-renewal-rawalpindi': {
    expectedSeedNormalFee: 9000,
    subtitle: 'Official DGIP e-Passport fee schedule (36 pages) in Pakistani Rupees (PKR).',
    alertBanner:
      'Pakistan now issues only e-passports since Oct 2026 — MRP (Machine Readable Passport) is discontinued.',
    columns: [
      { label: 'Validity (36 Pages)', align: 'left' },
      { label: 'Normal', align: 'right' },
      { label: 'Urgent', align: 'right' },
    ],
    rows: [
      ['5 Years', 'Rs. 9,000', 'Rs. 15,000'],
      ['10 Years', 'Rs. 13,500', 'Rs. 22,500'],
    ],
    calculatorOptions: [
      { id: '5yr-normal', label: '5-Year e-Passport, 36 Pages (Normal) — Rs. 9,000', amount: 9000 },
      { id: '5yr-urgent', label: '5-Year e-Passport, 36 Pages (Urgent) — Rs. 15,000', amount: 15000 },
      { id: '10yr-normal', label: '10-Year e-Passport, 36 Pages (Normal) — Rs. 13,500', amount: 13500 },
      { id: '10yr-urgent', label: '10-Year e-Passport, 36 Pages (Urgent) — Rs. 22,500', amount: 22500 },
    ],
  },

  'cnic-renewal-rawalpindi': {
    expectedSeedNormalFee: 750,
    subtitle:
      'Official NADRA renewal fee & delivery schedule (nadra.gov.pk/feeStructure) for Smart CNIC (SNIC) and Ordinary CNIC.',
    columns: [
      { label: 'Card Type', align: 'left' },
      { label: 'Normal', align: 'right' },
      { label: 'Urgent', align: 'right' },
      { label: 'Executive', align: 'right' },
    ],
    rows: [
      ['Smart CNIC (SNIC)', 'Rs. 750 (31 days)', 'Rs. 1,500 (23 days)', 'Rs. 2,500 (9 days)'],
      ['Ordinary CNIC (Teslin)', 'Rs. 400 (15 days)', 'Rs. 1,150 (12 days)', 'Rs. 2,150 (6 days)'],
    ],
    calculatorOptions: [
      { id: 'smart-normal', label: 'Smart CNIC (Normal, 31 days) — Rs. 750', amount: 750 },
      { id: 'smart-urgent', label: 'Smart CNIC (Urgent, 23 days) — Rs. 1,500', amount: 1500 },
      { id: 'smart-exec', label: 'Smart CNIC (Executive, 9 days) — Rs. 2,500', amount: 2500 },
      { id: 'ord-normal', label: 'Ordinary CNIC (Normal, 15 days) — Rs. 400', amount: 400 },
      { id: 'ord-urgent', label: 'Ordinary CNIC (Urgent, 12 days) — Rs. 1,150', amount: 1150 },
      { id: 'ord-exec', label: 'Ordinary CNIC (Executive, 6 days) — Rs. 2,150', amount: 2150 },
    ],
  },

  'driving-licence-renewal-rawalpindi': {
    expectedSeedNormalFee: 1830,
    subtitle: 'Punjab DLIMS 1-year renewal fees plus Rs. 480 courier delivery charge.',
    columns: [
      { label: 'Vehicle Category', align: 'left' },
      { label: 'Fee per Year', align: 'right' },
      { label: 'Total With Courier (+Rs. 480)', align: 'right' },
    ],
    rows: [
      ['Motorcycle', 'Rs. 450', 'Rs. 930'],
      ['Car / Jeep', 'Rs. 1,350', 'Rs. 1,830'],
      ['LTV / HTV', 'Rs. 1,850', 'Rs. 2,330'],
    ],
    calculatorOptions: [
      { id: 'car-courier', label: 'Car / Jeep (1 Year + Courier) — Rs. 1,830', amount: 1830 },
      { id: 'car-only', label: 'Car / Jeep (1 Year Fee Only) — Rs. 1,350', amount: 1350 },
      { id: 'bike-courier', label: 'Motorcycle (1 Year + Courier) — Rs. 930', amount: 930 },
      { id: 'bike-only', label: 'Motorcycle (1 Year Fee Only) — Rs. 450', amount: 450 },
      { id: 'ltv-courier', label: 'LTV / HTV (1 Year + Courier) — Rs. 2,330', amount: 2330 },
      { id: 'car-late-3m', label: 'Car / Jeep + 1–3 Months Late Fine (Rs. 675) — Rs. 2,505', amount: 2505 },
      { id: 'car-late-6m', label: 'Car / Jeep + 3–6 Months Late Fine (Rs. 1,350) — Rs. 3,180', amount: 3180 },
    ],
  },

  'fbr-ntn-for-freelancers': {
    expectedSeedNormalFee: 0,
    subtitle:
      'Official FBR individual registration via IRIS (iris.fbr.gov.pk) or Tax House / RTO Facilitation Counters is 100% free.',
    columns: [
      { label: 'FBR Service / Detail', align: 'left' },
      { label: 'Official Schedule', align: 'right' },
    ],
    rows: [
      ['Online Registration on FBR IRIS (Individuals — Form 181)', 'Rs. 0 (Free)'],
      ['In-Person at Tax House / RTO Facilitation Counter', 'Rs. 0 (Free)'],
      ['NTN Format (Pakistani Individuals)', '13-Digit CNIC (no dashes)'],
      ['Registration Order (Completed Tasks -> Form 181)', 'Minutes to 3 working days'],
      ['IT / Freelancer Export Final Tax (Sec. 154A)', '1% (0.25% if PSEB-registered)'],
    ],
    calculatorOptions: [
      { id: 'free-ntn', label: 'Online NTN Registration on FBR IRIS (Form 181) — Rs. 0 (Free)', amount: 0 },
    ],
  },

  'domicile-certificate-rawalpindi': {
    expectedSeedNormalFee: 550,
    subtitle: 'Punjab 2026 official Domicile Certificate fee breakdown at e-Khidmat Markaz.',
    columns: [
      { label: 'Fee Component / Option', align: 'left' },
      { label: 'Official Fee (PKR)', align: 'right' },
    ],
    rows: [
      ['Government Domicile Fee', 'Rs. 200'],
      ['e-Affidavit on Stamp Paper', 'Rs. 300'],
      ['PITB Processing Charge', 'Rs. 50'],
      ['Total Official Fee (2026)', 'Rs. 550'],
      ['Optional: Maryam Ki Dastak Home Delivery', '+Rs. 900 to Rs. 1,200'],
    ],
    calculatorOptions: [
      { id: 'standard-550', label: 'Standard e-Khidmat (2026 Official Fee) — Rs. 550', amount: 550 },
      { id: 'dastak-min', label: 'With Maryam Ki Dastak Home Delivery (Low est.) — Rs. 1,450', amount: 1450 },
      { id: 'dastak-max', label: 'With Maryam Ki Dastak Home Delivery (High est.) — Rs. 1,750', amount: 1750 },
    ],
  },

  'birth-certificate-rawalpindi': {
    expectedSeedNormalFee: 0,
    subtitle: 'Union Council / Municipal Committee / Cantonment Board birth registration fees.',
    columns: [
      { label: 'Registration Case', align: 'left' },
      { label: 'Official Fee (PKR)', align: 'right' },
    ],
    rows: [
      ['Within 7 years (Timely Registration)', 'Rs. 0 (Free)'],
      ['After 7 years (Late Registration)', 'Rs. 200 to Rs. 1,000'],
      ['Foreign National Child', 'Rs. 2,000'],
      ['Correction / Change in Details', 'Rs. 500'],
      ['Next Step — NADRA B-Form / CRC (Normal 7 days / Executive 1 day)', 'Rs. 50 / Rs. 500'],
    ],
    calculatorOptions: [
      { id: 'timely', label: 'Within 7 Years (Timely Registration) — Rs. 0 (Free)', amount: 0 },
      { id: 'correction', label: 'Correction / Change in Details — Rs. 500', amount: 500 },
      { id: 'late-min', label: 'Late Registration After 7 Years (Min) — Rs. 200', amount: 200 },
      { id: 'late-max', label: 'Late Registration After 7 Years (Max) — Rs. 1,000', amount: 1000 },
      { id: 'foreign', label: 'Foreign National Child — Rs. 2,000', amount: 2000 },
    ],
  },

  'police-character-certificate-rawalpindi': {
    expectedSeedNormalFee: 500,
    subtitle: 'Official Punjab Police Khidmat Markaz (PKM) fees — delivered in 3 working days.',
    columns: [
      { label: 'Certificate Type', align: 'left' },
      { label: 'Official Fee (PKR)', align: 'right' },
    ],
    rows: [
      ['Police Character Certificate (Required for Visa / Abroad)', 'Rs. 500'],
      ['General Police Verification (Local Use Only)', 'Rs. 300'],
    ],
    calculatorOptions: [
      { id: 'character-500', label: 'Police Character Certificate (For Visa / Abroad) — Rs. 500', amount: 500 },
      { id: 'general-300', label: 'General Police Verification (Not for Visa) — Rs. 300', amount: 300 },
    ],
  },

  'child-passport-under-18': {
    expectedSeedNormalFee: 9000,
    subtitle: 'Same e-Passport fee table as adults (36 pages, 5-year validity). Children under 15 get 5-year validity only.',
    columns: [
      { label: 'e-Passport Tier (36 Pages, 5 Years)', align: 'left' },
      { label: 'Official Fee (PKR)', align: 'right' },
    ],
    rows: [
      ['Normal (21 working days)', 'Rs. 9,000'],
      ['Urgent (5 working days)', 'Rs. 15,000'],
    ],
    calculatorOptions: [
      { id: 'minor-normal', label: 'Child e-Passport, 36 Pages, 5 Years (Normal) — Rs. 9,000', amount: 9000 },
      { id: 'minor-urgent', label: 'Child e-Passport, 36 Pages, 5 Years (Urgent) — Rs. 15,000', amount: 15000 },
    ],
  },

  'name-change-cnic-after-marriage': {
    expectedSeedNormalFee: 400,
    subtitle:
      'Official NADRA modification fees & delivery timelines (nadra.gov.pk/feeStructure) for Ordinary CNIC, Smart CNIC, and database-only marital status updates.',
    columns: [
      { label: 'Card / Update Option', align: 'left' },
      { label: 'Normal', align: 'right' },
      { label: 'Urgent', align: 'right' },
      { label: 'Executive', align: 'right' },
    ],
    rows: [
      ['Ordinary CNIC Modification', 'Rs. 400 (15 days)', 'Rs. 1,150 (12 days)', 'Rs. 2,150 (6 days)'],
      ['Smart CNIC (SNIC) Modification', 'Rs. 750 (31 days)', 'Rs. 1,500 (23 days)', 'Rs. 2,500 (9 days)'],
      ['Non-Printable Field Update Only (No New Card)', 'Rs. 100 at NRC (2 days)', 'USD 5 via PakID (2 days)', '—'],
      ['Optional Next Step — Family Registration Certificate (FRC)', '—', '—', 'Rs. 1,000 (1 day)'],
    ],
    calculatorOptions: [
      { id: 'ord-norm', label: 'Ordinary CNIC Modification (Normal, 15 days) — Rs. 400', amount: 400 },
      { id: 'ord-urg', label: 'Ordinary CNIC Modification (Urgent, 12 days) — Rs. 1,150', amount: 1150 },
      { id: 'ord-exec', label: 'Ordinary CNIC Modification (Executive, 6 days) — Rs. 2,150', amount: 2150 },
      { id: 'smart-norm', label: 'Smart CNIC Modification (Normal, 31 days) — Rs. 750', amount: 750 },
      { id: 'smart-urg', label: 'Smart CNIC Modification (Urgent, 23 days) — Rs. 1,500', amount: 1500 },
      { id: 'smart-exec', label: 'Smart CNIC Modification (Executive, 9 days) — Rs. 2,500', amount: 2500 },
      { id: 'db-only', label: 'Marital Status Update Only at NRC (No Card, 2 days) — Rs. 100', amount: 100 },
    ],
  },

  'e-challan-check-and-payment': {
    expectedSeedNormalFee: 2000,
    subtitle: 'Common Punjab Safe Cities (PSCA) traffic violation fines. Pay within 10 days to avoid extra penalty.',
    columns: [
      { label: 'Violation Type', align: 'left' },
      { label: 'Common Fine (PKR)', align: 'right' },
    ],
    rows: [
      ['No Helmet', 'Rs. 2,000'],
      ['Red Light Violation', 'Rs. 2,000 to Rs. 5,000'],
      ['No Driving Licence', 'Rs. 5,000'],
      ['Overspeeding', 'Rs. 2,000 to Rs. 10,000'],
    ],
    calculatorOptions: [
      { id: 'no-helmet', label: 'No Helmet Fine — Rs. 2,000', amount: 2000 },
      { id: 'red-light-min', label: 'Red Light Violation (Min) — Rs. 2,000', amount: 2000 },
      { id: 'red-light-max', label: 'Red Light Violation (Max) — Rs. 5,000', amount: 5000 },
      { id: 'no-licence', label: 'No Driving Licence Fine — Rs. 5,000', amount: 5000 },
      { id: 'overspeed-max', label: 'Overspeeding Fine (Max) — Rs. 10,000', amount: 10000 },
    ],
  },
};

export function getRichFeeSchedule(
  slug: string,
  currentDbNormalFee: number
): RichFeeSchedule | null {
  let schedule = RICH_FEE_SCHEDULES[slug];
  if (!schedule && slug.startsWith('cnic-renewal-')) {
    schedule = RICH_FEE_SCHEDULES['cnic-renewal-rawalpindi'];
  } else if (!schedule && slug.startsWith('fbr-ntn-')) {
    schedule = RICH_FEE_SCHEDULES['fbr-ntn-for-freelancers'];
  }
  if (!schedule) return null;
  // If an admin edits fee_normal in Supabase, automatically defer to live DB values
  if (schedule.expectedSeedNormalFee !== currentDbNormalFee) {
    return null;
  }
  return schedule;
}
