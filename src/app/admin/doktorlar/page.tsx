import { Suspense } from "react";
import { DoctorManager } from "@/components/admin/doctor-manager";

export const metadata = { title: "Doktorlar" };

export default function Page() {
  return (
    <Suspense>
      <DoctorManager />
    </Suspense>
  );
}
