'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  BadgeCheck,
  Check,
  CheckCircle2,
  Clock,
  Edit3,
  ExternalLink,
  Loader2,
  Lock,
  LogOut,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Star,
  Trash2,
  X,
} from 'lucide-react';
import { ProcessEditorForm } from '@/components/admin/ProcessEditorForm';
import {
  formatDate,
  formatPKR,
  formatShortDate,
  formatWaitMinutes,
} from '@/lib/format';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import type {
  ProcessDocument,
  ProcessFaq,
  ProcessMistake,
  ProcessRecord,
  ProcessStep,
  ProcessWithDetails,
  WaitTime,
} from '@/types/database';

type AdminTab = 'processes' | 'wait-times';
type WaitFilter = 'pending' | 'approved' | 'rejected' | 'all';

export function AdminDashboardClient() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Dashboard state
  const [activeTab, setActiveTab] = useState<AdminTab>('processes');
  const [processes, setProcesses] = useState<ProcessRecord[]>([]);
  const [waitTimes, setWaitTimes] = useState<WaitTime[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [waitFilter, setWaitFilter] = useState<WaitFilter>('pending');
  const [banner, setBanner] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  // Editor mode state
  const [editorMode, setEditorMode] = useState<'none' | 'create' | 'edit'>('none');
  const [editingProcess, setEditingProcess] = useState<ProcessWithDetails | null>(null);
  const [loadingEditor, setLoadingEditor] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const showBanner = (type: 'success' | 'error', text: string) => {
    setBanner({ type, text });
    setTimeout(() => setBanner(null), 5000);
  };

  const loadDashboardData = useCallback(async () => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    setLoadingData(true);
    try {
      const [procRes, waitRes] = await Promise.all([
        supabase
          .from('processes')
          .select('*')
          .order('last_updated', { ascending: false }),
        supabase
          .from('wait_times')
          .select('*')
          .order('created_at', { ascending: false }),
      ]);

      if (procRes.error) throw procRes.error;
      if (waitRes.error) throw waitRes.error;

      setProcesses((procRes.data ?? []) as ProcessRecord[]);
      setWaitTimes((waitRes.data ?? []) as WaitTime[]);
    } catch (err) {
      showBanner(
        'error',
        err instanceof Error
          ? err.message
          : 'Failed to load data from Supabase. Check your connection.'
      );
    } finally {
      setLoadingData(false);
    }
  }, []);

  const verifyAdminSession = useCallback(async () => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setAuthError('Supabase environment variables are not configured.');
      setCheckingAuth(false);
      return;
    }

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        setAdminEmail(null);
        setCheckingAuth(false);
        return;
      }

      const { data: adminRow, error } = await supabase
        .from('admin_users')
        .select('user_id, email')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (error || !adminRow) {
        await supabase.auth.signOut();
        setAdminEmail(null);
        setAuthError(
          'This account does not have KaamHoGaya administrator permissions.'
        );
      } else {
        setAdminEmail(adminRow.email as string);
        await loadDashboardData();
      }
    } catch {
      setAdminEmail(null);
    } finally {
      setCheckingAuth(false);
    }
  }, [loadDashboardData]);

  useEffect(() => {
    verifyAdminSession();
  }, [verifyAdminSession]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setAuthError('Supabase connection is not configured.');
      return;
    }

    setLoggingIn(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error || !data.user) {
        setAuthError(error?.message || 'Invalid email or password.');
        return;
      }

      const { data: adminRow, error: roleErr } = await supabase
        .from('admin_users')
        .select('user_id, email')
        .eq('user_id', data.user.id)
        .maybeSingle();

      if (roleErr || !adminRow) {
        await supabase.auth.signOut();
        setAuthError('Access denied: this user is not an authorized admin.');
        return;
      }

      setAdminEmail(adminRow.email as string);
      setPassword('');
      await loadDashboardData();
    } catch {
      setAuthError('Network error while signing in. Please try again.');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleSignOut = async () => {
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    setAdminEmail(null);
    setEditorMode('none');
    setEditingProcess(null);
  };

  const openEditProcess = async (proc: ProcessRecord) => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    setLoadingEditor(true);
    try {
      const [docsRes, stepsRes, mistakesRes, faqsRes, waitsRes] = await Promise.all([
        supabase
          .from('documents')
          .select('*')
          .eq('process_id', proc.id)
          .order('sort_order', { ascending: true }),
        supabase
          .from('steps')
          .select('*')
          .eq('process_id', proc.id)
          .order('step_number', { ascending: true }),
        supabase
          .from('mistakes')
          .select('*')
          .eq('process_id', proc.id)
          .order('sort_order', { ascending: true }),
        supabase
          .from('faqs')
          .select('*')
          .eq('process_id', proc.id)
          .order('sort_order', { ascending: true }),
        supabase
          .from('wait_times')
          .select('*')
          .eq('process_id', proc.id)
          .order('visit_date', { ascending: false }),
      ]);

      setEditingProcess({
        ...proc,
        documents: (docsRes.data ?? []) as ProcessDocument[],
        steps: (stepsRes.data ?? []) as ProcessStep[],
        mistakes: (mistakesRes.data ?? []) as ProcessMistake[],
        faqs: (faqsRes.data ?? []) as ProcessFaq[],
        wait_times: (waitsRes.data ?? []) as WaitTime[],
      });
      setEditorMode('edit');
    } catch {
      showBanner('error', 'Could not load process details for editing.');
    } finally {
      setLoadingEditor(false);
    }
  };

  const toggleVerified = async (proc: ProcessRecord) => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    setBusyId(proc.id);
    try {
      const nextVal = !proc.is_verified;
      const { data, error } = await supabase
        .from('processes')
        .update({
          is_verified: nextVal,
          last_updated: new Date().toISOString(),
        })
        .eq('id', proc.id)
        .select('*')
        .single();

      if (error) throw error;

      setProcesses((prev) =>
        prev.map((p) => (p.id === proc.id ? (data as ProcessRecord) : p))
      );
      showBanner(
        'success',
        `"${proc.title}" marked as ${
          nextVal ? 'Verified' : 'Unverified'
        } and last_updated refreshed.`
      );
    } catch (err) {
      showBanner(
        'error',
        err instanceof Error ? err.message : 'Failed to update verification status.'
      );
    } finally {
      setBusyId(null);
    }
  };

  const deleteProcess = async (proc: ProcessRecord) => {
    const confirmed = window.confirm(
      `Delete "${proc.title}" permanently? This also removes its documents, steps, mistakes, FAQs, and wait times.`
    );
    if (!confirmed) return;

    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    setBusyId(proc.id);
    try {
      const { error } = await supabase.from('processes').delete().eq('id', proc.id);
      if (error) throw error;
      setProcesses((prev) => prev.filter((p) => p.id !== proc.id));
      setWaitTimes((prev) => prev.filter((w) => w.process_id !== proc.id));
      showBanner('success', `Deleted "${proc.title}".`);
    } catch (err) {
      showBanner(
        'error',
        err instanceof Error ? err.message : 'Failed to delete process.'
      );
    } finally {
      setBusyId(null);
    }
  };

  const updateWaitTimeStatus = async (
    wt: WaitTime,
    nextStatus: 'approved' | 'rejected'
  ) => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    setBusyId(wt.id);
    try {
      const { error } = await supabase
        .from('wait_times')
        .update({ status: nextStatus })
        .eq('id', wt.id);
      if (error) throw error;
      setWaitTimes((prev) =>
        prev.map((w) => (w.id === wt.id ? { ...w, status: nextStatus } : w))
      );
      showBanner(
        'success',
        `Wait time submission for ${wt.office_name} ${nextStatus}.`
      );
    } catch (err) {
      showBanner(
        'error',
        err instanceof Error ? err.message : 'Failed to moderate submission.'
      );
    } finally {
      setBusyId(null);
    }
  };

  const deleteWaitTime = async (wt: WaitTime) => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    setBusyId(wt.id);
    try {
      const { error } = await supabase.from('wait_times').delete().eq('id', wt.id);
      if (error) throw error;
      setWaitTimes((prev) => prev.filter((w) => w.id !== wt.id));
      showBanner('success', 'Wait time report deleted.');
    } catch (err) {
      showBanner(
        'error',
        err instanceof Error ? err.message : 'Failed to delete submission.'
      );
    } finally {
      setBusyId(null);
    }
  };

  const processTitleMap = useMemo(
    () => new Map(processes.map((p) => [p.id, p])),
    [processes]
  );

  const pendingCount = useMemo(
    () => waitTimes.filter((w) => w.status === 'pending').length,
    [waitTimes]
  );

  const filteredProcesses = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return processes;
    return processes.filter((p) =>
      `${p.title} ${p.city} ${p.category} ${p.slug}`.toLowerCase().includes(q)
    );
  }, [processes, searchQuery]);

  const filteredWaits = useMemo(() => {
    if (waitFilter === 'all') return waitTimes;
    return waitTimes.filter((w) => w.status === waitFilter);
  }, [waitTimes, waitFilter]);

  if (checkingAuth) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand" />
        <p className="mt-3 text-sm font-medium text-gray-600">
          Checking admin session...
        </p>
      </div>
    );
  }

  // Protected Admin Login Gate (NO public signup)
  if (!adminEmail) {
    return (
      <div className="mx-auto max-w-md py-6">
        <div className="rounded-2xl border border-emerald-950/10 bg-white p-6 shadow-md sm:p-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-brand">
            <Lock className="h-6 w-6" aria-hidden="true" />
          </div>
          <h1 className="mt-4 text-center text-2xl font-extrabold text-ink">
            Admin Sign In
          </h1>
          <p className="mt-1.5 text-center text-xs text-gray-600">
            Authorized KaamHoGaya.pk editors only. Public signup is disabled.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="admin-email"
                className="mb-1 block text-xs font-semibold text-gray-700"
              >
                Admin Email
              </label>
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@kaamhogaya.pk"
                className="w-full rounded-xl border border-gray-300 bg-surface px-3.5 py-2.5 text-sm text-ink focus:border-brand focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="mb-1 block text-xs font-semibold text-gray-700"
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-xl border border-gray-300 bg-surface px-3.5 py-2.5 text-sm text-ink focus:border-brand focus:bg-white focus:outline-none"
              />
            </div>

            {authError && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-danger"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loggingIn}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-dark disabled:opacity-60"
            >
              {loggingIn ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ShieldCheck className="h-4 w-4" />
              )}
              {loggingIn ? 'Signing in...' : 'Sign In to Admin Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Editor View
  if (editorMode === 'create' || editorMode === 'edit') {
    return (
      <ProcessEditorForm
        existing={editorMode === 'edit' ? editingProcess : null}
        onCancel={() => {
          setEditorMode('none');
          setEditingProcess(null);
        }}
        onSaved={async (savedSlug) => {
          setEditorMode('none');
          setEditingProcess(null);
          await loadDashboardData();
          showBanner(
            'success',
            `Process saved live to Supabase (/process/${savedSlug}) and last_updated refreshed.`
          );
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Admin Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-brand">
            <ShieldCheck className="h-3.5 w-3.5" />
            Signed in as {adminEmail}
          </div>
          <h1 className="mt-1.5 text-2xl font-extrabold text-ink">
            KaamHoGaya.pk Admin Dashboard
          </h1>
          <p className="text-xs text-gray-500">
            Manage processes, fees, checklists, verification badges, and citizen wait-time
            reports.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={loadDashboardData}
            disabled={loadingData}
            className="inline-flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs font-semibold text-ink hover:bg-gray-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loadingData ? 'animate-spin' : ''}`} />
            Refresh
          </button>

          <button
            type="button"
            onClick={() => {
              setEditingProcess(null);
              setEditorMode('create');
            }}
            className="inline-flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-brand-dark"
          >
            <Plus className="h-4 w-4" />
            Add New Process
          </button>

          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2 text-xs font-semibold text-danger hover:bg-red-100"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Summary KPI Row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-emerald-950/10 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-gray-500">Total Processes</p>
          <p className="mt-1 text-2xl font-extrabold text-ink">{processes.length}</p>
        </div>
        <div className="rounded-xl border border-emerald-950/10 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-gray-500">Verified Guides</p>
          <p className="mt-1 text-2xl font-extrabold text-brand">
            {processes.filter((p) => p.is_verified).length}
          </p>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 shadow-sm">
          <p className="text-xs font-medium text-amber-900">Pending Wait Reports</p>
          <p className="mt-1 text-2xl font-extrabold text-amber-900">{pendingCount}</p>
        </div>
        <div className="rounded-xl border border-emerald-950/10 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-gray-500">Approved Wait Reports</p>
          <p className="mt-1 text-2xl font-extrabold text-ink">
            {waitTimes.filter((w) => w.status === 'approved').length}
          </p>
        </div>
      </div>

      {/* Status Toast Banner */}
      {banner && (
        <div
          role={banner.type === 'error' ? 'alert' : 'status'}
          className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-xs font-semibold ${
            banner.type === 'success'
              ? 'border-emerald-200 bg-emerald-50 text-brand-dark'
              : 'border-red-200 bg-red-50 text-danger'
          }`}
        >
          {banner.type === 'success' ? (
            <CheckCircle2 className="h-4 w-4 shrink-0 text-brand" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0" />
          )}
          <span>{banner.text}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200">
        <button
          type="button"
          onClick={() => setActiveTab('processes')}
          className={`border-b-2 px-4 py-2.5 text-sm font-bold transition-colors ${
            activeTab === 'processes'
              ? 'border-brand text-brand'
              : 'border-transparent text-gray-500 hover:text-ink'
          }`}
        >
          Processes ({processes.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('wait-times')}
          className={`inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-bold transition-colors ${
            activeTab === 'wait-times'
              ? 'border-brand text-brand'
              : 'border-transparent text-gray-500 hover:text-ink'
          }`}
        >
          Wait Time Moderation
          {pendingCount > 0 && (
            <span className="rounded-full bg-danger px-2 py-0.5 text-[11px] font-bold text-white">
              {pendingCount} pending
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: PROCESSES MANAGER */}
      {activeTab === 'processes' && (
        <div className="space-y-4">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter processes by title, city, category..."
              className="w-full rounded-xl border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-brand focus:outline-none"
            />
          </div>

          {loadingEditor && (
            <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-xs font-semibold text-brand">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading process documents, steps, mistakes, and FAQs...
            </div>
          )}

          <div className="overflow-hidden rounded-2xl border border-emerald-950/10 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-surface text-xs font-bold uppercase tracking-wider text-gray-600">
                    <th className="px-4 py-3">Process</th>
                    <th className="px-4 py-3">City / Category</th>
                    <th className="px-4 py-3">Normal / Urgent / Exec</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Last Updated</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredProcesses.map((proc) => (
                    <tr key={proc.id} className="hover:bg-surface/50">
                      <td className="px-4 py-3.5">
                        <p className="font-bold text-ink">{proc.title}</p>
                        <Link
                          href={`/process/${proc.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-xs text-brand hover:underline"
                        >
                          /process/{proc.slug}
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </td>
                      <td className="px-4 py-3.5 text-xs">
                        <span className="font-semibold text-ink">{proc.city}</span>
                        <span className="block text-gray-500">{proc.category}</span>
                      </td>
                      <td className="px-4 py-3.5 text-xs font-semibold text-ink">
                        {formatPKR(proc.fee_normal, false)} /{' '}
                        {formatPKR(proc.fee_urgent, false)} /{' '}
                        {formatPKR(proc.fee_executive, false)}
                      </td>
                      <td className="px-4 py-3.5">
                        <button
                          type="button"
                          disabled={busyId === proc.id}
                          onClick={() => toggleVerified(proc)}
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold transition-colors ${
                            proc.is_verified
                              ? 'bg-emerald-100 text-brand-dark hover:bg-emerald-200'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          <BadgeCheck className="h-3.5 w-3.5" />
                          {proc.is_verified ? 'Verified' : 'Unverified'}
                        </button>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-gray-600">
                        {formatDate(proc.last_updated)}
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => openEditProcess(proc)}
                            className="inline-flex items-center gap-1 rounded-lg border border-brand/25 bg-emerald-50 px-2.5 py-1.5 text-xs font-bold text-brand hover:bg-emerald-100"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                            Edit
                          </button>
                          <button
                            type="button"
                            disabled={busyId === proc.id}
                            onClick={() => deleteProcess(proc)}
                            aria-label={`Delete ${proc.title}`}
                            className="rounded-lg border border-red-200 bg-white p-1.5 text-danger hover:bg-red-50"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WAIT TIME MODERATION */}
      {activeTab === 'wait-times' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {(['pending', 'approved', 'rejected', 'all'] as WaitFilter[]).map((f) => {
              const count =
                f === 'all'
                  ? waitTimes.length
                  : waitTimes.filter((w) => w.status === f).length;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setWaitFilter(f)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-bold capitalize transition-colors ${
                    waitFilter === f
                      ? 'bg-brand text-white'
                      : 'border border-gray-300 bg-white text-gray-700 hover:bg-surface'
                  }`}
                >
                  {f} ({count})
                </button>
              );
            })}
          </div>

          {filteredWaits.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
              No {waitFilter} wait time reports found.
            </div>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {filteredWaits.map((wt) => {
                const parentProc = processTitleMap.get(wt.process_id);
                return (
                  <div
                    key={wt.id}
                    className="flex flex-col rounded-2xl border border-emerald-950/10 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-bold text-ink">{wt.office_name}</p>
                        <p className="text-xs text-gray-500">
                          {wt.city} • {parentProc?.title ?? 'Linked Process'}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase ${
                          wt.status === 'approved'
                            ? 'bg-emerald-100 text-brand-dark'
                            : wt.status === 'pending'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-red-100 text-danger'
                        }`}
                      >
                        {wt.status}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-700">
                      <span className="inline-flex items-center gap-1 font-bold text-brand">
                        <Clock className="h-3.5 w-3.5" />
                        {formatWaitMinutes(wt.wait_minutes)}
                      </span>
                      <span>Visited: {formatShortDate(wt.visit_date)}</span>
                      <span className="inline-flex items-center gap-0.5 font-semibold">
                        <Star className="h-3.5 w-3.5 fill-accent-yellow text-accent-yellow" />
                        {wt.rating}/5
                      </span>
                    </div>

                    {wt.tip && (
                      <p className="mt-2.5 rounded-xl bg-surface p-3 text-xs leading-relaxed text-gray-700">
                        &ldquo;{wt.tip}&rdquo;
                      </p>
                    )}

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-3 text-xs">
                      <span className="text-[11px] text-gray-400">
                        Submitted {formatDate(wt.created_at)}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {wt.status !== 'approved' && (
                          <button
                            type="button"
                            disabled={busyId === wt.id}
                            onClick={() => updateWaitTimeStatus(wt, 'approved')}
                            className="inline-flex items-center gap-1 rounded-lg bg-brand px-3 py-1.5 font-bold text-white hover:bg-brand-dark disabled:opacity-60"
                          >
                            <Check className="h-3.5 w-3.5" />
                            Approve
                          </button>
                        )}
                        {wt.status !== 'rejected' && (
                          <button
                            type="button"
                            disabled={busyId === wt.id}
                            onClick={() => updateWaitTimeStatus(wt, 'rejected')}
                            className="inline-flex items-center gap-1 rounded-lg border border-amber-300 bg-amber-50 px-3 py-1.5 font-bold text-amber-900 hover:bg-amber-100 disabled:opacity-60"
                          >
                            <X className="h-3.5 w-3.5" />
                            Reject
                          </button>
                        )}
                        <button
                          type="button"
                          disabled={busyId === wt.id}
                          onClick={() => deleteWaitTime(wt)}
                          aria-label="Delete report"
                          className="rounded-lg border border-red-200 bg-white p-1.5 text-danger hover:bg-red-50"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
