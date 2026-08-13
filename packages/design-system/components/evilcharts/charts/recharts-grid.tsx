"use client";

import {
  type RechartsModule,
  rechartsPromise,
} from "@repo/design-system/components/evilcharts/lib/recharts-runtime";
import { type ComponentProps, use } from "react";

export type EvilGridProps = Omit<
  ComponentProps<RechartsModule["CartesianGrid"]>,
  "vertical"
>;

export function EvilGrid({
  strokeDasharray = "3 3",
  ...properties
}: EvilGridProps) {
  const { CartesianGrid } = use(rechartsPromise);

  return (
    <CartesianGrid
      strokeDasharray={strokeDasharray}
      vertical={false}
      {...properties}
    />
  );
}
