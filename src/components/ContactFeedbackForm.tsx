'use client';

import { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { sanitizeText, } from '@/lib/format';
import { WHATSAPP_URL } from '@/lib/constants';

export function ContactFeedbackForm() {
  const [name, setName] = useState('');
  const [city, setCity] = useState('Rawalpindi');
  const [topic, setTopic] = useState('Report a fee or rule update');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = sanitizeText(name, 80);
    const cleanMsg = sanitizeText(message, 500);
    if (!cleanName || !cleanMsg) return;

    const mailBody = `Name: ${cleanName}\nCity: ${city}\nTopic: ${topic}\n\nMessage:\n${cleanMsg}`;
    const waText = `Salam KaamHoGaya team! ${topic} (${city}) — from ${cleanName}: ${cleanMsg}`;

    setSubmitted(true);
    // Provide clean WhatsApp handoff link without silent black-hole submission
    const mailLink = document.getElementById('khg-wa-handoff') as HTMLAnchorElement | null;
    if (mailLink) {
      mailLink.href = `${WHATSAPP_URL}?text=${encodeURIComponent(waText)}`;
    }
    void mailBody;
  };

  return (
    <div className="rounded-2xl border border-emerald-950/10 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-ink">
        Report a Fee Change or Request a New City Guide
      </h2>
      <p className="mt-1 text-xs text-gray-600 sm:text-sm">
        Spotted a changed fee, shifted office address, or want us to cover a process in
        your city? Tell us below.
      </p>

      {submitted ? (
        <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-brand-dark">
          <p className="flex items-center gap-2 font-bold">
            <CheckCircle2 className="h-5 w-5 text-brand" />
            Shukriya! Your message is ready to send.
          </p>
          <p className="mt-1.5 text-xs text-gray-700">
            For the fastest response from our editorial team, tap below to send your
            details directly via WhatsApp, or email us at{' '}
            <strong>support@kaamhogaya.pk</strong>.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              id="khg-wa-handoff"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-xs font-bold text-white hover:bg-brand-dark"
            >
              Send on WhatsApp
            </a>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setMessage('');
              }}
              className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-ink hover:bg-gray-50"
            >
              Write another message
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="c-name"
                className="mb-1 block text-xs font-semibold text-gray-700"
              >
                Your Name *
              </label>
              <input
                id="c-name"
                type="text"
                required
                maxLength={80}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Bilal Ahmed"
                className="w-full rounded-xl border border-gray-300 bg-surface px-3.5 py-2.5 text-sm focus:border-brand focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="c-city"
                className="mb-1 block text-xs font-semibold text-gray-700"
              >
                City
              </label>
              <select
                id="c-city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-surface px-3.5 py-2.5 text-sm focus:border-brand focus:bg-white focus:outline-none"
              >
                {[
                  'Rawalpindi',
                  'Islamabad',
                  'Lahore',
                  'Karachi',
                  'Peshawar',
                  'Quetta',
                  'Hyderabad',
                  'Multan',
                  'Other City',
                ].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="c-topic"
              className="mb-1 block text-xs font-semibold text-gray-700"
            >
              Topic
            </label>
            <select
              id="c-topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-surface px-3.5 py-2.5 text-sm focus:border-brand focus:bg-white focus:outline-none"
            >
              <option>Report a fee or rule update</option>
              <option>Request a new process or city guide</option>
              <option>Rs. 500 WhatsApp document check inquiry</option>
              <option>General feedback</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="c-msg"
              className="mb-1 block text-xs font-semibold text-gray-700"
            >
              Message *
            </label>
            <textarea
              id="c-msg"
              required
              rows={4}
              maxLength={500}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share the process name, updated fee or address, and official link if available..."
              className="w-full rounded-xl border border-gray-300 bg-surface px-3.5 py-2.5 text-sm focus:border-brand focus:bg-white focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-dark"
          >
            <Send className="h-4 w-4" />
            Prepare Message
          </button>
        </form>
      )}
    </div>
  );
}
