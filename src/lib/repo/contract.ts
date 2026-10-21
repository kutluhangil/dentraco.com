import type { Article, Doctor, Hospital, Review, ReviewStatus, User } from "@/lib/types";
import type { ActionResult, NewReviewInput } from "./store";

// İleride Supabase (ya da başka bir arka uç) implementasyonunun sağlaması gereken sözleşme.
// Demo sürüm aynı işlemleri senkron olarak tarayıcıdaki store üzerinde yapar.
export interface DataRepository {
  listHospitals(): Promise<Hospital[]>;
  listDoctors(): Promise<Doctor[]>;
  listArticles(opts?: { includeDrafts?: boolean }): Promise<Article[]>;
  listReviews(filter: { targetType?: Review["targetType"]; targetId?: string; status?: ReviewStatus; userId?: string }): Promise<Review[]>;

  register(input: { name: string; email: string; password: string }): Promise<ActionResult>;
  login(email: string, password: string): Promise<ActionResult>;
  logout(): Promise<void>;
  currentUser(): Promise<User | null>;

  addReview(input: NewReviewInput): Promise<ActionResult>;
  moderateReview(id: string, status: ReviewStatus, reason?: string): Promise<void>;

  upsertHospital(h: Hospital): Promise<void>;
  deleteHospital(id: string): Promise<void>;
  upsertDoctor(d: Doctor): Promise<void>;
  deleteDoctor(id: string): Promise<void>;
  upsertArticle(a: Article): Promise<void>;
  deleteArticle(id: string): Promise<void>;
}
