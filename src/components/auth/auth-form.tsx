"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { KeyRound } from "lucide-react";
import { toast } from "@/components/ui/toast";
import { demoCredentials } from "@/data/users";
import { repo, useStore } from "@/lib/repo";

const loginSchema = z.object({
  email: z.string().trim().email("Geçerli bir e-posta adresi girin."),
  password: z.string().min(1, "Şifrenizi girin."),
});

const registerSchema = z
  .object({
    name: z.string().trim().min(3, "Adınızı ve soyadınızı yazın.").max(60),
    email: z.string().trim().email("Geçerli bir e-posta adresi girin."),
    password: z
      .string()
      .min(8, "Şifre en az 8 karakter olmalı.")
      .regex(/[0-9]/, "Şifre en az bir rakam içermeli.")
      .regex(/[A-ZÇĞİÖŞÜ]/, "Şifre en az bir büyük harf içermeli."),
    password2: z.string(),
    consent: z.literal(true, { error: "Devam etmek için kuralları kabul edin." }),
  })
  .refine((v) => v.password === v.password2, { path: ["password2"], message: "Şifreler eşleşmiyor." });

type Errors = Record<string, string>;

function safeNext(next: string | null) {
  return next && next.startsWith("/") && !next.startsWith("//") ? next : null;
}

export function LoginForm() {
  const router = useRouter();
  const next = safeNext(useSearchParams().get("next"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message])));
      return;
    }
    setBusy(true);
    const res = await repo.login(email, password);
    setBusy(false);
    if (!res.ok) {
      setErrors({ form: res.error });
      return;
    }
    const { users, sessionUserId } = useStore.getState();
    const me = users.find((u) => u.id === sessionUserId);
    toast(`Hoş geldiniz, ${me?.name.split(" ")[0] ?? ""}`);
    router.push(next ?? (me?.role === "admin" ? "/admin" : "/profil"));
  }

  return (
    <div>
      <form onSubmit={submit} noValidate className="space-y-4">
        <Field id="email" label="E-posta" error={errors.email}>
          <input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={input} aria-invalid={!!errors.email} />
        </Field>
        <Field id="password" label="Şifre" error={errors.password}>
          <input id="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={input} aria-invalid={!!errors.password} />
        </Field>
        {errors.form && <p className="rounded-[var(--radius-control)] bg-gum-soft px-3.5 py-2.5 text-sm text-gum">{errors.form}</p>}
        <button type="submit" disabled={busy} className="h-12 w-full rounded-full bg-ink font-medium text-white hover:bg-curing disabled:opacity-60">
          {busy ? "Giriş yapılıyor…" : "Giriş yap"}
        </button>
      </form>
      <p className="mt-5 text-sm text-ink-soft">
        Hesabınız yok mu?{" "}
        <Link href={next ? `/kayit?next=${encodeURIComponent(next)}` : "/kayit"} className="font-medium text-curing-deep hover:underline">
          Üye olun
        </Link>
      </p>

      <div className="mt-8 rounded-[var(--radius-panel)] border border-dashed border-ink-faint/50 p-4">
        <p className="flex items-center gap-2 text-sm font-medium">
          <KeyRound className="size-4" /> Demo hesaplar
        </p>
        <p className="mt-1 text-xs text-ink-soft">Prototipi denemek için hazır hesaplar. Bilgileri forma doldurmak için seçin.</p>
        <ul className="mt-3 space-y-2">
          {[
            { label: "Yönetici", ...demoCredentials.admin },
            { label: "İkinci yönetici", ...demoCredentials.editor },
            { label: "Kullanıcı", ...demoCredentials.user },
          ].map((c) => (
            <li key={c.email}>
              <button
                type="button"
                onClick={() => {
                  setEmail(c.email);
                  setPassword(c.password);
                  setErrors({});
                }}
                className="flex w-full items-center justify-between gap-3 rounded-[var(--radius-control)] bg-enamel px-3 py-2 text-left text-sm hover:bg-white"
              >
                <span className="shrink-0 font-medium">{c.label}</span>
                <span className="min-w-0 truncate text-xs text-ink-soft">
                  {c.email} / {c.password}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function RegisterForm() {
  const router = useRouter();
  const next = safeNext(useSearchParams().get("next"));
  const [values, setValues] = useState({ name: "", email: "", password: "", password2: "", consent: false });
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const update = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = registerSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message])));
      return;
    }
    setBusy(true);
    const res = await repo.register(values);
    setBusy(false);
    if (!res.ok) {
      setErrors({ form: res.error });
      return;
    }
    toast("Hesabınız oluşturuldu.");
    router.push(next ?? "/profil");
  }

  return (
    <div>
      <form onSubmit={submit} noValidate className="space-y-4">
        <Field id="name" label="Ad soyad" error={errors.name} hint="Yorumlarınızda adınız ve soyadınızın baş harfi görünür.">
          <input id="name" autoComplete="name" value={values.name} onChange={update("name")} className={input} aria-invalid={!!errors.name} />
        </Field>
        <Field id="email" label="E-posta" error={errors.email}>
          <input id="email" type="email" autoComplete="email" value={values.email} onChange={update("email")} className={input} aria-invalid={!!errors.email} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="password" label="Şifre" error={errors.password}>
            <input id="password" type="password" autoComplete="new-password" value={values.password} onChange={update("password")} className={input} aria-invalid={!!errors.password} />
          </Field>
          <Field id="password2" label="Şifre tekrar" error={errors.password2}>
            <input id="password2" type="password" autoComplete="new-password" value={values.password2} onChange={update("password2")} className={input} aria-invalid={!!errors.password2} />
          </Field>
        </div>
        <p className="text-xs text-ink-faint">En az 8 karakter, bir büyük harf ve bir rakam.</p>
        <label className="flex items-start gap-3 text-sm">
          <input type="checkbox" checked={values.consent} onChange={update("consent")} className="mt-0.5 size-4 accent-[#2d4bff]" />
          <span>
            <Link href="/proje-hakkinda#moderasyon" className="text-curing-deep underline">
              Yorum ilkelerini
            </Link>{" "}
            okudum; yorumlarımın yönetici onayından sonra yayımlanacağını biliyorum.
          </span>
        </label>
        {errors.consent && <p className="text-xs text-gum">{errors.consent}</p>}
        {errors.form && <p className="rounded-[var(--radius-control)] bg-gum-soft px-3.5 py-2.5 text-sm text-gum">{errors.form}</p>}
        <button type="submit" disabled={busy} className="h-12 w-full rounded-full bg-ink font-medium text-white hover:bg-curing disabled:opacity-60">
          {busy ? "Hesap oluşturuluyor…" : "Üye ol"}
        </button>
      </form>
      <p className="mt-5 text-sm text-ink-soft">
        Zaten üye misiniz?{" "}
        <Link href={next ? `/giris?next=${encodeURIComponent(next)}` : "/giris"} className="font-medium text-curing-deep hover:underline">
          Giriş yapın
        </Link>
      </p>
      <p className="mt-6 text-xs leading-relaxed text-ink-faint">
        Demo sürümde hesap bilgileri yalnızca bu tarayıcıda saklanır ve hiçbir sunucuya gönderilmez. Gerçek şifrenizi kullanmayın.
      </p>
    </div>
  );
}

const input =
  "h-12 w-full rounded-[var(--radius-control)] border border-line bg-enamel px-3.5 text-base outline-none focus:border-curing aria-[invalid=true]:border-gum";

function Field({ id, label, error, hint, children }: { id: string; label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {children}
      {error ? <p className="mt-1.5 text-xs text-gum">{error}</p> : hint ? <p className="mt-1.5 text-xs text-ink-faint">{hint}</p> : null}
    </div>
  );
}
