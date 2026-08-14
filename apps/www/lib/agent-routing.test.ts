import { describe, expect, it } from "vitest";
import { resolveMarkdownRoute } from "@/lib/agent-routing";
import {
  NAKAFA_GROWTH_CASE_STUDY_HREF,
  NAKAFA_GROWTH_MARKDOWN_HREF,
} from "@/lib/nakafa-growth";

describe("resolveMarkdownRoute", () => {
  it.each([
    ["/", "/index.md"],
    ["/collaborate", "/collaborate.md"],
    ["/privacy", "/privacy.md"],
    ["/work", "/work.md"],
    [NAKAFA_GROWTH_CASE_STUDY_HREF, NAKAFA_GROWTH_MARKDOWN_HREF],
  ])("maps %s to its Markdown route", (pathname, expected) => {
    expect(
      resolveMarkdownRoute({
        acceptHeader: "text/markdown, text/plain;q=0.9",
        pathname,
      })
    ).toBe(expected);
  });

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
});
