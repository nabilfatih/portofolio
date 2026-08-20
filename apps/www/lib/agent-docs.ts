import type { MDXContent } from "mdx/types";
import { NodeHtmlMarkdown } from "node-html-markdown";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createAgentMdxComponents } from "@/components/mdx/agent";
import CollaborateContent from "@/content/collaborate.mdx";
import HomeContent from "@/content/home.mdx";
import WorkContent from "@/content/work/index.mdx";
import { caseStudies, getCaseStudy } from "@/lib/cases";
import type { GitHubContributionSummary } from "@/lib/github";
import {
  privacyContent,
  VERCEL_ANALYTICS_PRIVACY_URL,
  VERCEL_SPEED_INSIGHTS_URL,
} from "@/lib/privacy";
import { SITE_URL, siteConfig } from "@/lib/site";

const AGENT_MARKDOWN_DIRECTIVE = `> For AI agents: use [llms.txt](${SITE_URL}/llms.txt) for the site index. Markdown versions are available at the \`.md\` routes or by sending \`Accept: text/markdown\`.`;

export function renderHomeMarkdown(
  githubSummary: GitHubContributionSummary | null = null
) {
  return renderMdxMarkdown(HomeContent, githubSummary);
}

export function renderWorkMarkdown() {
  return renderMdxMarkdown(WorkContent);
}

export function renderCollaborateMarkdown() {
  return renderMdxMarkdown(CollaborateContent);
}

export function renderCaseStudyMarkdown(slug: string) {
  const study = getCaseStudy(slug);

  if (!study) {
    throw new Error(`Unknown case study: ${slug}`);
  }

  return renderMdxMarkdown(study.content);
}

export interface RenderedAgentDocument {
  content: string;
  outputPath: string;
}

export function renderAgentDocuments(
  githubSummary: GitHubContributionSummary | null = null
): readonly RenderedAgentDocument[] {
  return [
    { content: renderHomeMarkdown(githubSummary), outputPath: "index.md" },
    { content: renderWorkMarkdown(), outputPath: "work.md" },
    { content: renderCollaborateMarkdown(), outputPath: "collaborate.md" },
    { content: renderPrivacyMarkdown(), outputPath: "privacy.md" },
    { content: renderLlmsText(), outputPath: "llms.txt" },
    {
      content: renderLlmsFullText(githubSummary),
      outputPath: "llms-full.txt",
    },
    ...caseStudies.map((study) => ({
      content: renderCaseStudyMarkdown(study.slug),
      outputPath: study.markdownHref.slice(1),
    })),
  ];
}

export function renderLlmsText() {
  const caseStudyLinks = caseStudies
    .map(
      (study) =>
        `- [${study.title}](${SITE_URL}${study.markdownHref}): ${study.description}`
    )
    .join("\n");

  return `# ${siteConfig.name}

> ${siteConfig.description}

## Portfolio

- [Home](${SITE_URL}/index.md): Introduction and primary profile links.
- [Work](${SITE_URL}/work.md): Case studies, professional experience, and education.
- [Collaborate](${SITE_URL}/collaborate.md): Product engineering, growth systems, and applied AI support.
- [Privacy](${SITE_URL}/privacy.md): Analytics, performance measurement, and contact details.

## Case studies

${caseStudyLinks}

## Complete context

- [Full portfolio text](${SITE_URL}/llms-full.txt): The complete public portfolio in one text file.
`;
}

export function renderPrivacyMarkdown() {
  return `# Privacy

${AGENT_MARKDOWN_DIRECTIVE}

Last updated ${privacyContent.updated}.

${privacyContent.analytics}

${privacyContent.performance}

${privacyContent.data}

- [Vercel Web Analytics privacy documentation](${VERCEL_ANALYTICS_PRIVACY_URL})
- [Vercel Speed Insights metrics documentation](${VERCEL_SPEED_INSIGHTS_URL})

${privacyContent.contact} [LinkedIn](https://www.linkedin.com/in/nabilfatih).
`;
}

export function renderLlmsFullText(
  githubSummary: GitHubContributionSummary | null = null
) {
  const caseStudyMarkdown = caseStudies
    .map((study) => renderCaseStudyMarkdown(study.slug))
    .join("\n\n");

  return `${renderHomeMarkdown(githubSummary)}\n\n${renderWorkMarkdown()}\n\n${renderCollaborateMarkdown()}\n\n${caseStudyMarkdown}\n\n${renderPrivacyMarkdown()}`;
}

function renderMdxMarkdown(
  Content: MDXContent,
  githubSummary: GitHubContributionSummary | null = null
) {
  const html = renderToStaticMarkup(
    createElement(Content, {
      components: createAgentMdxComponents(githubSummary),
    })
  );
  const markdown = new NodeHtmlMarkdown({
    bulletMarker: "-",
    textReplace: [[/\\\./g, "."]],
    useInlineLinks: true,
  })
    .translate(html)
    .replace(/[\t ]+$/gm, "")
    .trim();

  return `${markdown}\n`;
}
