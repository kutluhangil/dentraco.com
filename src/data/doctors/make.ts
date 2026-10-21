import type { Doctor } from "@/lib/types";
import { slugify } from "@/lib/slug";

type DoctorInput = Omit<Doctor, "id" | "slug" | "image"> & { slug?: string };

export function makeDoctor(input: DoctorInput): Doctor {
  const slug = input.slug ?? slugify(`${input.firstName} ${input.lastName}`);
  return { ...input, id: slug, slug, image: `/images/doktorlar/${slug}.webp` };
}

export const weekdays = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"];
