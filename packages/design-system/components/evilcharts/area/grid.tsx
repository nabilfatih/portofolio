"use client";

import { type ComponentProps, use } from "react";
import { type RechartsModule, rechartsPromise } from "./runtime";

type ChartGridProps = Omit<
  ComponentProps<RechartsModule["CartesianGrid"]>,
  "vertical"
>;

export function ChartGrid({
  strokeDasharray = "3 3",
  ...properties
}: ChartGridProps) {
  const { CartesianGrid } = use(rechartsPromise);

  return (
    <CartesianGrid
      strokeDasharray={strokeDasharray}
      vertical={false}
      {...properties}
    />
  );
}
