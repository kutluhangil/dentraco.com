import type { User } from "@/lib/types";

// Demo hesapları. Şifreler tarayıcıda SHA-256 ile özetlenir; bu yalnızca prototip içindir,
// gerçek bir sistemde sunucu tarafında tuzlanmış ve yavaş bir algoritma (argon2/bcrypt) kullanılmalıdır.
export const demoCredentials = {
  admin: { email: "admin@dentraco.demo", password: "Dentraco2026!" },
  editor: { email: "editor@dentraco.demo", password: "Dentraco2026!" },
  user: { email: "kullanici@dentraco.demo", password: "Demo2026!" },
};

export const seedUsers: User[] = [
  {
    id: "admin",
    name: "Dentraco Yönetici",
    email: demoCredentials.admin.email,
    passwordHash: "f386915e9c9a570d7c8e739f0a3bf0be25d7507616c392ba32314d773b4ffc8f",
    role: "admin",
    createdAt: "2026-01-05T09:00:00.000Z",
    suspended: false,
  },
  {
    id: "editor",
    name: "İçerik Editörü",
    email: demoCredentials.editor.email,
    passwordHash: "f386915e9c9a570d7c8e739f0a3bf0be25d7507616c392ba32314d773b4ffc8f",
    role: "admin",
    createdAt: "2026-01-12T09:00:00.000Z",
    suspended: false,
  },
  {
    id: "u-demo",
    name: "Demo Kullanıcı",
    email: demoCredentials.user.email,
    passwordHash: "aa308375a749f6d079b812e994b0b308ff45d95043898d877539048dddd0e98f",
    role: "user",
    createdAt: "2026-03-14T18:30:00.000Z",
    suspended: false,
  },
];
