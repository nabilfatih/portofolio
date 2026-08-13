"use client";

import { EvilArea } from "@repo/design-system/components/evilcharts/charts/recharts-area";
import { EvilGrid } from "@repo/design-system/components/evilcharts/charts/recharts-grid";
import { EvilXAxis } from "@repo/design-system/components/evilcharts/charts/recharts-x-axis";
import { EvilYAxis } from "@repo/design-system/components/evilcharts/charts/recharts-y-axis";
import { EvilChartContext } from "@repo/design-system/components/evilcharts/lib/chart-context";
import {
  type RechartsModule,
  rechartsPromise,
} from "@repo/design-system/components/evilcharts/lib/recharts-runtime";
import { cn } from "@repo/design-system/lib/utils";
import { type ComponentProps, type ReactNode, use, useMemo } from "react";

type AreaChartConfig =
  import("@repo/design-system/components/evilcharts/lib/chart-context").ChartConfig;

interface EvilAreaChartRootProps<TData extends Record<string, unknown>> {
  chartProps?: Omit<
    ComponentProps<RechartsModule["AreaChart"]>,
    "children" | "data"
  >;
  children: ReactNode;
  className?: string;
  config: AreaChartConfig;
  data: readonly TData[];
}

function EvilAreaChartRoot<TData extends Record<string, unknown>>({
  chartProps,
  children,
  className,
  config,
  data,
}: EvilAreaChartRootProps<TData>) {
  const { AreaChart: RechartsAreaChart, ResponsiveContainer } =
    use(rechartsPromise);
  const contextValue = useMemo(() => ({ config }), [config]);

  return (
    <EvilChartContext value={contextValue}>
      <div
        className={cn(
          "min-h-0 w-full text-sm [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line]:stroke-border/60 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-layer]:outline-hidden [&_.recharts-surface]:outline-hidden",
          className
        )}
        data-slot="evil-area-chart"
      >
        <ResponsiveContainer
          initialDimension={{ height: 288, width: 640 }}
          minHeight={0}
          minWidth={0}
        >
          <RechartsAreaChart
            accessibilityLayer
            data={[...data]}
            {...chartProps}
          >
            {children}
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>
    </EvilChartContext>
  );
}

export const EvilAreaChart = Object.assign(EvilAreaChartRoot, {
  Area: EvilArea,
  Grid: EvilGrid,
  XAxis: EvilXAxis,
  YAxis: EvilYAxis,
});

export type { ChartConfig } from "@repo/design-system/components/evilcharts/lib/chart-context";
