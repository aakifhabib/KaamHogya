export interface OfficialNadraCenter {
  name: string;
  badge: 'Mega Center' | 'Executive Centre' | 'Big NRC' | 'Regional Head Office' | 'NRC';
  address: string;
  shifts: string;
  openSaturday: boolean;
  notes?: string;
}

export interface OfficialFbrOffice {
  name: string;
  badge: 'Regional Tax Office (RTO)' | 'Tax Facilitation Center (TFC)';
  address: string;
  phone: string;
  tfcPhone?: string;
  timings: string;
  notes?: string;
}

export interface CityOfficialDirectory {
  citySlug: string;
  cityName: string;
  province: string;
  cnicGuideSlug: string;
  fbrGuideSlug: string;
  nadraOverview: string;
  nadraCenters: OfficialNadraCenter[];
  fbrOverview: string;
  fbrOffices: OfficialFbrOffice[];
}

export const OFFICIAL_HELPLINES = {
  nadra: {
    mobile: '1777',
    landline: '+92 51 111 786 100',
    email: 'csd@nadra.gov.pk',
    hours: '24/7 Helpline',
    feeUrl: 'https://www.nadra.gov.pk/feeStructure',
    portalUrl: 'https://www.nadra.gov.pk/',
  },
  fbr: {
    phone: '051-111-772-772',
    femaleLine: '051-9107025',
    email: 'helpline@fbr.gov.pk',
    hours: 'Mon–Fri, 8:00 AM – 11:30 PM',
    irisUrl: 'https://iris.fbr.gov.pk/',
    fieldOfficesUrl: 'https://www.fbr.gov.pk/field-offices/131167/796',
    registrationUrl: 'https://www.fbr.gov.pk/categ/register-income-tax/51147/30846/%2071150',
  },
} as const;

/**
 * Verified official NADRA Registration Centres (Mega Centers, Executive Centres, Big NRCs, RHOs)
 * and official FBR Regional Tax Offices (RTOs) & Tax Facilitation Centers across all 8 cities.
 * Sources: nadra.gov.pk, punjabsuccession.nadra.gov.pk, dgip.gov.pk, fbr.gov.pk (checked Nov 2026).
 */
export const CITY_OFFICIAL_DIRECTORIES: Record<string, CityOfficialDirectory> = {
  rawalpindi: {
    citySlug: 'rawalpindi',
    cityName: 'Rawalpindi',
    province: 'Punjab',
    cnicGuideSlug: 'cnic-renewal-rawalpindi',
    fbrGuideSlug: 'fbr-ntn-rawalpindi',
    nadraOverview:
      'Rawalpindi is served by the 3-shift NADRA Mega Center at Millennium Mall (Rehmanabad, Murree Road), the 2-shift Cantt center at Lalkurti, Saddar, and Citizen Facilitation Centre Kachehri Chowk.',
    nadraCenters: [
      {
        name: 'NADRA Mega Center, Murree Road (Rehmanabad)',
        badge: 'Mega Center',
        address: 'Millennium Mall, 62-A, Rehmanabad, Murree Road, Rawalpindi',
        shifts: '3 shifts (Extended / 24-hour coverage)',
        openSaturday: true,
        notes: 'Largest high-capacity NADRA hub in Rawalpindi with extended evening & Saturday shifts.',
      },
      {
        name: 'NADRA Registration Center, Rawalpindi Cantt',
        badge: 'NRC',
        address: 'CSD Lalkurti, Rawalpindi Cantt (also serves Saddar Cantt applicants)',
        shifts: '2 shifts (Morning & Evening)',
        openSaturday: true,
        notes: 'Convenient for Cantt, Saddar, and Chaklala residents.',
      },
      {
        name: 'Citizen Facilitation Centre (CFC), Kachehri Chowk',
        badge: 'NRC',
        address: 'Punjab IT Board Building, Kachehri Chowk, Near Jinnah Park, Rawalpindi',
        shifts: '1 shift (Daytime)',
        openSaturday: true,
        notes: 'Multi-service facilitation center for routine CNIC, CRC/B-Form, and FRC processing.',
      },
      {
        name: 'NADRA Wah Cantt & Taxila Centers',
        badge: 'NRC',
        address: 'Plot No. 43/1/37, Civic Centre, Aslam Market, Wah Cantt / Community Centre, Faisal Shaheed Rd, Taxila',
        shifts: '1 shift (Wah Cantt open Saturday)',
        openSaturday: true,
      },
    ],
    fbrOverview:
      'Individual NTN registration is free online via FBR IRIS (iris.fbr.gov.pk). For in-person biometric help, Form 181 assistance, or AOP/business tax queries, visit RTO Rawalpindi on Mayo Road.',
    fbrOffices: [
      {
        name: 'Regional Tax Office (RTO) Rawalpindi & Facilitation Counter',
        badge: 'Regional Tax Office (RTO)',
        address: '12-Mayo Road, Civil Lines (Near Katchery & Fatima Jinnah Women University), Rawalpindi',
        phone: '051-9270405',
        tfcPhone: '051-9270408',
        timings: 'Mon–Thu: 8:30 AM – 4:30 PM | Fri: 8:30 AM – 12:30 PM',
        notes: 'Free walk-in Tax Facilitation Counter for IRIS registration, password recovery, and ATL status queries.',
      },
    ],
  },

  islamabad: {
    citySlug: 'islamabad',
    cityName: 'Islamabad',
    province: 'Islamabad Capital Territory',
    cnicGuideSlug: 'cnic-renewal-islamabad',
    fbrGuideSlug: 'fbr-ntn-for-freelancers',
    nadraOverview:
      'Islamabad features the 3-shift NADRA Mega Center in Khyber Plaza (Blue Area), the Regional Head Office (PHQ) in Sector G-10/4, Asaan Khidmat Center in G-9/1, and Public Facilitation Centers in F-6/1 and G-11/4.',
    nadraCenters: [
      {
        name: 'NADRA Mega Center, Blue Area',
        badge: 'Mega Center',
        address: '98-West, Khyber Plaza, Jinnah Avenue, Blue Area, Islamabad',
        shifts: '3 shifts (24/7 high-volume hub)',
        openSaturday: true,
        notes: 'Flagship ICT Mega Center with evening/night shifts and Saturday operations for CNIC, SNIC, CRC, and FRC.',
      },
      {
        name: 'NADRA Regional Head Office (RHO / PHQ), G-10/4',
        badge: 'Regional Head Office',
        address: 'Ground Floor, Plot No. 30, Mauve Area, Sector G-10/4, Islamabad',
        shifts: '1 shift (Mon–Fri, 8:30 AM – 4:30 PM)',
        openSaturday: false,
        notes: 'Handles complex CNIC verifications, blocked-card cases, and regional escalations.',
      },
      {
        name: 'NADRA Asaan Khidmat Center, G-9/1',
        badge: 'NRC',
        address: 'Asaan Khidmat Center, Rohtas Road, Sector G-9/1, Islamabad',
        shifts: '1 shift (Open Saturday)',
        openSaturday: true,
        notes: 'One-window public facilitation center with shorter weekday morning queues than Blue Area.',
      },
      {
        name: 'Public Facilitation Centers, F-6/1 & G-11/4',
        badge: 'NRC',
        address: 'PFC Sector F-6/1 & ICT Administration Complex, Street 125, Sector G-11/4, Islamabad',
        shifts: '1 shift (Mon–Fri)',
        openSaturday: false,
      },
    ],
    fbrOverview:
      'Islamabad hosts both FBR Headquarters (Constitution Avenue, G-5) and Regional Tax Office (RTO) Islamabad in Mauve Area, Sector G-9/1, with a dedicated Tax Facilitation Center for free IRIS NTN assistance.',
    fbrOffices: [
      {
        name: 'Regional Tax Office (RTO) Islamabad & Tax Facilitation Center',
        badge: 'Regional Tax Office (RTO)',
        address: 'Plot No. 20, Service Road, Mauve Area, Sector G-9/1, Islamabad',
        phone: '051-9106387',
        tfcPhone: '051-9070000',
        timings: 'Mon–Thu: 8:30 AM – 4:30 PM | Fri: 8:30 AM – 12:30 PM',
        notes: 'Free walk-in facilitation desk for Form 181 NTN registration, IRIS login issues, and business tax enrollment.',
      },
    ],
  },

  lahore: {
    citySlug: 'lahore',
    cityName: 'Lahore',
    province: 'Punjab',
    cnicGuideSlug: 'cnic-renewal-lahore',
    fbrGuideSlug: 'fbr-ntn-lahore',
    nadraOverview:
      'Lahore has three official NADRA Mega Centers — Egerton Road (Shimla Pahari), Peco Road (Quaid-e-Azam Town), and Sanda Road — plus multi-shift centers in DHA, Zarrar Shaheed Road, and RHO Johar Town.',
    nadraCenters: [
      {
        name: 'NADRA Mega Center, Egerton Road (Shimla Pahari)',
        badge: 'Mega Center',
        address: '9-Egerton Road, Near Shimla Pahari, Lahore',
        shifts: '3 shifts (24/7 operations)',
        openSaturday: true,
        notes: 'Flagship 3-shift Lahore Mega Center; also hosts an on-site DGIP Passport Processing Counter.',
      },
      {
        name: 'NADRA Mega Center, Peco Road',
        badge: 'Mega Center',
        address: 'Building No. 39, Block 10, Sector B-1, Quaid-e-Azam Town, Peco Road, Lahore',
        shifts: '2 shifts (Extended daytime & evening)',
        openSaturday: true,
        notes: 'Serves Township, Model Town, Johar Town, and Kot Lakhpat; includes passport counter.',
      },
      {
        name: 'NADRA Mega Center, Sanda Road',
        badge: 'Mega Center',
        address: '15-A Sanda Road, Near MAO College, Lahore',
        shifts: '2 shifts (Extended daytime & evening)',
        openSaturday: true,
        notes: 'Central Lahore Mega Center with passport facilitation counter.',
      },
      {
        name: 'NADRA DHA Phase 1 / Phase 4 & RHO Johar Town',
        badge: 'Regional Head Office',
        address: '73 Trade Centre, M.A. Johar Town (RHO) | 124-G DHA Phase 1 & 153-CCA DHA Phase 4, Lahore',
        shifts: '2 shifts at DHA (Open Saturday) | 1 shift at RHO',
        openSaturday: true,
      },
    ],
    fbrOverview:
      'Lahore taxpayers can register free online via FBR IRIS or visit Tax House on Syed Mauj Darya Road (Nabha Road) for in-person RTO Lahore & Corporate Tax Office facilitation.',
    fbrOffices: [
      {
        name: 'Regional Tax Office (RTO) Lahore — Tax House',
        badge: 'Regional Tax Office (RTO)',
        address: 'Tax House, Syed Mauj Darya Road (Nabha Road), Near Charing Cross / Mall Road, Lahore',
        phone: '042-99211827',
        tfcPhone: '042-99211830',
        timings: 'Mon–Thu: 8:30 AM – 4:30 PM | Fri: 8:30 AM – 12:30 PM',
        notes: 'Houses RTO Lahore & Taxpayer Facilitation Counters for free Form 181 NTN registration, AOP/company setup, and ATL verification.',
      },
    ],
  },

  karachi: {
    citySlug: 'karachi',
    cityName: 'Karachi',
    province: 'Sindh',
    cnicGuideSlug: 'cnic-renewal-karachi',
    fbrGuideSlug: 'fbr-ntn-karachi',
    nadraOverview:
      'Karachi operates Pakistan’s largest city NADRA network, led by 3-shift Mega Centers at North Nazimabad, DHA Phase 1, Siemens Chowrangi (S.I.T.E.), and Surjani Town, plus Big Center East and Executive Centres in Clifton, Saddar, and PECHS.',
    nadraCenters: [
      {
        name: 'NADRA Mega Center, North Nazimabad',
        badge: 'Mega Center',
        address: 'Plot No. D15/1, Euro Twin Tower, Block L, North Nazimabad, Karachi Central',
        shifts: '3 shifts (24/7 operations)',
        openSaturday: true,
        notes: 'Includes 24/7 DGIP Passport Processing Counter alongside full CNIC, SNIC, CRC, and FRC counters.',
      },
      {
        name: 'NADRA Mega Center, DHA Phase 1',
        badge: 'Mega Center',
        address: 'Plot # 147, World Business Center, Main Korangi Road, DHA Phase 1 (Near Gold Mark), Karachi',
        shifts: '3 shifts (24/7 operations)',
        openSaturday: true,
        notes: 'High-capacity Mega Center serving DHA, Clifton, Korangi, and Defence View.',
      },
      {
        name: 'NADRA Mega Center, Siemens Chowrangi (S.I.T.E.)',
        badge: 'Mega Center',
        address: 'Plot # B/64-A, S.I.T.E., Siemens Chowrangi, Karachi West',
        shifts: '3 shifts (24/7 operations)',
        openSaturday: true,
        notes: 'Includes 24/7 DGIP Passport Processing Counter for Karachi West & Keamari residents.',
      },
      {
        name: 'Big Center East (University Rd) & Executive Centres (Clifton / PECHS)',
        badge: 'Executive Centre',
        address: 'Plot 11 & 12, Sector 38-A, University Rd | Quality Arcade, Block 7 Clifton | 216/1-A/2 PECHS Shahrah-e-Quaideen',
        shifts: '3 shifts at Big Center East | 2 shifts at Clifton & PECHS',
        openSaturday: true,
      },
    ],
    fbrOverview:
      'Karachi residents can get a free Individual NTN in minutes on FBR IRIS (iris.fbr.gov.pk) or visit the Ground Floor Tax Facilitation Center at Income Tax Building, Shahrah-e-Kamal Ataturk.',
    fbrOffices: [
      {
        name: 'Regional Tax Offices (RTO-I & RTO-II) Karachi & Tax Facilitation Center',
        badge: 'Regional Tax Office (RTO)',
        address: 'Ground Floor (TFC) & Main Income Tax Building, Shahrah-e-Kamal Ataturk (Opposite Sindh Secretariat), Karachi',
        phone: '021-99211782',
        tfcPhone: '021-99211689',
        timings: 'Mon–Thu: 8:30 AM – 4:30 PM | Fri: 8:30 AM – 12:30 PM',
        notes: 'Main Karachi FBR facilitation hub for free Individual Form 181 NTN registration, AOP/sales tax enrollment, and IRIS biometric/PIN support.',
      },
    ],
  },

  peshawar: {
    citySlug: 'peshawar',
    cityName: 'Peshawar',
    province: 'Khyber Pakhtunkhwa',
    cnicGuideSlug: 'cnic-renewal-peshawar',
    fbrGuideSlug: 'fbr-ntn-peshawar',
    nadraOverview:
      'Peshawar has two official NADRA Mega Centers — Tehkal (opposite Peshawar Airport on University Road) and Ring Road (near Pir Zakori Flyover) — plus Executive Centres in Deans Trade Center (Cantt) and Jamrud Road, and PHQ Hayatabad.',
    nadraCenters: [
      {
        name: 'NADRA Mega Center, Tehkal (University Road)',
        badge: 'Mega Center',
        address: 'Opposite Runway Peshawar Airport, Tehkal Bala, University Road, Peshawar',
        shifts: '2 shifts (Extended morning & evening)',
        openSaturday: true,
        notes: 'Primary high-capacity Mega Center serving University Town, Hayatabad, and Tehkal.',
      },
      {
        name: 'NADRA Mega Center, Ring Road',
        badge: 'Mega Center',
        address: 'Adjacent TCS Office, Near Pir Zakori Sharif Flyover, Ring Road, Peshawar',
        shifts: '2 shifts (Extended morning & evening)',
        openSaturday: true,
        notes: 'High-volume Ring Road Mega Center convenient for GT Road & Charsadda Road traffic.',
      },
      {
        name: 'NADRA Executive Centre, Deans Trade Center (Cantt)',
        badge: 'Executive Centre',
        address: 'LG-3 Ground Floor & Basement, Deans Trade Center, Near FC Chowk, Islamia Road, Peshawar Cantt',
        shifts: '1–2 shifts (Open Saturday)',
        openSaturday: true,
        notes: 'Executive & regular counters inside Deans Trade Center.',
      },
      {
        name: 'NADRA Executive Centre Jamrud Road & PHQ Hayatabad',
        badge: 'Regional Head Office',
        address: 'Near Phase 3 Chowk, Jamrud Road | PHQ: EOBI Building, Plot #31, Sector B-1, Phase-V, Hayatabad, Peshawar',
        shifts: '2 shifts on Jamrud Rd (Open Saturday) | 1 shift at PHQ',
        openSaturday: true,
      },
    ],
    fbrOverview:
      'Peshawar individuals & freelancers can register free online via FBR IRIS or visit the Ground Floor Taxpayer Facilitation Desk (TFD) at Income Tax Building (Tax House) on Jamrud Road.',
    fbrOffices: [
      {
        name: 'Regional Tax Office (RTO) Peshawar & Ground Floor TFD',
        badge: 'Regional Tax Office (RTO)',
        address: 'Income Tax Building (Tax House), Jamrud Road, University Town, Peshawar',
        phone: '091-9216138',
        tfcPhone: '091-9216139',
        timings: 'Mon–Thu: 8:30 AM – 4:30 PM | Fri: 8:30 AM – 12:30 PM',
        notes: 'Walk-in Taxpayer Facilitation Desk on the Ground Floor provides free Form 181 NTN registration and IRIS password assistance.',
      },
    ],
  },

  quetta: {
    citySlug: 'quetta',
    cityName: 'Quetta',
    province: 'Balochistan',
    cnicGuideSlug: 'cnic-renewal-quetta',
    fbrGuideSlug: 'fbr-ntn-quetta',
    nadraOverview:
      'Quetta is served by the NADRA Mega Center near Al-Hamd Islamic University, the 2-shift Regional Head Office (RHO) on New Zarghoon Road, the Executive Centre in Jinnah Town, and Quetta Cantt.',
    nadraCenters: [
      {
        name: 'NADRA Mega Center, Quetta',
        badge: 'Mega Center',
        address: 'NADRA Mega Centre, Near Al-Hamd Islamic University, Main Road, Quetta',
        shifts: '2 shifts (Extended hours)',
        openSaturday: true,
        notes: 'Balochistan’s flagship NADRA Mega Center with higher daily token throughput and Saturday service.',
      },
      {
        name: 'NADRA Regional Head Office (RHO), Zarghoon Road',
        badge: 'Regional Head Office',
        address: 'Building # 1418/530, New Zarghoon Road, Quetta',
        shifts: '2 shifts',
        openSaturday: false,
        notes: 'Handles both standard CNIC processing and complex regional verifications/unblocking.',
      },
      {
        name: 'NADRA Executive Centre, Jinnah Town',
        badge: 'Executive Centre',
        address: 'Passport Office Complex, Jinnah Town, Quetta',
        shifts: '1 shift (Daytime)',
        openSaturday: false,
        notes: 'Executive counter co-located with the Jinnah Town Passport Office.',
      },
      {
        name: 'NADRA Quetta Cantt & Model Town Centers',
        badge: 'NRC',
        address: 'Survey No. 186/11, Sarwar Road, Quetta Cantt | Model Town Near TV Station (Open Saturday)',
        shifts: '1 shift',
        openSaturday: true,
      },
    ],
    fbrOverview:
      'Quetta residents can register for a free NTN online on FBR IRIS (iris.fbr.gov.pk) or visit RTO Quetta on Spinny Road for free in-person taxpayer facilitation.',
    fbrOffices: [
      {
        name: 'Regional Tax Office (RTO) Quetta',
        badge: 'Regional Tax Office (RTO)',
        address: 'Regional Tax Office Building, Spinny Road, Quetta',
        phone: '081-9213117',
        timings: 'Mon–Thu: 8:30 AM – 4:30 PM | Fri: 8:30 AM – 12:30 PM',
        notes: 'Official FBR Regional Tax Office for Balochistan; provides free walk-in assistance for IRIS Form 181, AOP registration, and return queries.',
      },
    ],
  },

  hyderabad: {
    citySlug: 'hyderabad',
    cityName: 'Hyderabad',
    province: 'Sindh',
    cnicGuideSlug: 'cnic-renewal-hyderabad',
    fbrGuideSlug: 'fbr-ntn-hyderabad',
    nadraOverview:
      'Hyderabad’s largest NADRA facility is the 3-shift Big NRC in Neha Tower (Latifabad Unit 8, Airport Road), complemented by the 2-shift State Life Building center on Thandi Sarak, Qasimabad, and Pakka Qila.',
    nadraCenters: [
      {
        name: 'NADRA Big NRC, Latifabad (Neha Tower)',
        badge: 'Big NRC',
        address: 'Neha Tower, Plot # 7, Block E, Unit # 8, Airport Road, Latifabad, Hyderabad',
        shifts: '3 shifts (Extended / 24-hour coverage)',
        openSaturday: true,
        notes: 'Highest-capacity NADRA hub in Hyderabad with three shifts and Saturday service.',
      },
      {
        name: 'NADRA State Life Building, Thandi Sarak',
        badge: 'NRC',
        address: 'State Life Building, Thandi Sarak, UC-1, Tehsil Latifabad, Hyderabad',
        shifts: '2 shifts (Morning & Evening)',
        openSaturday: true,
        notes: 'Central Hyderabad center convenient for Civil Lines, Saddar, and Cantonment residents.',
      },
      {
        name: 'NADRA Qasimabad & Pakka Qila Centers',
        badge: 'NRC',
        address: 'Labour Court, Naseem Nagar, Qasimabad | Near Homestead Hall, Pakka Qila, Hyderabad',
        shifts: '1 shift (Daytime)',
        openSaturday: false,
      },
    ],
    fbrOverview:
      'Hyderabad freelancers, salaried persons, and traders can obtain a free NTN online via FBR IRIS or get in-person assistance at RTO Hyderabad in S.I.T.E. Area.',
    fbrOffices: [
      {
        name: 'Regional Tax Office (RTO) Hyderabad',
        badge: 'Regional Tax Office (RTO)',
        address: 'A-49, S.I.T.E. Area, Customs House Building, Hyderabad',
        phone: '022-3886950',
        tfcPhone: '022-9250011',
        timings: 'Mon–Thu: 8:30 AM – 4:30 PM | Fri: 8:30 AM – 12:30 PM',
        notes: 'Official FBR RTO for Hyderabad & interior Sindh; free Tax Facilitation Counter for IRIS NTN, sales tax, and ATL queries.',
      },
    ],
  },

  multan: {
    citySlug: 'multan',
    cityName: 'Multan',
    province: 'Punjab',
    cnicGuideSlug: 'cnic-renewal-multan',
    fbrGuideSlug: 'fbr-ntn-multan',
    nadraOverview:
      'Multan does not have a designated Mega Center, but runs several high-capacity 2-shift centers open on Saturdays — including Bosan Road (Hans Market), Multan Cantt (Ali Arcade), M.A. Jinnah Road, and Mumtazabad — plus the Executive Centre at ChenOne Tower and RHO Shah Rukn-e-Alam.',
    nadraCenters: [
      {
        name: 'NADRA Registration Center, Bosan Road',
        badge: 'NRC',
        address: 'Hans Market, Near Shalimar Metro Station, Bosan Road, Multan',
        shifts: '2 shifts (Morning & Evening)',
        openSaturday: true,
        notes: 'Busiest northern Multan 2-shift center right next to Shalimar Metro Station.',
      },
      {
        name: 'NADRA Executive Centre, ChenOne Tower',
        badge: 'Executive Centre',
        address: '3rd Floor, ChenOne Tower, Abdali Road, Multan',
        shifts: '1 shift (Executive processing)',
        openSaturday: false,
        notes: 'Dedicated executive center with faster seating and passport counter access.',
      },
      {
        name: 'NADRA Multan Cantt (Ali Arcade) & M.A. Jinnah Road',
        badge: 'NRC',
        address: 'Shop 15–16, Ali Arcade, Near Katchehry Chowk | M.A. Jinnah Rd, Near MDA Cooperative Society, Multan',
        shifts: '2 shifts (Both open Saturday)',
        openSaturday: true,
        notes: 'Also joined by 2-shift NRC Mumtazabad (Vehari Road) & RHO Multan (221-A Shah Rukn-e-Alam Colony).',
      },
    ],
    fbrOverview:
      'Multan individuals can register free online via FBR IRIS (iris.fbr.gov.pk) or visit RTO Multan & its Tax Facilitation Center at Chowk Nawan Shehr on L.M.Q. Road.',
    fbrOffices: [
      {
        name: 'Regional Tax Office (RTO) Multan & Tax Facilitation Center',
        badge: 'Regional Tax Office (RTO)',
        address: 'RTO Building, L.M.Q. Road, Chowk Nawan Shehr, Multan',
        phone: '061-9200815',
        tfcPhone: '061-9239021',
        timings: 'Mon–Thu: 8:30 AM – 4:30 PM | Fri: 8:30 AM – 12:30 PM',
        notes: 'Official FBR Regional Tax Office for South Punjab; provides free walk-in Form 181 NTN registration and IRIS facilitation.',
      },
    ],
  },
};

export const ALL_CITY_DIRECTORIES: CityOfficialDirectory[] = [
  CITY_OFFICIAL_DIRECTORIES.rawalpindi,
  CITY_OFFICIAL_DIRECTORIES.islamabad,
  CITY_OFFICIAL_DIRECTORIES.lahore,
  CITY_OFFICIAL_DIRECTORIES.karachi,
  CITY_OFFICIAL_DIRECTORIES.peshawar,
  CITY_OFFICIAL_DIRECTORIES.quetta,
  CITY_OFFICIAL_DIRECTORIES.hyderabad,
  CITY_OFFICIAL_DIRECTORIES.multan,
];

export function getCityOfficialDirectory(citySlugOrName: string): CityOfficialDirectory | null {
  const key = citySlugOrName.trim().toLowerCase();
  return CITY_OFFICIAL_DIRECTORIES[key] ?? null;
}
