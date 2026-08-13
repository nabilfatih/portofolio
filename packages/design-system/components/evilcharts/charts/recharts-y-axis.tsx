"use client";

import {
  type RechartsModule,
  rechartsPromise,
} from "@repo/design-system/components/evilcharts/lib/recharts-runtime";
import { type ComponentProps, use } from "react";

export function EvilYAxis({
  axisLine = false,
  tick = { fontSize: 14 },
  tickLine = false,
  tickMargin = 8,
  width = 48,
  ...properties
}: ComponentProps<RechartsModule["YAxis"]>) {
  const { YAxis: RechartsYAxis } = use(rechartsPromise);

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
