const evidenceDateFormatter = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "long",
  timeZone: "UTC",
  year: "numeric",
});

export function formatEvidenceDate(date: string) {
  return evidenceDateFormatter.format(new Date(`${date}T00:00:00.000Z`));
}

export const nakafaGrowthEvidence = {
  googleAi: {
    endDate: "2026-08-11",
    impressions: 71_802,
    pages: 549,
    source: "Google Search Console, Generative AI features report",
    startDate: "2026-05-18",
    verifiedAt: "2026-08-13",
  },
  postHog: {
    endDate: "2026-08-13",
    pageviewsFromGoogleSearch: 26_819,
    source: "PostHog, pageviews attributed to Google search",
    startDate: "2026-01-01",
    verifiedAt: "2026-08-14",
  },
  searchConsole: {
    averagePosition: 8.5,
    clicks: 14_479,
    ctrPercent: 0.7,
    endDate: "2026-08-11",
    impressions: 2_037_927,
    source: "Google Search Console, Web search performance",
    startDate: "2025-04-12",
    verifiedAt: "2026-08-13",
  },
} as const;

export const nakafaMonthlyOrganicClicks = [
  { clicks: 82, month: "2025-05" },
  { clicks: 63, month: "2025-06" },
  { clicks: 601, month: "2025-07" },
  { clicks: 1221, month: "2025-08" },
  { clicks: 748, month: "2025-09" },
  { clicks: 1508, month: "2025-10" },
  { clicks: 2316, month: "2025-11" },
  { clicks: 977, month: "2025-12" },
  { clicks: 2872, month: "2026-01" },
  { clicks: 1415, month: "2026-02" },
  { clicks: 773, month: "2026-03" },
  { clicks: 531, month: "2026-04" },
  { clicks: 633, month: "2026-05" },
  { clicks: 405, month: "2026-06" },
  { clicks: 227, month: "2026-07" },
] as const;

export const nakafaCumulativeOrganicClicks = toCumulativeClicks(
  nakafaMonthlyOrganicClicks
);

export const nakafaPartialMonthOrganicClicks = [
  { clicks: 18, endDate: "2025-04-30", startDate: "2025-04-12" },
  { clicks: 89, endDate: "2026-08-11", startDate: "2026-08-01" },
] as const;

export const nakafaMonthlyGooglePageviews = [
  { month: "2026-01", pageviews: 3958 },
  { month: "2026-02", pageviews: 3085 },
  { month: "2026-03", pageviews: 2147 },
  { month: "2026-04", pageviews: 4655 },
  { month: "2026-05", pageviews: 2662 },
  { month: "2026-06", pageviews: 2877 },
  { month: "2026-07", pageviews: 5656 },
] as const;

export const nakafaPartialMonthGooglePageviews = [
  {
    endDate: "2026-08-13",
    pageviews: 1779,
    startDate: "2026-08-01",
  },
] as const;

function toCumulativeClicks(
  points: readonly { clicks: number; month: string }[]
) {
  let total = 0;

  return points.map((point) => {
    total += point.clicks;

    return {
      clicks: total,
      month: point.month,
    };
  });
}
