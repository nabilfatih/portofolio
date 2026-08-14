export const NAKAFA_GROWTH_CASE_STUDY_HREF = "/work/nakafa-organic-growth";
export const NAKAFA_GROWTH_CASE_STUDY_LABEL =
  "Read the Nakafa organic growth case study";

const evidenceDateFormatter = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "long",
  timeZone: "UTC",
  year: "numeric",
});

function formatEvidenceDate(date: string) {
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

export const nakafaGrowthCaseStudy = {
  clientValue: {
    description:
      "That can mean auditing the current search foundation, building a programmatic content workflow, improving measurement, or owning the product changes needed to make the growth plan real.",
    eyebrow: "For your product",
    heading:
      "I can connect growth work to the software that has to support it.",
    primaryActionLabel: "Discuss a project",
    secondaryActionLabel: "See how I can help",
  },
  description:
    "Nakafa is the learning platform I founded and still lead. I own the product, the content system, and the technical work that helps people find useful lessons through search.",
  evidenceLimits: {
    heading: "What the evidence can support",
    paragraphs: [
      "The data shows Nakafa earned substantial search visibility while I owned the product and growth system. It does not isolate one change as the cause. Search demand, seasonality, content quality, technical work, and changes in Google can all affect the result.",
      "Search Console and PostHog also measure different parts of the journey. Their totals should be read separately and never added together.",
    ],
  },
  evidenceSnapshot: `Evidence snapshot: ${nakafaGrowthEvidence.searchConsole.source} and ${nakafaGrowthEvidence.googleAi.source} were verified on ${formatEvidenceDate(nakafaGrowthEvidence.searchConsole.verifiedAt)}. ${nakafaGrowthEvidence.postHog.source} was verified on ${formatEvidenceDate(nakafaGrowthEvidence.postHog.verifiedAt)}.`,
  eyebrow: "Growth engineering at Nakafa",
  googleAi: {
    description: `Google Search Console reported ${nakafaGrowthEvidence.googleAi.impressions.toLocaleString("en")} impressions across ${nakafaGrowthEvidence.googleAi.pages.toLocaleString("en")} Nakafa pages in its Generative AI features report from ${formatEvidenceDate(nakafaGrowthEvidence.googleAi.startDate)} through ${formatEvidenceDate(nakafaGrowthEvidence.googleAi.endDate)}. I use this as evidence that the same content system is being surfaced in newer search experiences. It is an impression metric, not a conversion metric.`,
    heading: "Visibility in Google AI features",
  },
  heading: "Building organic growth into the product",
  ownership: [
    {
      description:
        "I built canonical, language-aware routes for lessons, topics, curricula, and articles, with metadata and structured data tied to the same content model.",
      title: "Search architecture",
    },
    {
      description:
        "I connected authored learning content to reusable page templates, sitemap generation, internal navigation, and signed releases so new coverage can ship without hand-building every page.",
      title: "Programmatic content system",
    },
    {
      description:
        "I used Search Console and product analytics to follow queries, indexed pages, referrals, and product use. The evidence guides what to improve without pretending every change caused the full result.",
      title: "Measurement and iteration",
    },
  ],
  ownershipHeading: "What I owned",
  postHog: {
    chartDescription:
      "Complete calendar months from January through July 2026.",
    chartTitle: "Pageviews from Google search",
    description: `PostHog recorded ${nakafaGrowthEvidence.postHog.pageviewsFromGoogleSearch.toLocaleString("en")} pageviews attributed to Google search from ${formatEvidenceDate(nakafaGrowthEvidence.postHog.startDate)} through ${formatEvidenceDate(nakafaGrowthEvidence.postHog.endDate)}. The project has no recorded Google-search pageviews before January in this dataset, so I do not present it as a full-period traffic total.`,
    heading: "Google referral traffic",
    sourceNote:
      "Source: PostHog, pageviews attributed to Google search. August 1 to 13, 2026 is excluded from the chart because it is a partial month. Search Console and PostHog measure different parts of the journey and are not added together.",
  },
  problem: {
    heading: "The problem",
    paragraphs: [
      "Useful learning content is not enough on its own. Every lesson needs a stable place in the product, a clear relationship to its subject and curriculum, accurate metadata, and a publishing path that can grow without creating duplicate or stale pages.",
      "Search, content, localization, analytics, and product delivery had to work as one system. I treated that as an engineering problem, not a separate marketing task.",
    ],
  },
  resultsDescription: `Google Search Console measured these results from ${formatEvidenceDate(nakafaGrowthEvidence.searchConsole.startDate)} through ${formatEvidenceDate(nakafaGrowthEvidence.searchConsole.endDate)}.`,
  resultsHeading: "Search results",
  trend: {
    chartDescription:
      "Complete calendar months from May 2025 through July 2026.",
    chartTitle: "Cumulative organic clicks",
    description:
      "The cumulative view shows how organic clicks added up across complete months. The source data remains available month by month in the accessible table.",
    heading: "Organic reach earned over time",
    sourceNote:
      "Source: Google Search Console, Web search performance. Complete months account for 14,372 clicks. The 14,479 aggregate also includes 18 clicks from April 12 to 30, 2025 and 89 clicks from August 1 to 11, 2026.",
  },
} as const;

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

export const nakafaGrowthSummary = {
  description:
    "I own Nakafa's product and organic growth system, including technical SEO, content architecture, measurement, and the software that keeps them connected.",
  eyebrow: "Selected work",
  heading: "I build the product and the growth system around it.",
} as const;
