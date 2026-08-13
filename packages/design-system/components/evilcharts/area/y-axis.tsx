"use client";

import { type ComponentProps, use } from "react";
import { type RechartsModule, rechartsPromise } from "./runtime";

export function ChartYAxis({
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
