import { describe, expect, it } from "vitest";
import { resolveMarkdownRoute } from "@/lib/agent-routing";
import { caseStudies } from "@/lib/cases";

describe("resolveMarkdownRoute", () => {
  const markdownRoutes: readonly (readonly [string, string])[] = [
    ["/", "/index.md"],
    ["/case-studies", "/case-studies.md"],
    ["/collaborate", "/collaborate.md"],
    ["/privacy", "/privacy.md"],
    ["/work", "/work.md"],
    ...caseStudies.map((study) => [study.href, study.markdownHref] as const),
  ];

  it.each(markdownRoutes)(
    "maps %s to its Markdown route",
    (pathname, expected) => {
      expect(
        resolveMarkdownRoute({
          acceptHeader: "text/markdown, text/plain;q=0.9",
          pathname,
        })
      ).toBe(expected);
    }
  );

  it("delegates normal browser requests", () => {
    expect(
      resolveMarkdownRoute({
        acceptHeader: "text/html",
        pathname: "/",
      })
    ).toBeNull();
  });

  it("delegates unsupported routes", () => {
    expect(
      resolveMarkdownRoute({
        acceptHeader: "text/markdown",
        pathname: "/missing",
      })
    ).toBeNull();
  });

  it("does not rewrite nested or generated Markdown routes", () => {
    for (const pathname of [
      "/work/example",
      "/work/example/nested",
      "/work/example.md",
    ]) {
      expect(
        resolveMarkdownRoute({
          acceptHeader: "text/markdown",
          pathname,
        })
      ).toBeNull();
    }
  });
});
