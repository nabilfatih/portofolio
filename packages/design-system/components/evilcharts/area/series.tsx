"use client";

import { use, useId } from "react";
import { useChart } from "./context";
import { rechartsPromise } from "./runtime";

interface AreaSeriesProps {
  dataKey: string;
  strokeWidth?: number;
}

export function AreaSeries({ dataKey, strokeWidth = 2 }: AreaSeriesProps) {
  const { config } = useChart();
  const { Area } = use(rechartsPromise);
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
      <Area
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
