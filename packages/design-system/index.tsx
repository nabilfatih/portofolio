import { TooltipProvider } from "@repo/design-system/components/ui/tooltip";
import { ThemeProvider } from "@repo/design-system/providers/theme";
import type { ReactNode } from "react";

/** Provides shared theme state and tooltip behavior for the portfolio. */
export function DesignSystemProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProvider>
  );
}
