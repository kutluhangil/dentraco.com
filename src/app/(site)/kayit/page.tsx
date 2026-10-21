import type { Metadata } from "next";
import { Suspense } from "react";
import { RegisterForm } from "@/components/auth/auth-form";
import { AuthShell } from "@/components/auth/auth-shell";

export const metadata: Metadata = { title: "Üye ol" };

export default function RegisterPage() {
  return (
    <AuthShell title="Üye ol" lead="Hekim ve klinik deneyimlerinizi puanlayıp paylaşmak için ücretsiz bir hesap oluşturun.">
      <Suspense>
        <RegisterForm />
      </Suspense>
    </AuthShell>
  );
}
