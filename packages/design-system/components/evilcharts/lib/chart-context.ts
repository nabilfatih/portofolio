import { createContext, use } from "react";

export interface ChartConfigItem {
  color: string;
  label: string;
}

export type ChartConfig = Record<string, ChartConfigItem>;

export interface ChartContextValue {
  config: ChartConfig;
}

export const EvilChartContext = createContext<ChartContextValue | null>(null);

export function useEvilChart() {
  const context = use(EvilChartContext);

  if (!context) {
    throw new Error(
      "EvilCharts components must be rendered inside an EvilAreaChart."
    );
  }

  return context;
}
