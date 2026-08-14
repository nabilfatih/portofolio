"use client";

import {
  type ChartConfig,
  EvilAreaChart,
} from "@repo/design-system/components/evilcharts/area-chart";
import { Suspense } from "react";
import {
  nakafaGrowthCaseStudy,
  nakafaMonthlyOrganicClicks,
} from "@/lib/nakafa-growth";

const chartConfig = {
  clicks: {
    color: "var(--chart-1)",
    label: "Organic clicks",
  },
} satisfies ChartConfig;

const compactNumberFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
});

const monthFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  timeZone: "UTC",
  year: "2-digit",
});

const longMonthFormatter = new Intl.DateTimeFormat("en", {
  month: "long",
  timeZone: "UTC",
  year: "numeric",
});

export function NakafaGrowthChart() {
  return (
    <figure
      aria-labelledby="organic-clicks-chart-title"
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-1">
        <h3
          className="font-medium text-lg tracking-tight"
          id="organic-clicks-chart-title"
        >
          {nakafaGrowthCaseStudy.trend.chartTitle}
        </h3>
        <p className="text-muted-foreground text-sm">
          {nakafaGrowthCaseStudy.trend.chartDescription}
        </p>
      </div>

      <Suspense
        fallback={
          <div
            aria-hidden="true"
            className="h-72 min-h-72 w-full animate-pulse rounded-xl bg-muted/50 sm:h-80"
          />
        }
      >
        <EvilAreaChart
          chartProps={{ margin: { bottom: 0, left: 4, right: 12, top: 16 } }}
          className="aspect-auto h-72 min-h-72 w-full sm:h-80"
          config={chartConfig}
          data={[...nakafaMonthlyOrganicClicks]}
        >
          <EvilAreaChart.Grid />
          <EvilAreaChart.XAxis
            dataKey="month"
            height={48}
            minTickGap={28}
            tickFormatter={formatMonth}
          />
          <EvilAreaChart.YAxis
            allowDecimals={false}
            tickFormatter={formatCompactNumber}
            width={48}
          />
          <EvilAreaChart.Tooltip
            content={
              <EvilAreaChart.TooltipContent
                labelFormatter={formatTooltipMonth}
              />
            }
            cursor={{ strokeDasharray: "3 3", strokeWidth: 1 }}
          />
          <EvilAreaChart.Area dataKey="clicks" strokeWidth={2} />
        </EvilAreaChart>
      </Suspense>

      <figcaption className="text-pretty text-muted-foreground text-sm leading-relaxed">
        {nakafaGrowthCaseStudy.trend.sourceNote}
      </figcaption>

      <table className="sr-only">
        <caption>Monthly organic clicks from Google Search Console</caption>
        <thead>
          <tr>
            <th scope="col">Month</th>
            <th scope="col">Clicks</th>
          </tr>
        </thead>
        <tbody>
          {nakafaMonthlyOrganicClicks.map((point) => (
            <tr key={point.month}>
              <th scope="row">{formatLongMonth(point.month)}</th>
              <td>{point.clicks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

function parseMonth(month: string) {
  return new Date(`${month}-01T00:00:00.000Z`);
}

function formatMonth(month: string) {
  return monthFormatter.format(parseMonth(month));
}

function formatLongMonth(month: string) {
  return longMonthFormatter.format(parseMonth(month));
}

function formatCompactNumber(value: number) {
  return compactNumberFormatter.format(value);
}

function formatTooltipMonth(value: string | number) {
  return formatLongMonth(String(value));
}
