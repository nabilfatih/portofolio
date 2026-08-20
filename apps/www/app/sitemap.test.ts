import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { caseStudies } from "@/lib/cases";

describe("sitemap", () => {
  it("publishes each canonical route exactly once", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toEqual([
      "https://nabilfatih.com",
      "https://nabilfatih.com/case-studies",
      "https://nabilfatih.com/collaborate",
      "https://nabilfatih.com/work",
      ...caseStudies.map((study) => `https://nabilfatih.com${study.href}`),
      "https://nabilfatih.com/privacy",
    ]);
    expect(new Set(urls).size).toBe(urls.length);
  });
});
