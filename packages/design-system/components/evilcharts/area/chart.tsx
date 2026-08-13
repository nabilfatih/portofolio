"use client";

import { cn } from "@repo/design-system/lib/utils";
import { type ComponentProps, type ReactNode, use, useMemo } from "react";
import { type ChartConfig, ChartContext } from "./context";
import { ChartGrid } from "./grid";
import { type RechartsModule, rechartsPromise } from "./runtime";
import { AreaSeries } from "./series";
import { ChartTooltip } from "./tooltip";
import { ChartTooltipContent } from "./tooltip-content";
import { ChartXAxis } from "./x-axis";
import { ChartYAxis } from "./y-axis";

interface AreaChartProps<TData extends Record<string, unknown>> {
  chartProps?: Omit<
    ComponentProps<RechartsModule["AreaChart"]>,
    "children" | "data"
  >;
  children: ReactNode;
  className?: string;
  config: ChartConfig;
  data: readonly TData[];
}

function AreaChartRoot<TData extends Record<string, unknown>>({
  chartProps,
  children,
  className,
  config,
  data,
}: AreaChartProps<TData>) {
  const { AreaChart, ResponsiveContainer } = use(rechartsPromise);
  const contextValue = useMemo(() => ({ config }), [config]);

  return (
    <ChartContext value={contextValue}>
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
          <AreaChart accessibilityLayer data={[...data]} {...chartProps}>
            {children}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartContext>
  );
}

export const EvilAreaChart = Object.assign(AreaChartRoot, {
  Area: AreaSeries,
  Grid: ChartGrid,
  Tooltip: ChartTooltip,
  TooltipContent: ChartTooltipContent,
  XAxis: ChartXAxis,
  YAxis: ChartYAxis,
});

export type { ChartConfig } from "./context";
