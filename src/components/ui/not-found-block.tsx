import Link from "next/link";

export function NotFoundBlock({ title, text, href, cta }: { title: string; text: string; href: string; cta: string }) {
  return (
    <div className="page flex min-h-[60vh] flex-col items-start justify-center py-20">
      <svg viewBox="0 0 120 60" className="w-40 text-line" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={6 + i * 22} y={i === 2 ? 30 : 8} width="16" height={i === 2 ? 22 : 44} rx="3" fill={i === 2 ? "none" : "currentColor"} stroke="currentColor" strokeDasharray={i === 2 ? "3 3" : undefined} />
        ))}
      </svg>
      <h1 className="display-tight mt-6 text-5xl font-semibold">{title}</h1>
      <p className="mt-3 max-w-md text-lg text-ink-soft">{text}</p>
      <Link href={href} className="mt-6 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white hover:bg-curing">
        {cta}
      </Link>
    </div>
  );
}
