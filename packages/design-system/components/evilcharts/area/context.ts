import { createContext, use } from "react";

interface ChartConfigItem {
  color: string;
  label: string;
}

export type ChartConfig = Record<string, ChartConfigItem>;

interface ChartContextValue {
  config: ChartConfig;
}

export const ChartContext = createContext<ChartContextValue | null>(null);

export function useChart() {
  const context = use(ChartContext);

  if (!context) {
    throw new Error(
      "EvilCharts components must be rendered inside an EvilAreaChart."
    );
  }

  return context;
}
