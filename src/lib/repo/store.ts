"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { articles as seedArticles } from "@/data/articles";
import { doctors as seedDoctors } from "@/data/doctors";
import { hospitals as seedHospitals } from "@/data/hospitals";
import { sampleReviews } from "@/data/reviews";
import { seedUsers } from "@/data/users";
import { hasBlockingFlags, moderate } from "@/lib/moderation";
import type { Article, Doctor, Hospital, Review, ReviewStatus, TargetType, TreatmentId, User } from "@/lib/types";

export const STORE_KEY = "dentraco-v1";
const STORE_VERSION = 2;

export type ActionResult = { ok: true; id?: string } | { ok: false; error: string };

export interface NewReviewInput {
  targetType: TargetType;
  targetId: string;
  rating: number;
  title: string;
  body: string;
  treatment?: TreatmentId;
  visitDate?: string;
}

export interface ActivityItem {
  id: string;
  at: string;
  actor: string;
  text: string;
}

interface Data {
  users: User[];
  sessionUserId: string | null;
  reviews: Review[];
  hospitals: Hospital[];
  doctors: Doctor[];
  articles: Article[];
  activity: ActivityItem[];
}

interface Actions {
  register(input: { name: string; email: string; password: string }): Promise<ActionResult>;
  login(email: string, password: string): Promise<ActionResult>;
  logout(): void;
  updateProfile(name: string): void;
  deleteAccount(): void;
  addReview(input: NewReviewInput): ActionResult;
  moderateReview(id: string, status: ReviewStatus, reason?: string): void;
  editReview(id: string, patch: Partial<Pick<Review, "title" | "body" | "rating">>): void;
  deleteReview(id: string): void;
  upsertHospital(h: Hospital): void;
  deleteHospital(id: string): void;
  upsertDoctor(d: Doctor): void;
  deleteDoctor(id: string): void;
  upsertArticle(a: Article): void;
  deleteArticle(id: string): void;
  setUserRole(id: string, role: User["role"]): void;
  setUserSuspended(id: string, suspended: boolean): void;
  resetDemo(): void;
}

export type Store = Data & Actions & { hydrated: boolean };

function seed(): Data {
  return {
    users: seedUsers,
    sessionUserId: null,
    reviews: sampleReviews,
    hospitals: seedHospitals,
    doctors: seedDoctors,
    articles: seedArticles,
    activity: [],
  };
}

async function hashPassword(password: string) {
  const bytes = new TextEncoder().encode(`dentraco:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

function uid(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

/** Seed kayıtlarını yeni sürümle değiştirir; yöneticinin eklediği kayıtlar korunur. */
function refreshSeed<T extends { id: string }>(stored: T[] | undefined, seedList: T[]) {
  const ids = new Set(seedList.map((x) => x.id));
  return [...(stored ?? []).filter((x) => !ids.has(x.id)), ...seedList];
}

function upsert<T extends { id: string }>(list: T[], item: T) {
  const i = list.findIndex((x) => x.id === item.id);
  if (i === -1) return [item, ...list];
  const next = [...list];
  next[i] = item;
  return next;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => {
      const current = () => get().users.find((u) => u.id === get().sessionUserId) ?? null;
      const log = (text: string) => {
        const actor = current()?.name ?? "Sistem";
        set((s) => ({ activity: [{ id: uid("a"), at: new Date().toISOString(), actor, text }, ...s.activity].slice(0, 40) }));
      };
      const requireAdmin = () => current()?.role === "admin";

      return {
        ...seed(),
        hydrated: false,

        async register({ name, email, password }) {
          const normalized = email.trim().toLocaleLowerCase("tr-TR");
          if (get().users.some((u) => u.email === normalized)) {
            return { ok: false, error: "Bu e-posta adresiyle kayıtlı bir hesap var. Giriş yapmayı deneyin." };
          }
          const user: User = {
            id: uid("u"),
            name: name.trim(),
            email: normalized,
            passwordHash: await hashPassword(password),
            role: "user",
            createdAt: new Date().toISOString(),
            suspended: false,
          };
          set((s) => ({ users: [...s.users, user], sessionUserId: user.id }));
          return { ok: true, id: user.id };
        },

        async login(email, password) {
          const normalized = email.trim().toLocaleLowerCase("tr-TR");
          const user = get().users.find((u) => u.email === normalized);
          const hash = await hashPassword(password);
          if (!user || user.passwordHash !== hash) return { ok: false, error: "E-posta adresi ya da şifre hatalı." };
          if (user.suspended) return { ok: false, error: "Bu hesap yönetici tarafından askıya alınmış." };
          set({ sessionUserId: user.id });
          return { ok: true, id: user.id };
        },

        logout() {
          set({ sessionUserId: null });
        },

        updateProfile(name) {
          const me = current();
          if (!me) return;
          set((s) => ({ users: s.users.map((u) => (u.id === me.id ? { ...u, name: name.trim() } : u)) }));
        },

        deleteAccount() {
          const me = current();
          if (!me) return;
          set((s) => ({
            users: s.users.filter((u) => u.id !== me.id),
            reviews: s.reviews.filter((r) => r.userId !== me.id),
            sessionUserId: null,
          }));
        },

        addReview(input) {
          const me = current();
          if (!me) return { ok: false, error: "Yorum yapmak için giriş yapın." };
          if (me.suspended) return { ok: false, error: "Hesabınız askıya alındığı için yorum yapamazsınız." };
          const existing = get().reviews.find(
            (r) => r.userId === me.id && r.targetType === input.targetType && r.targetId === input.targetId,
          );
          if (existing) return { ok: false, error: "Bu profil için zaten bir yorumunuz var. Profil sayfanızdan takip edebilirsiniz." };
          const previous = get()
            .reviews.filter((r) => r.userId === me.id)
            .map((r) => r.body);
          const flags = moderate(`${input.title}\n${input.body}`, previous);
          if (hasBlockingFlags(flags)) {
            return { ok: false, error: "Yorumunuz kişisel veri içeriyor. Lütfen telefon, e-posta, kimlik ya da IBAN bilgisini kaldırın." };
          }
          const review: Review = {
            id: uid("r"),
            ...input,
            title: input.title.trim(),
            body: input.body.trim(),
            userId: me.id,
            authorName: me.name.split(" ").map((p, i) => (i === 0 ? p : `${p[0]}.`)).join(" "),
            createdAt: new Date().toISOString(),
            status: "pending",
            flags,
            isSample: false,
          };
          set((s) => ({ reviews: [review, ...s.reviews] }));
          return { ok: true, id: review.id };
        },

        moderateReview(id, status, reason) {
          if (!requireAdmin()) return;
          const me = current();
          set((s) => ({
            reviews: s.reviews.map((r) =>
              r.id === id
                ? { ...r, status, rejectReason: status === "rejected" ? reason : undefined, moderatedBy: me?.name, moderatedAt: new Date().toISOString() }
                : r,
            ),
          }));
          const r = get().reviews.find((x) => x.id === id);
          log(`“${r?.title ?? "Yorum"}” ${status === "published" ? "onaylandı" : status === "rejected" ? "reddedildi" : "beklemeye alındı"}`);
        },

        editReview(id, patch) {
          if (!requireAdmin()) return;
          set((s) => ({
            reviews: s.reviews.map((r) => {
              if (r.id !== id) return r;
              const next = { ...r, ...patch };
              return { ...next, flags: moderate(`${next.title}\n${next.body}`) };
            }),
          }));
          log("Bir yorum düzenlendi");
        },

        deleteReview(id) {
          if (!requireAdmin()) return;
          set((s) => ({ reviews: s.reviews.filter((r) => r.id !== id) }));
          log("Bir yorum silindi");
        },

        upsertHospital(h) {
          if (!requireAdmin()) return;
          const isNew = !get().hospitals.some((x) => x.id === h.id);
          set((s) => ({ hospitals: upsert(s.hospitals, h) }));
          log(`${h.name} ${isNew ? "eklendi" : "güncellendi"}`);
        },

        deleteHospital(id) {
          if (!requireAdmin()) return;
          const h = get().hospitals.find((x) => x.id === id);
          set((s) => ({
            hospitals: s.hospitals.filter((x) => x.id !== id),
            doctors: s.doctors.filter((d) => d.hospitalId !== id),
            reviews: s.reviews.filter((r) => !(r.targetType === "hospital" && r.targetId === id)),
          }));
          log(`${h?.name ?? "Hastane"} silindi`);
        },

        upsertDoctor(d) {
          if (!requireAdmin()) return;
          const isNew = !get().doctors.some((x) => x.id === d.id);
          set((s) => ({ doctors: upsert(s.doctors, d) }));
          log(`${d.title} ${d.firstName} ${d.lastName} ${isNew ? "eklendi" : "güncellendi"}`);
        },

        deleteDoctor(id) {
          if (!requireAdmin()) return;
          const d = get().doctors.find((x) => x.id === id);
          set((s) => ({
            doctors: s.doctors.filter((x) => x.id !== id),
            reviews: s.reviews.filter((r) => !(r.targetType === "doctor" && r.targetId === id)),
          }));
          log(`${d ? `${d.title} ${d.firstName} ${d.lastName}` : "Doktor"} silindi`);
        },

        upsertArticle(a) {
          if (!requireAdmin()) return;
          const isNew = !get().articles.some((x) => x.id === a.id);
          set((s) => ({ articles: upsert(s.articles, a) }));
          log(`“${a.title}” ${isNew ? "eklendi" : "güncellendi"}`);
        },

        deleteArticle(id) {
          if (!requireAdmin()) return;
          const a = get().articles.find((x) => x.id === id);
          set((s) => ({ articles: s.articles.filter((x) => x.id !== id) }));
          log(`“${a?.title ?? "Yazı"}” silindi`);
        },

        setUserRole(id, role) {
          if (!requireAdmin() || id === get().sessionUserId) return;
          set((s) => ({ users: s.users.map((u) => (u.id === id ? { ...u, role } : u)) }));
          log(`Kullanıcı rolü “${role === "admin" ? "yönetici" : "kullanıcı"}” yapıldı`);
        },

        setUserSuspended(id, suspended) {
          if (!requireAdmin() || id === get().sessionUserId) return;
          set((s) => ({ users: s.users.map((u) => (u.id === id ? { ...u, suspended } : u)) }));
          log(suspended ? "Bir kullanıcı askıya alındı" : "Bir kullanıcının askısı kaldırıldı");
        },

        resetDemo() {
          set({ ...seed() });
        },
      };
    },
    {
      name: STORE_KEY,
      version: STORE_VERSION,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      // v2: hastaneler İstanbul/Fatih'e taşındı; eski tarayıcılardaki seed hastane ve hekim kayıtları yenilenir.
      migrate: (persisted, version) => {
        const data = persisted as Partial<Data>;
        if (version < 2) {
          data.hospitals = refreshSeed(data.hospitals, seedHospitals);
          data.doctors = refreshSeed(data.doctors, seedDoctors);
        }
        return data as Store;
      },
      partialize: ({ hydrated: _h, ...rest }) => {
        void _h;
        const data: Partial<Store> = {};
        for (const [k, v] of Object.entries(rest)) if (typeof v !== "function") Object.assign(data, { [k]: v });
        return data;
      },
      onRehydrateStorage: () => () => {
        useStore.setState({ hydrated: true });
      },
    },
  ),
);
