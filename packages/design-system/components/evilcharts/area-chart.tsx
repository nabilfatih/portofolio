"use client";

import { cn } from "@repo/design-system/lib/utils";
import {
  type ComponentProps,
  createContext,
  type ReactNode,
  use,
  useId,
  useMemo,
} from "react";
import type { TooltipContentProps } from "recharts";

const rechartsPromise = import("recharts");

type RechartsModule = Awaited<typeof rechartsPromise>;

interface ChartConfigItem {
  color: string;
  label: string;
}

export type ChartConfig = Record<string, ChartConfigItem>;

interface ChartContextValue {
  config: ChartConfig;
}

const ChartContext = createContext<ChartContextValue | null>(null);

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

type ChartGridProps = Omit<
  ComponentProps<RechartsModule["CartesianGrid"]>,
  "vertical"
>;

function ChartGrid({ strokeDasharray = "3 3", ...properties }: ChartGridProps) {
  const { CartesianGrid } = use(rechartsPromise);

  return (
    <CartesianGrid
      strokeDasharray={strokeDasharray}
      vertical={false}
      {...properties}
    />
  );
}

interface AreaSeriesProps {
  dataKey: string;
  strokeWidth?: number;
}

function AreaSeries({ dataKey, strokeWidth = 2 }: AreaSeriesProps) {
  const { config } = useChart();
  const { Area } = use(rechartsPromise);
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
      <Area
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

function ChartTooltip({
  animationDuration = 150,
  ...properties
}: ComponentProps<RechartsModule["Tooltip"]>) {
  const { Tooltip } = use(rechartsPromise);

  return <Tooltip animationDuration={animationDuration} {...properties} />;
}

interface ChartTooltipContentProps {
  active?: TooltipContentProps["active"];
  className?: string;
  label?: TooltipContentProps["label"];
  labelFormatter?: (label: string | number) => string;
  payload?: TooltipContentProps["payload"];
}

function ChartTooltipContent({
  active,
  className,
  label,
  labelFormatter,
  payload,
}: ChartTooltipContentProps) {
  const { config } = useChart();
  const item = payload?.[0];

  if (!(active && item)) {
    return null;
  }

  const dataKey = String(item.dataKey ?? item.name ?? "");
  const series = config[dataKey];
  const displayLabel = labelFormatter?.(label ?? "") ?? String(label ?? "");
  const displayValue =
    typeof item.value === "number"
      ? item.value.toLocaleString("en")
      : String(item.value ?? "");

  return (
    <div
      className={cn(
        "grid min-w-40 gap-2 rounded-lg border border-border/50 bg-background px-3 py-2 text-sm shadow-xl",
        className
      )}
    >
      <p className="font-medium">{displayLabel}</p>
      <div className="flex items-center justify-between gap-4">
        <span className="flex items-center gap-2 text-muted-foreground">
          <span
            aria-hidden="true"
            className="size-2.5 rounded-sm"
            style={{ backgroundColor: series?.color ?? item.color }}
          />
          {series?.label ?? item.name}
        </span>
        <span className="font-medium font-mono tabular-nums">
          {displayValue}
        </span>
      </div>
    </div>
  );
}

function ChartXAxis({
  axisLine = false,
  minTickGap = 8,
  tick = { fontSize: 14 },
  tickLine = false,
  tickMargin = 8,
  ...properties
}: ComponentProps<RechartsModule["XAxis"]>) {
  const { XAxis } = use(rechartsPromise);

  return (
    <XAxis
      axisLine={axisLine}
      minTickGap={minTickGap}
      tick={tick}
      tickLine={tickLine}
      tickMargin={tickMargin}
      {...properties}
    />
  );
}

function ChartYAxis({
  axisLine = false,
  tick = { fontSize: 14 },
  tickLine = false,
  tickMargin = 8,
  width = 48,
  ...properties
}: ComponentProps<RechartsModule["YAxis"]>) {
  const { YAxis } = use(rechartsPromise);

  return (
    <YAxis
      axisLine={axisLine}
      tick={tick}
      tickLine={tickLine}
      tickMargin={tickMargin}
      width={width}
      {...properties}
    />
  );
}

function useChart() {
  const context = use(ChartContext);

  if (!context) {
    throw new Error(
      "EvilCharts components must be rendered inside an EvilAreaChart."
    );
  }

  return context;
}

export const EvilAreaChart = Object.assign(AreaChartRoot, {
  Area: AreaSeries,
  Grid: ChartGrid,
  Tooltip: ChartTooltip,
  TooltipContent: ChartTooltipContent,
  XAxis: ChartXAxis,
  YAxis: ChartYAxis,
});
