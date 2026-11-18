export const SITE_NAME = 'KaamHoGaya.pk';
export const SITE_TAGLINE = 'Kaam Ho Gaya - Har Sarkari Kaam, Step by Step';
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://kaamhogaya.pk';


export const OFFICIAL_DIRECTORY_URL = 'https://pakistan.gov.pk';

export const FEE_CHECK_DISCLAIMER =
  'Fees, requirements and office details can change. Always confirm with the relevant official agency before travelling or paying.';

export const DISCLAIMER_SHORT =
  'KaamHoGaya.pk is an independent citizen information guide — NOT an official Government of Pakistan, NADRA, DGIP, DLIMS, PKM, or FBR website.';

export const CITY_PORTAL_LINKS: Record<string, { label: string; url: string }> = {
  rawalpindi: {
    label: 'Punjab Portal & e-Khidmat Rawalpindi',
    url: 'https://ekhidmat.punjab.gov.pk',
  },
  islamabad: {
    label: 'ICT Administration & City Islamabad Portal',
    url: 'https://ictadministration.gov.pk',
  },
  lahore: {
    label: 'Government of Punjab Official Portal',
    url: 'https://punjab.gov.pk',
  },
  karachi: {
    label: 'Government of Sindh Official Portal',
    url: 'https://sindh.gov.pk',
  },
  peshawar: {
    label: 'Government of Khyber Pakhtunkhwa Portal',
    url: 'https://kp.gov.pk',
  },
  quetta: {
    label: 'Government of Balochistan Official Portal',
    url: 'https://balochistan.gov.pk',
  },
  hyderabad: {
    label: 'Government of Sindh Citizen Portal',
    url: 'https://sindh.gov.pk',
  },
  multan: {
    label: 'Punjab e-Khidmat Portal',
    url: 'https://ekhidmat.punjab.gov.pk',
  },
};

// Realistic local photocopy & photo studio estimate per city (PKR) for the Fee Calculator
export const CITY_EXTRA_COST_ESTIMATES: Record<
  string,
  { photocopyPerSheet: number; photoSetCost: number; transportNote: string }
> = {
  Rawalpindi: {
    photocopyPerSheet: 20,
    photoSetCost: 250,
    transportNote: 'Shops near Saddar / GT Road / District Complex charge Rs. 15–25 per copy',
  },
  Islamabad: {
    photocopyPerSheet: 25,
    photoSetCost: 350,
    transportNote: 'G-8 / G-9 / Blue Area copy shops typically charge Rs. 20–30 per copy',
  },
  Lahore: {
    photocopyPerSheet: 20,
    photoSetCost: 250,
    transportNote: 'Garden Town / Egerton Road photocopy stalls charge ~Rs. 20 per copy',
  },
  Karachi: {
    photocopyPerSheet: 20,
    photoSetCost: 300,
    transportNote: 'Saddar / Awami Markaz stalls typically charge Rs. 15–25 per copy',
  },
  Peshawar: {
    photocopyPerSheet: 15,
    photoSetCost: 200,
    transportNote: 'Hayatabad / Saddar copy shops average Rs. 15 per copy',
  },
  Quetta: {
    photocopyPerSheet: 20,
    photoSetCost: 250,
    transportNote: 'Zarghoon Road / Jinnah Road copy shops average Rs. 20 per copy',
  },
  Hyderabad: {
    photocopyPerSheet: 15,
    photoSetCost: 200,
    transportNote: 'Latifabad / Saddar copy stalls average Rs. 15 per copy',
  },
  Multan: {
    photocopyPerSheet: 15,
    photoSetCost: 200,
    transportNote: 'Kachehri Chowk / Bosan Road stalls average Rs. 15 per copy',
  },
};
