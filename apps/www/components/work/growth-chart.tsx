"use client";

import {
  type ChartConfig,
  EvilSeriesChart,
} from "@repo/design-system/components/evilcharts/series-chart";
import { Suspense } from "react";
import {
  nakafaCumulativeOrganicClicks,
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

export function NakafaGrowthChart({
  description,
  sourceNote,
  title,
}: {
  readonly description: string;
  readonly sourceNote: string;
  readonly title: string;
}) {
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
          {title}
        </h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>

      <Suspense
        fallback={
          <div
            aria-hidden="true"
            className="h-72 min-h-72 w-full animate-pulse rounded-xl bg-muted/50 sm:h-80"
          />
        }
      >
        <EvilSeriesChart
          className="aspect-auto h-72 min-h-72 w-full sm:h-80"
          config={chartConfig}
          data={nakafaCumulativeOrganicClicks}
          margin={{ bottom: 0, left: 4, right: 12, top: 16 }}
          series={{ dataKey: "clicks", strokeWidth: 2 }}
          tooltip={{
            cursor: { strokeDasharray: "3 3", strokeWidth: 1 },
            labelFormatter: formatTooltipMonth,
          }}
          variant="area"
          xAxis={{
            dataKey: "month",
            height: 48,
            minTickGap: 28,
            tickFormatter: formatMonth,
          }}
          yAxis={{
            allowDecimals: false,
            tickFormatter: formatCompactNumber,
            width: 48,
          }}
        />
      </Suspense>

      <figcaption className="text-pretty text-muted-foreground text-sm leading-relaxed">
        {sourceNote}
      </figcaption>

      <div className="sr-only">
        <table>
          <caption>
            Monthly and cumulative organic clicks from Google Search Console
          </caption>
          <thead>
            <tr>
              <th scope="col">Month</th>
              <th scope="col">Monthly clicks</th>
              <th scope="col">Cumulative clicks</th>
            </tr>
          </thead>
          <tbody>
            {nakafaMonthlyOrganicClicks.map((point, index) => (
              <tr key={point.month}>
                <th scope="row">{formatLongMonth(point.month)}</th>
                <td>{point.clicks}</td>
                <td>{nakafaCumulativeOrganicClicks[index]?.clicks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
