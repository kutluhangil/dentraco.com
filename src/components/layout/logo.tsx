export function LogoMark({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        d="M5 9.5C5 5.5 9 4 12 4.8c2 .5 3 1.2 4 1.2s2-.7 4-1.2C23 4 27 5.5 27 9.5c0 3.5-1 5.5-2 7.5l-1.4 8.5c-.4 2.5-3.2 2.5-3.6 0l-1.4-7c-.3-1.5-1.4-2.1-2.6-2.1s-2.3.6-2.6 2.1l-1.4 7c-.4 2.5-3.2 2.5-3.6 0L7 17c-1-2-2-4-2-7.5Z"
        fill="currentColor"
      />
      <path d="M9.2 8.6c.9-1.4 2.6-1.8 4.2-1.2" fill="none" stroke="var(--color-curing)" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 text-ink ${className}`}>
      <LogoMark className="size-7" />
      <span className="display-tight text-[1.4rem] leading-none font-semibold">dentraco</span>
    </span>
  );
}
