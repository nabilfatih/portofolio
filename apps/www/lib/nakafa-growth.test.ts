import { describe, expect, it } from "vitest";
import {
  NAKAFA_GROWTH_EVIDENCE_VERIFIED_AT,
  nakafaGrowthCaseStudy,
  nakafaGrowthEvidence,
  nakafaMonthlyOrganicClicks,
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

  it("records a source and exact date range for every metric set", () => {
    for (const evidence of Object.values(nakafaGrowthEvidence)) {
      expect(evidence.source.length).toBeGreaterThan(0);
      expect(evidence.startDate).toMatch(ISO_DATE_PATTERN);
      expect(evidence.endDate).toMatch(ISO_DATE_PATTERN);
      expect(evidence.startDate < evidence.endDate).toBe(true);
    }

    expect(NAKAFA_GROWTH_EVIDENCE_VERIFIED_AT).toMatch(ISO_DATE_PATTERN);
  });

  it("builds public evidence copy from the canonical metrics", () => {
    expect(nakafaGrowthCaseStudy.resultsDescription).toContain(
      "April 12, 2025 through August 11, 2026"
    );
    expect(nakafaGrowthCaseStudy.googleAi.description).toContain("71,802");
    expect(nakafaGrowthCaseStudy.googleAi.description).toContain("549");
    expect(nakafaGrowthCaseStudy.postHog.description).toContain("26,803");
    expect(nakafaGrowthCaseStudy.evidenceSnapshot).toContain(
      "verified on August 13, 2026"
    );
  });
});
