"use client";

import { type ComponentProps, use } from "react";
import { type RechartsModule, rechartsPromise } from "./runtime";

export function ChartTooltip({
  animationDuration = 150,
  ...properties
}: ComponentProps<RechartsModule["Tooltip"]>) {
  const { Tooltip } = use(rechartsPromise);

  return <Tooltip animationDuration={animationDuration} {...properties} />;
}
