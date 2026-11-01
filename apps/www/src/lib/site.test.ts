import { describe, expect, it } from "vitest";
import {
  renderAgentDocuments,
  renderCaseStudiesMarkdown,
  renderCaseStudyMarkdown,
  renderCollaborateMarkdown,
  renderHomeMarkdown,
  renderLlmsFullText,
  renderLlmsText,
} from "@/lib/agent-docs";
import { caseStudies } from "@/lib/cases";
import { CONTACT_EMAIL, CONTACT_HREF, siteConfig } from "@/lib/site";

const MARKDOWN_TABLE_SEPARATOR_PATTERN = /\n\| -+ \| -+ \| -+ \|\n/;

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

    expect(homepageMarkdown).toContain(
      "I help turn product ideas into reliable software."
    );
    expect(homepageMarkdown).toContain(
      "If you need a contractor or B2B partner"
    );
    expect(homepageMarkdown).toContain(`[Discuss a project](${CONTACT_HREF})`);
  });

  it("publishes the collaboration and case study pages to agents", () => {
    const collaborationMarkdown = renderCollaborateMarkdown();
    const caseStudiesMarkdown = renderCaseStudiesMarkdown();
    const caseStudyMarkdown = renderCaseStudyMarkdown("nakafa-growth");
    const fullPortfolioMarkdown = renderLlmsFullText();
    const llmsText = renderLlmsText();

    expect(collaborationMarkdown).toContain("Growth engineering");
    expect(caseStudiesMarkdown).toContain(
      "How I turn product problems into working systems"
    );
    expect(collaborationMarkdown).toContain(CONTACT_HREF);
    expect(caseStudyMarkdown).toContain("14,479 organic clicks");
    expect(caseStudyMarkdown).toContain("Cumulative organic clicks");
    expect(caseStudyMarkdown).toContain("Pageviews from Google search");
    expect(caseStudyMarkdown).toContain("What the evidence can support");
    expect(caseStudyMarkdown).toContain(
      "April 12, 2025 through August 11, 2026"
    );
    expect(caseStudyMarkdown).toContain("71,802");
    expect(caseStudyMarkdown).toContain("549");
    expect(caseStudyMarkdown).toContain("26,819");
    expect(caseStudyMarkdown).toContain("August 1 to 13, 2026");
    expect(llmsText).toContain("/collaborate.md");
    for (const study of caseStudies) {
      expect(llmsText).toContain(study.markdownHref);
      expect(renderCaseStudyMarkdown(study.slug)).toContain(study.title);
    }
    expect(fullPortfolioMarkdown).toContain(caseStudyMarkdown.trim());
  });

  it("publishes every case through the same document pipeline", () => {
    const documents = renderAgentDocuments();
    const outputPaths = documents.map((document) => document.outputPath);

    expect(new Set(outputPaths).size).toBe(outputPaths.length);
    expect(outputPaths).toContain("case-studies.md");
    for (const study of caseStudies) {
      expect(outputPaths).toContain(study.markdownHref.slice(1));
    }
  });

  it("renders authored MDX tables as multiline Markdown tables", () => {
    const ninaMarkdown = renderCaseStudyMarkdown("nina-tutor");

    expect(ninaMarkdown).toContain("| Part");
    expect(ninaMarkdown).toMatch(MARKDOWN_TABLE_SEPARATOR_PATTERN);
    expect(ninaMarkdown).not.toContain("<table");
  });
});
