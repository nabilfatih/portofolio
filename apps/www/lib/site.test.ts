import { describe, expect, it } from "vitest";
import { CONTACT_EMAIL, CONTACT_HREF, siteConfig } from "@/lib/site";

describe("portfolio contact link", () => {
  it("opens a complete contract and B2B email draft", () => {
    const contactUrl = new URL(CONTACT_HREF);

    expect(contactUrl.protocol).toBe("mailto:");
    expect(contactUrl.pathname).toBe(CONTACT_EMAIL);
    expect(contactUrl.searchParams.get("subject")).toBe(
      "Project collaboration"
    );
    expect(contactUrl.searchParams.get("body")).toContain(
      "a contract or B2B project"
    );
    expect(contactUrl.searchParams.get("body")).toContain("Timeline:");
    expect(contactUrl.searchParams.get("body")).toContain("Budget range:");
  });

  it("keeps TikTok out of the public social links", () => {
    expect(siteConfig.social).not.toHaveProperty("tiktok");
  });
});
