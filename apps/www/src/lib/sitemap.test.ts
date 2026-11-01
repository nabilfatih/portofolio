import { describe, expect, it } from "vitest";
import { caseStudies } from "@/lib/cases";
import { renderSitemap, sitemapEntries } from "@/lib/sitemap";

describe("sitemap", () => {
  it("publishes each canonical route exactly once", () => {
    const urls = sitemapEntries().map((entry) => entry.url);

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

  it("renders every route into the XML file", () => {
    const xml = renderSitemap();

    for (const entry of sitemapEntries()) {
      expect(xml).toContain(`<loc>${entry.url}</loc>`);
    }
  });
});
