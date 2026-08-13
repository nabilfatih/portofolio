"use client";

import { type ComponentProps, use } from "react";
import { type RechartsModule, rechartsPromise } from "./runtime";

export function ChartXAxis({
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
