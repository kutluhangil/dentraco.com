import { Suspense } from "react";
import { HospitalManager } from "@/components/admin/hospital-manager";

export const metadata = { title: "Hastaneler" };

export default function Page() {
  return (
    <Suspense>
      <HospitalManager />
    </Suspense>
  );
}
