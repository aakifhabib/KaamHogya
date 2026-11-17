'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import type { ProcessFaq } from '@/types/database';

interface FaqAccordionProps {
  faqs: ProcessFaq[];
}

export function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section
      id="faqs"
      aria-labelledby="faqs-heading"
      className="rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-brand">
          <HelpCircle className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h2 id="faqs-heading" className="text-xl font-bold text-ink sm:text-2xl">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-gray-600 sm:text-sm">
            Clear answers to the most common questions citizens ask.
          </p>
        </div>
      </div>

      <div className="mt-4 divide-y divide-gray-200 overflow-hidden rounded-xl border border-gray-200">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`transition-colors duration-200 ${
                isOpen ? 'bg-emerald-50/25' : 'bg-white'
              }`}
            >
              <h3>
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-sm font-semibold text-ink transition-colors hover:bg-surface sm:px-5 sm:text-base"
                >
                  <span className={isOpen ? 'text-brand-dark' : ''}>{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-brand transition-transform duration-300 ease-spring ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </h3>
              <div
                className="khg-accordion-content"
                data-open={isOpen ? 'true' : 'false'}
                aria-hidden={!isOpen}
              >
                <div className="khg-accordion-inner">
                  <div className="border-t border-emerald-950/5 bg-surface/60 px-4 pb-4 pt-3 text-sm leading-relaxed text-gray-700 sm:px-5">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
