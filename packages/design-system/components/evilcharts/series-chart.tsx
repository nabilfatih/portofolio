"use client";

import { cn } from "@repo/design-system/lib/utils";
import { type ReactNode, use, useCallback, useId } from "react";
import type { TooltipContentProps } from "recharts";

const rechartsPromise = import("recharts");

interface ChartConfigItem {
  color: string;
  label: string;
}

export type ChartConfig = Record<string, ChartConfigItem>;

interface SeriesConfig<TData> {
  dataKey: Extract<keyof TData, string>;
  radius?: number;
  strokeWidth?: number;
}

interface ChartMargin {
  bottom?: number;
  left?: number;
  right?: number;
  top?: number;
}

interface TooltipConfig {
  cursor?: {
    fill?: string;
    strokeDasharray?: string;
    strokeWidth?: number;
  };
  labelFormatter?: (label: string | number) => string;
}

interface XAxisConfig<TData> {
  dataKey: Extract<keyof TData, string>;
  height?: number;
  minTickGap?: number;
  tickFormatter?: (value: string) => string;
}

interface YAxisConfig {
  allowDecimals?: boolean;
  tickFormatter?: (value: number) => string;
  width?: number;
}

interface SeriesChartProps<TData extends Record<string, unknown>> {
  className?: string;
  config: ChartConfig;
  data: readonly TData[];
  margin?: ChartMargin;
  series: SeriesConfig<TData>;
  tooltip?: TooltipConfig;
  variant: "area" | "bar";
  xAxis: XAxisConfig<TData>;
  yAxis?: YAxisConfig;
}

export function EvilSeriesChart<TData extends Record<string, unknown>>({
  className,
  config,
  data,
  margin,
  series,
  tooltip,
  variant,
  xAxis,
  yAxis,
}: SeriesChartProps<TData>) {
  const {
    Area,
    Bar,
    CartesianGrid,
    ComposedChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
  } = use(rechartsPromise);
  const id = useId().replaceAll(":", "");
  const seriesConfig = config[series.dataKey];
  const renderTooltip = useCallback(
    (properties: TooltipContentProps) => {
      if (!tooltip) {
        return null;
      }

      return renderTooltipContent(config, tooltip, properties);
    },
    [config, tooltip]
  );

  if (!seriesConfig) {
    throw new Error(
      `Missing EvilCharts config for the "${series.dataKey}" series.`
    );
  }

  const gradientId = `evil-series-${id}-${series.dataKey}`;

  return (
    <div
      className={cn(
        "min-h-0 w-full text-sm [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line]:stroke-border/60 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-layer]:outline-hidden [&_.recharts-surface]:outline-hidden",
        className
      )}
      data-slot="evil-series-chart"
    >
      <ResponsiveContainer
        initialDimension={{ height: 288, width: 640 }}
        minHeight={0}
        minWidth={0}
      >
        <ComposedChart accessibilityLayer data={[...data]} margin={margin}>
          <defs>
            <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
              <stop
                offset="0%"
                stopColor={seriesConfig.color}
                stopOpacity={0.28}
              />
              <stop
                offset="100%"
                stopColor={seriesConfig.color}
                stopOpacity={0.02}
              />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            axisLine={false}
            dataKey={xAxis.dataKey}
            height={xAxis.height}
            minTickGap={xAxis.minTickGap ?? 8}
            tick={{ fontSize: 14 }}
            tickFormatter={xAxis.tickFormatter}
            tickLine={false}
            tickMargin={8}
          />
          <YAxis
            allowDecimals={yAxis?.allowDecimals}
            axisLine={false}
            tick={{ fontSize: 14 }}
            tickFormatter={yAxis?.tickFormatter}
            tickLine={false}
            tickMargin={8}
            width={yAxis?.width ?? 48}
          />
          {tooltip ? (
            <Tooltip
              animationDuration={150}
              content={renderTooltip}
              cursor={tooltip.cursor}
            />
          ) : null}
          {variant === "area" ? (
            <Area
              activeDot={{ r: 4 }}
              dataKey={series.dataKey}
              fill={`url(#${gradientId})`}
              fillOpacity={1}
              isAnimationActive={false}
              name={seriesConfig.label}
              stroke={seriesConfig.color}
              strokeLinecap="round"
              strokeWidth={series.strokeWidth ?? 2}
              type="monotone"
            />
          ) : (
            <Bar
              dataKey={series.dataKey}
              fill={seriesConfig.color}
              isAnimationActive={false}
              name={seriesConfig.label}
              radius={series.radius ?? 4}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

function renderTooltipContent(
  config: ChartConfig,
  tooltip: TooltipConfig,
  properties: TooltipContentProps
): ReactNode {
  const { active, label, payload } = properties;
  const item = payload?.[0];

  if (!(active && item)) {
    return null;
  }

  const dataKey = String(item.dataKey ?? item.name ?? "");
  const series = config[dataKey];
  const displayLabel =
    tooltip.labelFormatter?.(label ?? "") ?? String(label ?? "");
  const displayValue =
    typeof item.value === "number"
      ? item.value.toLocaleString("en")
      : String(item.value ?? "");

  return (
    <div className="grid min-w-40 gap-2 rounded-lg border border-border/50 bg-background px-3 py-2 text-sm shadow-xl">
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
