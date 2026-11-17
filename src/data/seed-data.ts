import type {
  Category,
  City,
  ProcessDocument,
  ProcessFaq,
  ProcessMistake,
  ProcessRecord,
  ProcessStep,
  WaitTime,
} from '@/types/database';

export const SEED_CITIES: City[] = [
  { id: 'c1000000-0000-4000-8000-000000000001', name: 'Rawalpindi', slug: 'rawalpindi', province: 'Punjab' },
  { id: 'c1000000-0000-4000-8000-000000000002', name: 'Islamabad', slug: 'islamabad', province: 'ICT' },
  { id: 'c1000000-0000-4000-8000-000000000003', name: 'Lahore', slug: 'lahore', province: 'Punjab' },
  { id: 'c1000000-0000-4000-8000-000000000004', name: 'Karachi', slug: 'karachi', province: 'Sindh' },
  { id: 'c1000000-0000-4000-8000-000000000005', name: 'Peshawar', slug: 'peshawar', province: 'Khyber Pakhtunkhwa' },
  { id: 'c1000000-0000-4000-8000-000000000006', name: 'Quetta', slug: 'quetta', province: 'Balochistan' },
  { id: 'c1000000-0000-4000-8000-000000000007', name: 'Hyderabad', slug: 'hyderabad', province: 'Sindh' },
  { id: 'c1000000-0000-4000-8000-000000000008', name: 'Multan', slug: 'multan', province: 'Punjab' },
];

export const SEED_CATEGORIES: Category[] = [
  {
    id: 'b1000000-0000-4000-8000-000000000001',
    name: 'Identity',
    slug: 'identity',
    urdu_label: 'شناختی کارڈ',
    description: 'Smart CNIC and Ordinary CNIC renewal, PakID online options, and NADRA guides.',
  },
  {
    id: 'b1000000-0000-4000-8000-000000000002',
    name: 'Passport',
    slug: 'passport',
    urdu_label: 'پاسپورٹ',
    description: 'Pakistani e-Passport renewals, child e-passports under 18, and DGIP tracking.',
  },
  {
    id: 'b1000000-0000-4000-8000-000000000003',
    name: 'Driving',
    slug: 'driving',
    urdu_label: 'ڈرائیونگ لائسنس',
    description: 'Punjab driving licence renewal via Khidmat Markaz / Dastak, and PSCA E-Challan payments.',
  },
  {
    id: 'b1000000-0000-4000-8000-000000000004',
    name: 'Tax',
    slug: 'tax',
    urdu_label: 'ٹیکس اور این ٹی این',
    description: 'Free online FBR NTN registration on IRIS for freelancers and IT exporters.',
  },
  {
    id: 'b1000000-0000-4000-8000-000000000005',
    name: 'Certificates',
    slug: 'certificates',
    urdu_label: 'سرٹیفکیٹس',
    description: 'Domicile certificates, Union Council birth certificates, and Police Character Certificates.',
  },
  {
    id: 'b1000000-0000-4000-8000-000000000006',
    name: 'Family',
    slug: 'family',
    urdu_label: 'خاندانی دستاویزات',
    description: 'Post-marriage CNIC name and marital status updates via Union Council MRC and NADRA.',
  },
];

export const PROCESS_IDS = {
  passportRenewal: 'a1000000-0000-4000-8000-000000000001',
  cnicRenewal: 'a1000000-0000-4000-8000-000000000002',
  drivingLicence: 'a1000000-0000-4000-8000-000000000003',
  fbrNtn: 'a1000000-0000-4000-8000-000000000004',
  domicile: 'a1000000-0000-4000-8000-000000000005',
  birthCertificate: 'a1000000-0000-4000-8000-000000000006',
  policeCharacter: 'a1000000-0000-4000-8000-000000000007',
  childPassport: 'a1000000-0000-4000-8000-000000000008',
  nameChangeMarriage: 'a1000000-0000-4000-8000-000000000009',
  eChallan: 'a1000000-0000-4000-8000-000000000010',
} as const;

export const SEED_PROCESSES: ProcessRecord[] = [
  // 1. Passport Renewal in Rawalpindi
  {
    id: PROCESS_IDS.passportRenewal,
    slug: 'passport-renewal-rawalpindi',
    title: 'Passport Renewal in Rawalpindi',
    urdu_title: 'پاسپورٹ کی تجدید — راولپنڈی',
    summary:
      'Step-by-step guide to renewing your 36-page Pakistani e-Passport at Regional Passport Office, GT Road, Rawalpindi (or online via DGIP portal). Pakistan issues only e-passports since Oct 2026 — MRP is discontinued.',
    category: 'Passport',
    city: 'Rawalpindi',
    fee_normal: 9000,
    fee_urgent: 15000,
    fee_executive: 22500,
    fee_notes:
      'Pakistan now issues only e-passports since Oct 2026; MRP is discontinued. For a 36-page e-passport: 5 years is Rs. 9,000 Normal and Rs. 15,000 Urgent; 10 years is Rs. 13,500 Normal and Rs. 22,500 Urgent.',
    time_required: 'Normal: 21 working days | Urgent: 5 working days | Executive: 2 working days at Executive Offices',
    office_name: 'Regional Passport Office, Rawalpindi (GT Road)',
    office_address: 'Regional Passport Office, GT Road, Rawalpindi. Also available online via DGIP portal.',
    office_timings: 'Mon–Thu: 8:30 AM – 2:00 PM | Fri: 8:30 AM – 12:30 PM (DGIP Online Portal 24/7)',
    best_day_to_go: 'Tuesday to Thursday, 8:30 AM to 10:00 AM (Monday is the most crowded day)',
    official_source_url: 'https://dgip.gov.pk/',
    last_updated: '2026-11-17T00:00:00Z',
    is_verified: true,
    is_nationwide: false,
    popularity_rank: 1,
  },

  // 2. CNIC Renewal in Rawalpindi
  {
    id: PROCESS_IDS.cnicRenewal,
    slug: 'cnic-renewal-rawalpindi',
    title: 'CNIC Renewal in Rawalpindi',
    urdu_title: 'شناختی کارڈ کی تجدید — راولپنڈی',
    summary:
      'Complete official guide to renewing your Smart CNIC (SNIC) or Ordinary CNIC at NADRA Mega Center, Saddar, Rawalpindi or via the official PakID app — with verified NADRA fees, delivery days, and Rule 12 requirements.',
    category: 'Identity',
    city: 'Rawalpindi',
    fee_normal: 750,
    fee_urgent: 1500,
    fee_executive: 2500,
    fee_notes:
      'Official NADRA renewal fees (nadra.gov.pk/feeStructure): Smart CNIC (SNIC) is Rs. 750 Normal (31 days), Rs. 1,500 Urgent (23 days), and Rs. 2,500 Executive (9 days). Ordinary CNIC (Teslin) is Rs. 400 Normal (15 days), Rs. 1,150 Urgent (12 days), and Rs. 2,150 Executive (6 days). No attestation is required for renewal. 24/7 NADRA Helpline: 1777 (mobile) or +92 51 111 786 100.',
    time_required: '45 mins–1.5 hrs at Mega Center (2+ hrs Sat) | Smart: 31/23/9 days | Ordinary: 15/12/6 days',
    office_name: 'NADRA Mega Center, Saddar, Rawalpindi',
    office_address:
      'NADRA Mega Center, Saddar, Rawalpindi (or any NADRA Registration Centre / official PakID mobile app). 24/7 NADRA Helpline: 1777 / +92 51 111 786 100.',
    office_timings: 'Mon–Sat: 8:00 AM – 8:00 PM (PakID app available 24/7)',
    best_day_to_go: 'Weekday 9:00 AM to 11:00 AM (avoid Saturday — 2+ hours wait)',
    official_source_url: 'https://www.nadra.gov.pk/feeStructure',
    last_updated: '2026-11-17T00:00:00Z',
    is_verified: true,
    is_nationwide: false,
    popularity_rank: 2,
  },

  // 3. Driving Licence Renewal in Rawalpindi
  {
    id: PROCESS_IDS.drivingLicence,
    slug: 'driving-licence-renewal-rawalpindi',
    title: 'Driving Licence Renewal in Rawalpindi',
    urdu_title: 'ڈرائیونگ لائسنس کی تجدید — راولپنڈی',
    summary:
      'How to renew your Punjab motorcycle, car/jeep, or LTV/HTV driving licence at Police Khidmat Markaz Rawalpindi or online via Dastak Punjab and DLIMS with home courier delivery.',
    category: 'Driving',
    city: 'Rawalpindi',
    fee_normal: 1830,
    fee_urgent: 930,
    fee_executive: 2330,
    fee_notes:
      'Punjab 1-year renewal + Rs. 480 courier fee: Motorcycle Rs. 450 (Rs. 930 with courier), Car/Jeep Rs. 1,350 (Rs. 1,830 with courier), LTV/HTV Rs. 1,850 (Rs. 2,330 with courier). Late fine for car: Rs. 675 (1–3 months late) and Rs. 1,350 (3–6 months late).',
    time_required: '20–30 mins at center | 10 mins online | Courier delivery: 7–10 days',
    office_name: 'Police Khidmat Markaz, Rawalpindi',
    office_address: 'Police Khidmat Markaz, Rawalpindi. Also available online via Dastak Punjab and DLIMS.',
    office_timings: 'Mon–Sat: 9:00 AM – 5:00 PM (Dastak Punjab & DLIMS online 24/7)',
    best_day_to_go: 'Weekday 9:00 AM to 11:00 AM (avoid Saturday)',
    official_source_url: 'https://dlims.punjab.gov.pk/',
    last_updated: '2026-11-17T00:00:00Z',
    is_verified: true,
    is_nationwide: false,
    popularity_rank: 3,
  },

  // 4. FBR NTN Registration for Freelancers
  {
    id: PROCESS_IDS.fbrNtn,
    slug: 'fbr-ntn-for-freelancers',
    title: 'FBR NTN Registration for Freelancers',
    urdu_title: 'فری لانسرز کے لیے ایف بی آر این ٹی این',
    summary:
      '100% free official guide to registering as an individual taxpayer on FBR IRIS (iris.fbr.gov.pk) via Form 181 — your 13-digit CNIC becomes your NTN with no office visit required.',
    category: 'Tax',
    city: 'Islamabad',
    fee_normal: 0,
    fee_urgent: 0,
    fee_executive: 0,
    fee_notes:
      'Official FBR Fee: Rs. 0 (Free) online via iris.fbr.gov.pk (for Individuals) or in person at any Tax House / RTO Facilitation Counter. For Pakistani individuals, your 13-digit CNIC (without dashes) IS your NTN. Under FBR Section 154A, IT & IT-enabled services export proceeds are subject to 1% final tax (0.25% if PSEB-registered; confirm current Finance Act rules on fbr.gov.pk). FBR Helpline: 051-111-772-772 | helpline@fbr.gov.pk.',
    time_required: 'Order issued in minutes to 3 working days after Form 181 submission (100% online)',
    office_name: 'Online — FBR IRIS Portal (iris.fbr.gov.pk) or Any Tax House / RTO Facilitation Counter',
    office_address:
      'Online via iris.fbr.gov.pk for Individuals (AOPs and Companies must visit a Tax House / RTO Facilitation Counter). FBR Helpline: 051-111-772-772 (Females: 051-9107025) | helpline@fbr.gov.pk.',
    office_timings: 'IRIS Online 24/7 (Weekday mornings are fastest) | FBR Helpline Mon–Fri: 8:00 AM – 11:30 PM',
    best_day_to_go: 'Weekday morning (IRIS responds faster and SMS/Email PINs arrive quickly)',
    official_source_url: 'https://iris.fbr.gov.pk/',
    last_updated: '2026-11-17T00:00:00Z',
    is_verified: true,
    is_nationwide: true,
    popularity_rank: 4,
  },

  // 5. Domicile Certificate in Rawalpindi
  {
    id: PROCESS_IDS.domicile,
    slug: 'domicile-certificate-rawalpindi',
    title: 'Domicile Certificate in Rawalpindi',
    urdu_title: 'ڈومیسائل سرٹیفکیٹ — راولپنڈی',
    summary:
      'Exact 2026 fee breakdown (Rs. 550 total), required forms (Form P & AC Verification Form), and steps for getting a Domicile Certificate at e-Khidmat Markaz, District Complex, Rawalpindi or via Maryam Ki Dastak.',
    category: 'Certificates',
    city: 'Rawalpindi',
    fee_normal: 550,
    fee_urgent: 1450,
    fee_executive: 1750,
    fee_notes:
      'In Punjab, the 2026 total official fee is Rs. 550 (Rs. 200 fee + Rs. 300 e-affidavit + Rs. 50 PITB charge). If you use Maryam Ki Dastak home delivery, add Rs. 900 to Rs. 1,200 service charge.',
    time_required: '16 working days standard | 2–3 days if Dastak fast track is available in your area',
    office_name: 'e-Khidmat Markaz, District Complex, Rawalpindi',
    office_address: 'e-Khidmat Markaz, District Complex, Rawalpindi. Also available via Maryam Ki Dastak for home delivery.',
    office_timings: 'Mon–Sat: 9:00 AM – 5:00 PM (Maryam Ki Dastak home service available)',
    best_day_to_go: 'Tuesday to Thursday, 9:00 AM to 11:00 AM',
    official_source_url: 'https://ekhidmat.punjab.gov.pk/',
    last_updated: '2026-11-17T00:00:00Z',
    is_verified: true,
    is_nationwide: false,
    popularity_rank: 5,
  },

  // 6. Birth Certificate from Union Council in Rawalpindi
  {
    id: PROCESS_IDS.birthCertificate,
    slug: 'birth-certificate-rawalpindi',
    title: 'Birth Certificate from Union Council in Rawalpindi',
    urdu_title: 'پیدائش کا سرٹیفکیٹ (یونین کونسل) — راولپنڈی',
    summary:
      'How to register a birth and collect a computerized Birth Certificate from your local Union Council, Municipal Committee, or Cantonment Board (NOT NADRA) — completely free within 7 years.',
    category: 'Certificates',
    city: 'Rawalpindi',
    fee_normal: 0,
    fee_urgent: 500,
    fee_executive: 2000,
    fee_notes:
      'Within 7 years: Free (Rs. 0). Late registration after 7 years: Rs. 200 to Rs. 1,000 for Pakistani citizens. Foreign national child: Rs. 2,000. Correction or change in details: Rs. 500. Use the birth certificate afterward to apply for a NADRA Child Registration Certificate (CRC / B-Form): Normal Rs. 50 (7 days) or Executive Rs. 500 (1 day).',
    time_required: 'Same day to 3 days if documents are complete',
    office_name: 'Local Union Council, Municipal Committee, or Cantonment Board',
    office_address: 'Your local Union Council, Municipal Committee, or Cantonment Board in Rawalpindi (NOT NADRA office).',
    office_timings: 'Mon–Fri: 9:00 AM – 2:00 PM (Secretary is usually available 9:00 AM – 12:00 PM)',
    best_day_to_go: 'Weekday 9:00 AM to 12:00 PM (Secretary is usually available in the morning)',
    official_source_url: 'https://lgcd.punjab.gov.pk/',
    last_updated: '2026-11-17T00:00:00Z',
    is_verified: true,
    is_nationwide: false,
    popularity_rank: 6,
  },

  // 7. Police Character Certificate in Rawalpindi
  {
    id: PROCESS_IDS.policeCharacter,
    slug: 'police-character-certificate-rawalpindi',
    title: 'Police Character Certificate in Rawalpindi',
    urdu_title: 'پولیس کریکٹر سرٹیفکیٹ — راولپنڈی',
    summary:
      'Fast guide to getting your QR-verified Police Character Certificate (Rs. 500, 3 working days courier delivery) from Police Khidmat Markaz at Rescue 15 Liaqat Bagh Metro Station or Punjab centers.',
    category: 'Certificates',
    city: 'Rawalpindi',
    fee_normal: 500,
    fee_urgent: 500,
    fee_executive: 300,
    fee_notes:
      'Police Character Certificate costs Rs. 500 (delivered by courier in 3 working days with QR code for verification). General Police Verification costs Rs. 300 — for foreign visas, always apply for Character Certificate (Rs. 500), not general verification.',
    time_required: '30–45 mins at center | 3 working days courier delivery',
    office_name: 'Police Khidmat Markaz, Rawalpindi (Rescue 15 Liaqat Bagh)',
    office_address:
      'Any Police Khidmat Markaz in Punjab. In Rawalpindi: Rescue 15 Office, Liaqat Bagh Metro Station, Murree Road, plus Taxila, Murree, Gujar Khan, and Kahuta centers.',
    office_timings: 'Mon–Sat: 8:00 AM – 8:00 PM (Best window: 9:00 AM – 11:00 AM)',
    best_day_to_go: 'Weekday 9:00 AM to 11:00 AM',
    official_source_url: 'https://pkm.punjab.gov.pk/',
    last_updated: '2026-11-17T00:00:00Z',
    is_verified: true,
    is_nationwide: false,
    popularity_rank: 7,
  },

  // 8. Child Passport Under 18 in Rawalpindi
  {
    id: PROCESS_IDS.childPassport,
    slug: 'child-passport-under-18',
    title: 'Child Passport Under 18 in Rawalpindi',
    urdu_title: 'بچوں کا پاسپورٹ (18 سال سے کم) — راولپنڈی',
    summary:
      'Complete checklist and step-by-step instructions for applying for a minor e-Passport (under 18) at Regional Passport Office Rawalpindi — including parent presence rules and B-Form requirements.',
    category: 'Passport',
    city: 'Rawalpindi',
    fee_normal: 9000,
    fee_urgent: 15000,
    fee_executive: 15000,
    fee_notes:
      'A child’s e-passport uses the same fee table as adults: Rs. 9,000 Normal and Rs. 15,000 Urgent for 36 pages and 5 years. Children under 15 get only 5-year validity.',
    time_required: 'Normal: 21 working days | Urgent: 5 working days (courier delivery)',
    office_name: 'Regional Passport Office, Rawalpindi',
    office_address:
      'Regional Passport Office, GT Road, Rawalpindi. Both parents must be present, or one parent with an attested consent affidavit.',
    office_timings: 'Mon–Thu: 8:30 AM – 2:00 PM | Fri: 8:30 AM – 12:30 PM',
    best_day_to_go: '9:00 AM on a weekday, with both parents',
    official_source_url: 'https://dgip.gov.pk/',
    last_updated: '2026-11-17T00:00:00Z',
    is_verified: true,
    is_nationwide: false,
    popularity_rank: 8,
  },

  // 9. Name Change on CNIC After Marriage
  {
    id: PROCESS_IDS.nameChangeMarriage,
    slug: 'name-change-cnic-after-marriage',
    title: 'Name Change on CNIC After Marriage',
    urdu_title: 'شادی کے بعد شناختی کارڈ میں نام کی تبدیلی',
    summary:
      'Official NADRA guide to updating marital status, adding spouse name, and optionally changing surname after marriage — with verified NADRA fees, delivery days, Regulation 41 rules, and PakID app options.',
    category: 'Family',
    city: 'Rawalpindi',
    fee_normal: 400,
    fee_urgent: 1150,
    fee_executive: 2150,
    fee_notes:
      'Official NADRA modification fees (nadra.gov.pk/feeStructure): Ordinary CNIC is Rs. 400 Normal (15 days), Rs. 1,150 Urgent (12 days), Rs. 2,150 Executive (6 days). Smart CNIC (SNIC) is Rs. 750 Normal (31 days), Rs. 1,500 Urgent (23 days), Rs. 2,500 Executive (9 days). Updating non-printable fields only (marital status in NADRA database without a new printed card) is Rs. 100 at NRC (2 days) or USD 5 via PakID app (2 days). Optional FRC afterward: Rs. 1,000 (1 day). 24/7 NADRA Helpline: 1777.',
    time_required: '45 mins at center | Ordinary: 15/12/6 days | Smart: 31/23/9 days | DB-Only: 2 days',
    office_name: 'NADRA Mega Center, Saddar, Rawalpindi',
    office_address:
      'NADRA Mega Center, Saddar, Rawalpindi (or any NADRA Registration Centre / official PakID mobile app). 24/7 NADRA Helpline: 1777 / +92 51 111 786 100.',
    office_timings: 'Mon–Sat: 8:00 AM – 8:00 PM (PakID app available 24/7)',
    best_day_to_go: 'Weekday morning (9:00 AM – 11:00 AM)',
    official_source_url: 'https://www.nadra.gov.pk/feeStructure',
    last_updated: '2026-11-17T00:00:00Z',
    is_verified: true,
    is_nationwide: true,
    popularity_rank: 9,
  },

  // 10. E-Challan Check and Payment in Punjab
  {
    id: PROCESS_IDS.eChallan,
    slug: 'e-challan-check-and-payment',
    title: 'E-Challan Check and Payment in Punjab',
    urdu_title: 'پنجاب ای چالان چیک اور ادائیگی',
    summary:
      'Check and pay Punjab Safe Cities (PSCA) traffic e-Challans online in 2 minutes via echallan.psca.gop.pk and e-Pay Punjab 17-digit PSID — with common violation fines and SMS scam warnings.',
    category: 'Driving',
    city: 'Lahore',
    fee_normal: 2000,
    fee_urgent: 5000,
    fee_executive: 10000,
    fee_notes:
      'Fine depends on violation. Common Punjab fines: No helmet Rs. 2,000; Red light Rs. 2,000 to Rs. 5,000; No licence Rs. 5,000; Overspeeding Rs. 2,000 to Rs. 10,000. Check your exact fine on echallan.psca.gop.pk and pay within 10 days to avoid extra penalty.',
    time_required: 'Check takes 2 mins | Payment reflects on portal in 10 mins to 2 hours',
    office_name: 'Online Only — PSCA E-Challan Portal (echallan.psca.gop.pk)',
    office_address: 'Online only at echallan.psca.gop.pk. No need to visit an office.',
    office_timings: 'Online 24 hours / 7 days a week',
    best_day_to_go: 'Anytime — portal is open 24 hours (pay within 10 days to avoid extra penalty)',
    official_source_url: 'https://echallan.psca.gop.pk/',
    last_updated: '2026-11-17T00:00:00Z',
    is_verified: true,
    is_nationwide: true,
    popularity_rank: 10,
  },
];

export const SEED_DOCUMENTS: ProcessDocument[] = [
  // 1. Passport Renewal in Rawalpindi
  { id: 'd1010000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.passportRenewal, name: 'Original Old Passport (Current or Expired)', type: 'original', copies_needed: 1, note: 'Bring your original old passport even if it has already expired.', sort_order: 1 },
  { id: 'd1010000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.passportRenewal, name: 'Photocopy of Old Passport (First 2 Pages)', type: 'photocopy', copies_needed: 1, note: '1 clear photocopy of the first 2 pages of your old/expired passport.', sort_order: 2 },
  { id: 'd1010000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.passportRenewal, name: 'Original Valid CNIC', type: 'original', copies_needed: 1, note: 'Your CNIC must be valid — expired CNICs are rejected immediately.', sort_order: 3 },
  { id: 'd1010000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.passportRenewal, name: 'CNIC Photocopy (Front and Back)', type: 'photocopy', copies_needed: 1, note: '1 clear photocopy showing both front and back of your valid CNIC.', sort_order: 4 },
  { id: 'd1010000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.passportRenewal, name: 'Address Proof (Utility Bill — Only for Address Change)', type: 'photocopy', copies_needed: 1, note: 'Only needed if you are changing your address on the passport.', sort_order: 5 },

  // 2. CNIC Renewal in Rawalpindi
  { id: 'd1020000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.cnicRenewal, name: 'Original Old CNIC (No Attestation Required)', type: 'original', copies_needed: 1, note: 'Under Rule 12 (NADRA NIC Rules, 2002), no gazetted attestation is needed for CNIC renewal. Your previous card is surrendered/punched.', sort_order: 1 },
  { id: 'd1020000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.cnicRenewal, name: 'Old CNIC Photocopy', type: 'photocopy', copies_needed: 1, note: '1 clear front-and-back photocopy of your old CNIC for your records.', sort_order: 2 },
  { id: 'd1020000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.cnicRenewal, name: 'Utility Bill or Rent Agreement (If Address Changed)', type: 'photocopy', copies_needed: 1, note: 'Required only if you are updating your current or permanent address.', sort_order: 3 },
  { id: 'd1020000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.cnicRenewal, name: 'Computerized Marriage Certificate (MRC) & Spouse CNIC Copy (If Marital Status Changed)', type: 'original', copies_needed: 1, note: 'Required under NADRA Regulation 41 only if your marital status changed since your previous CNIC.', sort_order: 4 },

  // 3. Driving Licence Renewal in Rawalpindi
  { id: 'd1030000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.drivingLicence, name: 'Original Old Driving Licence', type: 'original', copies_needed: 1, note: 'Your original expiring or expired Punjab driving licence.', sort_order: 1 },
  { id: 'd1030000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.drivingLicence, name: 'Photocopy of Old Driving Licence', type: 'photocopy', copies_needed: 1, note: '1 photocopy of your old licence (or photo/scan to upload in Dastak app).', sort_order: 2 },
  { id: 'd1030000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.drivingLicence, name: 'Original Valid CNIC', type: 'original', copies_needed: 1, note: 'Bring your original CNIC for verification.', sort_order: 3 },
  { id: 'd1030000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.drivingLicence, name: 'CNIC Photocopy', type: 'photocopy', copies_needed: 1, note: '1 front-and-back photocopy of your CNIC.', sort_order: 4 },
  { id: 'd1030000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.drivingLicence, name: '1 Fresh Passport-Size Photo (White Background)', type: 'original', copies_needed: 1, note: 'Recent passport-size photograph with a plain white background.', sort_order: 5 },
  { id: 'd1030000-0000-4000-8000-000000000006', process_id: PROCESS_IDS.drivingLicence, name: 'Medical Certificate (If Over 60 or Renewing After Long Expiry)', type: 'original', copies_needed: 1, note: 'Only required if you are over 60 years old or renewing after a long expiry.', sort_order: 6 },

  // 4. FBR NTN Registration for Freelancers
  { id: 'd1040000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.fbrNtn, name: 'Valid Original CNIC + Front & Back Scan (PDF or JPG Under 2MB)', type: 'photocopy', copies_needed: 1, note: 'Your 13-digit CNIC (without dashes) serves as your individual NTN / IRIS Registration Number.', sort_order: 1 },
  { id: 'd1040000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.fbrNtn, name: 'Active Mobile SIM Registered Against Your Own CNIC', type: 'original', copies_needed: 1, note: 'Mandatory per FBR rules — IRIS SMS verification fails if the SIM is not registered on your own CNIC.', sort_order: 2 },
  { id: 'd1040000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.fbrNtn, name: 'Personal Email Address Belonging to You', type: 'original', copies_needed: 1, note: 'Receives the separate Email verification code along with your IRIS password and PIN.', sort_order: 3 },
  { id: 'd1040000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.fbrNtn, name: 'Certificate of Maintenance of Personal Bank Account (Scanned PDF)', type: 'photocopy', copies_needed: 1, note: 'Official FBR requirement: scanned PDF of bank account maintenance certificate in your own name (attached in Form 181).', sort_order: 4 },
  { id: 'd1040000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.fbrNtn, name: 'Business Premises Tenancy/Ownership Proof & Paid Utility Bill <= 3 Months (If Running a Business)', type: 'photocopy', copies_needed: 1, note: 'Required by FBR if registering a business: scanned tenancy/ownership evidence plus paid utility bill not older than 3 months (and business letterhead if applicable).', sort_order: 5 },

  // 5. Domicile Certificate in Rawalpindi
  { id: 'd1050000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.domicile, name: 'Your CNIC Original + 1 Copy (or B-Form / Birth Certificate if Under 18)', type: 'original', copies_needed: 1, note: 'Bring your original CNIC + 1 photocopy, or B-Form / birth certificate if under 18.', sort_order: 1 },
  { id: 'd1050000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.domicile, name: 'Father, Mother, or Spouse CNIC Copy', type: 'photocopy', copies_needed: 1, note: 'Mandatory — bringing only your own CNIC is not enough.', sort_order: 2 },
  { id: 'd1050000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.domicile, name: 'AC Verification Form', type: 'original', copies_needed: 1, note: 'Available at the e-Khidmat center — your file will be returned without it.', sort_order: 3 },
  { id: 'd1050000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.domicile, name: 'Form P', type: 'original', copies_needed: 1, note: 'Standard domicile application form, available at the e-Khidmat center.', sort_order: 4 },
  { id: 'd1050000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.domicile, name: 'Affidavit on Stamp Paper (Rs. 300)', type: 'original', copies_needed: 1, note: 'Rs. 300 e-affidavit, available directly at the e-Khidmat center.', sort_order: 5 },
  { id: 'd1050000-0000-4000-8000-000000000006', process_id: PROCESS_IDS.domicile, name: '2 Fresh Passport-Size Photos', type: 'original', copies_needed: 2, note: 'Bring 2 recent passport-size photographs.', sort_order: 6 },
  { id: 'd1050000-0000-4000-8000-000000000007', process_id: PROCESS_IDS.domicile, name: 'Proof of Residence (Property Papers, Utility Bill, Rent Agreement, or Voter List Entry)', type: 'photocopy', copies_needed: 1, note: 'Address on your proof of residence must match your CNIC or declared address.', sort_order: 7 },

  // 6. Birth Certificate from Union Council in Rawalpindi
  { id: 'd1060000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.birthCertificate, name: 'Hospital Birth Slip or Discharge Slip (If Available)', type: 'original', copies_needed: 1, note: 'Bring the hospital birth or discharge slip if available.', sort_order: 1 },
  { id: 'd1060000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.birthCertificate, name: 'Father CNIC Original + 1 Copy', type: 'original', copies_needed: 1, note: 'Father’s original CNIC along with 1 photocopy.', sort_order: 2 },
  { id: 'd1060000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.birthCertificate, name: 'Mother CNIC Original + 1 Copy', type: 'original', copies_needed: 1, note: 'Mother’s original CNIC along with 1 photocopy.', sort_order: 3 },
  { id: 'd1060000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.birthCertificate, name: 'Nikahnama (If Asked for Verification)', type: 'photocopy', copies_needed: 1, note: 'Keep a photocopy of the Nikahnama ready in case the UC Secretary requests verification.', sort_order: 4 },
  { id: 'd1060000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.birthCertificate, name: 'Affidavit & Proof of Birth (For Late Registration After 7 Years)', type: 'original', copies_needed: 1, note: 'Required only if registering a birth after 7 years (late fee Rs. 200 to Rs. 1,000 applies).', sort_order: 5 },

  // 7. Police Character Certificate in Rawalpindi
  { id: 'd1070000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.policeCharacter, name: 'Original CNIC or B-Form + Photocopy (Front & Back)', type: 'original', copies_needed: 1, note: 'Your CNIC address should match your current residence address.', sort_order: 1 },
  { id: 'd1070000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.policeCharacter, name: 'Original Passport + Photocopy (Required for Visa Purpose)', type: 'original', copies_needed: 1, note: 'Mandatory for visa, immigration, or study/work abroad applications.', sort_order: 2 },
  { id: 'd1070000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.policeCharacter, name: '2 Passport-Size Photos', type: 'original', copies_needed: 2, note: 'Bring 2 recent passport-size photographs.', sort_order: 3 },
  { id: 'd1070000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.policeCharacter, name: 'Old Character Certificate (If Renewing)', type: 'original', copies_needed: 1, note: 'Only needed if you are renewing an earlier character certificate.', sort_order: 4 },
  { id: 'd1070000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.policeCharacter, name: 'Visa or Job Letter (For Abroad, If Available)', type: 'photocopy', copies_needed: 1, note: 'Optional, helps clearly mention the purpose on the certificate.', sort_order: 5 },

  // 8. Child Passport Under 18 in Rawalpindi
  { id: 'd1080000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.childPassport, name: 'Child B-Form / CRC Original + Copy (NADRA Biometric CRC Rules Apply by Age)', type: 'original', copies_needed: 1, note: 'Official NADRA CRC rules: under age 3 needs photo on CRC for passport; ages 3–10 need Photo + IRIS; ages 10–17 MUST include Photo + Fingerprints + IRIS (update at NADRA first: Rs. 50 Normal / 7 days, Rs. 500 Executive / 1 day).', sort_order: 1 },
  { id: 'd1080000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.childPassport, name: 'Father CNIC Original + Copy', type: 'original', copies_needed: 1, note: 'Father’s CNIC must be valid (not expired) + 1 photocopy.', sort_order: 2 },
  { id: 'd1080000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.childPassport, name: 'Mother CNIC Original + Copy', type: 'original', copies_needed: 1, note: 'Mother’s CNIC must be valid (not expired) + 1 photocopy.', sort_order: 3 },
  { id: 'd1080000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.childPassport, name: 'Computerized Birth Certificate from Union Council', type: 'original', copies_needed: 1, note: 'Bring the child’s computerized birth certificate issued by the Union Council.', sort_order: 4 },
  { id: 'd1080000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.childPassport, name: 'Attested Consent Affidavit from Absent Parent (If One Parent Is Absent)', type: 'original', copies_needed: 1, note: 'Mandatory if only one parent visits the Passport Office — file is rejected without it.', sort_order: 5 },
  { id: 'd1080000-0000-4000-8000-000000000006', process_id: PROCESS_IDS.childPassport, name: 'Old Child Passport (If Renewal)', type: 'original', copies_needed: 1, note: 'Bring the child’s previous passport if renewing.', sort_order: 6 },

  // 9. Name Change on CNIC After Marriage
  { id: 'd1090000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.nameChangeMarriage, name: 'Your Old CNIC Original + Copy', type: 'original', copies_needed: 1, note: 'Bring your original current CNIC plus 1 photocopy (your old card is surrendered/punched when issuing a modified card).', sort_order: 1 },
  { id: 'd1090000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.nameChangeMarriage, name: 'Computerized Marriage Certificate (MRC) from Union Council — Original + Copy', type: 'original', copies_needed: 1, note: 'Mandatory under NADRA Regulation 41 before visiting NADRA — a manual handwritten Nikahnama alone is not accepted.', sort_order: 2 },
  { id: 'd1090000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.nameChangeMarriage, name: 'Spouse CNIC / POC / Passport Copy (Husband’s Copy for Wife)', type: 'photocopy', copies_needed: 1, note: 'Official NADRA Regulation 41 requirement when updating marital status or adding husband’s name.', sort_order: 3 },
  { id: 'd1090000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.nameChangeMarriage, name: 'Wife CNIC / POC / Passport Copy (For Husband Updating Record)', type: 'photocopy', copies_needed: 1, note: 'Required when the husband updates his NADRA marital status (update both spouses so FRC matches later).', sort_order: 4 },
  { id: 'd1090000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.nameChangeMarriage, name: 'Undertaking / Affidavit for Name Change (Only If Changing Given Name Beyond Spouse Name)', type: 'original', copies_needed: 1, note: 'A woman may keep her father’s name or adopt her husband’s name using the MRC; altering a given name requires NADRA’s prescribed Schedule VI undertaking/declaration.', sort_order: 5 },

  // 10. E-Challan Check and Payment in Punjab
  { id: 'd1100000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.eChallan, name: 'Vehicle Registration Number', type: 'original', copies_needed: 1, note: 'Your vehicle number plate, for example LEA-1234 or GAA-123.', sort_order: 1 },
  { id: 'd1100000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.eChallan, name: 'Owner CNIC Number (13 Digits Without Dashes) or Chassis Number', type: 'original', copies_needed: 1, note: 'Enter the owner’s 13-digit CNIC without dashes, or your vehicle chassis number.', sort_order: 2 },
];

export const SEED_STEPS: ProcessStep[] = [
  // 1. Passport Renewal Rawalpindi (4 steps)
  { id: 'e1010000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.passportRenewal, step_number: 1, title: 'Go to Token Counter & Get Renewal Token', description: 'Arrive at Regional Passport Office, GT Road, Rawalpindi (best window: Tuesday to Thursday, 8:30 AM to 10:00 AM) and get a token for e-passport renewal.', time_minutes: 15 },
  { id: 'e1010000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.passportRenewal, step_number: 2, title: 'Biometric Verification & Photo at Counter', description: 'Complete biometric verification and have your live photograph taken at the counter. Do not bring your own photo — photos are captured directly at the office.', time_minutes: 20 },
  { id: 'e1010000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.passportRenewal, step_number: 3, title: 'Pay Fee via Bank Counter or PSID', description: 'Pay the official e-passport fee at the bank counter inside the office or online via PSID (5-year 36-page e-passport: Rs. 9,000 Normal or Rs. 15,000 Urgent; 10-year: Rs. 13,500 Normal or Rs. 22,500 Urgent).', time_minutes: 15 },
  { id: 'e1010000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.passportRenewal, step_number: 4, title: 'Collect Receipt with Tracking ID & Track on dgip.gov.pk', description: 'Collect your receipt with the tracking ID and track your application status on dgip.gov.pk. Delivery takes 21 working days (Normal), 5 working days (Urgent), or 2 working days (Executive at Executive Offices).', time_minutes: 10 },

  // 2. CNIC Renewal Rawalpindi (4 steps)
  { id: 'e1020000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.cnicRenewal, step_number: 1, title: 'Visit NADRA Center or Use Official PakID App', description: 'Under Rule 12 (NADRA NIC Rules, 2002), apply anytime up to 1 month after expiry with no attestation required. Visit NADRA Mega Center, Saddar, Rawalpindi (weekday 9:00 AM – 11:00 AM is best) and take a renewal token, or apply online via the official PakID app.', time_minutes: 35 },
  { id: 'e1020000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.cnicRenewal, step_number: 2, title: 'Biometrics, Photo & Signature at Counter', description: 'NADRA updates your biometrics, live photograph, and signature at renewal (your previous card is surrendered/punched). Double-check the spelling of your name and father’s name on screen before final submit, and provide a mobile SIM registered on your own CNIC.', time_minutes: 15 },
  { id: 'e1020000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.cnicRenewal, step_number: 3, title: 'Pay Official Renewal Fee at Cash Counter', description: 'Pay at the fee counter — Smart CNIC (SNIC): Rs. 750 Normal (31 days) / Rs. 1,500 Urgent (23 days) / Rs. 2,500 Executive (9 days); Ordinary CNIC: Rs. 400 Normal (15 days) / Rs. 1,150 Urgent (12 days) / Rs. 2,150 Executive (6 days).', time_minutes: 10 },
  { id: 'e1020000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.cnicRenewal, step_number: 4, title: 'Get Tracking Slip & Track via PakID or Helpline 1777', description: 'Take your tracking slip and snap a photo of it immediately so you do not lose it. Track status via the PakID app or 24/7 NADRA Helpline 1777, then collect your renewed card or opt for home delivery.', time_minutes: 5 },

  // 3. Driving Licence Renewal Rawalpindi (4 steps)
  { id: 'e1030000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.drivingLicence, step_number: 1, title: 'Open Dastak App or Go to Police Khidmat Markaz', description: 'Open the Dastak Punjab app / DLIMS online (takes ~10 mins) or visit Police Khidmat Markaz, Rawalpindi between 9:00 AM and 11:00 AM on a weekday (20–30 mins if documents are ready).', time_minutes: 5 },
  { id: 'e1030000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.drivingLicence, step_number: 2, title: 'Select Renewal & Upload Photo + Old Licence Copy', description: 'Choose Driving Licence Renewal, verify your current home delivery address carefully, and upload/submit your fresh white-background photo and old licence copy.', time_minutes: 10 },
  { id: 'e1030000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.drivingLicence, step_number: 3, title: 'Generate PSID Challan & Pay Within 24 Hours', description: 'Generate the PSID challan (Car: Rs. 1,830 with courier; Motorcycle: Rs. 930 with courier; LTV/HTV: Rs. 2,330 with courier) and pay within 24 hours via JazzCash, Easypaisa, bank app, or ATM.', time_minutes: 5 },
  { id: 'e1030000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.drivingLicence, step_number: 4, title: 'Receive New Licence at Home by Courier', description: 'Your renewed driving licence is printed and delivered directly to your home address by courier within 7 to 10 days.', time_minutes: 5 },

  // 4. FBR NTN Registration for Freelancers (5 steps)
  { id: 'e1040000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.fbrNtn, step_number: 1, title: 'Open iris.fbr.gov.pk & Click "Registration for Unregistered Person"', description: 'Go to iris.fbr.gov.pk (weekday mornings are fastest) and click "Registration for Unregistered Person" for a new individual registration. (Only use "E-Enrollment for Registered Person" if you already held an older NTN.)', time_minutes: 3 },
  { id: 'e1040000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.fbrNtn, step_number: 2, title: 'Verify Separate SMS & Email Codes to Get IRIS Password & PIN', description: 'Enter your 13-digit CNIC (without dashes), mobile SIM registered against your own CNIC, and active personal email. Enter the separate SMS and Email verification codes to receive your IRIS Password and PIN.', time_minutes: 5 },
  { id: 'e1040000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.fbrNtn, step_number: 3, title: 'Log In & Open Draft → Registration → Form 181', description: 'Log in to IRIS using your 13-digit CNIC and password, open Draft → Registration → "181 (Form of Registration filed voluntarily)" and click Edit. Fill your residential address, accounting period, principal activity (Freelancer / IT & IT-Enabled Services), and bank account details.', time_minutes: 10 },
  { id: 'e1040000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.fbrNtn, step_number: 4, title: 'Upload Official PDF Attachments & Submit Form 181', description: 'Under Attachments, upload your scanned bank account maintenance certificate PDF in your own name (plus business premises tenancy/ownership proof and a paid utility bill not older than 3 months if running a business) and click Submit.', time_minutes: 5 },
  { id: 'e1040000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.fbrNtn, step_number: 5, title: 'Download Form 181 Registration Order from Completed Tasks', description: 'Save your IRIS password and PIN securely. Within minutes to 3 working days, open Completed Tasks for "181 (Order to grant / refuse registration on application)" — your 13-digit CNIC is now your active NTN and you can file Income Tax Return (Form 114).', time_minutes: 2 },

  // 5. Domicile Certificate Rawalpindi (4 steps)
  { id: 'e1050000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.domicile, step_number: 1, title: 'Get Form P & AC Verification Form from Center', description: 'Visit e-Khidmat Markaz, District Complex, Rawalpindi (Tuesday to Thursday, 9:00 AM – 11:00 AM) and collect both Form P and the AC Verification Form.', time_minutes: 10 },
  { id: 'e1050000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.domicile, step_number: 2, title: 'Fill Forms & Get Rs. 300 Affidavit Made at Center', description: 'Fill in Form P and the AC Verification Form accurately (ensuring residence address matches your CNIC/proof) and get your Rs. 300 e-affidavit prepared at the center.', time_minutes: 20 },
  { id: 'e1050000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.domicile, step_number: 3, title: 'Submit File & Pay Rs. 550 via e-Pay or Challan', description: 'Submit your complete document file (including parent/spouse CNIC copy, 2 photos, and residence proof) and pay the Rs. 550 total 2026 fee (Rs. 200 fee + Rs. 300 e-affidavit + Rs. 50 PITB charge) via e-Pay or challan.', time_minutes: 15 },
  { id: 'e1050000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.domicile, step_number: 4, title: 'Collect Tracking Slip & Certificate (16 Working Days)', description: 'Take your tracking slip. Your computerized Domicile Certificate is ready in 16 working days standard (or 2 to 3 days if Maryam Ki Dastak fast track is available in your area).', time_minutes: 5 },

  // 6. Birth Certificate from Union Council Rawalpindi (4 steps)
  { id: 'e1060000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.birthCertificate, step_number: 1, title: 'Go to Union Council Secretary With Parents’ CNICs', description: 'Visit your local Union Council, Municipal Committee, or Cantonment Board Secretary between 9:00 AM and 12:00 PM with both parents’ original CNICs and copies (do NOT go to NADRA first).', time_minutes: 15 },
  { id: 'e1060000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.birthCertificate, step_number: 2, title: 'Fill Birth Registration Form & Triple-Check Spelling', description: 'Fill out the birth registration form and verify the spelling of the child’s name, date of birth, and parents’ names 3 times — mistakes cause major problems for B-Form and passport later.', time_minutes: 15 },
  { id: 'e1060000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.birthCertificate, step_number: 3, title: 'System Entry & Collect Computerized Birth Certificate', description: 'The Secretary enters the record into the system. Timely registration within 7 years is FREE, and you receive the computerized birth certificate the same day or in 2 to 3 days.', time_minutes: 15 },
  { id: 'e1060000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.birthCertificate, step_number: 4, title: 'Use Certificate to Apply for B-Form (CRC) at NADRA', description: 'Take your computerized Union Council birth certificate to NADRA to apply for your child’s CRC / B-Form. Official NADRA CRC fees: Normal Rs. 50 (7 days) or Executive Rs. 500 (1 day). Remember CRC expires at ages 3, 10, and 18.', time_minutes: 15 },

  // 7. Police Character Certificate Rawalpindi (4 steps)
  { id: 'e1070000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.policeCharacter, step_number: 1, title: 'Go to Any Khidmat Markaz & Take Character Certificate Token', description: 'Visit Rescue 15 Office (Liaqat Bagh Metro Station, Murree Road) or any Punjab Police Khidmat Markaz (Taxila, Murree, Gujar Khan, Kahuta) between 9:00 AM and 11:00 AM and take a token specifically for "Character Certificate".', time_minutes: 10 },
  { id: 'e1070000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.policeCharacter, step_number: 2, title: 'Fill Form, Give Biometrics & Photo', description: 'Complete the application form with your CNIC, passport details (for visa), and matching current address, then complete biometrics and live photo.', time_minutes: 15 },
  { id: 'e1070000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.policeCharacter, step_number: 3, title: 'Pay Rs. 500 at Counter & Get Tracking Slip', description: 'Pay the official Rs. 500 Character Certificate fee at the counter (not Rs. 300 general verification) and collect your tracking slip.', time_minutes: 10 },
  { id: 'e1070000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.policeCharacter, step_number: 4, title: 'Receive QR-Verified Certificate by Courier in 3 Working Days', description: 'Your original Police Character Certificate with a scannable QR code for verification is delivered to your address by courier in 3 working days.', time_minutes: 5 },

  // 8. Child Passport Under 18 Rawalpindi (5 steps)
  { id: 'e1080000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.childPassport, step_number: 1, title: 'Both Parents & Child Go to Passport Office', description: 'Visit Regional Passport Office, Rawalpindi at 9:00 AM on a weekday with both parents and the child (or one parent carrying an attested consent affidavit from the absent parent).', time_minutes: 15 },
  { id: 'e1080000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.childPassport, step_number: 2, title: 'Take Token for Minor & Complete Biometrics', description: 'Collect a minor passport token. Biometrics are taken for both parents, and also for the child if age 10 or older.', time_minutes: 20 },
  { id: 'e1080000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.childPassport, step_number: 3, title: 'Child Photo Taken at Office', description: 'The child’s photograph is captured live at the Passport Office counter — you do not need to bring studio photos.', time_minutes: 10 },
  { id: 'e1080000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.childPassport, step_number: 4, title: 'Pay Fee & Collect Tracking Slip', description: 'Pay the e-passport fee (Rs. 9,000 Normal or Rs. 15,000 Urgent for 36 pages, 5 years) and keep your printed tracking slip safely.', time_minutes: 15 },
  { id: 'e1080000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.childPassport, step_number: 5, title: 'Passport Delivered by Courier', description: 'Your child’s e-passport is delivered by courier — Normal takes 21 working days and Urgent takes 5 working days.', time_minutes: 5 },

  // 9. Name Change on CNIC After Marriage (5 steps)
  { id: 'e1090000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.nameChangeMarriage, step_number: 1, title: 'Get Computerized Marriage Certificate (MRC) from Union Council', description: 'First obtain your computerized Marriage Registration Certificate (MRC) from your local Union Council. Under NADRA Regulation 41, this plus your spouse’s CNIC/POC/Passport is strictly mandatory — a manual Nikahnama alone is not accepted.', time_minutes: 30 },
  { id: 'e1090000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.nameChangeMarriage, step_number: 2, title: 'Visit NADRA Center or Use Official PakID App', description: 'Visit NADRA Mega Center, Saddar, Rawalpindi on a weekday morning (or apply via the official PakID app) and take a token for CNIC Modification (or Non-Printable Field Update if only updating marital status in the database).', time_minutes: 15 },
  { id: 'e1090000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.nameChangeMarriage, step_number: 3, title: 'Present MRC & Confirm Name Preference Clearly', description: 'Present your computerized MRC and spouse CNIC copy. Tell the operator clearly whether you want to keep your father’s name (your legal right) or add your husband’s name/surname, and update marital status to Married for both spouses so FRC matches later.', time_minutes: 10 },
  { id: 'e1090000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.nameChangeMarriage, step_number: 4, title: 'Biometrics, Live Photo & On-Screen Verification', description: 'Complete biometrics, live photo, and signature at the counter, surrender/punch your previous card if getting a new printed CNIC, and verify all English & Urdu spellings carefully on screen.', time_minutes: 10 },
  { id: 'e1090000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.nameChangeMarriage, step_number: 5, title: 'Pay Official NADRA Fee & Save Tracking Slip', description: 'Pay at the counter — Ordinary CNIC: Rs. 400 Normal (15 days) / Rs. 1,150 Urgent (12 days) / Rs. 2,150 Executive (6 days); Smart CNIC: Rs. 750 (31 days) / Rs. 1,500 (23 days) / Rs. 2,500 (9 days); or DB-only marital status update: Rs. 100 at NRC (2 days) / USD 5 on PakID (2 days).', time_minutes: 10 },

  // 10. E-Challan Check and Payment in Punjab (5 steps)
  { id: 'e1100000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.eChallan, step_number: 1, title: 'Open Official Portal: echallan.psca.gop.pk', description: 'Type echallan.psca.gop.pk directly into your browser yourself — NEVER click links sent via SMS, as many are scams.', time_minutes: 1 },
  { id: 'e1100000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.eChallan, step_number: 2, title: 'Enter Vehicle Number + Owner CNIC or Chassis Number', description: 'Enter your vehicle registration number (e.g., LEA-1234) and the owner’s 13-digit CNIC (without dashes) or chassis number, then tap Search.', time_minutes: 1 },
  { id: 'e1100000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.eChallan, step_number: 3, title: 'Select Challan & Generate 17-Digit PSID in e-Pay Punjab', description: 'If an unpaid challan exists, select it and generate a 17-digit PSID code in the e-Pay Punjab app.', time_minutes: 2 },
  { id: 'e1100000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.eChallan, step_number: 4, title: 'Pay PSID Within 24 Hours via App, ATM, or Counter', description: 'Pay your 17-digit PSID through JazzCash, Easypaisa, your bank app, a 1Link ATM, or over the counter within 24 hours before the PSID expires.', time_minutes: 2 },
  { id: 'e1100000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.eChallan, step_number: 5, title: 'Save Screenshot of Payment Receipt', description: 'Save a screenshot of your payment receipt. Payment confirmation takes 10 minutes to 2 hours to reflect on the PSCA portal.', time_minutes: 1 },
];

export const SEED_MISTAKES: ProcessMistake[] = [
  // 1. Passport Renewal Rawalpindi
  { id: '11010000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.passportRenewal, title: 'Bringing an Expired CNIC', description: 'Your CNIC must be valid on the day of your application. If your CNIC is expired, renew it at NADRA first before visiting the Passport Office.', sort_order: 1 },
  { id: '11010000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.passportRenewal, title: 'Bringing Your Own Photo (Wrong Photo)', description: 'Do not bring your own studio photo — your live passport photograph is captured directly at the Passport Office counter.', sort_order: 2 },
  { id: '11010000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.passportRenewal, title: 'Going After 11:00 AM on Monday', description: 'Monday is the most crowded day — going after 11:00 AM on Monday means waiting 2 hours extra. Visit Tuesday to Thursday between 8:30 AM and 10:00 AM instead.', sort_order: 3 },

  // 2. CNIC Renewal Rawalpindi
  { id: '11020000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.cnicRenewal, title: 'Using Someone Else’s Mobile Number', description: 'Always use a mobile SIM registered on your own CNIC so verification and delivery tracking SMS messages arrive properly.', sort_order: 1 },
  { id: '11020000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.cnicRenewal, title: 'Not Checking Spelling of Name & Father’s Name on Screen', description: 'Carefully check the spelling of your name and father’s name on the operator’s screen before final submit — errors after printing require a new modification fee.', sort_order: 2 },
  { id: '11020000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.cnicRenewal, title: 'Losing Your Tracking Slip', description: 'Take a photo of your tracking slip immediately at the counter so you never lose your tracking ID before card collection.', sort_order: 3 },

  // 3. Driving Licence Renewal Rawalpindi
  { id: '11030000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.drivingLicence, title: 'Letting Licence Expire More Than 3 Months', description: 'Late renewal adds extra fines: for a car licence, the late fine is Rs. 675 for 1 to 3 months late, and Rs. 1,350 for 3 to 6 months late.', sort_order: 1 },
  { id: '11030000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.drivingLicence, title: 'Using an Old Address', description: 'Your new driving licence is delivered by courier — if your address is wrong or outdated, courier delivery will fail.', sort_order: 2 },
  { id: '11030000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.drivingLicence, title: 'Not Paying PSID Within 24 Hours', description: 'Your generated PSID challan expires after 24 hours, forcing you to generate a new PSID and start payment again.', sort_order: 3 },

  // 4. FBR NTN for Freelancers
  { id: '11040000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.fbrNtn, title: 'Using a SIM Not Registered on Your Own CNIC', description: 'FBR verifies SIM ownership against NADRA records — IRIS SMS code verification will fail if the SIM is not registered against your own CNIC.', sort_order: 1 },
  { id: '11040000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.fbrNtn, title: 'Stopping After Account Creation Without Submitting Form 181', description: 'Getting your IRIS password is only Step 1 — you MUST log in, open Draft → Registration → Form 181, upload attachments, and Submit to receive your 181 Registration Order in Completed Tasks (otherwise you cannot file Form 114 returns).', sort_order: 2 },
  { id: '11040000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.fbrNtn, title: 'Using a Fake Address or Losing Your IRIS Password & PIN', description: 'Never enter a fake business address (FBR can verify premises), and save both your IRIS password and PIN securely — you need them every year to file tax returns.', sort_order: 3 },

  // 5. Domicile Certificate Rawalpindi
  { id: '11050000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.domicile, title: 'Bringing Only Your Own CNIC', description: 'You also need a copy of your father’s, mother’s, or spouse’s CNIC — bringing only your own CNIC is not sufficient.', sort_order: 1 },
  { id: '11050000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.domicile, title: 'Wrong Address on Proof of Residence', description: 'The address on your property papers, utility bill, rent agreement, or voter list entry must match your CNIC or declared address.', sort_order: 2 },
  { id: '11050000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.domicile, title: 'Forgetting the AC Verification Form', description: 'The AC Verification Form (available at the center) is mandatory — your domicile file will be returned without it.', sort_order: 3 },

  // 6. Birth Certificate from Union Council Rawalpindi
  { id: '11060000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.birthCertificate, title: 'Spelling Mistake in Child’s Name', description: 'A spelling error in the child’s name will cause problems for B-Form, school records, and passport later. Check the spelling 3 times before submission.', sort_order: 1 },
  { id: '11060000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.birthCertificate, title: 'Not Registering Within 7 Years', description: 'Birth registration is completely FREE within 7 years — waiting past 7 years means paying a Rs. 200 to Rs. 1,000 late fee and providing extra affidavit and proof of birth documents.', sort_order: 2 },
  { id: '11060000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.birthCertificate, title: 'Going to NADRA First', description: 'NADRA does NOT issue birth certificates — your local Union Council, Municipal Committee, or Cantonment Board issues the birth certificate first.', sort_order: 3 },

  // 7. Police Character Certificate Rawalpindi
  { id: '11070000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.policeCharacter, title: 'Confusing Character Certificate With General Police Verification', description: 'For visas and embassies you need a Police Character Certificate (Rs. 500), NOT General Police Verification (Rs. 300).', sort_order: 1 },
  { id: '11070000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.policeCharacter, title: 'CNIC Address Not Matching Your Current Address', description: 'Your CNIC address must match your current address — update your address with NADRA first if you moved.', sort_order: 2 },
  { id: '11070000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.policeCharacter, title: 'Applying at the Last Minute', description: 'Embassies require the original QR-coded certificate (photocopies are not accepted), so apply early and allow 3 working days for courier delivery.', sort_order: 3 },

  // 8. Child Passport Under 18 Rawalpindi
  { id: '11080000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.childPassport, title: 'Coming With Only One Parent and No Affidavit', description: 'Both parents must be present — if one parent is absent, you must bring an attested consent affidavit from the absent parent or the file will be rejected.', sort_order: 1 },
  { id: '11080000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.childPassport, title: 'Outdated B-Form / CRC Missing Photo, IRIS, or Fingerprints', description: 'Under official NADRA CRC rules, children aged 3–10 need Photo + IRIS on their CRC, and children aged 10–17 MUST have Photo + Fingerprints + IRIS (under 3 needs Photo for passport) — otherwise you will be sent back to NADRA first.', sort_order: 2 },
  { id: '11080000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.childPassport, title: 'Expired Parent CNIC', description: 'Both father’s and mother’s CNICs must be valid — an expired parent CNIC blocks the child’s passport application.', sort_order: 3 },

  // 9. Name Change on CNIC After Marriage
  { id: '11090000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.nameChangeMarriage, title: 'Going to NADRA Without a Computerized Marriage Certificate', description: 'A manual Nikahnama is not enough — you must first get a computerized Marriage Registration Certificate (MRC) from your Union Council.', sort_order: 1 },
  { id: '11090000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.nameChangeMarriage, title: 'Not Updating Both Husband and Wife Records', description: 'Update marital status for both husband and wife — otherwise your Family Registration Certificate (FRC) will not match later for visas.', sort_order: 2 },
  { id: '11090000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.nameChangeMarriage, title: 'Trying to Change Name Back Later', description: 'NADRA allows a name change only once in a lifetime (except after marriage), so be certain before changing your surname.', sort_order: 3 },

  // 10. E-Challan Check and Payment in Punjab
  { id: '11100000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.eChallan, title: 'Paying via a Link Sent in SMS', description: 'Many SMS links claiming you have an unpaid e-challan are scams. Always type echallan.psca.gop.pk directly into your browser yourself.', sort_order: 1 },
  { id: '11100000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.eChallan, title: 'Not Paying PSID Within 24 Hours', description: 'Your 17-digit PSID expires after 24 hours — if you miss the window, you will have to generate a fresh PSID again.', sort_order: 2 },
  { id: '11100000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.eChallan, title: 'Ignoring an Unpaid E-Challan', description: 'Unpaid challans attract extra penalties after 10 days and will block your vehicle transfer and driving licence renewal later.', sort_order: 3 },
];

export const SEED_FAQS: ProcessFaq[] = [
  // 1. Passport Renewal Rawalpindi
  { id: 'f1010000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.passportRenewal, question: 'Can I still apply for an old Machine Readable Passport (MRP)?', answer: 'No. Since Oct 2026, Pakistan issues only e-passports and MRP is discontinued. All new renewals are issued as e-passports.', sort_order: 1 },
  { id: 'f1010000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.passportRenewal, question: 'What is the fee for a 5-year vs 10-year 36-page e-Passport?', answer: 'For a 36-page e-passport: 5 years costs Rs. 9,000 (Normal) or Rs. 15,000 (Urgent); 10 years costs Rs. 13,500 (Normal) or Rs. 22,500 (Urgent).', sort_order: 2 },
  { id: 'f1010000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.passportRenewal, question: 'Can I renew my passport online instead of visiting GT Road Rawalpindi?', answer: 'Yes, passport renewal is also available online via the official DGIP portal (dgip.gov.pk). If visiting in person, go to Regional Passport Office, GT Road, Rawalpindi between Tuesday and Thursday, 8:30 AM to 10:00 AM.', sort_order: 3 },
  { id: 'f1010000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.passportRenewal, question: 'Do I need to bring passport-size photographs?', answer: 'No! Do not bring your own photo — your photograph is taken live at the Passport Office counter during biometric verification.', sort_order: 4 },
  { id: 'f1010000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.passportRenewal, question: 'How long does delivery take and how do I track my passport?', answer: 'Normal takes 21 working days, Urgent takes 5 working days, and Executive takes 2 working days at Executive Offices. Keep your receipt with tracking ID and check status on dgip.gov.pk.', sort_order: 5 },

  // 2. CNIC Renewal Rawalpindi
  { id: 'f1020000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.cnicRenewal, question: 'What is the official fee & delivery difference between Smart CNIC and Ordinary CNIC renewal?', answer: 'Per nadra.gov.pk/feeStructure: Smart CNIC (SNIC) renewal is Rs. 750 Normal (31 days), Rs. 1,500 Urgent (23 days), and Rs. 2,500 Executive (9 days). Ordinary CNIC (Teslin) renewal is Rs. 400 Normal (15 days), Rs. 1,150 Urgent (12 days), and Rs. 2,150 Executive (6 days).', sort_order: 1 },
  { id: 'f1020000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.cnicRenewal, question: 'Can I renew my CNIC online without visiting Saddar Mega Center?', answer: 'Yes! You can apply online through NADRA’s official PakID mobile app (Google Play & App Store) and track status in-app, though NADRA notes that biometric verification or live photograph capture may require visiting a NADRA Registration Centre (NRC) if needed.', sort_order: 2 },
  { id: 'f1020000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.cnicRenewal, question: 'Do I need gazetted officer attestation or when must I renew my CNIC?', answer: 'No attestation is required for CNIC renewal. Under Rule 12 of NADRA (NIC) Rules, 2002, citizens can apply for renewal anytime up to 1 month after expiry. Expect 45 mins–1.5 hrs wait at Saddar Mega Center on weekdays (9–11 AM), or 2+ hrs on Saturday.', sort_order: 3 },
  { id: 'f1020000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.cnicRenewal, question: 'What extra documents are needed if my address or marital status changed?', answer: 'If your address changed, bring a utility bill or rent agreement. If your marital status changed, under NADRA Regulation 41 bring your Union Council computerized Marriage Certificate (MRC) and spouse’s CNIC copy.', sort_order: 4 },
  { id: 'f1020000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.cnicRenewal, question: 'How do I contact NADRA or track my renewal application?', answer: 'Use a mobile SIM registered on your own CNIC, snap a photo of your tracking slip at the counter, and track via the PakID app or NADRA’s 24/7 Helpline: 1777 (mobile) / +92 51 111 786 100 (landline) / csd@nadra.gov.pk.', sort_order: 5 },

  // 3. Driving Licence Renewal Rawalpindi
  { id: 'f1030000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.drivingLicence, question: 'What is the total driving licence renewal fee in Punjab including courier?', answer: 'With the Rs. 480 courier fee included, 1-year renewal costs Rs. 930 for Motorcycle (Rs. 450 fee), Rs. 1,830 for Car / Jeep (Rs. 1,350 fee), and Rs. 2,330 for LTV / HTV (Rs. 1,850 fee).', sort_order: 1 },
  { id: 'f1030000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.drivingLicence, question: 'Can I renew my Punjab driving licence completely online?', answer: 'Yes! You can apply online in about 10 minutes via the Dastak Punjab app or DLIMS portal, pay the PSID challan through JazzCash, Easypaisa, bank app, or ATM, and receive your licence by courier in 7 to 10 days.', sort_order: 2 },
  { id: 'f1030000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.drivingLicence, question: 'What is the late fine if my car driving licence has expired?', answer: 'For a car licence in Punjab, late renewal adds a fine of Rs. 675 if 1 to 3 months late, and Rs. 1,350 if 3 to 6 months late.', sort_order: 3 },
  { id: 'f1030000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.drivingLicence, question: 'When do I need a medical certificate for renewal?', answer: 'A medical certificate is required if you are over 60 years old or if you are renewing after a long expiry.', sort_order: 4 },
  { id: 'f1030000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.drivingLicence, question: 'What happens if I do not pay the PSID within 24 hours?', answer: 'A Punjab PSID challan expires after 24 hours, so you will have to generate a fresh PSID and pay again. Also double-check your delivery address so courier delivery does not fail.', sort_order: 5 },

  // 4. FBR NTN Registration for Freelancers
  { id: 'f1040000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.fbrNtn, question: 'Does FBR NTN registration cost anything, and who can register online?', answer: 'No! FBR individual registration on iris.fbr.gov.pk (and in person at any Tax House / RTO Facilitation Counter) is 100% free (Rs. 0). Online IRIS registration is available for Individuals only — AOPs and Companies must visit a Tax House / RTO Facilitation Counter.', sort_order: 1 },
  { id: 'f1040000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.fbrNtn, question: 'What will my NTN number be after submitting Form 181?', answer: 'For Pakistani individuals, your 13-digit CNIC (without dashes) IS your NTN / IRIS Registration Number (7-digit NTNs are only for AOPs, Companies, and non-Pakistanis). After submitting Form 181, check Completed Tasks for "181 (Order to grant / refuse registration on application)".', sort_order: 2 },
  { id: 'f1040000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.fbrNtn, question: 'What official documents does FBR require for individual registration?', answer: 'Per fbr.gov.pk: valid original CNIC, a mobile SIM registered against your own CNIC, personal email address, scanned PDF of personal bank account maintenance certificate in your own name, and (if running a business) tenancy/ownership proof + paid business utility bill not older than 3 months.', sort_order: 3 },
  { id: 'f1040000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.fbrNtn, question: 'What tax rate applies to Pakistani freelancers / IT exporters under FBR Section 154A?', answer: 'Under Section 154A of the Income Tax Ordinance, IT and IT-enabled services export proceeds brought through banking channels are subject to 1% final tax, reduced to 0.25% final tax if registered with PSEB (Pakistan Software Export Board) and meeting filing conditions. Always confirm current Finance Act rates on fbr.gov.pk.', sort_order: 4 },
  { id: 'f1040000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.fbrNtn, question: 'What if I face an error on IRIS or need official FBR help?', answer: 'Try weekday mornings when IRIS is faster and OTPs arrive reliably. For official support, call the FBR National Helpline at 051-111-772-772 (Exclusive Line for Females: 051-9107025, Mon–Fri) or email helpline@fbr.gov.pk.', sort_order: 5 },

  // 5. Domicile Certificate Rawalpindi
  { id: 'f1050000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.domicile, question: 'What is the exact 2026 Domicile Certificate fee in Punjab?', answer: 'The total official 2026 fee in Punjab is Rs. 550: Rs. 200 government fee + Rs. 300 e-affidavit + Rs. 50 PITB charge, paid via e-Pay or challan.', sort_order: 1 },
  { id: 'f1050000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.domicile, question: 'Can I get my Rawalpindi Domicile delivered at home via Maryam Ki Dastak?', answer: 'Yes! Maryam Ki Dastak home delivery is available for an additional Rs. 900 to Rs. 1,200 service charge, and takes 2 to 3 days if Dastak fast track is available in your area.', sort_order: 2 },
  { id: 'f1050000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.domicile, question: 'Where do I get Form P, AC Verification Form, and the Rs. 300 affidavit?', answer: 'All three — Form P, the AC Verification Form, and the Rs. 300 stamp paper e-affidavit — are available directly at e-Khidmat Markaz, District Complex, Rawalpindi.', sort_order: 3 },
  { id: 'f1050000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.domicile, question: 'How many days does a standard Rawalpindi Domicile take?', answer: 'Standard processing through e-Khidmat Markaz takes 16 working days from the date of submission.', sort_order: 4 },
  { id: 'f1050000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.domicile, question: 'What documents count as valid proof of residence?', answer: 'Property papers, a utility bill, rent agreement, or voter list entry — make sure the address matches your CNIC or residence proof, and bring a parent or spouse CNIC copy.', sort_order: 5 },

  // 6. Birth Certificate from Union Council Rawalpindi
  { id: 'f1060000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.birthCertificate, question: 'Does NADRA issue birth certificates in Rawalpindi?', answer: 'No! Do not go to NADRA first. Birth certificates are issued by your local Union Council, Municipal Committee, or Cantonment Board. Afterward, use that certificate to apply for a B-Form at NADRA.', sort_order: 1 },
  { id: 'f1060000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.birthCertificate, question: 'Is birth registration really free within 7 years?', answer: 'Yes! Timely birth registration within 7 years is completely free (Rs. 0). Late registration after 7 years costs Rs. 200 to Rs. 1,000 for Pakistani citizens, foreign national child registration is Rs. 2,000, and a correction costs Rs. 500.', sort_order: 2 },
  { id: 'f1060000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.birthCertificate, question: 'How long does it take to get the computerized birth certificate?', answer: 'If your documents are complete, the Union Council Secretary enters the record in the system and issues the computerized birth certificate the same day or in 2 to 3 days.', sort_order: 3 },
  { id: 'f1060000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.birthCertificate, question: 'What is the official NADRA fee & validity for a Child Registration Certificate (B-Form / CRC) afterward?', answer: 'Per nadra.gov.pk/feeStructure, a NADRA CRC / B-Form costs Rs. 50 Normal (7 days) or Rs. 500 Executive (1 day) — Urgent is not offered. CRCs expire at ages 3, 10, and 18 (under 3: no biometrics, photo if applying for passport; 3–10: Photo + IRIS; 10–18: Photo + Fingerprints + IRIS).', sort_order: 4 },
  { id: 'f1060000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.birthCertificate, question: 'What time should I visit the Union Council office?', answer: 'Visit between 9:00 AM and 12:00 PM on weekdays, as the Union Council Secretary is usually available in the morning.', sort_order: 5 },

  // 7. Police Character Certificate Rawalpindi
  { id: 'f1070000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.policeCharacter, question: 'What is the difference between a Police Character Certificate (Rs. 500) and General Police Verification (Rs. 300)?', answer: 'For foreign visas, immigration, and embassies, you specifically need a Police Character Certificate (Rs. 500) with QR code — NOT General Police Verification (Rs. 300).', sort_order: 1 },
  { id: 'f1070000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.policeCharacter, question: 'Where are Police Khidmat Markaz centers located in Rawalpindi?', answer: 'You can apply at any Police Khidmat Markaz in Punjab. In Rawalpindi district: Rescue 15 Office at Liaqat Bagh Metro Station (Murree Road), plus Taxila, Murree, Gujar Khan, and Kahuta centers.', sort_order: 2 },
  { id: 'f1070000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.policeCharacter, question: 'How long does it take to receive the certificate?', answer: 'Your counter visit takes 30 to 45 minutes (best window: 9:00 AM to 11:00 AM), and the original QR-coded certificate is delivered by courier in 3 working days.', sort_order: 3 },
  { id: 'f1070000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.policeCharacter, question: 'What if my CNIC address does not match my current address?', answer: 'Update your address with NADRA first before applying — a mismatch between your CNIC address and current residence causes verification issues.', sort_order: 4 },
  { id: 'f1070000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.policeCharacter, question: 'Do embassies accept a photocopy of the Police Character Certificate?', answer: 'No — embassies require the original certificate with its scannable QR verification code. Apply well ahead of your deadline so courier delivery arrives in time.', sort_order: 5 },

  // 8. Child Passport Under 18 Rawalpindi
  { id: 'f1080000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.childPassport, question: 'What is the fee for a child e-Passport under 18?', answer: 'A child’s e-passport uses the same fee table as adults: Rs. 9,000 Normal (21 working days) and Rs. 15,000 Urgent (5 working days) for 36 pages and 5-year validity.', sort_order: 1 },
  { id: 'f1080000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.childPassport, question: 'Can a child under 15 get a 10-year passport?', answer: 'No. Children under 15 years of age are issued 5-year validity passports only.', sort_order: 2 },
  { id: 'f1080000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.childPassport, question: 'Do both parents have to visit Regional Passport Office Rawalpindi?', answer: 'Yes, both parents must be present with valid unexpired CNICs. If one parent cannot attend, you must bring an attested consent affidavit from the absent parent or the file will be rejected.', sort_order: 3 },
  { id: 'f1080000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.childPassport, question: 'What official NADRA B-Form / CRC biometric requirements apply by child age?', answer: 'Under NADRA’s official CRC policy (nadra.gov.pk): under age 3 requires a photograph on the CRC if processing a passport; ages 3 to 10 require Photograph + IRIS (child present at NADRA); ages 10 to 17 MUST include Photograph, Fingerprints & IRIS. CRC fees at NADRA are Rs. 50 Normal (7 days) or Rs. 500 Executive (1 day).', sort_order: 4 },
  { id: 'f1080000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.childPassport, question: 'How is the child’s passport delivered?', answer: 'After biometrics, live photo capture at the office, and fee payment, the passport is delivered by courier (21 working days Normal, 5 working days Urgent).', sort_order: 5 },

  // 9. Name Change on CNIC After Marriage
  { id: 'f1090000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.nameChangeMarriage, question: 'Can I go straight to NADRA with my manual handwritten Nikahnama?', answer: 'No! Under NADRA Regulation 41, you must bring a Computerized Marriage Registration Certificate (MRC) from your Union Council (or foreign authority) along with your spouse’s CNIC, POC, or Passport copy.', sort_order: 1 },
  { id: 'f1090000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.nameChangeMarriage, question: 'What are the exact official NADRA fees & delivery days for post-marriage CNIC modification?', answer: 'Per nadra.gov.pk/feeStructure: Ordinary CNIC modification is Rs. 400 Normal (15 days), Rs. 1,150 Urgent (12 days), or Rs. 2,150 Executive (6 days). Smart CNIC modification is Rs. 750 Normal (31 days), Rs. 1,500 Urgent (23 days), or Rs. 2,500 Executive (9 days). Database-only marital status update (no new printed card) is Rs. 100 at NRC (2 days) or USD 5 via PakID app (2 days).', sort_order: 2 },
  { id: 'f1090000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.nameChangeMarriage, question: 'Can a woman retain her father’s name on her CNIC after marriage instead of adopting her husband’s name?', answer: 'Yes! Under official NADRA rules, a married woman has the legal choice to keep her father’s name on her CNIC while only updating her marital status to Married — or she can switch to her husband’s name/surname using her computerized MRC.', sort_order: 3 },
  { id: 'f1090000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.nameChangeMarriage, question: 'Why should both husband and wife update their NADRA records (and how much is an FRC)?', answer: 'Update marital status for both husband and wife so your Family Registration Certificate (FRC — Rs. 1,000 Executive, 1 day) matches accurately for visas and banking. Also think carefully before changing your given/surname, as NADRA restricts subsequent name changes.', sort_order: 4 },
  { id: 'f1090000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.nameChangeMarriage, question: 'Can I apply online via PakID app instead of visiting Saddar Mega Center?', answer: 'Yes! Once you have your Union Council Computerized MRC, you can apply via NADRA’s official PakID app (Google Play / App Store) or visit NADRA Mega Center, Saddar, Rawalpindi on a weekday morning. For questions, call NADRA’s 24/7 Helpline: 1777 or +92 51 111 786 100.', sort_order: 5 },

  // 10. E-Challan Check and Payment in Punjab
  { id: 'f1100000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.eChallan, question: 'How do I safely check my Punjab E-Challan without falling for scams?', answer: 'Never click links sent in SMS messages — many are scams. Always open your browser and type echallan.psca.gop.pk yourself, then search with your vehicle registration number and owner 13-digit CNIC (without dashes) or chassis number.', sort_order: 1 },
  { id: 'f1100000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.eChallan, question: 'What are the common Punjab E-Challan fine amounts?', answer: 'Common fines include: No helmet Rs. 2,000; Red light violation Rs. 2,000 to Rs. 5,000; No driving licence Rs. 5,000; and Overspeeding Rs. 2,000 to Rs. 10,000. Always check your exact fine on the portal.', sort_order: 2 },
  { id: 'f1100000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.eChallan, question: 'How many days do I have to pay an e-Challan?', answer: 'Pay within 10 days to avoid extra penalty. Remember that once you generate a 17-digit PSID in e-Pay Punjab, you must pay that PSID within 24 hours before it expires.', sort_order: 3 },
  { id: 'f1100000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.eChallan, question: 'Which payment methods work for the 17-digit PSID?', answer: 'You can pay the 17-digit PSID through JazzCash, Easypaisa, your Pakistani bank app, a 1Link ATM, or over the counter at a bank branch. Always save a screenshot of your payment receipt.', sort_order: 4 },
  { id: 'f1100000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.eChallan, question: 'How long does payment confirmation take to appear on the portal?', answer: 'Checking your challan takes 2 minutes, and payment confirmation takes 10 minutes to 2 hours to reflect on echallan.psca.gop.pk. Ignoring unpaid challans blocks vehicle transfer and driving licence renewal.', sort_order: 5 },
];

// Crowdsourced wait times (visit_date <= 2026-11-16 to satisfy DB CHECK constraint)
export const SEED_WAIT_TIMES: WaitTime[] = [
  // 1. Passport Renewal Rawalpindi (7-day trend)
  { id: '21010000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.passportRenewal, office_name: 'Regional Passport Office, Rawalpindi (GT Road)', city: 'Rawalpindi', visit_date: '2026-11-16', wait_minutes: 60, rating: 4, tip: 'Reached GT Road RPO at 8:45 AM — paid Rs. 9,000 via PSID beforehand and finished smoothly!', status: 'approved', created_at: '2026-11-16T10:15:00Z' },
  { id: '21010000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.passportRenewal, office_name: 'Regional Passport Office, Rawalpindi (GT Road)', city: 'Rawalpindi', visit_date: '2026-11-15', wait_minutes: 75, rating: 4, tip: 'Only e-passports are issued now — photo is taken live at the counter so no studio photo needed.', status: 'approved', created_at: '2026-11-15T11:30:00Z' },
  { id: '21010000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.passportRenewal, office_name: 'Regional Passport Office, Rawalpindi (GT Road)', city: 'Rawalpindi', visit_date: '2026-11-14', wait_minutes: 50, rating: 5, tip: 'Thursday 9:00 AM was super smooth for 5-year e-passport renewal, got tracking slip in 50 mins.', status: 'approved', created_at: '2026-11-14T10:45:00Z' },
  { id: '21010000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.passportRenewal, office_name: 'Regional Passport Office, Rawalpindi (GT Road)', city: 'Rawalpindi', visit_date: '2026-11-13', wait_minutes: 55, rating: 4, tip: 'Wednesday morning between 8:30 and 10:00 AM moves fast. Check your CNIC expiry before coming!', status: 'approved', created_at: '2026-11-13T09:50:00Z' },
  { id: '21010000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.passportRenewal, office_name: 'Regional Passport Office, Rawalpindi (GT Road)', city: 'Rawalpindi', visit_date: '2026-11-12', wait_minutes: 45, rating: 5, tip: 'Tuesday 8:35 AM — short token queue, biometric & bank counter inside office took 45 mins total.', status: 'approved', created_at: '2026-11-12T09:20:00Z' },
  { id: '21010000-0000-4000-8000-000000000006', process_id: PROCESS_IDS.passportRenewal, office_name: 'Regional Passport Office, Rawalpindi (GT Road)', city: 'Rawalpindi', visit_date: '2026-11-11', wait_minutes: 85, rating: 3, tip: 'Arrived after 11 AM and queues had built up; definitely go before 10 AM.', status: 'approved', created_at: '2026-11-11T12:10:00Z' },
  { id: '21010000-0000-4000-8000-000000000007', process_id: PROCESS_IDS.passportRenewal, office_name: 'Regional Passport Office, Rawalpindi (GT Road)', city: 'Rawalpindi', visit_date: '2026-11-10', wait_minutes: 135, rating: 3, tip: 'Monday after 11 AM really is the most crowded — waited over 2 hours. Go Tue–Thu instead!', status: 'approved', created_at: '2026-11-10T11:40:00Z' },

  // 2. CNIC Renewal Rawalpindi
  { id: '21020000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.cnicRenewal, office_name: 'NADRA Mega Center, Saddar, Rawalpindi', city: 'Rawalpindi', visit_date: '2026-11-16', wait_minutes: 50, rating: 4, tip: 'Visited Saddar Mega Center at 9:30 AM — finished Smart CNIC renewal (Rs. 750) in 50 mins.', status: 'approved', created_at: '2026-11-16T11:00:00Z' },
  { id: '21020000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.cnicRenewal, office_name: 'NADRA Mega Center, Saddar, Rawalpindi', city: 'Rawalpindi', visit_date: '2026-11-14', wait_minutes: 125, rating: 3, tip: 'Saturday wait at Saddar Mega Center is over 2 hours — go on a weekday 9–11 AM if you can.', status: 'approved', created_at: '2026-11-14T13:20:00Z' },
  { id: '21020000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.cnicRenewal, office_name: 'NADRA Mega Center, Saddar, Rawalpindi', city: 'Rawalpindi', visit_date: '2026-11-12', wait_minutes: 65, rating: 4, tip: 'Double-checked name spelling on screen and took a photo of the tracking slip right at the counter.', status: 'approved', created_at: '2026-11-12T14:05:00Z' },
  { id: '21020000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.cnicRenewal, office_name: 'NADRA Mega Center, Saddar, Rawalpindi', city: 'Rawalpindi', visit_date: '2026-11-10', wait_minutes: 80, rating: 4, tip: 'Ordinary CNIC renewal was Rs. 400 normal (15 days). Make sure your SIM is on your own CNIC.', status: 'approved', created_at: '2026-11-10T10:30:00Z' },

  // 3. Driving Licence Renewal Rawalpindi
  { id: '21030000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.drivingLicence, office_name: 'Police Khidmat Markaz, Rawalpindi', city: 'Rawalpindi', visit_date: '2026-11-16', wait_minutes: 25, rating: 5, tip: 'Reached at 9:30 AM with documents ready — paid Rs. 1,830 car renewal PSID via JazzCash in 25 mins!', status: 'approved', created_at: '2026-11-16T09:10:00Z' },
  { id: '21030000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.drivingLicence, office_name: 'Police Khidmat Markaz, Rawalpindi', city: 'Rawalpindi', visit_date: '2026-11-14', wait_minutes: 30, rating: 4, tip: 'Used Dastak Punjab app — took 10 mins to upload photo and pay PSID, courier arrived in 8 days.', status: 'approved', created_at: '2026-11-14T11:15:00Z' },
  { id: '21030000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.drivingLicence, office_name: 'Police Khidmat Markaz, Rawalpindi', city: 'Rawalpindi', visit_date: '2026-11-11', wait_minutes: 20, rating: 5, tip: 'Motorcycle renewal was Rs. 930 including courier. Double-check home address before submitting!', status: 'approved', created_at: '2026-11-11T09:40:00Z' },

  // 4. FBR NTN for Freelancers
  { id: '21040000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.fbrNtn, office_name: 'Online Only — FBR IRIS Portal (iris.fbr.gov.pk)', city: 'Islamabad', visit_date: '2026-11-16', wait_minutes: 15, rating: 5, tip: 'Completed Form 181 on a weekday morning — both OTPs arrived fast, approved same day for Rs. 0!', status: 'approved', created_at: '2026-11-16T08:40:00Z' },
  { id: '21040000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.fbrNtn, office_name: 'Online Only — FBR IRIS Portal (iris.fbr.gov.pk)', city: 'Islamabad', visit_date: '2026-11-13', wait_minutes: 25, rating: 4, tip: 'Keep your CNIC scan under 2MB and bank maintenance certificate PDF ready before starting.', status: 'approved', created_at: '2026-11-13T10:10:00Z' },

  // 5. Domicile Certificate Rawalpindi
  { id: '21050000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.domicile, office_name: 'e-Khidmat Markaz, District Complex, Rawalpindi', city: 'Rawalpindi', visit_date: '2026-11-15', wait_minutes: 45, rating: 4, tip: 'Got Form P, AC Verification Form, and Rs. 300 affidavit right at District Complex — total Rs. 550.', status: 'approved', created_at: '2026-11-15T10:05:00Z' },
  { id: '21050000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.domicile, office_name: 'e-Khidmat Markaz, District Complex, Rawalpindi', city: 'Rawalpindi', visit_date: '2026-11-12', wait_minutes: 40, rating: 5, tip: 'Wednesday 9:30 AM was quick — remember to bring father/mother/spouse CNIC copy along with yours.', status: 'approved', created_at: '2026-11-12T11:15:00Z' },

  // 6. Birth Certificate from Union Council Rawalpindi
  { id: '21060000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.birthCertificate, office_name: 'Local Union Council, Municipal Committee, or Cantonment Board', city: 'Rawalpindi', visit_date: '2026-11-15', wait_minutes: 35, rating: 4, tip: 'Visited Union Council Secretary at 10 AM — completely FREE within 7 years, got printout in 2 days!', status: 'approved', created_at: '2026-11-15T09:30:00Z' },
  { id: '21060000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.birthCertificate, office_name: 'Local Union Council, Municipal Committee, or Cantonment Board', city: 'Rawalpindi', visit_date: '2026-11-11', wait_minutes: 45, rating: 4, tip: 'Checked child name spelling 3 times before Secretary saved it — used it next week for NADRA B-Form.', status: 'approved', created_at: '2026-11-11T10:25:00Z' },

  // 7. Police Character Certificate Rawalpindi
  { id: '21070000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.policeCharacter, office_name: 'Police Khidmat Markaz, Rawalpindi (Rescue 15 Liaqat Bagh)', city: 'Rawalpindi', visit_date: '2026-11-16', wait_minutes: 35, rating: 5, tip: 'Rescue 15 Liaqat Bagh center took 35 mins at 9:30 AM. Paid Rs. 500, QR certificate delivered in 3 days!', status: 'approved', created_at: '2026-11-16T09:45:00Z' },
  { id: '21070000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.policeCharacter, office_name: 'Police Khidmat Markaz, Rawalpindi (Rescue 15 Liaqat Bagh)', city: 'Rawalpindi', visit_date: '2026-11-13', wait_minutes: 40, rating: 5, tip: 'Make sure you ask for Character Certificate (Rs. 500) for visa, not General Verification (Rs. 300).', status: 'approved', created_at: '2026-11-13T11:50:00Z' },

  // 8. Child Passport Under 18 Rawalpindi
  { id: '21080000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.childPassport, office_name: 'Regional Passport Office, Rawalpindi', city: 'Rawalpindi', visit_date: '2026-11-15', wait_minutes: 55, rating: 4, tip: 'Both parents went at 9 AM with updated B-Form (with photo for our 12-year-old) — smooth Rs. 9,000 normal process.', status: 'approved', created_at: '2026-11-15T10:50:00Z' },
  { id: '21080000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.childPassport, office_name: 'Regional Passport Office, Rawalpindi', city: 'Rawalpindi', visit_date: '2026-11-12', wait_minutes: 50, rating: 4, tip: 'Both parents CNICs must be valid! Live photo was taken at office and passport came by courier.', status: 'approved', created_at: '2026-11-12T10:00:00Z' },

  // 9. Name Change on CNIC After Marriage
  { id: '21090000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.nameChangeMarriage, office_name: 'NADRA Mega Center, Saddar, Rawalpindi', city: 'Rawalpindi', visit_date: '2026-11-15', wait_minutes: 45, rating: 5, tip: 'Got Union Council computerized MRC first — Saddar Mega Center took 45 mins, updated both spouses!', status: 'approved', created_at: '2026-11-15T12:15:00Z' },
  { id: '21090000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.nameChangeMarriage, office_name: 'NADRA Mega Center, Saddar, Rawalpindi', city: 'Rawalpindi', visit_date: '2026-11-11', wait_minutes: 50, rating: 4, tip: 'Husband only updated marital status in database for Rs. 100 without printing a new card — super helpful!', status: 'approved', created_at: '2026-11-11T13:05:00Z' },

  // 10. E-Challan Check and Payment in Punjab
  { id: '21100000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.eChallan, office_name: 'Online Only — PSCA E-Challan Portal (echallan.psca.gop.pk)', city: 'Lahore', visit_date: '2026-11-16', wait_minutes: 10, rating: 5, tip: 'Typed echallan.psca.gop.pk directly, generated 17-digit PSID in e-Pay Punjab, paid via JazzCash — cleared in 20 mins!', status: 'approved', created_at: '2026-11-16T07:30:00Z' },
  { id: '21100000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.eChallan, office_name: 'Online Only — PSCA E-Challan Portal (echallan.psca.gop.pk)', city: 'Lahore', visit_date: '2026-11-14', wait_minutes: 15, rating: 4, tip: 'Paid Rs. 2,000 helmet challan within 10 days via bank app PSID and saved the receipt screenshot.', status: 'approved', created_at: '2026-11-14T15:20:00Z' },

  // 2 Pending submissions for Admin Moderation Queue
  { id: '29000000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.passportRenewal, office_name: 'Regional Passport Office, Rawalpindi (GT Road)', city: 'Rawalpindi', visit_date: '2026-11-16', wait_minutes: 55, rating: 5, tip: 'Tuesday 8:40 AM at GT Road office was well organized — bring 1 photocopy of first 2 passport pages.', status: 'pending', created_at: '2026-11-16T11:45:00Z' },
  { id: '29000000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.domicile, office_name: 'e-Khidmat Markaz, District Complex, Rawalpindi', city: 'Rawalpindi', visit_date: '2026-11-16', wait_minutes: 45, rating: 4, tip: 'District Complex staff helped fill Form P and AC Verification Form on the spot — total Rs. 550.', status: 'pending', created_at: '2026-11-16T11:55:00Z' },
];
