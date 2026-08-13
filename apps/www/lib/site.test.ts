import { describe, expect, it } from "vitest";
import {
  renderCollaborateMarkdown,
  renderHomeMarkdown,
  renderLlmsText,
  renderNakafaGrowthMarkdown,
} from "@/lib/agent-docs";
import {
  NAKAFA_GROWTH_CASE_STUDY_HREF,
  nakafaGrowthCaseStudy,
} from "@/lib/nakafa-growth";
import {
  CONTACT_EMAIL,
  CONTACT_HREF,
  collaborationCta,
  siteConfig,
} from "@/lib/site";

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

  it("keeps the collaboration offer available to agents", () => {
    const homepageMarkdown = renderHomeMarkdown();

    expect(homepageMarkdown).toContain(collaborationCta.heading);
    expect(homepageMarkdown).toContain(collaborationCta.description);
    expect(homepageMarkdown).toContain(
      `[${collaborationCta.actionLabel}](${CONTACT_HREF})`
    );
  });

  it("publishes the collaboration and case study pages to agents", () => {
    const collaborationMarkdown = renderCollaborateMarkdown();
    const caseStudyMarkdown = renderNakafaGrowthMarkdown();
    const llmsText = renderLlmsText();

    expect(collaborationMarkdown).toContain("Growth engineering");
    expect(collaborationMarkdown).toContain(CONTACT_HREF);
    expect(caseStudyMarkdown).toContain("14,479 organic clicks");
    expect(caseStudyMarkdown).toContain(
      nakafaGrowthCaseStudy.evidenceLimits.heading
    );
    expect(llmsText).toContain("/collaborate.md");
    expect(llmsText).toContain(`${NAKAFA_GROWTH_CASE_STUDY_HREF}.md`);
  });
});
