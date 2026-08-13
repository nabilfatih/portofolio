"use client";

import { cn } from "@repo/design-system/lib/utils";
import type { TooltipContentProps } from "recharts";
import { useChart } from "./context";

interface ChartTooltipContentProps {
  active?: TooltipContentProps["active"];
  className?: string;
  label?: TooltipContentProps["label"];
  labelFormatter?: (label: string | number) => string;
  payload?: TooltipContentProps["payload"];
}

export function ChartTooltipContent({
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
