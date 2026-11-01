import { describe, expect, it } from "vitest";
import {
  nakafaCumulativeOrganicClicks,
  nakafaGrowthEvidence,
  nakafaMonthlyGooglePageviews,
  nakafaMonthlyOrganicClicks,
  nakafaPartialMonthGooglePageviews,
  nakafaPartialMonthOrganicClicks,
} from "@/lib/nakafa-growth";

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

describe("Nakafa growth evidence", () => {
  it("keeps complete monthly points chronological and nonnegative", () => {
    const months = nakafaMonthlyOrganicClicks.map((point) => point.month);

    expect(months).toEqual([...months].sort());
    expect(new Set(months).size).toBe(months.length);
    expect(months.at(0)).toBe("2025-05");
    expect(months.at(-1)).toBe("2026-07");

    for (const point of nakafaMonthlyOrganicClicks) {
      expect(Number.isSafeInteger(point.clicks)).toBe(true);
      expect(point.clicks).toBeGreaterThanOrEqual(0);
    }
  });

  it("reconciles the chart with the Search Console total", () => {
    const completeMonthClicks = nakafaMonthlyOrganicClicks.reduce(
      (total, point) => total + point.clicks,
      0
    );
    const partialMonthClicks = nakafaPartialMonthOrganicClicks.reduce(
      (total, point) => total + point.clicks,
      0
    );

    expect(completeMonthClicks).toBe(14_372);
    expect(partialMonthClicks).toBe(107);
    expect(completeMonthClicks + partialMonthClicks).toBe(
      nakafaGrowthEvidence.searchConsole.clicks
    );
  });

  it("builds a truthful cumulative series from the monthly clicks", () => {
    expect(nakafaCumulativeOrganicClicks).toHaveLength(
      nakafaMonthlyOrganicClicks.length
    );
    expect(nakafaCumulativeOrganicClicks.at(0)).toEqual({
      clicks: 82,
      month: "2025-05",
    });
    expect(nakafaCumulativeOrganicClicks.at(-1)).toEqual({
      clicks: 14_372,
      month: "2026-07",
    });

    for (const [index, point] of nakafaCumulativeOrganicClicks.entries()) {
      const previous = nakafaCumulativeOrganicClicks[index - 1];

      if (!previous) {
        continue;
      }

      expect(point.clicks).toBeGreaterThan(previous.clicks);
    }
  });

  it("reconciles complete and partial PostHog months", () => {
    const completeMonthPageviews = nakafaMonthlyGooglePageviews.reduce(
      (total, point) => total + point.pageviews,
      0
    );
    const partialMonthPageviews = nakafaPartialMonthGooglePageviews.reduce(
      (total, point) => total + point.pageviews,
      0
    );

    expect(completeMonthPageviews).toBe(25_040);
    expect(partialMonthPageviews).toBe(1779);
    expect(completeMonthPageviews + partialMonthPageviews).toBe(
      nakafaGrowthEvidence.postHog.pageviewsFromGoogleSearch
    );
  });

  it("records a source and exact date range for every metric set", () => {
    for (const evidence of Object.values(nakafaGrowthEvidence)) {
      expect(evidence.source.length).toBeGreaterThan(0);
      expect(evidence.startDate).toMatch(ISO_DATE_PATTERN);
      expect(evidence.endDate).toMatch(ISO_DATE_PATTERN);
      expect(evidence.verifiedAt).toMatch(ISO_DATE_PATTERN);
      expect(evidence.startDate < evidence.endDate).toBe(true);
    }
  });
});
