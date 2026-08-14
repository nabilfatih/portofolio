"use client";

import {
  type ChartConfig,
  EvilSeriesChart,
} from "@repo/design-system/components/evilcharts/series-chart";
import { Suspense } from "react";
import { nakafaMonthlyGooglePageviews } from "@/lib/nakafa-growth";

const chartConfig = {
  pageviews: {
    color: "var(--chart-1)",
    label: "Pageviews",
  },
} satisfies ChartConfig;

const compactNumberFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
});

const monthFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  timeZone: "UTC",
});

const longMonthFormatter = new Intl.DateTimeFormat("en", {
  month: "long",
  timeZone: "UTC",
  year: "numeric",
});

export function NakafaReferralChart({
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
      aria-labelledby="google-referral-chart-title"
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-1">
        <h3
          className="font-medium text-lg tracking-tight"
          id="google-referral-chart-title"
        >
          {title}
        </h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>

      <Suspense
        fallback={
          <div
            aria-hidden="true"
            className="h-64 min-h-64 w-full animate-pulse rounded-xl bg-muted/50"
          />
        }
      >
        <EvilSeriesChart
          className="aspect-auto h-64 min-h-64 w-full"
          config={chartConfig}
          data={nakafaMonthlyGooglePageviews}
          margin={{ bottom: 0, left: 4, right: 12, top: 16 }}
          series={{ dataKey: "pageviews", radius: 4 }}
          tooltip={{
            cursor: { fill: "var(--muted)" },
            labelFormatter: formatTooltipMonth,
          }}
          variant="bar"
          xAxis={{
            dataKey: "month",
            height: 48,
            minTickGap: 16,
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
          <caption>Monthly pageviews attributed to Google search</caption>
          <thead>
            <tr>
              <th scope="col">Month</th>
              <th scope="col">Pageviews</th>
            </tr>
          </thead>
          <tbody>
            {nakafaMonthlyGooglePageviews.map((point) => (
              <tr key={point.month}>
                <th scope="row">{formatLongMonth(point.month)}</th>
                <td>{point.pageviews}</td>
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
