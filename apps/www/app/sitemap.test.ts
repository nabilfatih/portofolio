import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";

describe("sitemap", () => {
  it("publishes each canonical route exactly once", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toEqual([
      "https://nabilfatih.com",
      "https://nabilfatih.com/work",
      "https://nabilfatih.com/privacy",
    ]);
    expect(new Set(urls).size).toBe(urls.length);
  });
});
