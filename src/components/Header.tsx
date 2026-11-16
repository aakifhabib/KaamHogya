'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  CheckSquare,
  Clock,
  Download,
  FileText,
  MapPin,
  Menu,
  Shield,
  X,
} from 'lucide-react';
import { BrandMark } from '@/components/BrandMark';
import { SITE_NAME } from '@/lib/constants';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const NAV_LINKS = [
  { href: '/processes', label: 'All Processes', icon: FileText },
  { href: '/checklist', label: 'Checklist', icon: CheckSquare },
  { href: '/wait-times', label: 'Wait Times', icon: Clock },
  { href: '/city/rawalpindi', label: 'Rawalpindi', icon: MapPin },
  { href: '/about', label: 'About', icon: Shield },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(
    null
  );

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstallPrompt(null);
    }
  };

  return (
    <header className="no-print sticky top-0 z-40 border-b border-emerald-900/10 bg-white/95 backdrop-blur-md">
      {/* Subtle Top Civic Notice Strip */}
      <div className="bg-brand-dark px-3 py-1.5 text-center text-[11px] font-medium text-emerald-100 sm:text-xs">
        <span>Independent Pakistan Citizen Guide — Not an Official Government Website</span>
        <span className="mx-2 hidden text-emerald-400/60 sm:inline">•</span>
        <Link
          href="/disclaimer"
          className="ml-2 underline decoration-emerald-300/60 underline-offset-2 hover:text-white sm:ml-0"
        >
          Read Disclaimer
        </Link>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <BrandMark className="h-9 w-9 shrink-0" />
          <div className="leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold tracking-tight text-ink sm:text-lg">
                {SITE_NAME}
              </span>
              <span className="hidden rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand sm:inline">
                Citizen Guide
              </span>
            </div>
            <p className="text-[11px] text-gray-500">Har Sarkari Kaam, Step by Step</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== '/' && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-emerald-50 text-brand'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-ink'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          {installPrompt && (
            <button
              type="button"
              onClick={handleInstall}
              className="ml-1 inline-flex items-center gap-1.5 rounded-lg border border-brand/25 bg-emerald-50 px-3 py-2 text-xs font-semibold text-brand hover:bg-emerald-100"
            >
              <Download className="h-3.5 w-3.5" />
              Install App
            </button>
          )}
          <Link
            href="/admin"
            className="ml-1 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 transition-colors hover:border-brand hover:text-brand"
          >
            Admin
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          {installPrompt && (
            <button
              type="button"
              onClick={handleInstall}
              className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-2 text-xs font-semibold text-brand"
              aria-label="Install KaamHoGaya app"
            >
              <Download className="h-3.5 w-3.5" />
              App
            </button>
          )}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-gray-100 bg-white px-4 pb-4 pt-2 shadow-lg md:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((item) => {
              const Icon = item.icon;
              const active =
                pathname === item.href ||
                (item.href !== '/' && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                    active
                      ? 'bg-emerald-50 text-brand'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
            <div className="my-1 border-t border-gray-100" />
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link
                href="/contact"
                className="rounded-lg border border-gray-200 px-3 py-2 text-center text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Contact / Help
              </Link>
              <Link
                href="/admin"
                className="rounded-lg bg-brand px-3 py-2 text-center text-xs font-semibold text-white hover:bg-brand-dark"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
