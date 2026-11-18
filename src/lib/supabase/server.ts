import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const SERVER_FETCH_TIMEOUT_MS = 1200;
const CIRCUIT_BREAKER_COOLDOWN_MS = 60_000;

let unreachableUntil = 0;

/**
 * Creates a server-side Supabase client with a fast abort timeout and a 60s
 * circuit breaker. In production/Vercel where Supabase responds in ~100ms,
 * every request fetches live data. If server-side outbound egress to Supabase
 * is blocked or degraded, the circuit breaker trips once and avoids repeated
 * timeouts so SSR responds in <5ms while browser clients continue syncing live.
 */
export function getSupabaseServerClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  if (Date.now() < unreachableUntil) {
    return null;
  }

  const timedFetch: typeof fetch = async (input, init) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), SERVER_FETCH_TIMEOUT_MS);
    try {
      const response = await fetch(input, {
        ...init,
        signal: controller.signal,
        cache: 'no-store',
      });
      unreachableUntil = 0;
      return response;
    } catch (err) {
      unreachableUntil = Date.now() + CIRCUIT_BREAKER_COOLDOWN_MS;
      throw err;
    } finally {
      clearTimeout(timer);
    }
  };

  return createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      fetch: timedFetch,
    },
  });
}
