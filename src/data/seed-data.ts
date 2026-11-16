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
    description: 'CNIC renewal, Smart Card upgrades, CRC/B-Form, and NADRA corrections.',
  },
  {
    id: 'b1000000-0000-4000-8000-000000000002',
    name: 'Passport',
    slug: 'passport',
    urdu_label: 'پاسپورٹ',
    description: 'New passports, renewals, child passports under 18, and Fast Track guidance.',
  },
  {
    id: 'b1000000-0000-4000-8000-000000000003',
    name: 'Driving',
    slug: 'driving',
    urdu_label: 'ڈرائیونگ لائسنس',
    description: 'Driving licence renewal, learner permits, DLIMS tracking, and e-Challan payments.',
  },
  {
    id: 'b1000000-0000-4000-8000-000000000004',
    name: 'Tax',
    slug: 'tax',
    urdu_label: 'ٹیکس اور این ٹی این',
    description: 'FBR NTN registration, IRIS setup for freelancers, and Active Taxpayer List guides.',
  },
  {
    id: 'b1000000-0000-4000-8000-000000000005',
    name: 'Certificates',
    slug: 'certificates',
    urdu_label: 'سرٹیفکیٹس',
    description: 'Domicile, birth certificates, police character certificates, and e-Khidmat guides.',
  },
  {
    id: 'b1000000-0000-4000-8000-000000000006',
    name: 'Family',
    slug: 'family',
    urdu_label: 'خاندانی دستاویزات',
    description: 'Post-marriage CNIC name changes, FRC, Nikahnama registration, and family records.',
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
  {
    id: PROCESS_IDS.passportRenewal,
    slug: 'passport-renewal-rawalpindi',
    title: 'Passport Renewal in Rawalpindi',
    urdu_title: 'پاسپورٹ کی تجدید — راولپنڈی',
    summary:
      'Complete step-by-step guide to renewing your 36-page Pakistani Machine Readable Passport (5-year validity) at Regional Passport Office Rawalpindi using Passport Fee Asaan or NBP challan.',
    category: 'Passport',
    city: 'Rawalpindi',
    fee_normal: 4500,
    fee_urgent: 7500,
    fee_executive: 12500,
    fee_notes:
      'Fees shown are for a 36-page, 5-year Ordinary Machine Readable Passport (DGIP standard schedule). 10-year validity costs Rs. 6,700 (Normal), Rs. 11,200 (Urgent), and Rs. 16,200 (Fast Track).',
    time_required: 'Normal: 21 working days | Urgent: 5 working days | Fast Track: 2 working days',
    office_name: 'Regional Passport Office Rawalpindi',
    office_address: 'Near Rehmanabad Chowk, Main Murree Road (Opposite Sixth Road Metro Station), Rawalpindi',
    office_timings: 'Mon–Thu: 8:30 AM – 2:00 PM | Fri: 8:30 AM – 12:30 PM (Closed Sat–Sun)',
    best_day_to_go: 'Tuesday or Wednesday, arrive by 8:00 AM before token rush',
    official_source_url: 'https://dgip.gov.pk/passport/ordinary-passport.php',
    last_updated: '2026-11-15T09:00:00Z',
    is_verified: true,
    is_nationwide: false,
    popularity_rank: 1,
  },
  {
    id: PROCESS_IDS.cnicRenewal,
    slug: 'cnic-renewal-rawalpindi',
    title: 'CNIC Renewal in Rawalpindi',
    urdu_title: 'شناختی کارڈ کی تجدید — راولپنڈی',
    summary:
      'How to renew an expired or expiring Smart National Identity Card (SNIC) at NADRA Mega Center Rehmanabad Rawalpindi without paying an agent.',
    category: 'Identity',
    city: 'Rawalpindi',
    fee_normal: 750,
    fee_urgent: 1500,
    fee_executive: 2500,
    fee_notes:
      'Official NADRA Smart CNIC renewal fee schedule. Optional NADRA SMS alert & home courier delivery add roughly Rs. 100–250 at the counter.',
    time_required: 'Normal: 31 days | Urgent: 15 days | Executive: 7 days',
    office_name: 'NADRA Mega Center Rawalpindi (Rehmanabad)',
    office_address: 'Ground Floor, Rehmanabad Plaza, Main Murree Road near Rehmanabad Metro Station, Rawalpindi',
    office_timings: 'Mon–Sat: 8:00 AM – 8:00 PM (Mega Center operates double shift; Closed Sun)',
    best_day_to_go: 'Wednesday or Thursday between 2:30 PM – 4:30 PM (post-lunch dip)',
    official_source_url: 'https://www.nadra.gov.pk/identity/identity-cnic',
    last_updated: '2026-11-15T08:30:00Z',
    is_verified: true,
    is_nationwide: false,
    popularity_rank: 2,
  },
  {
    id: PROCESS_IDS.drivingLicence,
    slug: 'driving-licence-renewal-rawalpindi',
    title: 'Driving Licence Renewal in Rawalpindi',
    urdu_title: 'ڈرائیونگ لائسنس کی تجدید — راولپنڈی',
    summary:
      'Step-by-step instructions to renew your expired or expiring Punjab car/motorcycle driving licence at City Traffic Police Licensing Branch Rawalpindi or Khidmat Markaz.',
    category: 'Driving',
    city: 'Rawalpindi',
    fee_normal: 1800,
    fee_urgent: 2800,
    fee_executive: 3800,
    fee_notes:
      'Normal Rs. 1,800 covers standard 1-year Car/Jeep renewal including card & test/medical ticket. Urgent/Executive estimates reflect 3-year and 5-year Punjab DLIMS multi-year renewal options plus e-Licence download.',
    time_required: 'Same-day e-Licence PDF | Physical PVC card delivered in 7–15 days',
    office_name: 'City Traffic Police Licensing Branch Rawalpindi',
    office_address: 'Traffic Police Headquarters, Race Course Ground, Main Peshawar Road, Rawalpindi',
    office_timings: 'Mon–Sat: 8:30 AM – 4:00 PM | Khidmat Markaz Liaquat Bagh open till 8:00 PM',
    best_day_to_go: 'Tuesday or Thursday morning at 8:30 AM (avoid Monday backlog)',
    official_source_url: 'https://dlims.punjab.gov.pk/',
    last_updated: '2026-11-14T11:00:00Z',
    is_verified: true,
    is_nationwide: false,
    popularity_rank: 3,
  },
  {
    id: PROCESS_IDS.fbrNtn,
    slug: 'fbr-ntn-for-freelancers',
    title: 'FBR NTN Registration for Freelancers',
    urdu_title: 'فری لانسرز کے لیے ایف بی آر این ٹی این',
    summary:
      '100% free online guide to registering your National Tax Number (NTN) on FBR IRIS portal from home so freelancers can open business bank accounts, register with PSEB, and become a Filer.',
    category: 'Tax',
    city: 'Islamabad',
    fee_normal: 0,
    fee_urgent: 0,
    fee_executive: 0,
    fee_notes:
      'FBR NTN registration on IRIS is completely FREE (Rs. 0). Becoming an Active Taxpayer (ATL Filer) only requires filing your annual return; late ATL surcharge is Rs. 1,000 for individuals.',
    time_required: '15–25 minutes online (instant NTN certificate download)',
    office_name: 'FBR IRIS Online Portal & RTO Islamabad Facilitation Desk',
    office_address: 'Online via iris.fbr.gov.pk (Walk-in helpdesk: Regional Tax Office, Plot 20, Mauve Area, G-9/1, Islamabad)',
    office_timings: 'Online Portal: 24/7 | RTO Helpdesk Mon–Fri: 9:00 AM – 3:30 PM',
    best_day_to_go: 'Complete online any weekday morning (OTP SMS arrives fastest before 12 PM)',
    official_source_url: 'https://iris.fbr.gov.pk/',
    last_updated: '2026-11-16T07:00:00Z',
    is_verified: true,
    is_nationwide: true,
    popularity_rank: 4,
  },
  {
    id: PROCESS_IDS.domicile,
    slug: 'domicile-certificate-rawalpindi',
    title: 'Domicile Certificate in Rawalpindi',
    urdu_title: 'ڈومیسائل سرٹیفکیٹ — راولپنڈی',
    summary:
      'Exact document list, e-Khidmat Markaz counter flow, and challan details for getting a computerized Punjab Domicile Certificate in Rawalpindi for university admission or government jobs.',
    category: 'Certificates',
    city: 'Rawalpindi',
    fee_normal: 500,
    fee_urgent: 1000,
    fee_executive: 1500,
    fee_notes:
      'Government treasury challan is Rs. 200 plus e-Khidmat processing/stamp paper cost (~Rs. 300 total = Rs. 500 Normal). Urgent/Executive figures reflect expedited facilitation & extra stamp affidavit if needed.',
    time_required: 'Normal: 10–15 working days | Urgent: 5 working days',
    office_name: 'e-Khidmat Markaz Rawalpindi',
    office_address: 'Liaquat Bagh Sports Complex, Main Murree Road, Rawalpindi',
    office_timings: 'Mon–Sat: 9:00 AM – 5:00 PM (Break 1:00 PM – 2:00 PM; Closed Sun)',
    best_day_to_go: 'Wednesday morning around 9:15 AM (avoid university admission deadline weeks)',
    official_source_url: 'https://ekhidmat.punjab.gov.pk/',
    last_updated: '2026-11-14T10:15:00Z',
    is_verified: true,
    is_nationwide: false,
    popularity_rank: 5,
  },
  {
    id: PROCESS_IDS.birthCertificate,
    slug: 'birth-certificate-rawalpindi',
    title: 'Birth Certificate in Rawalpindi',
    urdu_title: 'پیدائش کا سرٹیفکیٹ — راولپنڈی',
    summary:
      'How to get a computerized NADRA / Union Council Birth Registration Certificate (and subsequent B-Form/CRC) in Rawalpindi Municipal Corporation or Cantonment Board areas.',
    category: 'Certificates',
    city: 'Rawalpindi',
    fee_normal: 500,
    fee_urgent: 1000,
    fee_executive: 1500,
    fee_notes:
      'Standard timely registration (within 60 days of birth) at Union Council / e-Khidmat costs Rs. 300–500. Late registration (after 1 year) involves an extra magistrate/court affidavit and fee.',
    time_required: 'Normal: 7–10 working days | Urgent: 3–5 working days',
    office_name: 'Union Council / e-Khidmat Markaz & RCB Rawalpindi',
    office_address: 'e-Khidmat Markaz Liaquat Bagh, Murree Road (For Cantt residents: Rawalpindi Cantonment Board, The Mall, Saddar)',
    office_timings: 'Mon–Fri: 9:00 AM – 3:30 PM | e-Khidmat Mon–Sat: 9:00 AM – 5:00 PM',
    best_day_to_go: 'Tuesday or Wednesday before 10:30 AM',
    official_source_url: 'https://lgcd.punjab.gov.pk/',
    last_updated: '2026-11-13T14:00:00Z',
    is_verified: true,
    is_nationwide: false,
    popularity_rank: 6,
  },
  {
    id: PROCESS_IDS.policeCharacter,
    slug: 'police-character-certificate-rawalpindi',
    title: 'Police Character Certificate in Rawalpindi',
    urdu_title: 'پولیس کریکٹر سرٹیفکیٹ — راولپنڈی',
    summary:
      'Fast, clean walkthrough for obtaining a QR-verified Punjab Police Character Certificate for foreign visa, study abroad, immigration, or employment at Police Khidmat Markaz Rawalpindi.',
    category: 'Certificates',
    city: 'Rawalpindi',
    fee_normal: 500,
    fee_urgent: 1000,
    fee_executive: 1500,
    fee_notes:
      'Official Punjab Police Khidmat Markaz fee is Rs. 500 for standard verification. Overseas/urgent attestation or additional address verification may add Rs. 500–1,000.',
    time_required: '3 working days (SMS alert when ready for collection or online download)',
    office_name: 'Police Khidmat Markaz Rawalpindi',
    office_address: 'Police Khidmat Markaz, Near Liaquat Bagh / Commercial Market Satellite Town, Rawalpindi',
    office_timings: 'Mon–Sat: 8:00 AM – 8:00 PM (Closed Sunday)',
    best_day_to_go: 'Wednesday or Thursday between 10:00 AM – 12:30 PM',
    official_source_url: 'https://pkm.punjab.gov.pk/',
    last_updated: '2026-11-15T12:00:00Z',
    is_verified: true,
    is_nationwide: false,
    popularity_rank: 7,
  },
  {
    id: PROCESS_IDS.childPassport,
    slug: 'child-passport-under-18',
    title: 'Child Passport (Under 18) in Rawalpindi',
    urdu_title: 'بچوں کا پاسپورٹ (18 سال سے کم)',
    summary:
      'Everything parents need to know to apply for a newborn or minor (under 18) Pakistani passport in Rawalpindi using NADRA CRC (B-Form) or Smart Juvenile Card.',
    category: 'Passport',
    city: 'Rawalpindi',
    fee_normal: 4500,
    fee_urgent: 7500,
    fee_executive: 12500,
    fee_notes:
      'Children under 15 years are issued 5-year validity passports only (10-year option is for 15+ years). Fees shown are for a 36-page 5-year MRP.',
    time_required: 'Normal: 21 working days | Urgent: 5 working days | Fast Track: 2 working days',
    office_name: 'Regional Passport Office Rawalpindi (Family Counter)',
    office_address: 'Near Rehmanabad Chowk, Main Murree Road (Opposite Sixth Road Metro Station), Rawalpindi',
    office_timings: 'Mon–Thu: 8:30 AM – 2:00 PM | Fri: 8:30 AM – 12:30 PM',
    best_day_to_go: 'Tuesday or Thursday at 8:15 AM (dedicated family lane moves faster early)',
    official_source_url: 'https://dgip.gov.pk/passport/minor-passport.php',
    last_updated: '2026-11-14T16:30:00Z',
    is_verified: true,
    is_nationwide: false,
    popularity_rank: 8,
  },
  {
    id: PROCESS_IDS.nameChangeMarriage,
    slug: 'name-change-cnic-after-marriage',
    title: 'Name Change on CNIC After Marriage',
    urdu_title: 'شادی کے بعد شناختی کارڈ میں نام کی تبدیلی',
    summary:
      'How to update marital status, add husband’s name, and optionally update surname on your Smart CNIC at NADRA Mega Center Rawalpindi with Computerized MRC.',
    category: 'Family',
    city: 'Rawalpindi',
    fee_normal: 750,
    fee_urgent: 1500,
    fee_executive: 2500,
    fee_notes:
      'Standard NADRA Smart CNIC modification fee (Rs. 750 Normal, Rs. 1,500 Urgent, Rs. 2,500 Executive). Both marital status update and name change can be done in the same single fee.',
    time_required: 'Normal: 31 days | Urgent: 15 days | Executive: 7 days',
    office_name: 'NADRA Mega Center Rawalpindi (Rehmanabad)',
    office_address: 'Ground Floor, Rehmanabad Plaza, Main Murree Road near Rehmanabad Metro Station, Rawalpindi',
    office_timings: 'Mon–Sat: 8:00 AM – 8:00 PM (Dedicated ladies & family waiting area)',
    best_day_to_go: 'Tuesday or Wednesday at 9:00 AM (husband and wife should visit together)',
    official_source_url: 'https://www.nadra.gov.pk/identity/identity-cnic',
    last_updated: '2026-11-15T11:20:00Z',
    is_verified: true,
    is_nationwide: false,
    popularity_rank: 9,
  },
  {
    id: PROCESS_IDS.eChallan,
    slug: 'e-challan-check-and-payment',
    title: 'E-Challan Check and Payment (PSCA / Traffic)',
    urdu_title: 'ای چالان چیک اور ادائیگی',
    summary:
      'Check pending Safe City camera e-Challans by vehicle number & CNIC and pay online in 2 minutes using PSID code via JazzCash, Easypaisa, or any Pakistani banking app.',
    category: 'Driving',
    city: 'Lahore',
    fee_normal: 200,
    fee_urgent: 500,
    fee_executive: 2000,
    fee_notes:
      'Traffic fines vary by violation: Rs. 200 (typical helmet/minor motorcycle violation), Rs. 500 (lane/seatbelt/standard car violation), up to Rs. 2,000 (red signal jump or overspeeding). Zero portal service fee via e-Pay Punjab.',
    time_required: '2–5 minutes online (instant digital receipt & PSCA clearance)',
    office_name: 'Punjab Safe Cities Authority (PSCA) E-Challan Portal',
    office_address: 'Online via echallan.psca.gop.pk (In-person dispute center: Qurban Lines, Jail Road, Lahore / Local Traffic HQ)',
    office_timings: 'Online Check & Pay: 24/7 | Dispute Desk Mon–Sat: 9:00 AM – 4:00 PM',
    best_day_to_go: 'Pay online immediately within 10 days to avoid late-payment escalation',
    official_source_url: 'https://echallan.psca.gop.pk/',
    last_updated: '2026-11-16T06:45:00Z',
    is_verified: true,
    is_nationwide: true,
    popularity_rank: 10,
  },
];

export const SEED_DOCUMENTS: ProcessDocument[] = [
  // 1. Passport Renewal Rawalpindi
  { id: 'd1010000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.passportRenewal, name: 'Original Valid CNIC / Smart Card (Asal Shanakhti Card)', type: 'original', copies_needed: 1, note: 'Must not be expired. If your CNIC is expired, renew CNIC at NADRA first.', sort_order: 1 },
  { id: 'd1010000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.passportRenewal, name: 'CNIC Photocopy (Front & Back on one page)', type: 'photocopy', copies_needed: 2, note: 'Keep clear front-and-back copies on A4 paper. No attestation needed.', sort_order: 2 },
  { id: 'd1010000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.passportRenewal, name: 'Original Previous Passport (Purana Asal Passport)', type: 'original', copies_needed: 1, note: 'Mandatory for renewal. Office will punch/cancel it and return it with valid visas intact.', sort_order: 3 },
  { id: 'd1010000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.passportRenewal, name: 'Photocopy of Old Passport (Bio-data Page)', type: 'photocopy', copies_needed: 1, note: 'Copy of the main photo/information page of your expiring passport.', sort_order: 4 },
  { id: 'd1010000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.passportRenewal, name: 'Paid Fee Challan / Passport Fee Asaan PSID Receipt', type: 'original', copies_needed: 1, note: 'Pay via Passport Fee Asaan app (1Link / JazzCash / Bank App) and bring printed SMS/PDF receipt — saves 45 minutes of NBP bank queue!', sort_order: 5 },
  { id: 'd1010000-0000-4000-8000-000000000006', process_id: PROCESS_IDS.passportRenewal, name: 'NOC from Department (Government Employees Only)', type: 'original', copies_needed: 1, note: 'Only required if you are a serving government/armed forces employee.', sort_order: 6 },

  // 2. CNIC Renewal Rawalpindi
  { id: 'd1020000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.cnicRenewal, name: 'Original Expired / Expiring CNIC (Purana Asal Card)', type: 'original', copies_needed: 1, note: 'If lost, bring an FIR/Police Roznamcha Lost Report instead.', sort_order: 1 },
  { id: 'd1020000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.cnicRenewal, name: 'Photocopy of Old CNIC', type: 'photocopy', copies_needed: 1, note: 'Helpful to keep for your own record once NADRA punches the old card.', sort_order: 2 },
  { id: 'd1020000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.cnicRenewal, name: 'Original CNIC of Any Blood Relative (Only if changing address)', type: 'original', copies_needed: 1, note: 'Not needed for simple renewal with no changes. Needed only if updating address or family tree.', sort_order: 3 },
  { id: 'd1020000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.cnicRenewal, name: 'Utility Bill Copy (Only if updating present address)', type: 'photocopy', copies_needed: 1, note: 'Electricity, gas, or water bill showing your new Rawalpindi address.', sort_order: 4 },
  { id: 'd1020000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.cnicRenewal, name: 'Active Mobile Phone (SIM registered on your CNIC)', type: 'original', copies_needed: 1, note: 'For receiving NADRA tracking token & SMS updates when your card is ready.', sort_order: 5 },

  // 3. Driving Licence Renewal Rawalpindi
  { id: 'd1030000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.drivingLicence, name: 'Original Valid CNIC (Asal Shanakhti Card)', type: 'original', copies_needed: 1, note: 'Must be valid for biometric verification at Traffic Police counter.', sort_order: 1 },
  { id: 'd1030000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.drivingLicence, name: 'Photocopy of CNIC (Front & Back)', type: 'photocopy', copies_needed: 2, note: 'Clear front and back copy on one sheet.', sort_order: 2 },
  { id: 'd1030000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.drivingLicence, name: 'Original Expired / Expiring Driving Licence', type: 'original', copies_needed: 1, note: 'Old PVC licence card must be surrendered at the counter.', sort_order: 3 },
  { id: 'd1030000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.drivingLicence, name: 'Photocopy of Previous Driving Licence', type: 'photocopy', copies_needed: 1, note: 'Keep one copy for your file and DLIMS licence number lookup.', sort_order: 4 },
  { id: 'd1030000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.drivingLicence, name: 'Medical Fitness Certificate (Form B — if age 50+)', type: 'original', copies_needed: 1, note: 'Required for applicants aged 50 or older (or LTV/HTV renewals). Available from authorized medical officer inside Traffic HQ.', sort_order: 5 },
  { id: 'd1030000-0000-4000-8000-000000000006', process_id: PROCESS_IDS.drivingLicence, name: 'Passport-Size Photos (Blue/White Background)', type: 'original', copies_needed: 2, note: 'Live photo is captured at the counter, but carry 2 backup photos for manual medical form if needed.', sort_order: 6 },

  // 4. FBR NTN for Freelancers
  { id: 'd1040000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.fbrNtn, name: 'Original CNIC (13-digit CNIC Number)', type: 'original', copies_needed: 1, note: 'Your CNIC number becomes your NTN in Pakistan. Keep it handy to type accurately.', sort_order: 1 },
  { id: 'd1040000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.fbrNtn, name: 'Mobile SIM Registered in Your Own Name (Apne Naam ki SIM)', type: 'original', copies_needed: 1, note: 'CRITICAL: FBR IRIS rejects SIMs registered on a parent or spouse CNIC.', sort_order: 2 },
  { id: 'd1040000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.fbrNtn, name: 'Active Personal Email Address', type: 'original', copies_needed: 1, note: 'You will receive a separate 6-digit email verification OTP alongside your SMS OTP.', sort_order: 3 },
  { id: 'd1040000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.fbrNtn, name: 'Recent Electricity Bill Copy (24-digit Meter/Reference Number)', type: 'photocopy', copies_needed: 1, note: 'Needed to fill residential address / utility meter field in your IRIS Form 181 profile.', sort_order: 4 },
  { id: 'd1040000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.fbrNtn, name: 'Personal Bank Account IBAN', type: 'photocopy', copies_needed: 1, note: 'Required if you also want to add your freelance bank account and business name in IRIS.', sort_order: 5 },

  // 5. Domicile Certificate Rawalpindi
  { id: 'd1050000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.domicile, name: 'Original CNIC or NADRA B-Form (if under 18)', type: 'original', copies_needed: 1, note: 'Permanent OR present address on CNIC should be in District Rawalpindi.', sort_order: 1 },
  { id: 'd1050000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.domicile, name: 'Photocopy of Applicant CNIC & Father’s CNIC', type: 'photocopy', copies_needed: 2, note: 'Two clear sets of front & back copies (attested by Grade 17 officer if applying manually).', sort_order: 2 },
  { id: 'd1050000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.domicile, name: 'Utility Bill Proof of Rawalpindi Residence', type: 'photocopy', copies_needed: 2, note: 'Recent IESCO electricity or SNGPL gas bill (or registered rent agreement) showing Rawalpindi address.', sort_order: 3 },
  { id: 'd1050000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.domicile, name: 'Matric / Educational Certificate Copy', type: 'photocopy', copies_needed: 1, note: 'School/Matric certificate or student card to verify date of birth and Rawalpindi residence.', sort_order: 4 },
  { id: 'd1050000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.domicile, name: 'Affidavit on Rs. 100 Stamp Paper (Bayan-e-Halfi)', type: 'original', copies_needed: 1, note: 'Stating you do not hold a domicile from any other district of Pakistan, attested by Oath Commissioner.', sort_order: 5 },
  { id: 'd1050000-0000-4000-8000-000000000006', process_id: PROCESS_IDS.domicile, name: 'Passport-Size Photos (Blue Background)', type: 'original', copies_needed: 3, note: '3 recent clear photographs without cap or sunglasses.', sort_order: 6 },
  { id: 'd1050000-0000-4000-8000-000000000007', process_id: PROCESS_IDS.domicile, name: 'Domicile Challan Form 32-A (Rs. 200 NBP / e-Pay)', type: 'original', copies_needed: 1, note: 'Pay via e-Pay Punjab app or NBP branch and attach original paid receipt.', sort_order: 7 },

  // 6. Birth Certificate Rawalpindi
  { id: 'd1060000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.birthCertificate, name: 'Hospital Birth Slip / Vaccination Card (Original)', type: 'original', copies_needed: 1, note: 'Signed & stamped discharge/birth slip from hospital (or Lady Health Worker card for home birth).', sort_order: 1 },
  { id: 'd1060000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.birthCertificate, name: 'Photocopy of Hospital Birth Slip', type: 'photocopy', copies_needed: 2, note: 'Attach two clear copies to the Union Council application.', sort_order: 2 },
  { id: 'd1060000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.birthCertificate, name: 'Father & Mother Original CNICs', type: 'original', copies_needed: 1, note: 'Both parents’ CNICs must be valid; mother’s CNIC should preferably reflect married status.', sort_order: 3 },
  { id: 'd1060000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.birthCertificate, name: 'Photocopies of Parents’ CNICs & Grandfather’s CNIC', type: 'photocopy', copies_needed: 2, note: 'Front and back copies of father, mother, and paternal grandfather (if available).', sort_order: 4 },
  { id: 'd1060000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.birthCertificate, name: 'Computerized Nikahnama / NADRA MRC Copy', type: 'photocopy', copies_needed: 1, note: 'Required by Union Council to confirm parents’ marriage record.', sort_order: 5 },
  { id: 'd1060000-0000-4000-8000-000000000006', process_id: PROCESS_IDS.birthCertificate, name: 'Late Registration Affidavit (Only if child is older than 60 days)', type: 'original', copies_needed: 1, note: 'Rs. 100 stamp paper affidavit attested by Oath Commissioner (for births > 1 year old, court order/ADLG permission may be needed).', sort_order: 6 },

  // 7. Police Character Certificate Rawalpindi
  { id: 'd1070000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.policeCharacter, name: 'Original Valid CNIC (or B-Form if under 18)', type: 'original', copies_needed: 1, note: 'Required for live biometric and NADRA record check.', sort_order: 1 },
  { id: 'd1070000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.policeCharacter, name: 'Photocopy of CNIC (Front & Back)', type: 'photocopy', copies_needed: 2, note: 'Two clear photocopies on A4 sheet.', sort_order: 2 },
  { id: 'd1070000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.policeCharacter, name: 'Original Passport & Bio-data Page Copy', type: 'photocopy', copies_needed: 1, note: 'Mandatory if applying for foreign visa, study abroad, or immigration — passport number is printed on the certificate.', sort_order: 3 },
  { id: 'd1070000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.policeCharacter, name: 'Proof of Rawalpindi Address (Utility Bill or Rent Agreement)', type: 'photocopy', copies_needed: 1, note: 'Needed if your CNIC permanent address is outside Rawalpindi and you want verification for your Rawalpindi stay period.', sort_order: 4 },
  { id: 'd1070000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.policeCharacter, name: 'Authority Letter (Only if blood relative is applying for overseas Pakistani)', type: 'original', copies_needed: 1, note: 'Required only when applicant is abroad and a father/brother/spouse applies on their behalf.', sort_order: 5 },

  // 8. Child Passport Under 18
  { id: 'd1080000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.childPassport, name: 'Original NADRA CRC (B-Form) or Smart Juvenile Card', type: 'original', copies_needed: 1, note: 'Must be computerized NADRA CRC with 13-digit number (for ages 10–18, Smart Juvenile Card or CRC with child’s photo is strongly preferred).', sort_order: 1 },
  { id: 'd1080000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.childPassport, name: 'Photocopy of NADRA B-Form / CRC', type: 'photocopy', copies_needed: 2, note: 'Check that child’s name spelling matches birth certificate & school record exactly.', sort_order: 2 },
  { id: 'd1080000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.childPassport, name: 'Original Valid CNICs of Both Father and Mother', type: 'original', copies_needed: 1, note: 'At least one parent must accompany the child with both parents’ original CNICs (both parents recommended to avoid consent form delays).', sort_order: 3 },
  { id: 'd1080000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.childPassport, name: 'Photocopies of Both Parents’ CNICs', type: 'photocopy', copies_needed: 2, note: 'Front and back copies of father’s and mother’s CNICs.', sort_order: 4 },
  { id: 'd1080000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.childPassport, name: 'Paid Fee Challan / Passport Fee Asaan Receipt', type: 'original', copies_needed: 1, note: 'Generate PSID against the child’s 13-digit B-Form number, NOT the father’s CNIC!', sort_order: 5 },
  { id: 'd1080000-0000-4000-8000-000000000006', process_id: PROCESS_IDS.childPassport, name: 'Previous Passport (If renewing child passport)', type: 'original', copies_needed: 1, note: 'Only required if the child already held a Pakistani passport earlier.', sort_order: 6 },

  // 9. Name Change on CNIC After Marriage
  { id: 'd1090000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.nameChangeMarriage, name: 'Original Wife’s Existing CNIC', type: 'original', copies_needed: 1, note: 'Will be updated to married status with husband’s name.', sort_order: 1 },
  { id: 'd1090000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.nameChangeMarriage, name: 'Original Computerized NADRA Marriage Registration Certificate (MRC)', type: 'original', copies_needed: 1, note: 'Handwritten green Nikahnama alone is NO LONGER sufficient — get computerized MRC from your Union Council first!', sort_order: 2 },
  { id: 'd1090000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.nameChangeMarriage, name: 'Photocopy of Computerized MRC & Nikahnama', type: 'photocopy', copies_needed: 1, note: 'Keep one photocopy for counter attachment.', sort_order: 3 },
  { id: 'd1090000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.nameChangeMarriage, name: 'Husband’s Original CNIC (Plus Physical Presence for Biometrics)', type: 'original', copies_needed: 1, note: 'Husband must accompany wife for live thumbprint verification. If husband is abroad, an attested undertaking/affidavit is needed.', sort_order: 4 },
  { id: 'd1090000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.nameChangeMarriage, name: 'Photocopy of Husband’s CNIC', type: 'photocopy', copies_needed: 1, note: 'Front and back copy.', sort_order: 5 },

  // 10. E-Challan Check and Payment
  { id: 'd1100000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.eChallan, name: 'Vehicle Registration Number (Number Plate)', type: 'original', copies_needed: 1, note: 'Example: LEA-1234 or RIL-4567 (from your Excise Smart Card or registration book).', sort_order: 1 },
  { id: 'd1100000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.eChallan, name: 'Vehicle Owner’s 13-Digit CNIC Number', type: 'original', copies_needed: 1, note: 'Must match the CNIC registered on Excise & Taxation record for that vehicle.', sort_order: 2 },
  { id: 'd1100000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.eChallan, name: 'Active Banking App, JazzCash, or Easypaisa Account', type: 'original', copies_needed: 1, note: 'Used to pay the 17-digit PSID code under Government Payments → e-Pay Punjab / PSCA.', sort_order: 3 },
  { id: 'd1100000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.eChallan, name: 'Printed / Saved E-Challan Payment Receipt (PDF Screenshot)', type: 'photocopy', copies_needed: 1, note: 'Save digital confirmation receipt on your phone in case a traffic warden checks.', sort_order: 4 },
];

export const SEED_STEPS: ProcessStep[] = [
  // 1. Passport Renewal Rawalpindi
  { id: 'e1010000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.passportRenewal, step_number: 1, title: 'Pay Fee Online Before Leaving Home (Passport Fee Asaan)', description: 'Download the official "Passport Fee Asaan" app by DGIP, select Passport Renewal (36 pages, 5 or 10 years, Normal/Urgent/Fast Track), enter your CNIC, and generate a PSID code. Pay via JazzCash, Easypaisa, or any Pakistani bank app and print the confirmation receipt.', time_minutes: 10 },
  { id: 'e1010000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.passportRenewal, step_number: 2, title: 'Entry Gate Verification & Token Counter', description: 'Arrive at Regional Passport Office Rawalpindi near Rehmanabad by 8:00 AM. Show your original CNIC, old passport, and printed fee receipt at the gate to collect your numbered token slip.', time_minutes: 20 },
  { id: 'e1010000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.passportRenewal, step_number: 3, title: 'Biometrics & Live Photograph Counter', description: 'When your token appears on the screen, proceed to the Biometrics booth. The operator captures your fingerprints and live passport photo (do not wear a white shirt — dark/medium collar looks best against the white backdrop).', time_minutes: 15 },
  { id: 'e1010000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.passportRenewal, step_number: 4, title: 'Data Entry & Draft Review', description: 'Move to the Data Entry counter. The officer pulls your NADRA data and prints a draft verification sheet. Carefully check spelling of your name, father’s name, date of birth, and CNIC before signing — errors after printing cost a full new fee.', time_minutes: 15 },
  { id: 'e1010000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.passportRenewal, step_number: 5, title: 'Assistant Director (AD) Final Verification Interview', description: 'Wait for your token at the Assistant Director desk. The officer verifies your old passport, punches it as cancelled (leaving valid visas uncut), approves your renewal in the system, and hands you the collection token.', time_minutes: 20 },
  { id: 'e1010000-0000-4000-8000-000000000006', process_id: PROCESS_IDS.passportRenewal, step_number: 6, title: 'Track SMS & Collect New Passport', description: 'Watch for the SMS from 9988 when your passport is ready (21 working days Normal, 5 Urgent, 2 Fast Track). Bring your original CNIC, cancelled old passport, and original token slip to the Delivery Window for collection.', time_minutes: 15 },

  // 2. CNIC Renewal Rawalpindi
  { id: 'e1020000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.cnicRenewal, step_number: 1, title: 'Enter NADRA Mega Center & Collect Token', description: 'Walk into NADRA Mega Center Rehmanabad (main entrance on Murree Road). Show your old CNIC at the reception desk and select Normal, Urgent, or Executive service to receive a queue token.', time_minutes: 10 },
  { id: 'e1020000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.cnicRenewal, step_number: 2, title: 'Wait in Hall & Watch Token Screen', description: 'Wait in the air-conditioned hall until your token number is called. Senior citizens, pregnant women, and persons with disabilities have priority counters.', time_minutes: 25 },
  { id: 'e1020000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.cnicRenewal, step_number: 3, title: 'Photo, Fingerprints & Signature Capture', description: 'At the Data Entry Operator (DEO) counter, your fresh photograph, four-finger + thumbprints, and digital signature are captured. No paper form filling is needed.', time_minutes: 10 },
  { id: 'e1020000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.cnicRenewal, step_number: 4, title: 'Verify Printed Form & Pay Fee at Counter', description: 'Carefully check your English and Urdu name spellings, address, and date of birth on the printed summary sheet. Pay the exact fee (Rs. 750 / 1,500 / 2,500) directly at the NADRA fee counter by cash or card and keep the tracking receipt.', time_minutes: 10 },
  { id: 'e1020000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.cnicRenewal, step_number: 5, title: 'Receive SMS Alert & Collect Smart CNIC', description: 'NADRA sends an SMS from 8400 once your Smart Card arrives at the center (or dispatches by courier if opted). Visit the Delivery Counter with your original token slip and old CNIC to collect.', time_minutes: 15 },

  // 3. Driving Licence Renewal Rawalpindi
  { id: 'e1030000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.drivingLicence, step_number: 1, title: 'Check Licence Record on DLIMS Portal First', description: 'Before visiting, check your existing licence number on dlims.punjab.gov.pk/track to confirm your record is digitized. If you want to skip lines completely, you can also start renewal online on DLIMS 2.0.', time_minutes: 5 },
  { id: 'e1030000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.drivingLicence, step_number: 2, title: 'Arrive at Traffic HQ Race Course & Get Token', description: 'Enter the Licensing Branch at Race Course Ground, Peshawar Road. Show your original CNIC and expired licence at the inquiry booth to collect a Renewal Token.', time_minutes: 15 },
  { id: 'e1030000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.drivingLicence, step_number: 3, title: 'Pay Fee Ticket / e-Pay PSID Challan', description: 'Purchase the renewal fee ticket or pay the generated PSID code via JazzCash / Bank App right at the licensing center. Choose 1-year, 3-year, or 5-year validity.', time_minutes: 15 },
  { id: 'e1030000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.drivingLicence, step_number: 4, title: 'Medical Check (Only if 50+ or Commercial LTV/HTV)', description: 'Applicants under 50 renewing a private car/motorcycle licence do NOT need a driving test or medical exam. If aged 50+, visit the on-site medical room for a quick eyesight check.', time_minutes: 10 },
  { id: 'e1030000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.drivingLicence, step_number: 5, title: 'Biometric Capture & Live Photo at DLIMS Counter', description: 'Hand over your old licence and CNIC at the DLIMS booth. Your photo and thumbprints are updated and a digital renewal receipt is printed immediately.', time_minutes: 10 },
  { id: 'e1030000-0000-4000-8000-000000000006', process_id: PROCESS_IDS.drivingLicence, step_number: 6, title: 'Download E-Licence Instantly & Receive PVC Card', description: 'Within hours, download your legal QR-verified e-Licence PDF from dlims.punjab.gov.pk. The physical PVC card is dispatched to your Rawalpindi address via Pakistan Post within 7–15 days.', time_minutes: 5 },

  // 4. FBR NTN for Freelancers
  { id: 'e1040000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.fbrNtn, step_number: 1, title: 'Open Official FBR IRIS 2.0 Portal', description: 'Visit iris.fbr.gov.pk on your phone or laptop and click "New Registration" at the bottom of the login card. Ignore third-party agent websites charging Rs. 3,000+.', time_minutes: 2 },
  { id: 'e1040000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.fbrNtn, step_number: 2, title: 'Enter CNIC, Own-Name Mobile Number & Email', description: 'Type your 13-digit CNIC without dashes, full name as on CNIC, select your mobile network operator (Jazz, Zong, Telenor, Ufone), enter your mobile number in 00923xxxxxxxxx format, and your personal email.', time_minutes: 5 },
  { id: 'e1040000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.fbrNtn, step_number: 3, title: 'Verify Both SMS & Email OTP Codes', description: 'FBR sends two separate 6-digit codes — one to your SMS and one to your email inbox. Enter both codes carefully and submit to receive your IRIS Password and 4-digit PIN via SMS/Email.', time_minutes: 5 },
  { id: 'e1040000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.fbrNtn, step_number: 4, title: 'Log In to IRIS & Add Freelance Business Profile (Form 181)', description: 'Sign in with your CNIC and new password. Go to Registration → 181 (Form of Registration filed voluntarily), add your residential address, bank IBAN, and freelance IT/Software Export activity (Code 6201 / 6209 for PSEB 0.25% rate eligibility).', time_minutes: 8 },
  { id: 'e1040000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.fbrNtn, step_number: 5, title: 'Download Official Taxpayer Registration Certificate (NTN)', description: 'From the left menu, open "Completed Tasks" → click your 181 Registration Order → click Print/Download PDF. You can also verify your NTN instantly on FBR’s Online Taxpayer Verification page.', time_minutes: 3 },

  // 5. Domicile Certificate Rawalpindi
  { id: 'e1050000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.domicile, step_number: 1, title: 'Prepare Stamp Paper Affidavit & Pay Rs. 200 Challan', description: 'Get a Rs. 100 stamp paper affidavit (Bayan-e-Halfi) stating you have no domicile from another district, attested by an Oath Commissioner (easily available outside District Courts / Kachehri or near Liaquat Bagh). Pay the Rs. 200 Domicile Fee via e-Pay Punjab or NBP Form 32-A.', time_minutes: 25 },
  { id: 'e1050000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.domicile, step_number: 2, title: 'Visit e-Khidmat Markaz Liaquat Bagh & Collect Token', description: 'Go to e-Khidmat Markaz inside Liaquat Bagh Sports Complex on Murree Road. Show your complete document folder at the reception desk to get a Domicile Token.', time_minutes: 15 },
  { id: 'e1050000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.domicile, step_number: 3, title: 'Document Scrutiny & Data Entry Counter', description: 'At the Domicile counter, the officer scans your CNIC, utility bill, affidavit, and Matric certificate, captures your live photo, and enters your Form P/P-1 details into the Punjab Domicile Management System.', time_minutes: 15 },
  { id: 'e1050000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.domicile, step_number: 4, title: 'Receive Tracking Receipt & Wait for Patwari/DC Verification', description: 'Collect your computerized tracking receipt with SMS tracking number. The Deputy Commissioner office verifies your Rawalpindi residence record digitally (takes 10–15 working days).', time_minutes: 10 },
  { id: 'e1050000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.domicile, step_number: 5, title: 'Collect Signed QR-Verified Domicile Certificate', description: 'Once you receive the readiness SMS, return to the e-Khidmat delivery window with your original CNIC and tracking slip to collect your official Domicile Certificate.', time_minutes: 15 },

  // 6. Birth Certificate Rawalpindi
  { id: 'e1060000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.birthCertificate, step_number: 1, title: 'Identify Your Exact Union Council or Cantonment Ward', description: 'Check your home address or father’s CNIC to see whether you fall under Rawalpindi Municipal Corporation (Union Council / e-Khidmat Markaz Liaquat Bagh) or Rawalpindi Cantonment Board (RCB Saddar) or Chaklala Cantonment Board (CCB).', time_minutes: 10 },
  { id: 'e1060000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.birthCertificate, step_number: 2, title: 'Collect & Fill Birth Registration Form (CRMS)', description: 'Obtain the official Birth Registration Form at the Union Council Secretary desk or e-Khidmat counter. Fill in the child’s exact English & Urdu name, date/place of birth, and parents’ CNIC numbers clearly.', time_minutes: 15 },
  { id: 'e1060000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.birthCertificate, step_number: 3, title: 'Submit Documents & Pay Official Fee', description: 'Attach the hospital birth slip, copies of parents’ CNICs, and Nikahnama/MRC copy. Pay the Rs. 300–500 registration fee at the fee counter and keep the official stamped receipt.', time_minutes: 20 },
  { id: 'e1060000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.birthCertificate, step_number: 4, title: 'Union Council Verification & CRMS Entry', description: 'The UC Secretary verifies the hospital slip and enters the child’s record into the NADRA Civil Registration Management System (CRMS). This takes 5–10 working days.', time_minutes: 10 },
  { id: 'e1060000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.birthCertificate, step_number: 5, title: 'Collect Computerized Birth Certificate & Apply for B-Form', description: 'Collect the printed NADRA-format computerized Birth Certificate bearing the UC Secretary’s stamp and QR code. Double-check every spelling before leaving — you will use this certificate at NADRA to get the child’s B-Form (CRC).', time_minutes: 15 },

  // 7. Police Character Certificate Rawalpindi
  { id: 'e1070000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.policeCharacter, step_number: 1, title: 'Book Optional Online Appointment (PKM App) or Walk In', description: 'Download the "Punjab Police Khidmat" app (or visit pkm.punjab.gov.pk) to pre-book a time slot at Police Khidmat Markaz Liaquat Bagh or Commercial Market Satellite Town. Walk-ins are also welcome.', time_minutes: 5 },
  { id: 'e1070000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.policeCharacter, step_number: 2, title: 'Collect Token & Confirm Stay Dates', description: 'At the Khidmat Markaz reception, show your original CNIC and passport copy. Confirm the exact start and end dates of your stay in Rawalpindi that need to appear on the certificate.', time_minutes: 10 },
  { id: 'e1070000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.policeCharacter, step_number: 3, title: 'Live Photo, Biometrics & Data Entry', description: 'At the counter, the staff takes your live photograph and thumbprints, checks PSRMS (Police Station Record Management System), and scans your CNIC & passport.', time_minutes: 15 },
  { id: 'e1070000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.policeCharacter, step_number: 4, title: 'Pay Rs. 500 Fee & Get Computerized Receipt', description: 'Pay the official Rs. 500 fee at the counter and receive your printed slip with tracking number and collection date (typically 3 working days).', time_minutes: 10 },
  { id: 'e1070000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.policeCharacter, step_number: 5, title: 'Collect Certificate or Download Digital Copy', description: 'After local police station digital clearance (3 working days), collect your signed QR-verified certificate from the counter with your receipt — or verify/download it from the PKM portal for MOFA attestation.', time_minutes: 10 },

  // 8. Child Passport Under 18
  { id: 'e1080000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.childPassport, step_number: 1, title: 'Pay Fee Against Child’s 13-Digit B-Form Number', description: 'Open the "Passport Fee Asaan" app, choose New Passport (36 pages, 5-year validity for under 15), and carefully enter the CHILD’S 13-digit NADRA CRC/B-Form number — never the parent’s CNIC. Pay via mobile banking and print the receipt.', time_minutes: 10 },
  { id: 'e1080000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.childPassport, step_number: 2, title: 'Arrive With Child & Both Parents’ Original CNICs', description: 'Bring the child physically (even newborns must appear for live photo!) along with original B-Form/CRC, both parents’ original CNICs, and the printed fee receipt to Regional Passport Office Rawalpindi.', time_minutes: 20 },
  { id: 'e1080000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.childPassport, step_number: 3, title: 'Get Family Counter Token', description: 'Show the documents at the reception to receive a Family/Child priority token.', time_minutes: 15 },
  { id: 'e1080000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.childPassport, step_number: 4, title: 'Child’s Live Photo & Parent Biometric Consent', description: 'At the Photo/Biometrics booth, the child’s photograph is captured (tip: bring a light-colored toy or feed infants beforehand so they look straight at the camera). The accompanying parent gives biometric thumbprint verification.', time_minutes: 15 },
  { id: 'e1080000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.childPassport, step_number: 5, title: 'Data Entry & Assistant Director Sign-Off', description: 'Check the draft print carefully — make sure the child’s name spelling matches the B-Form and parents’ passports. Proceed to the AD desk for final approval and collect your delivery token.', time_minutes: 20 },
  { id: 'e1080000-0000-4000-8000-000000000006', process_id: PROCESS_IDS.childPassport, step_number: 6, title: 'Collect Child’s Passport on SMS Confirmation', description: 'Either parent can collect the passport using their original CNIC, child’s original B-Form, and the original collection token once the 9988 readiness SMS arrives.', time_minutes: 15 },

  // 9. Name Change on CNIC After Marriage
  { id: 'e1090000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.nameChangeMarriage, step_number: 1, title: 'Get Computerized NADRA MRC From Union Council First', description: 'Before going to NADRA, register your handwritten Nikahnama at the Union Council where the Nikah took place and collect the Computerized Marriage Registration Certificate (MRC). NADRA requires the MRC QR record.', time_minutes: 15 },
  { id: 'e1090000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.nameChangeMarriage, step_number: 2, title: 'Visit NADRA Mega Center Together (Wife & Husband)', description: 'Both husband and wife visit NADRA Mega Center Rehmanabad with both original CNICs and the original Computerized MRC. Request a "CNIC Modification" token at the desk.', time_minutes: 15 },
  { id: 'e1090000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.nameChangeMarriage, step_number: 3, title: 'Photo Capture, Husband’s Biometric Attestation & Data Entry', description: 'At the counter, tell the operator clearly whether you only want to change Father’s Name to Husband’s Name (keeping your maiden surname) OR also adopt your husband’s surname. Husband provides live biometric verification right at the counter.', time_minutes: 15 },
  { id: 'e1090000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.nameChangeMarriage, step_number: 4, title: 'Double-Check Draft Print & Pay Modification Fee', description: 'Carefully verify English & Urdu spellings of your updated name, husband’s name, and new address (if changing). Pay Rs. 750 (Normal), Rs. 1,500 (Urgent), or Rs. 2,500 (Executive) and keep the receipt.', time_minutes: 10 },
  { id: 'e1090000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.nameChangeMarriage, step_number: 5, title: 'Collect Updated Smart CNIC', description: 'Wait for the SMS from 8400 and collect your updated Smart CNIC from the delivery counter (or home delivery). Remember to also update your passport & bank records if you changed your surname.', time_minutes: 15 },

  // 10. E-Challan Check and Payment
  { id: 'e1100000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.eChallan, step_number: 1, title: 'Open Official PSCA E-Challan Portal', description: 'Go to echallan.psca.gop.pk on your mobile browser (or open the "e-Pay Punjab" app). For Islamabad Safe City e-Challans, use the ITP portal.', time_minutes: 1 },
  { id: 'e1100000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.eChallan, step_number: 2, title: 'Enter Vehicle Registration Number & Owner CNIC', description: 'Type your vehicle plate number (e.g., LEA-1234) and the vehicle owner’s 13-digit CNIC number, complete the captcha, and click Search.', time_minutes: 2 },
  { id: 'e1100000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.eChallan, step_number: 3, title: 'Verify Camera Evidence Photo & Copy 17-Digit PSID', description: 'Review the violation date, location, and traffic camera photos to make sure it is actually your vehicle (not a fake/cloned number plate). Download the challan PDF and copy the 17-digit PSID payment number.', time_minutes: 2 },
  { id: 'e1100000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.eChallan, step_number: 4, title: 'Pay Instantly via JazzCash, Easypaisa, or Bank App', description: 'Open your banking app (HBL, Meezan, UBL, SadaPay, JazzCash, Easypaisa) → Government Payments / 1Bill → GoPb / e-Pay Punjab → paste the 17-digit PSID. Verify the fine amount and owner name, then confirm payment.', time_minutes: 2 },
  { id: 'e1100000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.eChallan, step_number: 5, title: 'Confirm "Paid" Status & Save Receipt', description: 'Refresh echallan.psca.gop.pk after 2 minutes to confirm the challan status shows "Paid". Save a screenshot of the paid receipt on your phone.', time_minutes: 1 },
];

export const SEED_MISTAKES: ProcessMistake[] = [
  // 1. Passport Renewal
  { id: '11010000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.passportRenewal, title: 'Going to NBP Bank Without Checking Passport Fee Asaan App', description: 'Standing in the National Bank queue outside the Passport Office wastes 45–90 minutes. Paying online via the official Passport Fee Asaan app takes 5 minutes from home and is accepted at every counter.', sort_order: 1 },
  { id: '11010000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.passportRenewal, title: 'Arriving With an Expired CNIC or Wearing White Clothes', description: 'If your CNIC is even 1 day expired, the Passport system blocks your application immediately. Also avoid wearing a pure white shirt/dupatta as it blends with the white photo screen and causes rejection.', sort_order: 2 },
  { id: '11010000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.passportRenewal, title: 'Not Proofreading the Data Entry Draft Sheet', description: 'Once you sign the draft slip, even a single wrong letter in your name or birthplace requires paying a brand-new modification fee. Read every single letter slowly before signing.', sort_order: 3 },

  // 2. CNIC Renewal
  { id: '11020000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.cnicRenewal, title: 'Going on Monday Morning Instead of Mid-Week Afternoon', description: 'Monday 8 AM – 12 PM has the longest queues of the entire week at Rehmanabad Mega Center (often 2+ hours). Wednesday or Thursday afternoon cuts waiting time in half.', sort_order: 1 },
  { id: '11020000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.cnicRenewal, title: 'Trying to Change Address Without Bringing a Utility Bill', description: 'Simple renewal needs only your old CNIC, but if you also ask the operator to update your address, they will turn you back without a utility bill or blood relative’s CNIC bearing that address.', sort_order: 2 },
  { id: '11020000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.cnicRenewal, title: 'Paying Touts Outside the Gate for "Fast Token"', description: 'Agents standing outside NADRA charge Rs. 1,000–2,000 extra for nothing — all tokens are issued strictly on CNIC inside the hall, and Executive tier is officially Rs. 2,500 at the counter.', sort_order: 3 },

  // 3. Driving Licence Renewal
  { id: '11030000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.drivingLicence, title: 'Waiting Over 3 Years After Expiry (Triggers Fresh Driving Test)', description: 'Renewing on time or within the grace window requires zero driving test. Letting your licence stay expired for years triggers late penalties and can require repeating the learner & road test.', sort_order: 1 },
  { id: '11030000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.drivingLicence, title: 'Forgetting Medical Certificate When Age is 50+', description: 'Applicants aged 50 or above (or holding LTV/HTV) cannot pass the counter without Form B medical fitness clearance. Check your age requirement before queuing.', sort_order: 2 },
  { id: '11030000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.drivingLicence, title: 'Not Carrying Your Original Expired Card', description: 'A photocopy or mobile photo of your old driving licence is not accepted at the renewal counter unless you bring an official Police Lost Report (e-Gadget/Roznamcha) for a duplicate.', sort_order: 3 },

  // 4. FBR NTN for Freelancers
  { id: '11040000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.fbrNtn, title: 'Using a SIM Registered in Father’s or Brother’s Name', description: 'IRIS cross-checks PTA records automatically. If the mobile SIM is not registered against your own CNIC, registration fails immediately with an error.', sort_order: 1 },
  { id: '11040000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.fbrNtn, title: 'Thinking NTN Alone Makes You a "Filer" (ATL)', description: 'Getting an NTN only registers you in FBR. To enjoy lower Filer withholding tax rates on bank transfers and vehicles, you must also file your annual Income Tax Return on IRIS.', sort_order: 2 },
  { id: '11040000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.fbrNtn, title: 'Leaving Business Activity Blank (Missing 0.25% IT Export Rate)', description: 'Freelancers earning foreign IT remittances via bank PRC qualify for 0.25% final tax (with PSEB registration) — make sure you add IT/Software Consultancy activity in Form 181.', sort_order: 3 },

  // 5. Domicile Certificate Rawalpindi
  { id: '11050000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.domicile, title: 'Arriving Without an Oath Commissioner Attested Affidavit', description: 'e-Khidmat counters will not accept your file without the Rs. 100 stamp paper Bayan-e-Halfi signed by an Oath Commissioner. Get it ready before going inside Liaquat Bagh.', sort_order: 1 },
  { id: '11050000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.domicile, title: 'CNIC Has Neither Permanent Nor Present Address in Rawalpindi', description: 'If both addresses on your CNIC belong to another district, your Rawalpindi domicile will be rejected unless you first update your CNIC address or show strong tenancy/residence proof plus NOC.', sort_order: 2 },
  { id: '11050000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.domicile, title: 'Applying 2 Days Before University Admission Deadline', description: 'Domicile verification takes 10–15 working days and cannot be issued on the same day. Apply at least 3 weeks before MDCAT, ECAT, or university deadlines.', sort_order: 3 },

  // 6. Birth Certificate Rawalpindi
  { id: '11060000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.birthCertificate, title: 'Going to Municipal Union Council When You Live in Cantt Area', description: 'Rawalpindi Cantonment (Saddar, Westridge, Peshawar Road) and Chaklala Cantt (Scheme III, Gulraiz) residents must apply at RCB/CCB offices, NOT city Union Councils.', sort_order: 1 },
  { id: '11060000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.birthCertificate, title: 'Misspelled Child Name on Birth Certificate vs Future Passport', description: 'Whatever English spelling is printed on the UC Birth Certificate gets copied onto the NADRA B-Form and later the child’s Passport. Double-check spellings carefully before final printing.', sort_order: 2 },
  { id: '11060000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.birthCertificate, title: 'Delaying Registration Beyond 60 Days Without Realizing Late Rules', description: 'Registering within 60 days is simple and cheap. Waiting over 1 year adds affidavits, witnesses, and Assistant Director Local Government (ADLG) approval steps that waste weeks.', sort_order: 3 },

  // 7. Police Character Certificate Rawalpindi
  { id: '11070000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.policeCharacter, title: 'Applying Without Passport Copy When Needed for Visa/Study', description: 'Embassies require your exact Passport Number printed on the Police Character Certificate. If you apply with only your CNIC, the certificate will omit the passport number and embassies may reject it.', sort_order: 1 },
  { id: '11070000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.policeCharacter, title: 'Entering Wrong Stay Period Dates', description: 'Check your embassy checklist (usually requires last 5 or 10 years of stay). If your stay dates leave a gap or overlap incorrectly, you will have to pay and re-apply.', sort_order: 2 },
  { id: '11070000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.policeCharacter, title: 'Not Leaving Time for MOFA Attestation', description: 'Police Character Certificate takes 3 working days — if your visa requires Ministry of Foreign Affairs (MOFA) attestation in Islamabad, budget an extra 1–2 days after collection.', sort_order: 3 },

  // 8. Child Passport Under 18
  { id: '11080000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.childPassport, title: 'Paying the Fee Challan Against Father’s CNIC Instead of Child’s B-Form', description: 'This is the #1 day-wasting mistake! Always enter the CHILD’S 13-digit NADRA B-Form/CRC number in Passport Fee Asaan. A challan paid on a parent’s CNIC cannot be linked to the child’s application.', sort_order: 1 },
  { id: '11080000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.childPassport, title: 'Leaving the Baby at Home Thinking Only Documents Are Needed', description: 'Even a 1-month-old infant MUST be physically present at the Passport Office for live photograph capture — external studio photographs are not accepted.', sort_order: 2 },
  { id: '11080000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.childPassport, title: 'Bringing Only One Parent’s CNIC Without the Other Parent’s Original CNIC', description: 'Even if only one parent accompanies the child, the counter checks BOTH father’s and mother’s original valid CNICs (plus guardianship/custody documents if divorced or widowed).', sort_order: 3 },

  // 9. Name Change on CNIC After Marriage
  { id: '11090000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.nameChangeMarriage, title: 'Bringing Only the Handwritten Green Nikahnama', description: 'NADRA centers require the Computerized NADRA Marriage Registration Certificate (MRC) issued by your Union Council. Going with only the handwritten Nikahnama results in instant turnaround.', sort_order: 1 },
  { id: '11090000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.nameChangeMarriage, title: 'Going Without Husband for Biometric Verification', description: 'Your husband must physically attend to verify his thumbprint on the NADRA scanner. If he is overseas, you need a Pakistan Embassy-attested affidavit/undertaking first.', sort_order: 2 },
  { id: '11090000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.nameChangeMarriage, title: 'Changing Surname Without Checking Degrees & Existing Visas', description: 'You do NOT have to change your surname in Pakistan — you can keep your maiden name while updating your Father’s Name field to Husband’s Name. Changing your surname means updating your passport, degrees, and bank accounts too.', sort_order: 3 },

  // 10. E-Challan Check and Payment
  { id: '11100000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.eChallan, title: 'Paying Before Checking the Camera Evidence Photos', description: 'Sometimes look-alike or fake number plates trigger wrongful e-Challans. Always inspect the 3 camera snapshots on echallan.psca.gop.pk before paying — you can dispute a wrong vehicle photo free of cost.', sort_order: 1 },
  { id: '11100000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.eChallan, title: 'Ignoring Unpaid E-Challans on a Car You Sold Without Transfer', description: 'Until the buyer completes biometric vehicle transfer at Excise & Taxation, all camera e-Challans remain tied to the previous owner’s CNIC and can block future vehicle or licence services.', sort_order: 2 },
  { id: '11100000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.eChallan, title: 'Entering Wrong Prefix/Dashes in Vehicle Plate Number', description: 'If a search shows "No Record Found", try both formats (with dash like LEA-1234 and with space/year format like LEA-18-1234) and double-check that you used the registered owner’s CNIC.', sort_order: 3 },
];

export const SEED_FAQS: ProcessFaq[] = [
  // 1. Passport Renewal
  { id: 'f1010000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.passportRenewal, question: 'Can I renew my Pakistani passport completely online without visiting the office?', answer: 'Yes! If your passport has less than 7 months remaining (or is expired) and you want no data changes, you can apply via DGIP’s e-Services portal (onlinemrp.dgip.gov.pk) with fingerprint form upload and home courier delivery. However, many Rawalpindi residents still prefer walking into Rehmanabad RPO for faster Fast Track (2 working days) processing.', sort_order: 1 },
  { id: 'f1010000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.passportRenewal, question: 'What happens to valid US, UK, or Schengen visas in my old passport?', answer: 'When the Assistant Director cancels your old passport, they punch only the cover and bio-data pages — NEVER the valid visa pages. Keep your old cancelled passport clipped together with your new passport when travelling.', sort_order: 2 },
  { id: 'f1010000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.passportRenewal, question: 'Should I choose the 5-year or 10-year passport validity?', answer: 'For adults (15+ years), the 10-year 36-page passport (Rs. 6,700 Normal / Rs. 11,200 Urgent) saves you a whole extra office visit and costs significantly less per year than renewing every 5 years.', sort_order: 3 },
  { id: 'f1010000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.passportRenewal, question: 'Can someone else collect my renewed passport for me?', answer: 'A blood relative (father, mother, sibling, spouse, or adult child) can usually collect it with their original CNIC, your original token slip, and an authority letter — though policies can tighten, so carrying your own CNIC is safest.', sort_order: 4 },
  { id: 'f1010000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.passportRenewal, question: 'How do I check if my passport is ready before going to the office?', answer: 'SMS your 11-digit tracking token number (printed on your receipt) to 9988, or wait for the automated readiness SMS from 9988 before visiting the Delivery Window.', sort_order: 5 },

  // 2. CNIC Renewal
  { id: 'f1020000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.cnicRenewal, question: 'Can I renew my CNIC from home using the Pak-ID mobile app?', answer: 'Yes! Download the official NADRA Pak-ID app on iOS/Android to renew your CNIC from home with phone-camera biometrics and home delivery. If your fingerprints fail to scan on phone, visit NADRA Mega Center Rehmanabad in person.', sort_order: 1 },
  { id: 'f1020000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.cnicRenewal, question: 'Is there any late fine if my CNIC expired months ago?', answer: 'No, NADRA does not charge a late expiry penalty for renewing an expired CNIC. You pay the standard Normal (Rs. 750), Urgent (Rs. 1,500), or Executive (Rs. 2,500) Smart Card fee.', sort_order: 2 },
  { id: 'f1020000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.cnicRenewal, question: 'Is NADRA Mega Center Rehmanabad open on Saturday?', answer: 'Yes! Unlike smaller tehsil centers, NADRA Mega Center Rehmanabad operates Monday through Saturday from 8:00 AM to 8:00 PM (closed on Sunday and public holidays).', sort_order: 3 },
  { id: 'f1020000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.cnicRenewal, question: 'Do I get a paper slip I can use while waiting for the new card?', answer: 'Yes, NADRA gives you an official computerized token receipt (with photo and tracking ID) that serves as temporary proof of renewal for most local verifications until your Smart Card arrives.', sort_order: 4 },
  { id: 'f1020000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.cnicRenewal, question: 'How can I track my CNIC delivery status?', answer: 'Send your 12-digit Tracking ID via SMS to 8400 (standard SMS charges apply) to get an instant status update.', sort_order: 5 },

  // 3. Driving Licence Renewal
  { id: 'f1030000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.drivingLicence, question: 'Do I have to give the driving test again when renewing my licence?', answer: 'No! Standard renewal of a valid or recently expired driving licence in Punjab does NOT require a sign test or practical driving test. Only biometric verification and fee payment are needed.', sort_order: 1 },
  { id: 'f1030000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.drivingLicence, question: 'Can I renew my Punjab driving licence online without visiting Race Course Ground?', answer: 'Yes! If your previous licence is already in the Punjab DLIMS digital database, you can log in at dlims.punjab.gov.pk, upload your photo/documents, pay the PSID via JazzCash/bank app, and download your e-Licence online.', sort_order: 2 },
  { id: 'f1030000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.drivingLicence, question: 'Is the digital e-Licence PDF legally accepted by Traffic Wardens?', answer: 'Yes! Punjab Traffic Police officially recognize the QR-coded e-Licence PDF downloaded from DLIMS while you wait for your physical PVC card to arrive by post.', sort_order: 3 },
  { id: 'f1030000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.drivingLicence, question: 'Can I renew my licence for 5 years at once instead of 1 year?', answer: 'Yes, Punjab DLIMS offers 1-year, 2-year, 3-year, and 5-year renewal options. Selecting 3 or 5 years saves you annual visits and protects against future fee revisions.', sort_order: 4 },
  { id: 'f1030000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.drivingLicence, question: 'Can I renew a Rawalpindi driving licence at e-Khidmat Markaz Liaquat Bagh?', answer: 'Yes, Police Khidmat Markaz counters at Liaquat Bagh and Commercial Market Satellite Town also process driving licence renewals with evening timings till 8:00 PM.', sort_order: 5 },

  // 4. FBR NTN for Freelancers
  { id: 'f1040000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.fbrNtn, question: 'Does registering for an FBR NTN cost any money?', answer: 'No, NTN registration on iris.fbr.gov.pk is 100% free (Rs. 0). You do not need to pay any lawyer or consultant just to generate your NTN.', sort_order: 1 },
  { id: 'f1040000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.fbrNtn, question: 'What is the income tax rate for IT freelancers in Pakistan?', answer: 'Export of IT and IT-enabled services (software development, design, freelancing paid in foreign currency through banking channels with PRC code 9186) is taxed at just 0.25% if registered with PSEB, or 1% without PSEB registration.', sort_order: 2 },
  { id: 'f1040000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.fbrNtn, question: 'Once I have an NTN, do I have to file a tax return every year?', answer: 'Yes. Once registered on FBR IRIS, you should file your annual Income Tax Return (even if your income is below the taxable threshold) before the September 30 deadline each year to remain on the Active Taxpayer List (ATL).', sort_order: 3 },
  { id: 'f1040000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.fbrNtn, question: 'Why am I not receiving the FBR SMS verification code?', answer: 'Check three things: (1) the SIM is registered on your own CNIC, (2) you selected your current network operator accurately (ported/MNP numbers sometimes fail — try your original operator or visit RTO desk), and (3) your inbox isn’t blocking promotional SMS.', sort_order: 4 },
  { id: 'f1040000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.fbrNtn, question: 'Can I register my freelance business name on the same NTN?', answer: 'Yes! Inside IRIS → Registration → Form 181, you can add your freelance studio or sole-proprietorship business name, business address, and bank account completely free.', sort_order: 5 },

  // 5. Domicile Certificate Rawalpindi
  { id: 'f1050000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.domicile, question: 'Who is eligible to apply for a Rawalpindi Domicile Certificate?', answer: 'Any Pakistani citizen residing in District Rawalpindi (with Rawalpindi address on CNIC/B-Form, utility bill, or verified continuous residence) who does not already hold a domicile from another district.', sort_order: 1 },
  { id: 'f1050000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.domicile, question: 'Does a Domicile Certificate ever expire?', answer: 'No, a Pakistan Domicile Certificate is valid for life unless you voluntarily cancel it to obtain a domicile in another district.', sort_order: 2 },
  { id: 'f1050000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.domicile, question: 'Can a student under 18 apply for a Domicile without a CNIC?', answer: 'Yes! Applicants under 18 can apply using their computerized NADRA B-Form (CRC) along with their father’s valid CNIC and Rawalpindi residence proof.', sort_order: 3 },
  { id: 'f1050000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.domicile, question: 'Where do I get the Rs. 100 stamp paper affidavit near e-Khidmat Markaz?', answer: 'Licensed stamp vendors and Oath Commissioners sit outside District Courts (Kachehri Chowk) and near Liaquat Bagh. Keep Rs. 200–300 cash for the stamp paper, typing, and Oath Commissioner stamp.', sort_order: 4 },
  { id: 'f1050000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.domicile, question: 'How can I check if my Rawalpindi Domicile is genuine and ready?', answer: 'Visit ekhidmat.punjab.gov.pk and enter your tracking ID to check live progress. Every new computerized domicile also carries a QR code for instant online verification.', sort_order: 5 },

  // 6. Birth Certificate Rawalpindi
  { id: 'f1060000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.birthCertificate, question: 'What is the difference between a Birth Certificate and a NADRA B-Form (CRC)?', answer: 'First, you get the computerized Birth Certificate from your local Union Council or Cantonment Board. Second, you take that Birth Certificate to NADRA to register the child in your family tree and get the 13-digit B-Form (CRC).', sort_order: 1 },
  { id: 'f1060000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.birthCertificate, question: 'Can I apply for a Birth Certificate if the baby was born at home?', answer: 'Yes, bring the child’s vaccination card from a government health center or a certificate from the Lady Health Worker (LHW) / Dai along with an affidavit on Rs. 100 stamp paper.', sort_order: 2 },
  { id: 'f1060000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.birthCertificate, question: 'What if the child was born in an Islamabad hospital but we live in Rawalpindi?', answer: 'You can register the birth either in the Union Council where the hospital is located OR in your residential Rawalpindi Union Council using the original hospital birth slip and parents’ Rawalpindi CNICs.', sort_order: 3 },
  { id: 'f1060000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.birthCertificate, question: 'How do I get a Birth Certificate for an adult who never had one?', answer: 'Adults apply under Late Birth Registration by submitting their CNIC, Matric certificate, parents’ CNICs, a Rs. 100 stamp paper affidavit, and obtaining ADLG / Magistrate approval before UC issuance.', sort_order: 4 },
  { id: 'f1060000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.birthCertificate, question: 'Does the Rawalpindi Birth Certificate work for foreign visas and MOFA attestation?', answer: 'Yes! Computerized NADRA-format CRMS Birth Certificates issued by Punjab Union Councils and Cantonment Boards are accepted by MOFA Islamabad and foreign embassies.', sort_order: 5 },

  // 7. Police Character Certificate Rawalpindi
  { id: 'f1070000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.policeCharacter, question: 'How long is a Punjab Police Character Certificate valid?', answer: 'Most embassies and employers accept a Police Character Certificate for 3 to 6 months from the date of issuance, though the certificate itself states the verified stay dates.', sort_order: 1 },
  { id: 'f1070000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.policeCharacter, question: 'Do I have to visit my local Thana (Police Station) personally?', answer: 'No! Police Khidmat Markaz sends the verification digitally to your local police station (PSRMS) and handles clearance behind the scenes in 3 working days.', sort_order: 2 },
  { id: 'f1070000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.policeCharacter, question: 'Can I apply for a Rawalpindi Police Character Certificate if I currently live abroad?', answer: 'Yes! A blood relative (father, mother, sibling, or spouse) can apply at Police Khidmat Markaz Rawalpindi with your signed Authority Letter, passport & visa page copies, CNIC copy, and their own original CNIC.', sort_order: 3 },
  { id: 'f1070000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.policeCharacter, question: 'What if I lived in both Rawalpindi and Lahore in the last 5 years?', answer: 'Since both cities are in Punjab, Police Khidmat Markaz can coordinate verification across Punjab districts — just mention all Punjab addresses and stay dates accurately at the counter.', sort_order: 4 },
  { id: 'f1070000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.policeCharacter, question: 'Does MOFA Islamabad attest this certificate?', answer: 'Yes! Bring the original QR-verified Police Character Certificate (ensure your passport number is printed on it) to MOFA Islamabad or courier drop-off for apostille/attestation.', sort_order: 5 },

  // 8. Child Passport Under 18
  { id: 'f1080000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.childPassport, question: 'Can a newborn baby get a Pakistani passport?', answer: 'Yes! As soon as you have the baby’s Union Council Birth Certificate and NADRA B-Form (CRC), you can apply for a child passport at any age.', sort_order: 1 },
  { id: 'f1080000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.childPassport, question: 'Do BOTH parents have to go to the Passport Office?', answer: 'At least one parent must accompany the child with BOTH parents’ original CNICs. However, if both parents can attend together, it avoids any chance of being asked for a notarized consent affidavit.', sort_order: 2 },
  { id: 'f1080000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.childPassport, question: 'Can I get a 10-year passport for my 8-year-old child?', answer: 'No. Under DGIP rules, children under 15 years are only issued 5-year validity passports because facial features change rapidly. Teenagers aged 15 to 17 can apply for 10-year validity.', sort_order: 3 },
  { id: 'f1080000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.childPassport, question: 'What if the parents are divorced or one parent is deceased?', answer: 'If parents are divorced, bring the original Guardianship Certificate / Court Custody Order. If one parent is deceased, bring the original NADRA Death Certificate.', sort_order: 4 },
  { id: 'f1080000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.childPassport, question: 'Is the fee for a child passport lower than an adult passport?', answer: 'No, DGIP charges the exact same fee schedule for minors and adults: Rs. 4,500 Normal, Rs. 7,500 Urgent, and Rs. 12,500 Fast Track (36 pages, 5 years).', sort_order: 5 },

  // 9. Name Change on CNIC After Marriage
  { id: 'f1090000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.nameChangeMarriage, question: 'Is it mandatory to take my husband’s surname after marriage in Pakistan?', answer: 'No! Under Pakistani law and NADRA policy, women can freely keep their maiden name (father’s surname) while only updating the "Father’s Name" field to "Husband’s Name" and marital status to Married.', sort_order: 1 },
  { id: 'f1090000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.nameChangeMarriage, question: 'Will my 13-digit CNIC number change after marriage?', answer: 'No, your 13-digit CNIC number remains the same for your entire life. Only the card data (marital status, husband’s name, optional surname, and address) is updated.', sort_order: 2 },
  { id: 'f1090000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.nameChangeMarriage, question: 'What if my husband is living abroad and cannot come to NADRA?', answer: 'Your husband can get a marriage verification / NOC undertaking attested from the nearest Pakistani Embassy or Consulate abroad (or verify via NADRA Pak-ID app), which you submit alongside the original Computerized MRC.', sort_order: 3 },
  { id: 'f1090000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.nameChangeMarriage, question: 'Can we also update the husband’s CNIC marital status in the same visit?', answer: 'Yes! Your husband can update his marital status to Married in NADRA’s system at the same counter (no new card is even mandatory for the husband unless he wants a fresh card, though updating status helps when applying for a Family Registration Certificate / FRC).', sort_order: 4 },
  { id: 'f1090000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.nameChangeMarriage, question: 'Will I need to change my passport after changing my surname on CNIC?', answer: 'Yes, if you change your own surname on your CNIC, you should renew/modify your Pakistani passport so your CNIC and passport names match 100% for travel and visa applications.', sort_order: 5 },

  // 10. E-Challan Check and Payment
  { id: 'f1100000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.eChallan, question: 'How quickly does an online e-Challan payment clear in the PSCA system?', answer: 'Payments made via PSID (1Bill / e-Pay Punjab / JazzCash / Easypaisa / Bank Apps) update automatically in real time — usually within 1 to 5 minutes.', sort_order: 1 },
  { id: 'f1100000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.eChallan, question: 'How do I challenge a wrong e-Challan if the camera photo is not my car?', answer: 'Call the PSCA helpline (15) or visit the PSCA E-Challan Review Center (Qurban Lines Lahore or your city’s Traffic Police HQ) with your vehicle Smart Card and CNIC to file a free dispute.', sort_order: 2 },
  { id: 'f1100000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.eChallan, question: 'Does PSCA e-Challan work in Rawalpindi and Islamabad too?', answer: 'Punjab Safe Cities Authority (PSCA) covers Lahore, Rawalpindi, Multan, Faisalabad, Gujranwala, and other Smart Safe Cities in Punjab via echallan.psca.gop.pk. Islamabad Traffic Police uses its separate ITP e-Challan system.', sort_order: 3 },
  { id: 'f1100000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.eChallan, question: 'What happens if I do not pay an e-Challan on time?', answer: 'Unpaid e-Challans remain linked to your vehicle registration and CNIC. Multiple unpaid challans can lead to vehicle impoundment at Safe City e-Challan checkpoints and block Excise token tax or vehicle transfer.', sort_order: 4 },
  { id: 'f1100000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.eChallan, question: 'Can I pay an e-Challan at an ATM or bank branch if I do not use banking apps?', answer: 'Yes! Print or write down your 17-digit PSID code and pay it at any Bank of Punjab (BOP) branch, NBP branch, 1Link ATM (under Bill Payment → e-Pay Punjab), or local JazzCash/Easypaisa shop.', sort_order: 5 },
];

// Realistic crowdsourced wait times across the last 7 days (2026-11-10 to 2026-11-16)
export const SEED_WAIT_TIMES: WaitTime[] = [
  // Passport Renewal Rawalpindi (7-day series!)
  { id: '21010000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.passportRenewal, office_name: 'Regional Passport Office Rawalpindi', city: 'Rawalpindi', visit_date: '2026-11-16', wait_minutes: 65, rating: 4, tip: 'Paid via Passport Fee Asaan app before coming — skipped the entire NBP bank queue!', status: 'approved', created_at: '2026-11-16T10:15:00Z' },
  { id: '21010000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.passportRenewal, office_name: 'Regional Passport Office Rawalpindi', city: 'Rawalpindi', visit_date: '2026-11-15', wait_minutes: 80, rating: 3, tip: 'Reached at 9:30 AM and token line was busy. Come before 8:15 AM if possible.', status: 'approved', created_at: '2026-11-15T11:30:00Z' },
  { id: '21010000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.passportRenewal, office_name: 'Regional Passport Office Rawalpindi', city: 'Rawalpindi', visit_date: '2026-11-14', wait_minutes: 55, rating: 4, tip: 'Fast Track counter moved very quickly, done in under an hour from gate to AD signature.', status: 'approved', created_at: '2026-11-14T10:45:00Z' },
  { id: '21010000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.passportRenewal, office_name: 'Regional Passport Office Rawalpindi', city: 'Rawalpindi', visit_date: '2026-11-13', wait_minutes: 70, rating: 4, tip: 'Bring a dark shirt for the photo booth and double-check your draft slip carefully.', status: 'approved', created_at: '2026-11-13T09:50:00Z' },
  { id: '21010000-0000-4000-8000-000000000005', process_id: PROCESS_IDS.passportRenewal, office_name: 'Regional Passport Office Rawalpindi', city: 'Rawalpindi', visit_date: '2026-11-12', wait_minutes: 50, rating: 5, tip: 'Wednesday morning at 8:05 AM was super smooth. Staff at data entry were cooperative.', status: 'approved', created_at: '2026-11-12T09:20:00Z' },
  { id: '21010000-0000-4000-8000-000000000006', process_id: PROCESS_IDS.passportRenewal, office_name: 'Regional Passport Office Rawalpindi', city: 'Rawalpindi', visit_date: '2026-11-11', wait_minutes: 95, rating: 3, tip: 'Server slowed down for 20 mins around 11 AM, otherwise well organized.', status: 'approved', created_at: '2026-11-11T12:10:00Z' },
  { id: '21010000-0000-4000-8000-000000000007', process_id: PROCESS_IDS.passportRenewal, office_name: 'Regional Passport Office Rawalpindi', city: 'Rawalpindi', visit_date: '2026-11-10', wait_minutes: 110, rating: 3, tip: 'Monday rush is real — arrive at 7:50 AM or go Tuesday instead.', status: 'approved', created_at: '2026-11-10T11:40:00Z' },

  // CNIC Renewal Rawalpindi
  { id: '21020000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.cnicRenewal, office_name: 'NADRA Mega Center Rawalpindi (Rehmanabad)', city: 'Rawalpindi', visit_date: '2026-11-16', wait_minutes: 35, rating: 5, tip: 'Visited at 3:15 PM after lunch rush — got token and finished in 35 minutes flat!', status: 'approved', created_at: '2026-11-16T11:00:00Z' },
  { id: '21020000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.cnicRenewal, office_name: 'NADRA Mega Center Rawalpindi (Rehmanabad)', city: 'Rawalpindi', visit_date: '2026-11-14', wait_minutes: 45, rating: 4, tip: 'Clean AC hall, Executive fee paid easily by debit card at the counter.', status: 'approved', created_at: '2026-11-14T13:20:00Z' },
  { id: '21020000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.cnicRenewal, office_name: 'NADRA Mega Center Rawalpindi (Rehmanabad)', city: 'Rawalpindi', visit_date: '2026-11-12', wait_minutes: 30, rating: 5, tip: 'Evening shift after 5 PM is super fast and parking near Rehmanabad is easier.', status: 'approved', created_at: '2026-11-12T14:05:00Z' },
  { id: '21020000-0000-4000-8000-000000000004', process_id: PROCESS_IDS.cnicRenewal, office_name: 'NADRA Mega Center Rawalpindi (Rehmanabad)', city: 'Rawalpindi', visit_date: '2026-11-10', wait_minutes: 75, rating: 3, tip: 'Monday morning is crowded; mid-week afternoon is much better.', status: 'approved', created_at: '2026-11-10T10:30:00Z' },

  // Driving Licence Renewal Rawalpindi
  { id: '21030000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.drivingLicence, office_name: 'City Traffic Police Licensing Branch Rawalpindi', city: 'Rawalpindi', visit_date: '2026-11-16', wait_minutes: 40, rating: 4, tip: 'No test needed for renewal. Got my e-Licence PDF the same afternoon!', status: 'approved', created_at: '2026-11-16T09:10:00Z' },
  { id: '21030000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.drivingLicence, office_name: 'City Traffic Police Licensing Branch Rawalpindi', city: 'Rawalpindi', visit_date: '2026-11-14', wait_minutes: 50, rating: 4, tip: 'Keep JazzCash balance ready to pay the PSID challan right at the desk.', status: 'approved', created_at: '2026-11-14T11:15:00Z' },
  { id: '21030000-0000-4000-8000-000000000003', process_id: PROCESS_IDS.drivingLicence, office_name: 'City Traffic Police Licensing Branch Rawalpindi', city: 'Rawalpindi', visit_date: '2026-11-11', wait_minutes: 35, rating: 5, tip: 'Opted for 5-year renewal at Race Course Ground, super smooth experience.', status: 'approved', created_at: '2026-11-11T09:40:00Z' },

  // FBR NTN for Freelancers
  { id: '21040000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.fbrNtn, office_name: 'FBR IRIS Online Portal & RTO Islamabad Facilitation Desk', city: 'Islamabad', visit_date: '2026-11-16', wait_minutes: 15, rating: 5, tip: 'Did the entire NTN registration online at 10 AM — both SMS & Email OTPs arrived in 30 seconds!', status: 'approved', created_at: '2026-11-16T08:40:00Z' },
  { id: '21040000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.fbrNtn, office_name: 'FBR IRIS Online Portal & RTO Islamabad Facilitation Desk', city: 'Islamabad', visit_date: '2026-11-13', wait_minutes: 25, rating: 4, tip: 'Make sure your SIM is on your own CNIC — mine worked instantly after switching to my own Jazz SIM.', status: 'approved', created_at: '2026-11-13T10:10:00Z' },

  // Domicile Certificate Rawalpindi
  { id: '21050000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.domicile, office_name: 'e-Khidmat Markaz Rawalpindi', city: 'Rawalpindi', visit_date: '2026-11-15', wait_minutes: 55, rating: 4, tip: 'Bring the Rs. 100 stamp paper affidavit already attested from Kachehri so you do not have to leave the line.', status: 'approved', created_at: '2026-11-15T10:05:00Z' },
  { id: '21050000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.domicile, office_name: 'e-Khidmat Markaz Rawalpindi', city: 'Rawalpindi', visit_date: '2026-11-12', wait_minutes: 45, rating: 4, tip: 'Paid the Rs. 200 fee via e-Pay Punjab app — reception checked documents in 5 mins.', status: 'approved', created_at: '2026-11-12T11:15:00Z' },

  // Birth Certificate Rawalpindi
  { id: '21060000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.birthCertificate, office_name: 'Union Council / e-Khidmat Markaz & RCB Rawalpindi', city: 'Rawalpindi', visit_date: '2026-11-15', wait_minutes: 40, rating: 4, tip: 'RCB Saddar counter was neat and quick — bring original hospital birth slip and computerized MRC.', status: 'approved', created_at: '2026-11-15T09:30:00Z' },
  { id: '21060000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.birthCertificate, office_name: 'Union Council / e-Khidmat Markaz & RCB Rawalpindi', city: 'Rawalpindi', visit_date: '2026-11-11', wait_minutes: 50, rating: 4, tip: 'Double-check baby’s English name spelling on screen before UC Secretary prints final copy.', status: 'approved', created_at: '2026-11-11T10:25:00Z' },

  // Police Character Certificate Rawalpindi
  { id: '21070000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.policeCharacter, office_name: 'Police Khidmat Markaz Rawalpindi', city: 'Rawalpindi', visit_date: '2026-11-16', wait_minutes: 25, rating: 5, tip: 'Police Khidmat Markaz Commercial Market is super well-managed. In and out in 25 mins, ready in 3 days!', status: 'approved', created_at: '2026-11-16T09:45:00Z' },
  { id: '21070000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.policeCharacter, office_name: 'Police Khidmat Markaz Rawalpindi', city: 'Rawalpindi', visit_date: '2026-11-13', wait_minutes: 30, rating: 5, tip: 'Remember to bring your passport copy so they print the passport number for embassy use.', status: 'approved', created_at: '2026-11-13T11:50:00Z' },

  // Child Passport Under 18
  { id: '21080000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.childPassport, office_name: 'Regional Passport Office Rawalpindi (Family Counter)', city: 'Rawalpindi', visit_date: '2026-11-15', wait_minutes: 60, rating: 4, tip: 'Family lane was much faster than regular queue. Make sure PSID is generated on child’s B-Form number!', status: 'approved', created_at: '2026-11-15T10:50:00Z' },
  { id: '21080000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.childPassport, office_name: 'Regional Passport Office Rawalpindi (Family Counter)', city: 'Rawalpindi', visit_date: '2026-11-12', wait_minutes: 55, rating: 4, tip: 'Both parents went together with original CNICs — zero hassle at the AD desk.', status: 'approved', created_at: '2026-11-12T10:00:00Z' },

  // Name Change on CNIC After Marriage
  { id: '21090000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.nameChangeMarriage, office_name: 'NADRA Mega Center Rawalpindi (Rehmanabad)', city: 'Rawalpindi', visit_date: '2026-11-15', wait_minutes: 40, rating: 5, tip: 'Ladies & family seating area is comfortable. Bring original computerized MRC and husband for thumbprint.', status: 'approved', created_at: '2026-11-15T12:15:00Z' },
  { id: '21090000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.nameChangeMarriage, office_name: 'NADRA Mega Center Rawalpindi (Rehmanabad)', city: 'Rawalpindi', visit_date: '2026-11-11', wait_minutes: 50, rating: 4, tip: 'You can keep your maiden surname and just add husband’s name — tell the operator clearly before printing.', status: 'approved', created_at: '2026-11-11T13:05:00Z' },

  // E-Challan Check and Payment
  { id: '21100000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.eChallan, office_name: 'Punjab Safe Cities Authority (PSCA) E-Challan Portal', city: 'Lahore', visit_date: '2026-11-16', wait_minutes: 5, rating: 5, tip: 'Checked my bike plate online, verified photo, paid Rs. 200 via Meezan app PSID — cleared in 2 mins!', status: 'approved', created_at: '2026-11-16T07:30:00Z' },
  { id: '21100000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.eChallan, office_name: 'Punjab Safe Cities Authority (PSCA) E-Challan Portal', city: 'Lahore', visit_date: '2026-11-14', wait_minutes: 10, rating: 4, tip: 'JazzCash GoPb PSID payment worked cleanly. Always save a screenshot of the receipt.', status: 'approved', created_at: '2026-11-14T15:20:00Z' },

  // 2 Pending submissions so Admin Moderation Queue has live items ready for approval/rejection!
  { id: '29000000-0000-4000-8000-000000000001', process_id: PROCESS_IDS.passportRenewal, office_name: 'Regional Passport Office Rawalpindi', city: 'Rawalpindi', visit_date: '2026-11-16', wait_minutes: 58, rating: 5, tip: 'Tuesday morning 8:10 AM — photocopy shop across Murree Road opens at 7:45 AM.', status: 'pending', created_at: '2026-11-16T11:45:00Z' },
  { id: '29000000-0000-4000-8000-000000000002', process_id: PROCESS_IDS.domicile, office_name: 'e-Khidmat Markaz Rawalpindi', city: 'Rawalpindi', visit_date: '2026-11-16', wait_minutes: 48, rating: 4, tip: 'Counter 4 for domicile was moving fast today, bring 2 extra passport photos just in case.', status: 'pending', created_at: '2026-11-16T11:55:00Z' },
];
