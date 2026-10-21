"use client";

import { useEffect, type ReactNode } from "react";
import { useStore } from "@/lib/repo";
import { Toaster } from "./ui/toast";

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    void useStore.persist.rehydrate();
  }, []);

  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
