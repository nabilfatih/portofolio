"use client";

import { useEvilChart } from "@repo/design-system/components/evilcharts/lib/chart-context";
import { rechartsPromise } from "@repo/design-system/components/evilcharts/lib/recharts-runtime";
import { use, useId } from "react";

export interface EvilAreaProps {
  dataKey: string;
  strokeWidth?: number;
}

export function EvilArea({ dataKey, strokeWidth = 2 }: EvilAreaProps) {
  const { config } = useEvilChart();
  const { Area: RechartsArea } = use(rechartsPromise);
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
      <RechartsArea
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
