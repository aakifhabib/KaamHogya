'use client';

import { useState } from 'react';
import { CheckCircle2, Mail, Send } from 'lucide-react';
import { sanitizeText } from '@/lib/format';

const CONTACT_EMAIL = 'hello@kaamhogya.pk';

const TOPICS = [
  'Report a wrong fee or outdated guide',
  'Submit a correction for your city',
  'Ask about a guide',
  'Request data deletion',
  'Report a scam using our name',
];

export function ContactFeedbackForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Rawalpindi');
  const [topic, setTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState('');
  const [mailtoHref, setMailtoHref] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = sanitizeText(name, 80);
    const cleanEmail = sanitizeText(email, 120);
    const cleanMsg = sanitizeText(message, 800);
    if (!cleanName || !cleanEmail || !cleanMsg) return;

    const subject =
      topic === 'Request data deletion'
        ? 'Data Request'
        : `${topic} (${city}) — KaamHoGaya.pk`;
    const body = `Name: ${cleanName}\nEmail: ${cleanEmail}\nCity: ${city}\nTopic: ${topic}\n\nMessage:\n${cleanMsg}`;

    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setMailtoHref(href);
  };

  return (
    <div className="rounded-2xl border border-emerald-950/10 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-ink">Send Us a Message</h2>
      <p className="mt-1 text-xs text-gray-600 sm:text-sm">
        Fill in your name, email, and message below to prepare your email to{' '}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="font-semibold text-brand hover:underline"
        >
          {CONTACT_EMAIL}
        </a>
        . Responses depend on mailbox availability.
      </p>

      {mailtoHref ? (
        <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-brand-dark">
          <p className="flex items-center gap-2 font-bold">
            <CheckCircle2 className="h-5 w-5 text-brand" />
            Shukriya! Your email is ready to send.
          </p>
          <p className="mt-1.5 text-xs text-gray-700">
            Click below to open your email app with your message pre-filled for{' '}
            <strong>{CONTACT_EMAIL}</strong>. Remember never to include CNIC numbers,
            passport numbers, OTPs, bank PINs, or passwords.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href={mailtoHref}
              className="inline-flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-xs font-bold text-white hover:bg-brand-dark"
            >
              <Mail className="h-3.5 w-3.5" />
              Open Email to {CONTACT_EMAIL}
            </a>
            <button
              type="button"
              onClick={() => {
                setMailtoHref(null);
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
                htmlFor="c-email"
                className="mb-1 block text-xs font-semibold text-gray-700"
              >
                Your Email *
              </label>
              <input
                id="c-email"
                type="email"
                required
                maxLength={120}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-300 bg-surface px-3.5 py-2.5 text-sm focus:border-brand focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
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
                {TOPICS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
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
              htmlFor="c-msg"
              className="mb-1 block text-xs font-semibold text-gray-700"
            >
              Message *
            </label>
            <textarea
              id="c-msg"
              required
              rows={4}
              maxLength={800}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share the guide name, updated fee or correction, or your inquiry..."
              className="w-full rounded-xl border border-gray-300 bg-surface px-3.5 py-2.5 text-sm focus:border-brand focus:bg-white focus:outline-none"
            />
            <p className="mt-1.5 text-[11px] font-medium text-red-700">
              Never include your CNIC number, passport number, OTP, bank PIN, or
              password.
            </p>
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-dark"
          >
            <Send className="h-4 w-4" />
            Prepare Email Message
          </button>
        </form>
      )}
    </div>
  );
}
