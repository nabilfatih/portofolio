"use client";

import { DesignSystemProvider } from "@repo/design-system";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <DesignSystemProvider>{children}</DesignSystemProvider>;
}
