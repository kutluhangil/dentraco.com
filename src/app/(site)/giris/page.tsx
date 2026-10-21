import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/auth-form";
import { AuthShell } from "@/components/auth/auth-shell";

export const metadata: Metadata = { title: "Giriş yap" };

export default function LoginPage() {
  return (
    <AuthShell title="Giriş yap" lead="Yorum yazmak ve yorumlarınızın durumunu takip etmek için hesabınıza girin.">
      <Suspense>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
