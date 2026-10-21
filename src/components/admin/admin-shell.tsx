"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Building2, FileText, Gauge, LogOut, MessageSquareText, Settings, ShieldAlert, Stethoscope, Users } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { repo, useHydrated, useReviews, useSession } from "@/lib/repo";

const nav = [
  { href: "/admin", label: "Genel bakış", icon: Gauge },
  { href: "/admin/yorumlar", label: "Yorumlar", icon: MessageSquareText, badge: true },
  { href: "/admin/hastaneler", label: "Hastaneler", icon: Building2 },
  { href: "/admin/doktorlar", label: "Doktorlar", icon: Stethoscope },
  { href: "/admin/yazilar", label: "Sağlık yazıları", icon: FileText },
  { href: "/admin/kullanicilar", label: "Kullanıcılar", icon: Users },
  { href: "/admin/ayarlar", label: "Ayarlar", icon: Settings },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const hydrated = useHydrated();
  const me = useSession();
  const pathname = usePathname();
  const pending = useReviews().filter((r) => r.status === "pending").length;

  // Hydrate olmadan önce içerik gizli render edilir; veriler yalnızca tarayıcıda olduğu için ekranda hiçbir şey gösterilmez.
  if (!hydrated)
    return (
      <div className="min-h-screen bg-porcelain">
        <div hidden>{children}</div>
      </div>
    );

  if (!me || me.role !== "admin") {
    return (
      <div className="page flex min-h-screen flex-col items-start justify-center">
        <ShieldAlert className="size-10 text-gum" />
        <h1 className="display-tight mt-4 text-5xl font-semibold">Bu alan yöneticilere açık</h1>
        <p className="mt-3 max-w-md text-ink-soft">
          Yönetim paneline erişmek için yönetici hesabıyla giriş yapın. Demo yönetici bilgileri giriş sayfasında yer alır.
        </p>
        <div className="mt-6 flex gap-2">
          <Link href="/giris?next=/admin" className="rounded-full bg-ink px-5 py-3 text-sm font-medium text-white">
            Yönetici girişi
          </Link>
          <Link href="/" className="rounded-full border border-line px-5 py-3 text-sm font-medium">
            Siteye dön
          </Link>
        </div>
      </div>
    );
  }

  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[248px_1fr]">
      <aside className="hidden border-r border-line bg-enamel lg:block">
        <div className="sticky top-0 flex h-screen flex-col p-4">
          <Link href="/" className="px-2 py-2">
            <Logo />
          </Link>
          <p className="mt-1 px-2 text-xs text-ink-faint">Yönetim paneli</p>
          <nav aria-label="Yönetim" className="mt-6 flex-1">
            <ul className="space-y-0.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    aria-current={isActive(n.href) ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-[var(--radius-control)] px-3 py-2.5 text-[0.9375rem] ${
                      isActive(n.href) ? "bg-ink text-white" : "text-ink-soft hover:bg-porcelain hover:text-ink"
                    }`}
                  >
                    <n.icon className="size-4" />
                    <span className="flex-1">{n.label}</span>
                    {n.badge && pending > 0 && (
                      <span className="tabular rounded-full bg-amber px-2 text-xs font-semibold text-ink">{pending}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="border-t border-line pt-4">
            <p className="px-2 text-sm font-medium">{me.name}</p>
            <p className="px-2 text-xs text-ink-soft">{me.email}</p>
            <button type="button" onClick={() => repo.logout()} className="mt-3 flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-gum hover:bg-gum-soft">
              <LogOut className="size-4" /> Çıkış yap
            </button>
          </div>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-30 border-b border-line bg-enamel/95 backdrop-blur lg:hidden">
          <div className="flex h-14 items-center justify-between px-4">
            <Link href="/">
              <Logo />
            </Link>
            <span className="text-xs text-ink-faint">Yönetim</span>
          </div>
          <nav aria-label="Yönetim" className="overflow-x-auto px-2 pb-2">
            <ul className="flex gap-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className={`flex h-9 items-center gap-1.5 rounded-full px-3 text-sm whitespace-nowrap ${isActive(n.href) ? "bg-ink text-white" : "text-ink-soft"}`}
                  >
                    {n.label}
                    {n.badge && pending > 0 && <span className="tabular rounded-full bg-amber px-1.5 text-xs text-ink">{pending}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        <main className="px-4 py-8 sm:px-8 lg:px-10 lg:py-10">{children}</main>
      </div>
    </div>
  );
}

export function AdminTitle({ title, sub, action }: { title: string; sub?: string; action?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="display-tight text-4xl font-semibold sm:text-5xl">{title}</h1>
        {sub && <p className="mt-2 text-ink-soft">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export const btn = {
  primary: "inline-flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-medium text-white hover:bg-curing disabled:opacity-40",
  ghost: "inline-flex h-10 items-center gap-2 rounded-full border border-line bg-enamel px-4 text-sm font-medium hover:border-ink disabled:opacity-40",
  danger: "inline-flex h-10 items-center gap-2 rounded-full border border-gum/30 px-4 text-sm font-medium text-gum hover:bg-gum-soft",
  approve: "inline-flex h-9 items-center gap-1.5 rounded-full bg-fluoride-deep px-3.5 text-sm font-medium text-white hover:bg-[#165e4b] disabled:opacity-40",
};

export const field = "h-10 w-full rounded-[var(--radius-control)] border border-line bg-enamel px-3 text-[0.9375rem] outline-none focus:border-curing";
