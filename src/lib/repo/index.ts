"use client";

import { useMemo } from "react";
import { emptySummary, summarize, summaryMap } from "@/lib/rating";
import type { TargetType } from "@/lib/types";
import { useStore, type Store } from "./store";

// Bileşenler veriye yalnızca bu modül üzerinden erişir. Supabase'e geçişte aynı imzaları
// koruyan bir implementasyon yazmak yeterlidir (bkz. docs/VERITABANI_SEMASI.md).

export { useStore };
export type { ActionResult, NewReviewInput } from "./store";

type ActionKeys = {
  [K in keyof Store]: Store[K] extends (...args: never[]) => unknown ? K : never;
}[keyof Store];

export const repo = new Proxy({} as Pick<Store, ActionKeys>, {
  get: (_t, key: string) => useStore.getState()[key as ActionKeys],
});

export const useHydrated = () => useStore((s) => s.hydrated);

export function useSession() {
  const id = useStore((s) => s.sessionUserId);
  const users = useStore((s) => s.users);
  return useMemo(() => users.find((u) => u.id === id) ?? null, [users, id]);
}

export const useHospitals = () => useStore((s) => s.hospitals);
export const useDoctors = () => useStore((s) => s.doctors);
export const useAllArticles = () => useStore((s) => s.articles);
export const useReviews = () => useStore((s) => s.reviews);
export const useUsers = () => useStore((s) => s.users);
export const useActivity = () => useStore((s) => s.activity);

export function useArticles() {
  const all = useAllArticles();
  return useMemo(() => all.filter((a) => a.published), [all]);
}

export function useHospital(slug: string) {
  const list = useHospitals();
  return useMemo(() => list.find((h) => h.slug === slug || h.id === slug) ?? null, [list, slug]);
}

export function useDoctor(slug: string) {
  const list = useDoctors();
  return useMemo(() => list.find((d) => d.slug === slug || d.id === slug) ?? null, [list, slug]);
}

export function useArticle(slug: string) {
  const list = useAllArticles();
  return useMemo(() => list.find((a) => a.slug === slug) ?? null, [list, slug]);
}

export function useSummaries(type: TargetType) {
  const reviews = useReviews();
  return useMemo(() => summaryMap(reviews, type), [reviews, type]);
}

export function useSummary(type: TargetType, id: string) {
  const reviews = useReviews();
  return useMemo(() => {
    const list = reviews.filter((r) => r.targetType === type && r.targetId === id);
    return list.length ? summarize(list) : emptySummary;
  }, [reviews, type, id]);
}

export function usePublishedReviews(type: TargetType, id: string) {
  const reviews = useReviews();
  return useMemo(
    () =>
      reviews
        .filter((r) => r.targetType === type && r.targetId === id && r.status === "published")
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [reviews, type, id],
  );
}

export function useMyReviews() {
  const me = useSession();
  const reviews = useReviews();
  return useMemo(
    () => (me ? reviews.filter((r) => r.userId === me.id).sort((a, b) => b.createdAt.localeCompare(a.createdAt)) : []),
    [me, reviews],
  );
}
