import { ImageResponse } from 'next/og';
import { SITE_NAME, SITE_TAGLINE } from '@/lib/constants';

export const runtime = 'nodejs';
export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #073D29 0%, #0B5C3F 65%, #0F7350 100%)',
          padding: '64px',
          color: '#FFFFFF',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: '#F5B301',
              color: '#073D29',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 13l4 4L19 7"
                stroke="#073D29"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '34px', fontWeight: 800, letterSpacing: '-0.02em' }}>
              {SITE_NAME}
            </span>
            <span style={{ fontSize: '20px', color: '#D1FAE5' }}>
              Independent Citizen Process Library for Pakistan
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              fontSize: '58px',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
            }}
          >
            {SITE_TAGLINE}
          </div>
          <div style={{ fontSize: '26px', color: '#A7F3D0', maxWidth: '940px' }}>
            Exact PKR fees, printable document checklists, step-by-step office guides,
            and live citizen wait times across Pakistan.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255,255,255,0.2)',
            paddingTop: '24px',
            fontSize: '20px',
            color: '#FDE68A',
          }}
        >
          <span>CNIC | Passport | Driving Licence | FBR NTN | Domicile | Police</span>
          <span style={{ color: '#FFFFFF', fontWeight: 700 }}>kaamhogaya.pk</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
