export function BrandMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="10" fill="#0B5C3F" />
      <rect x="9" y="7" width="17" height="22" rx="3" fill="#FFFFFF" />
      <rect x="13" y="12" width="9" height="2" rx="1" fill="#0B5C3F" fillOpacity="0.35" />
      <rect x="13" y="16.5" width="7" height="2" rx="1" fill="#0B5C3F" fillOpacity="0.35" />
      <rect x="13" y="21" width="6" height="2" rx="1" fill="#0B5C3F" fillOpacity="0.35" />
      <circle cx="26.5" cy="26.5" r="8.5" fill="#F5B301" stroke="#0B5C3F" strokeWidth="2" />
      <path
        d="M23 26.5L25.4 28.9L30.2 24.1"
        stroke="#073D29"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
