"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { specialties } from "@/data/specialties";
import { CheckList, FilterGroup, FilterShell, MinRating, SearchField, SelectField, useQueryState } from "@/components/filters/filter-ui";
import { experienceYears } from "@/lib/format";
import { emptySummary, weightedScore } from "@/lib/rating";
import { useDoctors, useHospitals, useSummaries } from "@/lib/repo";
import { matchesQuery } from "@/lib/search";
import { DoctorRow } from "./doctor-card";

const sorts = [
  { value: "puan", label: "Puana göre" },
  { value: "yorum", label: "Yorum sayısına göre" },
  { value: "deneyim", label: "Deneyime göre" },
  { value: "isim", label: "İsme göre (A–Z)" },
];

export function DoctorDirectory() {
  const doctors = useDoctors();
  const hospitals = useHospitals();
  const summaries = useSummaries("doctor");
  const { get, getList, set } = useQueryState();

  const q = get("q");
  const spec = getList("uzmanlik");
  const cities = getList("sehir");
  const hospitalIds = getList("hastane");
  const min = Number(get("puan")) || 0;
  const sort = get("sirala") || "puan";

  const hospitalById = useMemo(() => new Map(hospitals.map((h) => [h.id, h])), [hospitals]);
  const allCities = useMemo(() => [...new Set(hospitals.map((h) => h.city))].sort((a, b) => a.localeCompare(b, "tr")), [hospitals]);

  const results = useMemo(() => {
    const list = doctors.filter((d) => {
      const h = hospitalById.get(d.hospitalId);
      const s = summaries.get(d.id) ?? emptySummary;
      const sp = specialties.find((x) => x.id === d.specialty);
      if (spec.length && !spec.includes(d.specialty)) return false;
      if (cities.length && (!h || !cities.includes(h.city))) return false;
      if (hospitalIds.length && !hospitalIds.includes(d.hospitalId)) return false;
      if (min && s.average < min) return false;
      if (q && !matchesQuery([d.firstName, d.lastName, d.title, sp?.name ?? "", sp?.practitioner ?? "", h?.name ?? "", h?.city ?? "", h?.district ?? ""], q))
        return false;
      return true;
    });
    const score = (id: string) => summaries.get(id) ?? emptySummary;
    list.sort((a, b) => {
      if (sort === "yorum") return score(b.id).count - score(a.id).count;
      if (sort === "deneyim") return experienceYears(b) - experienceYears(a);
      if (sort === "isim") return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`, "tr");
      return weightedScore(score(b.id)) - weightedScore(score(a.id));
    });
    return list;
  }, [doctors, hospitalById, summaries, spec, cities, hospitalIds, min, q, sort]);

  const activeCount = spec.length + cities.length + hospitalIds.length + (min ? 1 : 0) + (q ? 1 : 0);

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <FilterShell activeCount={activeCount} onClear={() => set({ q: null, uzmanlik: null, sehir: null, hastane: null, puan: null })}>
        <FilterGroup title="İsim ya da anahtar kelime">
          <SearchField id="doktor-ara" value={q} onChange={(v) => set({ q: v })} placeholder="Örn. Aksoy, implant, Kadıköy" />
        </FilterGroup>
        <FilterGroup title="Uzmanlık alanı">
          <CheckList
            options={specialties.map((s) => ({ value: s.id, label: s.name, count: doctors.filter((d) => d.specialty === s.id).length }))}
            selected={spec}
            onChange={(v) => set({ uzmanlik: v })}
          />
        </FilterGroup>
        <FilterGroup title="En düşük puan">
          <MinRating value={min} onChange={(v) => set({ puan: v ? String(v) : null })} />
        </FilterGroup>
        <FilterGroup title="Şehir">
          <CheckList options={allCities.map((c) => ({ value: c, label: c }))} selected={cities} onChange={(v) => set({ sehir: v })} />
        </FilterGroup>
        <FilterGroup title="Hastane">
          <CheckList options={hospitals.map((h) => ({ value: h.id, label: h.name }))} selected={hospitalIds} onChange={(v) => set({ hastane: v })} />
        </FilterGroup>
      </FilterShell>

      <div className="min-w-0">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-ink-soft" aria-live="polite">
            <span className="tabular font-semibold text-ink">{results.length}</span> hekim listeleniyor
          </p>
          <SelectField id="doktor-sirala" label="Sırala" value={sort} onChange={(v) => set({ sirala: v === "puan" ? null : v })} options={sorts} />
        </div>
        {results.length === 0 ? (
          <div className="rounded-[var(--radius-panel)] border border-dashed border-line p-8 text-center">
            <p className="font-semibold">Bu filtrelere uyan hekim yok.</p>
            <p className="mt-1 text-ink-soft">Puan sınırını düşürün ya da şehir filtresini kaldırın.</p>
            <button
              type="button"
              onClick={() => set({ q: null, uzmanlik: null, sehir: null, hastane: null, puan: null })}
              className="mt-4 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white"
            >
              Filtreleri temizle
            </button>
          </div>
        ) : (
          <ul className="space-y-3">
            {results.map((d) => (
              <motion.li key={d.id} layout="position" transition={{ duration: 0.25 }}>
                <DoctorRow doctor={d} hospital={hospitalById.get(d.hospitalId)} summary={summaries.get(d.id) ?? emptySummary} />
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
