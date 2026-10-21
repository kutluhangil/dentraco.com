import { Suspense } from "react";
import { ReviewModeration } from "@/components/admin/review-moderation";

export const metadata = { title: "Yorumlar" };

export default function AdminReviewsPage() {
  return (
    <Suspense>
      <ReviewModeration />
    </Suspense>
  );
}
