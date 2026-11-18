import { ImageResponse } from 'next/og';
import { SEED_PROCESSES } from '@/data/seed-data';
import { SITE_NAME } from '@/lib/constants';
import { formatPKR } from '@/lib/format';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function ProcessOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const proc = SEED_PROCESSES.find((p) => p.slug === slug);
  const title = proc?.title ?? 'Pakistani Citizen Document Guide';
  const city = proc?.city ?? 'Pakistan';
  const category = proc?.category ?? 'Process Guide';
  const feeText = proc ? formatPKR(proc.fee_normal) : 'Exact PKR Fees';
  const timeText = proc?.time_required ?? 'Step-by-Step Guide';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #073D29 0%, #0B5C3F 70%, #107652 100%)',
          padding: '60px',
          color: '#FFFFFF',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: '#F5B301',
                color: '#073D29',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 13l4 4L19 7"
                  stroke="#073D29"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span style={{ fontSize: '28px', fontWeight: 800 }}>{SITE_NAME}</span>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '12px',
              fontSize: '20px',
              fontWeight: 700,
            }}
          >
            <span
              style={{
                background: 'rgba(255,255,255,0.16)',
                padding: '8px 18px',
                borderRadius: '999px',
              }}
            >
              {city}
            </span>
            <span
              style={{
                background: '#F5B301',
                color: '#073D29',
                padding: '8px 18px',
                borderRadius: '999px',
              }}
            >
              {category}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              fontSize: '54px',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </div>
          <div style={{ display: 'flex', gap: '24px', fontSize: '24px', color: '#D1FAE5' }}>
            <span>Official Fee: {feeText}</span>
            <span>|</span>
            <span>Time: {timeText}</span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255,255,255,0.2)',
            paddingTop: '22px',
            fontSize: '20px',
            color: '#FDE68A',
          }}
        >
          <span>Exact Fees | Document Checklist | Step-by-Step | Live Wait Times</span>
          <span style={{ color: '#FFFFFF', fontWeight: 700 }}>kaamhogaya.pk</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
