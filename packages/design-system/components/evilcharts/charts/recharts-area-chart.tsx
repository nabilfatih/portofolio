"use client";

import { cn } from "@repo/design-system/lib/utils";
import {
  type ComponentProps,
  createContext,
  type ReactNode,
  use,
  useId,
} from "react";
import {
  CartesianGrid,
  Area as RechartsArea,
  AreaChart as RechartsAreaChart,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  ResponsiveContainer,
} from "recharts";

export interface ChartConfigItem {
  color: string;
  label: string;
}

export type ChartConfig = Record<string, ChartConfigItem>;

interface ChartContextValue {
  config: ChartConfig;
}

const ChartContext = createContext<ChartContextValue | null>(null);

export function useEvilChart() {
  const context = use(ChartContext);

  if (!context) {
    throw new Error(
      "EvilCharts components must be rendered inside an EvilAreaChart."
    );
  }

  return context;
}

interface EvilAreaChartRootProps<TData extends Record<string, unknown>> {
  chartProps?: Omit<
    ComponentProps<typeof RechartsAreaChart>,
    "children" | "data"
  >;
  children: ReactNode;
  className?: string;
  config: ChartConfig;
  data: readonly TData[];
}

function EvilAreaChartRoot<TData extends Record<string, unknown>>({
  chartProps,
  children,
  className,
  config,
  data,
}: EvilAreaChartRootProps<TData>) {
  return (
    <ChartContext value={{ config }}>
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
    </ChartContext>
  );
}

interface EvilAreaProps {
  dataKey: string;
  strokeWidth?: number;
}

function EvilArea({ dataKey, strokeWidth = 2 }: EvilAreaProps) {
  const { config } = useEvilChart();
  const id = useId().replaceAll(":", "");
  const series = config[dataKey];

  if (!series) {
    throw new Error(`Missing EvilCharts config for the "${dataKey}" series.`);
  }

  const gradientId = `evil-area-${id}-${dataKey}`;

  return (
    <>
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={series.color} stopOpacity={0.28} />
          <stop offset="100%" stopColor={series.color} stopOpacity={0.02} />
        </linearGradient>
      </defs>
      <RechartsArea
        activeDot={{ r: 4 }}
        dataKey={dataKey}
        fill={`url(#${gradientId})`}
        fillOpacity={1}
        isAnimationActive={false}
        name={series.label}
        stroke={series.color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        type="monotone"
      />
    </>
  );
}

type EvilGridProps = Omit<ComponentProps<typeof CartesianGrid>, "vertical">;

function EvilGrid({ strokeDasharray = "3 3", ...properties }: EvilGridProps) {
  return (
    <CartesianGrid
      strokeDasharray={strokeDasharray}
      vertical={false}
      {...properties}
    />
  );
}

function EvilXAxis({
  axisLine = false,
  minTickGap = 8,
  tick = { fontSize: 14 },
  tickLine = false,
  tickMargin = 8,
  ...properties
}: ComponentProps<typeof RechartsXAxis>) {
  return (
    <RechartsXAxis
      axisLine={axisLine}
      minTickGap={minTickGap}
      tick={tick}
      tickLine={tickLine}
      tickMargin={tickMargin}
      {...properties}
    />
  );
}

function EvilYAxis({
  axisLine = false,
  tick = { fontSize: 14 },
  tickLine = false,
  tickMargin = 8,
  width = 48,
  ...properties
}: ComponentProps<typeof RechartsYAxis>) {
  return (
    <RechartsYAxis
      axisLine={axisLine}
      tick={tick}
      tickLine={tickLine}
      tickMargin={tickMargin}
      width={width}
      {...properties}
    />
  );
}

export const EvilAreaChart = Object.assign(EvilAreaChartRoot, {
  Area: EvilArea,
  Grid: EvilGrid,
  XAxis: EvilXAxis,
  YAxis: EvilYAxis,
});
