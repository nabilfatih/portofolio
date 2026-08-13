"use client";

import {
  type RechartsModule,
  rechartsPromise,
} from "@repo/design-system/components/evilcharts/lib/recharts-runtime";
import { type ComponentProps, use } from "react";

export function EvilXAxis({
  axisLine = false,
  minTickGap = 8,
  tick = { fontSize: 14 },
  tickLine = false,
  tickMargin = 8,
  ...properties
}: ComponentProps<RechartsModule["XAxis"]>) {
  const { XAxis: RechartsXAxis } = use(rechartsPromise);

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
