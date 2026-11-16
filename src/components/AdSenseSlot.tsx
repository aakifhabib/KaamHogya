interface AdSenseSlotProps {
  placement: 'desktop-sidebar' | 'mobile-after-step-3' | 'inline';
  className?: string;
}

export function AdSenseSlot({ placement, className = '' }: AdSenseSlotProps) {
  const heightClass =
    placement === 'desktop-sidebar' ? 'min-h-[250px]' : 'min-h-[100px]';

  return (
    <div
      className={`no-print flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50/80 p-4 text-center ${heightClass} ${className}`}
      data-adsense-slot={placement}
      aria-label="Advertisement slot"
    >
      {/* AdSense Slot */}
      <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
        AdSense Slot
      </span>
      <span className="mt-1 text-[11px] text-gray-400">
        {placement === 'desktop-sidebar'
          ? '300 × 250 Responsive Display'
          : 'Responsive In-Article Slot'}
      </span>
    </div>
  );
}
