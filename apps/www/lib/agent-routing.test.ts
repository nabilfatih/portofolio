import { describe, expect, it } from "vitest";
import { resolveMarkdownRoute } from "@/lib/agent-routing";

describe("resolveMarkdownRoute", () => {
  it.each([
    ["/", "/index.md"],
    ["/privacy", "/privacy.md"],
    ["/work", "/work.md"],
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
