"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { treatments } from "@/data/specialties";
import { CheckList, FilterGroup, FilterShell, MinRating, SearchField, SelectField, useQueryState } from "@/components/filters/filter-ui";
import { emptySummary, weightedScore } from "@/lib/rating";
import { useDoctors, useHospitals, useSummaries } from "@/lib/repo";
import { matchesQuery } from "@/lib/search";
import { HospitalRow } from "./hospital-row";

const sorts = [
  { value: "puan", label: "Puana göre" },
  { value: "yorum", label: "Yorum sayısına göre" },
  { value: "isim", label: "İsme göre (A–Z)" },
];

export function HospitalDirectory() {
  const hospitals = useHospitals();
  const doctors = useDoctors();
  const summaries = useSummaries("hospital");
  const { get, getList, set } = useQueryState();

  const q = get("q");
  const cities = getList("sehir");
  const treatmentIds = getList("tedavi");
  const min = Number(get("puan")) || 0;
  const sort = get("sirala") || "puan";

  const allCities = useMemo(() => [...new Set(hospitals.map((h) => h.city))].sort((a, b) => a.localeCompare(b, "tr")), [hospitals]);

  const results = useMemo(() => {
    const list = hospitals.filter((h) => {
      const s = summaries.get(h.id) ?? emptySummary;
      if (cities.length && !cities.includes(h.city)) return false;
      if (treatmentIds.length && !treatmentIds.every((t) => h.treatments.includes(t as never))) return false;
      if (min && s.average < min) return false;
      if (q && !matchesQuery([h.name, h.city, h.district, h.type, h.summary], q)) return false;
      return true;
    });
    const score = (id: string) => summaries.get(id) ?? emptySummary;
    list.sort((a, b) => {
      if (sort === "yorum") return score(b.id).count - score(a.id).count;
      if (sort === "isim") return a.name.localeCompare(b.name, "tr");
      return weightedScore(score(b.id)) - weightedScore(score(a.id));
    });
    return list;
  }, [hospitals, summaries, cities, treatmentIds, min, q, sort]);

  const activeCount = cities.length + treatmentIds.length + (min ? 1 : 0) + (q ? 1 : 0);

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <FilterShell activeCount={activeCount} onClear={() => set({ q: null, sehir: null, tedavi: null, puan: null })}>
        <FilterGroup title="İsim ya da semt">
          <SearchField id="hastane-ara" value={q} onChange={(v) => set({ q: v })} placeholder="Örn. Kadıköy, Kökyapı" />
        </FilterGroup>
        <FilterGroup title="Şehir">
          <CheckList
            options={allCities.map((c) => ({ value: c, label: c, count: hospitals.filter((h) => h.city === c).length }))}
            selected={cities}
            onChange={(v) => set({ sehir: v })}
          />
        </FilterGroup>
        <FilterGroup title="En düşük puan">
          <MinRating value={min} onChange={(v) => set({ puan: v ? String(v) : null })} />
        </FilterGroup>
        <FilterGroup title="Sunulan tedavi">
          <CheckList
            options={treatments.map((t) => ({ value: t.id, label: t.name, count: hospitals.filter((h) => h.treatments.includes(t.id)).length }))}
            selected={treatmentIds}
            onChange={(v) => set({ tedavi: v })}
          />
        </FilterGroup>
      </FilterShell>

      <div className="min-w-0">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-ink-soft" aria-live="polite">
            <span className="tabular font-semibold text-ink">{results.length}</span> merkez listeleniyor
          </p>
          <SelectField id="hastane-sirala" label="Sırala" value={sort} onChange={(v) => set({ sirala: v === "puan" ? null : v })} options={sorts} />
        </div>
        {results.length === 0 ? (
          <div className="rounded-[var(--radius-panel)] border border-dashed border-line p-8 text-center">
            <p className="font-semibold">Bu filtrelere uyan merkez yok.</p>
            <p className="mt-1 text-ink-soft">Birden çok tedavi seçtiyseniz, hepsini sunan merkezler gösterilir. Bir kısmını kaldırmayı deneyin.</p>
            <button type="button" onClick={() => set({ q: null, sehir: null, tedavi: null, puan: null })} className="mt-4 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white">
              Filtreleri temizle
            </button>
          </div>
        ) : (
          <ul className="space-y-3">
            {results.map((h) => (
              <motion.li key={h.id} layout="position" transition={{ duration: 0.25 }}>
                <HospitalRow hospital={h} summary={summaries.get(h.id) ?? emptySummary} doctorCount={doctors.filter((d) => d.hospitalId === h.id).length} />
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
