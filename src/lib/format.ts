/**
 * Formatting, sanitization, and input validation helpers for KaamHoGaya.pk
 */

export function formatPKR(amount: number, showFreeLabel = true): string {
  if (!Number.isFinite(amount) || amount <= 0) {
    return showFreeLabel ? 'Rs. 0 (Free)' : 'Rs. 0';
  }
  return `Rs. ${Math.round(amount).toLocaleString('en-PK')}`;
}

export function formatDate(isoOrDate: string | Date): string {
  const date = typeof isoOrDate === 'string' ? new Date(isoOrDate) : isoOrDate;
  if (Number.isNaN(date.getTime())) {
    return '17 Nov 2026';
  }
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function formatShortDate(yyyyMmDd: string): string {
  const parts = yyyyMmDd.split('-');
  if (parts.length !== 3) return yyyyMmDd;
  const date = new Date(Date.UTC(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2])));
  if (Number.isNaN(date.getTime())) return yyyyMmDd;
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  }).format(date);
}

export function formatWaitMinutes(minutes: number | null | undefined): string {
  if (minutes === null || minutes === undefined || !Number.isFinite(minutes)) {
    return 'No data yet';
  }
  const rounded = Math.round(minutes);
  if (rounded < 60) {
    return `${rounded} min${rounded === 1 ? '' : 's'}`;
  }
  const hrs = Math.floor(rounded / 60);
  const rem = rounded % 60;
  if (rem === 0) {
    return `${hrs} hr${hrs === 1 ? '' : 's'}`;
  }
  return `${hrs} hr ${rem} min`;
}

export function formatDomain(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Strip HTML tags and dangerous control characters from user text.
 */
export function sanitizeText(input: string, maxLength = 200): string {
  const stripped = input
    .replace(/<[^>]*>/g, '')
    .replace(/[<>]/g, '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return stripped.slice(0, maxLength);
}

/**
 * Ensure external URLs use safe http/https schemes only.
 */
export function sanitizeHttpUrl(url: string): string {
  const trimmed = url.trim();
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
      return parsed.toString();
    }
  } catch {
    // fall through
  }
  return 'https://pakistan.gov.pk';
}

export function getTodayDateString(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export interface WaitTimeValidationResult {
  valid: boolean;
  error?: string;
  cleanTip: string;
}

export function validateWaitTimeInput(params: {
  visitDate: string;
  waitMinutes: number;
  rating: number;
  tip: string;
}): WaitTimeValidationResult {
  const { visitDate, waitMinutes, rating, tip } = params;

  if (!visitDate || !/^\d{4}-\d{2}-\d{2}$/.test(visitDate)) {
    return { valid: false, error: 'Please select a valid visit date.', cleanTip: '' };
  }

  const todayStr = getTodayDateString();
  if (visitDate > todayStr) {
    return {
      valid: false,
      error: 'Visit date cannot be in the future.',
      cleanTip: '',
    };
  }

  // Within last 90 days check
  const visitTs = Date.parse(`${visitDate}T00:00:00Z`);
  const todayTs = Date.parse(`${todayStr}T00:00:00Z`);
  const ninetyDaysMs = 90 * 24 * 60 * 60 * 1000;
  if (Number.isNaN(visitTs) || todayTs - visitTs > ninetyDaysMs) {
    return {
      valid: false,
      error: 'Visit date must be within the last 90 days.',
      cleanTip: '',
    };
  }

  if (!Number.isInteger(waitMinutes) || waitMinutes < 5 || waitMinutes > 480) {
    return {
      valid: false,
      error: 'Wait time must be between 5 and 480 minutes.',
      cleanTip: '',
    };
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return {
      valid: false,
      error: 'Please select a rating between 1 and 5 stars.',
      cleanTip: '',
    };
  }

  const cleanTip = sanitizeText(tip, 200);
  if (tip.trim().length > 200) {
    return {
      valid: false,
      error: 'Tip must be 200 characters or fewer.',
      cleanTip,
    };
  }

  return { valid: true, cleanTip };
}

/**
 * Persistent anonymous browser fingerprint hash for rate limiting wait-time reports.
 */
export function getOrCreateClientHash(): string {
  if (typeof window === 'undefined') return 'server';
  const key = 'khg_client_hash_v1';
  try {
    let existing = window.localStorage.getItem(key);
    if (!existing) {
      const randomPart =
        typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      existing = `khg-${randomPart}`;
      window.localStorage.setItem(key, existing);
    }
    return existing;
  } catch {
    return `khg-session-${Date.now()}`;
  }
}

/**
 * Local client-side rate-limit check (mirrors server RPC rules for instant feedback).
 */
export function checkClientWaitTimeRateLimit(processId: string): string | null {
  if (typeof window === 'undefined') return null;
  const key = 'khg_wait_submissions_v1';
  try {
    const raw = window.localStorage.getItem(key);
    const records: Array<{ processId: string; ts: number }> = raw ? JSON.parse(raw) : [];
    const now = Date.now();
    const oneHourAgo = now - 60 * 60 * 1000;
    const fifteenMinsAgo = now - 15 * 60 * 1000;

    const recentHour = records.filter((r) => r.ts > oneHourAgo);
    if (recentHour.length >= 3) {
      return 'Rate limit reached: max 3 reports per hour. Please try again later.';
    }
    const recentSame = recentHour.filter(
      (r) => r.processId === processId && r.ts > fifteenMinsAgo
    );
    if (recentSame.length >= 1) {
      return 'You already submitted a wait time for this office in the last 15 minutes.';
    }
    return null;
  } catch {
    return null;
  }
}

export function recordClientWaitTimeSubmission(processId: string): void {
  if (typeof window === 'undefined') return;
  const key = 'khg_wait_submissions_v1';
  try {
    const raw = window.localStorage.getItem(key);
    const records: Array<{ processId: string; ts: number }> = raw ? JSON.parse(raw) : [];
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    const pruned = records.filter((r) => r.ts > oneHourAgo);
    pruned.push({ processId, ts: Date.now() });
    window.localStorage.setItem(key, JSON.stringify(pruned));
  } catch {
    // ignore storage quota error
  }
}

export function getWaitTimeBadgeColor(minutes: number | null): {
  bg: string;
  text: string;
  label: string;
} {
  if (minutes === null) {
    return { bg: 'bg-gray-100', text: 'text-gray-700', label: 'New' };
  }
  if (minutes <= 30) {
    return { bg: 'bg-emerald-50', text: 'text-emerald-800', label: 'Fast' };
  }
  if (minutes <= 60) {
    return { bg: 'bg-amber-50', text: 'text-amber-800', label: 'Moderate' };
  }
  return { bg: 'bg-red-50', text: 'text-red-700', label: 'Busy' };
}

export function matchesTimeFilter(timeRequired: string, filter: string): boolean {
  if (!filter || filter === 'all') return true;
  const lower = timeRequired.toLowerCase();
  if (filter === 'instant') {
    return (
      lower.includes('min') ||
      lower.includes('instant') ||
      lower.includes('same day') ||
      lower.includes('online')
    );
  }
  if (filter === 'week') {
    return (
      lower.includes('3 working') ||
      lower.includes('5–7') ||
      lower.includes('5-7') ||
      lower.includes('7 days') ||
      lower.includes('5–10') ||
      lower.includes('1–2 weeks')
    );
  }
  if (filter === 'weeks') {
    return (
      lower.includes('10–15') ||
      lower.includes('15–30') ||
      lower.includes('21') ||
      lower.includes('30') ||
      lower.includes('week')
    );
  }
  return true;
}

export function matchesFeeFilter(feeNormal: number, filter: string): boolean {
  if (!filter || filter === 'all') return true;
  if (filter === 'free') return feeNormal === 0;
  if (filter === 'under1000') return feeNormal > 0 && feeNormal <= 1000;
  if (filter === '1000to5000') return feeNormal > 1000 && feeNormal <= 5000;
  if (filter === 'over5000') return feeNormal > 5000;
  return true;
}
