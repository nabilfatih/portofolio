import { TooltipProvider } from "@repo/design-system/components/ui/tooltip";
import { ThemeProvider } from "@repo/design-system/providers/theme";
import type { ThemeProviderProps } from "next-themes";

/** Provides shared theme state and tooltip behavior for the portfolio. */
export function DesignSystemProvider({
  children,
  ...properties
}: ThemeProviderProps) {
  return (
    <ThemeProvider {...properties}>
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProvider>
  );
}
