"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { specialties, specialtyById, treatments } from "@/data/specialties";
import { useQueryState } from "@/components/filters/filter-ui";
import { RatingInline } from "@/components/rating/shade-rating";
import { toast } from "@/components/ui/toast";
import { doctorName } from "@/lib/format";
import { emptySummary } from "@/lib/rating";
import { repo, useDoctors, useHospitals, useSummaries } from "@/lib/repo";
import { matchesQuery } from "@/lib/search";
import { slugify } from "@/lib/slug";
import type { CertificateItem, Doctor, EducationItem, ExperienceItem, SpecialtyId, Title, TreatmentId } from "@/lib/types";
import { AdminTitle, btn } from "./admin-shell";
import { CheckGrid, ConfirmDelete, FormSection, Input, Repeater, RowInput, Select, TableToolbar, TextArea, lines, paragraphs } from "./form-kit";

const titles: Title[] = ["Dt.", "Uzm. Dt.", "Dr. Dt.", "Dr. Öğr. Üyesi", "Doç. Dr.", "Prof. Dr."];
const days = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];

export function DoctorManager() {
  const { get, set } = useQueryState();
  const editing = get("duzenle");
  const doctors = useDoctors();
  if (editing) {
    return <DoctorForm key={editing} initial={doctors.find((d) => d.id === editing)} onDone={() => set({ duzenle: null })} />;
  }
  return <DoctorTable onEdit={(id) => set({ duzenle: id })} />;
}

function DoctorTable({ onEdit }: { onEdit: (id: string) => void }) {
  const doctors = useDoctors();
  const hospitals = useHospitals();
  const summaries = useSummaries("doctor");
  const [q, setQ] = useState("");
  const [hospital, setHospital] = useState("");
  const list = useMemo(
    () =>
      doctors.filter(
        (d) =>
          (!hospital || d.hospitalId === hospital) &&
          (!q || matchesQuery([d.firstName, d.lastName, d.title, specialtyById[d.specialty]?.name ?? ""], q)),
      ),
    [doctors, q, hospital],
  );

  return (
    <>
      <AdminTitle title="Doktorlar" sub={`${doctors.length} kayıt`} />
      <TableToolbar
        q={q}
        setQ={setQ}
        placeholder="İsim ya da uzmanlık ara"
        action={
          <div className="flex flex-wrap gap-2">
            <select value={hospital} onChange={(e) => setHospital(e.target.value)} aria-label="Hastaneye göre süz" className="h-10 rounded-full border border-line bg-enamel px-3 text-sm">
              <option value="">Tüm hastaneler</option>
              {hospitals.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name}
                </option>
              ))}
            </select>
            <button type="button" onClick={() => onEdit("yeni")} className={btn.primary}>
              <Plus className="size-4" /> Doktor ekle
            </button>
          </div>
        }
      />
      <div className="overflow-x-auto rounded-[var(--radius-panel)] bg-enamel">
        <table className="w-full min-w-[820px] text-left text-[0.9375rem]">
          <thead className="border-b border-line text-sm text-ink-soft">
            <tr>
              <th className="px-4 py-3 font-medium">Hekim</th>
              <th className="px-4 py-3 font-medium">Uzmanlık</th>
              <th className="px-4 py-3 font-medium">Hastane</th>
              <th className="px-4 py-3 font-medium">Puan</th>
              <th className="px-4 py-3 text-right font-medium">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {list.map((d) => (
              <tr key={d.id}>
                <td className="px-4 py-3">
                  <Link href={`/doktorlar/${d.slug}`} className="font-medium hover:underline">
                    {doctorName(d)}
                  </Link>
                </td>
                <td className="px-4 py-3 text-ink-soft">{specialtyById[d.specialty]?.name}</td>
                <td className="px-4 py-3 text-ink-soft">{hospitals.find((h) => h.id === d.hospitalId)?.name ?? "—"}</td>
                <td className="px-4 py-3">
                  <RatingInline summary={summaries.get(d.id) ?? emptySummary} />
                </td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <button type="button" onClick={() => onEdit(d.id)} className="rounded-full px-3 py-1.5 text-sm text-curing-deep hover:bg-curing-soft">
                    Düzenle
                  </button>
                  <ConfirmDelete
                    label={doctorName(d)}
                    warning="Profil ve yorumları silinecek."
                    onConfirm={() => {
                      repo.deleteDoctor(d.id);
                      toast(`${doctorName(d)} silindi.`, "info");
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function blank(hospitalId: string): Doctor {
  return {
    id: "",
    slug: "",
    title: "Dt.",
    firstName: "",
    lastName: "",
    gender: "kadın",
    specialty: "genel",
    hospitalId,
    birthYear: 1990,
    graduationYear: 2014,
    languages: ["Türkçe"],
    headline: "",
    about: [],
    education: [{ degree: "Diş Hekimliği Lisans", institution: "", start: 2009, end: 2014 }],
    experience: [],
    certificates: [],
    memberships: ["Türk Dişhekimleri Birliği"],
    publications: [],
    focus: [],
    workingDays: ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"],
    appearance: "",
    image: "",
  };
}

function DoctorForm({ initial, onDone }: { initial?: Doctor; onDone: () => void }) {
  const hospitals = useHospitals();
  const [d, setD] = useState<Doctor>(initial ?? blank(hospitals[0]?.id ?? ""));
  const [about, setAbout] = useState((initial?.about ?? []).join("\n\n"));
  const [memberships, setMemberships] = useState(d.memberships.join("\n"));
  const [publications, setPublications] = useState(d.publications.join("\n"));
  const [languages, setLanguages] = useState(d.languages.join(", "));
  const up = (patch: Partial<Doctor>) => setD((x) => ({ ...x, ...patch }));
  const isNew = !initial;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const slug = d.slug || slugify(`${d.firstName} ${d.lastName}`);
        repo.upsertDoctor({
          ...d,
          id: d.id || slug,
          slug,
          about: paragraphs(about),
          memberships: lines(memberships),
          publications: lines(publications),
          languages: languages.split(",").map((l) => l.trim()).filter(Boolean),
          image: d.image || `/images/doktorlar/${slug}.webp`,
        });
        toast(isNew ? "Hekim profili eklendi." : "Değişiklikler kaydedildi.");
        onDone();
      }}
    >
      <button type="button" onClick={onDone} className="mb-4 inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink">
        <ArrowLeft className="size-4" /> Doktorlara dön
      </button>
      <AdminTitle
        title={isNew ? "Yeni hekim profili" : doctorName(d)}
        action={
          <div className="flex gap-2">
            <button type="button" onClick={onDone} className={btn.ghost}>
              Vazgeç
            </button>
            <button type="submit" className={btn.primary}>
              {isNew ? "Profili ekle" : "Kaydet"}
            </button>
          </div>
        }
      />
      <div className="space-y-4">
        <FormSection title="Kimlik ve görev">
          <Select label="Unvan" value={d.title} onChange={(v) => up({ title: v as Title })} options={titles.map((t) => ({ value: t, label: t }))} />
          <Select label="Cinsiyet" value={d.gender} onChange={(v) => up({ gender: v as Doctor["gender"] })} options={[{ value: "kadın", label: "Kadın" }, { value: "erkek", label: "Erkek" }]} />
          <Input label="Ad" value={d.firstName} onChange={(v) => up({ firstName: v })} required />
          <Input label="Soyad" value={d.lastName} onChange={(v) => up({ lastName: v })} required />
          <Select label="Uzmanlık" value={d.specialty} onChange={(v) => up({ specialty: v as SpecialtyId })} options={specialties.map((s) => ({ value: s.id, label: s.name }))} />
          <Select label="Hastane" value={d.hospitalId} onChange={(v) => up({ hospitalId: v })} options={hospitals.map((h) => ({ value: h.id, label: h.name }))} />
          <Input label="Doğum yılı" type="number" value={d.birthYear} onChange={(v) => up({ birthYear: Number(v) })} />
          <Input label="Mezuniyet yılı" type="number" value={d.graduationYear} onChange={(v) => up({ graduationYear: Number(v) })} hint="Deneyim yılı buradan hesaplanır." />
          <Input label="Diller" value={languages} onChange={setLanguages} wide hint="Virgülle ayırın." />
          <CheckGrid label="Çalışma günleri" options={days.map((x) => ({ value: x, label: x }))} value={d.workingDays} onChange={(v) => up({ workingDays: v })} />
        </FormSection>

        <FormSection title="Özgeçmiş metni">
          <Input label="Tek cümlelik tanıtım" value={d.headline} onChange={(v) => up({ headline: v })} wide required />
          <TextArea label="Hakkında" value={about} onChange={setAbout} rows={7} hint="Paragrafları boş satırla ayırın." required />
          <Input label="Uzmanlık / doktora tezi" value={d.thesis ?? ""} onChange={(v) => up({ thesis: v || undefined })} wide />
        </FormSection>

        <FormSection title="Eğitim ve deneyim">
          <Repeater<EducationItem>
            label="Eğitim"
            items={d.education}
            onChange={(education) => up({ education })}
            empty={{ degree: "", institution: "", start: 2010, end: 2015 }}
            render={(row, update) => (
              <>
                <RowInput value={row.degree} onChange={(v) => update({ degree: v })} placeholder="Derece" />
                <RowInput value={row.institution} onChange={(v) => update({ institution: v })} placeholder="Kurum" />
                <RowInput type="number" value={row.start} onChange={(v) => update({ start: Number(v) })} placeholder="Başlangıç" />
                <RowInput type="number" value={row.end} onChange={(v) => update({ end: Number(v) })} placeholder="Bitiş" />
              </>
            )}
          />
          <Repeater<ExperienceItem>
            label="Mesleki deneyim"
            items={d.experience}
            onChange={(experience) => up({ experience })}
            empty={{ role: "", place: "", start: 2020, end: null }}
            render={(row, update) => (
              <>
                <RowInput value={row.role} onChange={(v) => update({ role: v })} placeholder="Görev" />
                <RowInput value={row.place} onChange={(v) => update({ place: v })} placeholder="Kurum" />
                <RowInput type="number" value={row.start} onChange={(v) => update({ start: Number(v) })} placeholder="Başlangıç" />
                <RowInput type="number" value={row.end} onChange={(v) => update({ end: v ? Number(v) : null })} placeholder="Bitiş (boş: halen)" />
              </>
            )}
          />
          <Repeater<CertificateItem>
            label="Sertifikalar ve kurslar"
            items={d.certificates}
            onChange={(certificates) => up({ certificates })}
            empty={{ name: "", issuer: "", year: 2024 }}
            render={(row, update) => (
              <>
                <RowInput value={row.name} onChange={(v) => update({ name: v })} placeholder="Sertifika" />
                <RowInput value={row.issuer} onChange={(v) => update({ issuer: v })} placeholder="Veren kurum" />
                <RowInput type="number" value={row.year} onChange={(v) => update({ year: Number(v) })} placeholder="Yıl" />
              </>
            )}
          />
        </FormSection>

        <FormSection title="Diğer">
          <TextArea label="Üyelikler" value={memberships} onChange={setMemberships} rows={3} hint="Her satıra bir üyelik." />
          <TextArea label="Bilimsel çalışmalar" value={publications} onChange={setPublications} rows={3} hint="Her satıra bir çalışma." />
          <CheckGrid<TreatmentId> label="İlgilendiği tedaviler" options={treatments.map((t) => ({ value: t.id, label: t.name }))} value={d.focus} onChange={(v) => up({ focus: v })} />
          <Input label="Portre için görünüm tarifi (görsel promptu)" value={d.appearance} onChange={(v) => up({ appearance: v })} wide hint="İngilizce; docs/GORSEL_PROMPTLARI.md ile aynı biçimde." />
        </FormSection>
      </div>
    </form>
  );
}
