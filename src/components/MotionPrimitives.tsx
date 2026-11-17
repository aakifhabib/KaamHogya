'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Razor-thin emerald-to-gold scroll progress bar mounted along the sticky header edge.
 */
export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 24) {
        setProgress(0);
        return;
      }
      setProgress(Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)));
    };

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none h-[2.5px] w-full overflow-hidden bg-emerald-950/5"
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-brand via-emerald-500 to-accent-yellow transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'none';
}

/**
 * Lightweight IntersectionObserver scroll-reveal primitive.
 * Progressive enhancement: content is always visible in SSR / no-JS / print / reduced-motion,
 * and smoothly slides into view when below-the-fold sections enter the viewport.
 */
export function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'ssr' | 'hidden' | 'visible'>('ssr');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      setState('visible');
      return;
    }

    const rect = el.getBoundingClientRect();
    // Elements already visible above the fold stay immediately readable without flicker
    if (rect.top < window.innerHeight * 0.94) {
      setState('visible');
      return;
    }

    // Arm reveal only for below-the-fold elements
    setState('hidden');

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setState('visible');
            observer.unobserve(el);
          }
        }
      },
      { threshold: 0.01, rootMargin: '0px 0px -12px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={state}
      data-direction={direction}
      style={state === 'visible' && delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
      className={`khg-reveal ${className}`}
    >
      {children}
    </div>
  );
}

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

/**
 * Smooth ease-out cubic animated numeric counter triggered when visible.
 */
export function AnimatedCounter({
  value,
  suffix = '',
  duration = 750,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimatedRef.current) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || value <= 1 || typeof IntersectionObserver === 'undefined') {
      setDisplay(value);
      return;
    }

    const runAnimation = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;
      const start = performance.now();

      const step = (now: number) => {
        const elapsed = now - start;
        const t = Math.min(1, elapsed / duration);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(Math.round(eased * value));
        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          setDisplay(value);
        }
      };

      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          runAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

/**
 * Subtle ambient drifting aurora orbs + architectural dot-grid for emerald hero sections.
 */
export function HeroAmbientOrbs() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Subtle architectural dot grid */}
      <div className="khg-hero-grid absolute inset-0 opacity-45" />

      {/* Warm golden-amber atmospheric glow orb */}
      <div
        className="animate-orb-drift absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-25 blur-3xl sm:h-96 sm:w-96"
        style={{
          background:
            'radial-gradient(circle, rgba(245, 179, 1, 0.55) 0%, rgba(245, 179, 1, 0) 70%)',
        }}
      />

      {/* Luminous emerald highlight orb */}
      <div
        className="animate-orb-drift-reverse absolute -bottom-28 -right-20 h-80 w-80 rounded-full opacity-30 blur-3xl sm:h-[420px] sm:w-[420px]"
        style={{
          background:
            'radial-gradient(circle, rgba(52, 211, 153, 0.45) 0%, rgba(16, 185, 129, 0) 70%)',
        }}
      />
    </div>
  );
}
