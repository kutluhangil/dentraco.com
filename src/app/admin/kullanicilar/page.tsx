"use client";

import { useMemo, useState } from "react";
import { AdminTitle } from "@/components/admin/admin-shell";
import { TableToolbar } from "@/components/admin/form-kit";
import { toast } from "@/components/ui/toast";
import { formatDate } from "@/lib/format";
import { repo, useReviews, useSession, useUsers } from "@/lib/repo";
import { matchesQuery } from "@/lib/search";

export default function AdminUsersPage() {
  const users = useUsers();
  const reviews = useReviews();
  const me = useSession();
  const [q, setQ] = useState("");
  const list = useMemo(() => users.filter((u) => !q || matchesQuery([u.name, u.email], q)), [users, q]);
  const admins = users.filter((u) => u.role === "admin").length;

  return (
    <>
      <AdminTitle title="Kullanıcılar" sub={`${users.length} hesap, ${admins} yönetici. Örnek yorumların yazarları hesap olarak listelenmez.`} />
      <TableToolbar q={q} setQ={setQ} placeholder="Ad ya da e-posta ara" action={null} />
      <div className="overflow-x-auto rounded-[var(--radius-panel)] bg-enamel">
        <table className="w-full min-w-[760px] text-left text-[0.9375rem]">
          <thead className="border-b border-line text-sm text-ink-soft">
            <tr>
              <th className="px-4 py-3 font-medium">Kullanıcı</th>
              <th className="px-4 py-3 font-medium">Rol</th>
              <th className="px-4 py-3 font-medium">Yorum</th>
              <th className="px-4 py-3 font-medium">Üyelik</th>
              <th className="px-4 py-3 text-right font-medium">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {list.map((u) => {
              const self = u.id === me?.id;
              return (
                <tr key={u.id} className={u.suspended ? "opacity-60" : ""}>
                  <td className="px-4 py-3">
                    <p className="font-medium">
                      {u.name} {self && <span className="text-xs text-ink-faint">(siz)</span>}
                    </p>
                    <p className="text-xs text-ink-soft">{u.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${u.role === "admin" ? "bg-ink text-white" : "bg-porcelain text-ink-soft"}`}>
                      {u.role === "admin" ? "Yönetici" : "Üye"}
                    </span>
                    {u.suspended && <span className="ml-2 rounded-full bg-gum-soft px-2.5 py-0.5 text-xs text-gum">Askıda</span>}
                  </td>
                  <td className="tabular px-4 py-3">{reviews.filter((r) => r.userId === u.id).length}</td>
                  <td className="px-4 py-3 text-ink-soft">{formatDate(u.createdAt)}</td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button
                      type="button"
                      disabled={self}
                      onClick={() => {
                        repo.setUserRole(u.id, u.role === "admin" ? "user" : "admin");
                        toast(u.role === "admin" ? "Yönetici yetkisi kaldırıldı." : "Yönetici yetkisi verildi.");
                      }}
                      className="rounded-full px-3 py-1.5 text-sm text-curing-deep hover:bg-curing-soft disabled:opacity-30"
                    >
                      {u.role === "admin" ? "Üye yap" : "Yönetici yap"}
                    </button>
                    <button
                      type="button"
                      disabled={self}
                      onClick={() => {
                        repo.setUserSuspended(u.id, !u.suspended);
                        toast(u.suspended ? "Hesap yeniden etkin." : "Hesap askıya alındı.", "info");
                      }}
                      className="rounded-full px-3 py-1.5 text-sm text-gum hover:bg-gum-soft disabled:opacity-30"
                    >
                      {u.suspended ? "Askıyı kaldır" : "Askıya al"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
