import type { Review, TargetType } from "./types";

export interface RatingSummary {
  average: number;
  count: number;
  distribution: [number, number, number, number, number];
}

export function summarize(reviews: Review[]): RatingSummary {
  const published = reviews.filter((r) => r.status === "published");
  const distribution: RatingSummary["distribution"] = [0, 0, 0, 0, 0];
  let sum = 0;
  for (const r of published) {
    distribution[r.rating - 1] += 1;
    sum += r.rating;
  }
  return { average: published.length ? sum / published.length : 0, count: published.length, distribution };
}

export function summaryMap(reviews: Review[], targetType: TargetType) {
  const grouped = new Map<string, Review[]>();
  for (const r of reviews) {
    if (r.targetType !== targetType) continue;
    const list = grouped.get(r.targetId) ?? [];
    list.push(r);
    grouped.set(r.targetId, list);
  }
  const out = new Map<string, RatingSummary>();
  for (const [id, list] of grouped) out.set(id, summarize(list));
  return out;
}

// Az yorumlu profillerin tek bir 5 puanla öne çıkmaması için Bayes ortalaması.
export function weightedScore(summary: RatingSummary, prior = 4.2, weight = 4) {
  return (prior * weight + summary.average * summary.count) / (weight + summary.count);
}

export const emptySummary: RatingSummary = { average: 0, count: 0, distribution: [0, 0, 0, 0, 0] };
