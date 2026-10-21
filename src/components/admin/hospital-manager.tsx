"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { treatments } from "@/data/specialties";
import { useQueryState } from "@/components/filters/filter-ui";
import { RatingInline } from "@/components/rating/shade-rating";
import { toast } from "@/components/ui/toast";
import { emptySummary } from "@/lib/rating";
import { repo, useDoctors, useHospitals, useSummaries } from "@/lib/repo";
import { matchesQuery } from "@/lib/search";
import { slugify } from "@/lib/slug";
import type { Hospital, OpeningHours, TreatmentId } from "@/lib/types";
import { AdminTitle, btn } from "./admin-shell";
import { CheckGrid, ConfirmDelete, FormSection, Input, Repeater, RowInput, Select, TableToolbar, TextArea, paragraphs } from "./form-kit";

const types: Hospital["type"][] = ["Diş Hastanesi", "Ağız ve Diş Sağlığı Merkezi", "Diş Polikliniği", "Diş Kliniği"];
const shades = [
  { value: "#F3EAD7", label: "A1" },
  { value: "#EBDDBF", label: "A2" },
  { value: "#E1CDA6", label: "A3" },
  { value: "#F5EEDD", label: "B1" },
  { value: "#E6D7B4", label: "B2" },
];

export function HospitalManager() {
  const { get, set } = useQueryState();
  const editing = get("duzenle");
  const hospitals = useHospitals();
  if (editing) {
    const existing = hospitals.find((h) => h.id === editing);
    return <HospitalForm key={editing} initial={existing} onDone={() => set({ duzenle: null })} />;
  }
  return <HospitalTable onEdit={(id) => set({ duzenle: id })} />;
}

function HospitalTable({ onEdit }: { onEdit: (id: string) => void }) {
  const hospitals = useHospitals();
  const doctors = useDoctors();
  const summaries = useSummaries("hospital");
  const [q, setQ] = useState("");
  const list = useMemo(() => hospitals.filter((h) => !q || matchesQuery([h.name, h.city, h.district], q)), [hospitals, q]);

  return (
    <>
      <AdminTitle title="Hastaneler" sub={`${hospitals.length} kayıt`} />
      <TableToolbar
        q={q}
        setQ={setQ}
        placeholder="Hastane ya da şehir ara"
        action={
          <button type="button" onClick={() => onEdit("yeni")} className={btn.primary}>
            <Plus className="size-4" /> Hastane ekle
          </button>
        }
      />
      <div className="overflow-x-auto rounded-[var(--radius-panel)] bg-enamel">
        <table className="w-full min-w-[760px] text-left text-[0.9375rem]">
          <thead className="border-b border-line text-sm text-ink-soft">
            <tr>
              <th className="px-4 py-3 font-medium">Ad</th>
              <th className="px-4 py-3 font-medium">Konum</th>
              <th className="px-4 py-3 font-medium">Hekim</th>
              <th className="px-4 py-3 font-medium">Puan</th>
              <th className="px-4 py-3 text-right font-medium">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {list.map((h) => (
              <tr key={h.id}>
                <td className="px-4 py-3">
                  <Link href={`/hastaneler/${h.slug}`} className="font-medium hover:underline">
                    {h.name}
                  </Link>
                  <p className="text-xs text-ink-soft">{h.type}</p>
                </td>
                <td className="px-4 py-3 text-ink-soft">
                  {h.district}, {h.city}
                </td>
                <td className="tabular px-4 py-3">{doctors.filter((d) => d.hospitalId === h.id).length}</td>
                <td className="px-4 py-3">
                  <RatingInline summary={summaries.get(h.id) ?? emptySummary} />
                </td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <button type="button" onClick={() => onEdit(h.id)} className="rounded-full px-3 py-1.5 text-sm text-curing-deep hover:bg-curing-soft">
                    Düzenle
                  </button>
                  <ConfirmDelete
                    label={h.name}
                    warning="Hastane, hekimleri ve yorumları silinecek."
                    onConfirm={() => {
                      repo.deleteHospital(h.id);
                      toast(`${h.name} silindi.`, "info");
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

function blank(): Hospital {
  return {
    id: "",
    slug: "",
    name: "",
    type: "Diş Kliniği",
    city: "",
    district: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    coords: [39.92, 32.85],
    founded: 2020,
    chairs: 4,
    summary: "",
    about: [],
    treatments: ["muayene"],
    amenities: [],
    hours: [{ days: "Pazartesi – Cuma", hours: "09.00 – 18.00" }],
    uniformColor: "navy scrubs",
    shade: "#F3EAD7",
    image: "",
    interiorImage: "",
  };
}

function HospitalForm({ initial, onDone }: { initial?: Hospital; onDone: () => void }) {
  const [h, setH] = useState<Hospital>(initial ?? blank());
  const [about, setAbout] = useState((initial?.about ?? []).join("\n\n"));
  const [amenities, setAmenities] = useState((initial?.amenities ?? []).join(", "));
  const up = (patch: Partial<Hospital>) => setH((x) => ({ ...x, ...patch }));
  const isNew = !initial;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const id = h.id || slugify(h.name).split("-").slice(0, 2).join("-") + "-" + Date.now().toString(36).slice(-4);
        const slug = h.slug || slugify(h.name);
        repo.upsertHospital({
          ...h,
          id,
          slug,
          about: paragraphs(about),
          amenities: amenities.split(",").map((a) => a.trim()).filter(Boolean),
          image: h.image || `/images/hastaneler/${id}-dis.webp`,
          interiorImage: h.interiorImage || `/images/hastaneler/${id}-ic.webp`,
        });
        toast(isNew ? "Hastane eklendi." : "Değişiklikler kaydedildi.");
        onDone();
      }}
    >
      <button type="button" onClick={onDone} className="mb-4 inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink">
        <ArrowLeft className="size-4" /> Hastanelere dön
      </button>
      <AdminTitle
        title={isNew ? "Yeni hastane" : h.name}
        action={
          <div className="flex gap-2">
            <button type="button" onClick={onDone} className={btn.ghost}>
              Vazgeç
            </button>
            <button type="submit" className={btn.primary}>
              {isNew ? "Hastaneyi ekle" : "Kaydet"}
            </button>
          </div>
        }
      />
      <div className="space-y-4">
        <FormSection title="Temel bilgiler">
          <Input label="Ad" value={h.name} onChange={(v) => up({ name: v })} required wide />
          <Select label="Tür" value={h.type} onChange={(v) => up({ type: v as Hospital["type"] })} options={types.map((t) => ({ value: t, label: t }))} />
          <Select label="Yer tutucu tonu" value={h.shade} onChange={(v) => up({ shade: v })} options={shades} />
          <Input label="Kuruluş yılı" type="number" value={h.founded} onChange={(v) => up({ founded: Number(v) })} />
          <Input label="Tedavi ünitesi" type="number" value={h.chairs} onChange={(v) => up({ chairs: Number(v) })} />
          <TextArea label="Kısa özet" value={h.summary} onChange={(v) => up({ summary: v })} rows={2} required />
          <TextArea label="Hakkında" value={about} onChange={setAbout} rows={6} hint="Paragrafları boş satırla ayırın." />
        </FormSection>
        <FormSection title="Konum ve iletişim">
          <Input label="Şehir" value={h.city} onChange={(v) => up({ city: v })} required />
          <Input label="İlçe" value={h.district} onChange={(v) => up({ district: v })} required />
          <Input label="Adres" value={h.address} onChange={(v) => up({ address: v })} wide required />
          <Input label="Telefon" value={h.phone} onChange={(v) => up({ phone: v })} placeholder="0212 555 00 00" />
          <Input label="E-posta" type="email" value={h.email} onChange={(v) => up({ email: v })} />
          <Input label="Web sitesi" value={h.website} onChange={(v) => up({ website: v })} />
          <div className="grid grid-cols-2 gap-2">
            <Input label="Enlem" type="number" value={h.coords[0]} onChange={(v) => up({ coords: [Number(v), h.coords[1]] })} />
            <Input label="Boylam" type="number" value={h.coords[1]} onChange={(v) => up({ coords: [h.coords[0], Number(v)] })} />
          </div>
        </FormSection>
        <FormSection title="Hizmetler">
          <CheckGrid<TreatmentId> label="Sunulan tedaviler" options={treatments.map((t) => ({ value: t.id, label: t.name }))} value={h.treatments} onChange={(v) => up({ treatments: v })} />
          <Input label="Olanaklar" value={amenities} onChange={setAmenities} wide hint="Virgülle ayırın: Otopark, Engelli erişimi" />
          <Repeater<OpeningHours>
            label="Çalışma saatleri"
            items={h.hours}
            onChange={(hours) => up({ hours })}
            empty={{ days: "", hours: "" }}
            render={(row, update) => (
              <>
                <RowInput value={row.days} onChange={(v) => update({ days: v })} placeholder="Günler" />
                <RowInput value={row.hours} onChange={(v) => update({ hours: v })} placeholder="Saatler" />
              </>
            )}
          />
        </FormSection>
      </div>
    </form>
  );
}
