import { FlaskConical, MessageSquareDashed } from "lucide-react";

export function FictionalBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-dashed border-ink-faint/60 px-2.5 py-1 text-xs text-ink-soft ${className}`}
      title="Bu profil okul projesi için oluşturulmuştur; gerçek bir kişi ya da kurum değildir."
    >
      <FlaskConical className="size-3.5" /> Kurgusal profil
    </span>
  );
}

export function SampleBadge() {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full bg-amber-soft px-2 py-0.5 text-[0.75rem] font-medium text-[#8a5a12]"
      title="Bu yorum prototip için oluşturulmuştur; gerçek bir hasta deneyimi değildir."
    >
      <MessageSquareDashed className="size-3" /> Örnek yorum
    </span>
  );
}

const statusStyle = {
  pending: "bg-amber-soft text-[#8a5a12]",
  published: "bg-fluoride/40 text-fluoride-deep",
  rejected: "bg-gum-soft text-gum",
} as const;

const statusText = { pending: "Onay bekliyor", published: "Yayında", rejected: "Reddedildi" } as const;

export function StatusBadge({ status }: { status: keyof typeof statusStyle }) {
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyle[status]}`}>{statusText[status]}</span>;
}
