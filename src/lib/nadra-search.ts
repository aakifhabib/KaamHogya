import { NADRA_SERVICES, type NadraService } from '@/data/nadra-services';

// Common names and abbreviations used by citizens, alongside the official names.
const ALIASES: Record<string, string> = {
  'first-cnic': 'new cnic identity card new id adult',
  'cnic-renewal': 'renew expired id identity card smart nic snic',
  'cnic-modification': 'change correction update name address marital status smart nic',
  'lost-cnic': 'duplicate lost stolen reprint replace id identity card',
  'child-registration': 'b form b-form bform crc child birth juvenile children',
  'family-registration-certificate': 'frc family registration certificate family tree',
  nicop: 'nicop overseas pakistanis dual national overseas identity',
  'pakistan-origin-card': 'poc pakistan origin card foreign spouse',
  'identity-cancellation': 'cancellation death deceased certificate surrender',
  'succession-certificate': 'succession inheritance legal heirs letter of administration property assets',
};

function normalize(value: string): string {
  return value.toLocaleLowerCase().replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim();
}

export function findNadraServices(query: string): NadraService[] {
  const cities = new Set(['rawalpindi', 'islamabad', 'lahore', 'karachi', 'peshawar', 'quetta', 'hyderabad', 'multan']);
  const terms = normalize(query).split(' ').filter(term => term && !cities.has(term));
  if (!terms.length) return [];
  return NADRA_SERVICES.filter(service => {
    const text = normalize(`${service.title} ${service.summary} ${service.category} nadra ${ALIASES[service.slug] ?? ''}`);
    return terms.every(term => text.includes(term));
  });
}
