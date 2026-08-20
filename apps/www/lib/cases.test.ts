import { describe, expect, it } from "vitest";
import { isUnknownCaseStudyPath } from "@/lib/case-slugs";
import { caseStudies, getCaseStudy } from "@/lib/cases";

describe("case study registry", () => {
  it("publishes unique HTML and Markdown routes", () => {
    const slugs = caseStudies.map((study) => study.slug);
    const htmlRoutes = caseStudies.map((study) => study.href);
    const markdownRoutes = caseStudies.map((study) => study.markdownHref);

    expect(new Set(slugs).size).toBe(slugs.length);
    expect(new Set(htmlRoutes).size).toBe(htmlRoutes.length);
    expect(new Set(markdownRoutes).size).toBe(markdownRoutes.length);
  });

  it("represents the full public engineering scope", () => {
    expect(caseStudies.map((study) => study.discipline)).toEqual([
      "Product engineering",
      "Applied AI",
      "Platform systems",
      "Growth engineering",
    ]);
  });

  it.each(caseStudies)("loads $slug from MDX", (study) => {
    expect(study.content).toBeTypeOf("function");
    expect(getCaseStudy(study.slug)).toBe(study);
  });

  it("distinguishes unknown direct case-study paths", () => {
    expect(isUnknownCaseStudyPath("/work/missing-case")).toBe(true);

    for (const study of caseStudies) {
      expect(isUnknownCaseStudyPath(study.href)).toBe(false);
    }
  });
});
