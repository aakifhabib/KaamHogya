interface AdSenseSlotProps {
  placement: 'desktop-sidebar' | 'mobile-after-step-3' | 'inline';
  slotId?: string;
  className?: string;
}

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim();

export function isAdSenseEnabled(): boolean {
  return Boolean(ADSENSE_CLIENT_ID);
}

export function AdSenseSlot({
  placement,
  slotId,
  className = '',
}: AdSenseSlotProps) {
  // Keep slots hidden until Google AdSense is configured via NEXT_PUBLIC_ADSENSE_CLIENT_ID.
  if (!ADSENSE_CLIENT_ID) {
    return null;
  }

  const heightClass =
    placement === 'desktop-sidebar' ? 'min-h-[250px]' : 'min-h-[100px]';

  return (
    <div
      className={`no-print overflow-hidden rounded-xl ${heightClass} ${className}`}
      data-adsense-slot={placement}
      aria-label="Advertisement"
    >
      <ins
        className="adsbygoogle block"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT_ID}
        {...(slotId ? { 'data-ad-slot': slotId } : {})}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
