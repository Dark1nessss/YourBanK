"use client";

import { useAutoLogout } from "@/lib/useAutoLogout";

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  useAutoLogout();

  return <>{children}</>;
}
