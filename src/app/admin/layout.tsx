import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";

export const metadata: Metadata = { title: { default: "Yönetim paneli", template: "%s · Yönetim · Dentraco" } };

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return <AdminShell>{children}</AdminShell>;
}
