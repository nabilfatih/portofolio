import { access } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { educationEntry, workEntries } from "@/lib/work";

const EMPLOYMENT_TYPE_LABEL =
  /\b(?:part[ -]?time|full[ -]?time|intern(?:ship)?|working student)\b/i;
const COMPANY_LOGO_PATH = /^\/company-logos\/[a-z0-9-]+\.svg$/;

describe("work entries", () => {
  it("uses functional role names without employment-type labels", () => {
    const publicWorkCopy = workEntries
      .flatMap((entry) => [entry.company, entry.role, ...entry.summary])
      .join(" ");

    expect(publicWorkCopy).not.toMatch(EMPLOYMENT_TYPE_LABEL);
  });

  it("uses the completed StrategyBridgeAI period", () => {
    const strategyBridge = workEntries.find(
      (entry) => entry.company === "StrategyBridgeAI GmbH"
    );

    expect(strategyBridge?.period).toBe("Jul 2024 - Jul 2026");
  });

  it("links the Nakafa entry to the organic growth case study", () => {
    const nakafa = workEntries.find((entry) => entry.company === "Nakafa");

    expect(nakafa?.caseStudyHref).toBe("/work/nakafa-organic-growth");
  });

  it.each(workEntries)("has a local logo for $company", async (entry) => {
    expect(entry.logo).toMatch(COMPANY_LOGO_PATH);
    expect(entry.logoFallback.length).toBeGreaterThan(0);

    await expect(
      access(new URL(`../public${entry.logo}`, import.meta.url))
    ).resolves.toBeUndefined();
  });

  it.each(workEntries)("links $company to its official website", (entry) => {
    expect(new URL(entry.companyUrl).protocol).toBe("https:");
  });

  it("has an official website and local logo for OTH Regensburg", async () => {
    expect(new URL(educationEntry.institutionUrl).protocol).toBe("https:");
    expect(educationEntry.logo).toMatch(COMPANY_LOGO_PATH);

    await expect(
      access(new URL(`../public${educationEntry.logo}`, import.meta.url))
    ).resolves.toBeUndefined();
  });
});
