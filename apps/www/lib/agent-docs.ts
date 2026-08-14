import type { MDXContent } from "mdx/types";
import { NodeHtmlMarkdown } from "node-html-markdown";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createAgentMdxComponents } from "@/components/mdx/agent";
import CollaborateContent from "@/content/collaborate.mdx";
import GrowthContent from "@/content/growth.mdx";
import HomeContent from "@/content/home.mdx";
import type { GitHubContributionSummary } from "@/lib/github";
import { NAKAFA_GROWTH_MARKDOWN_HREF } from "@/lib/nakafa-growth";
import {
  privacyContent,
  VERCEL_ANALYTICS_PRIVACY_URL,
  VERCEL_SPEED_INSIGHTS_URL,
} from "@/lib/privacy";
import { SITE_URL, siteConfig } from "@/lib/site";
import { educationEntry, workEntries } from "@/lib/work";

const markdownCompiler = new NodeHtmlMarkdown({
  bulletMarker: "-",
  textReplace: [[/\\\./g, "."]],
  useInlineLinks: true,
});

const AGENT_MARKDOWN_DIRECTIVE = `> For AI agents: use [llms.txt](${SITE_URL}/llms.txt) for the site index. Markdown versions are available at the \`.md\` routes or by sending \`Accept: text/markdown\`.`;

export function renderHomeMarkdown(
  githubSummary: GitHubContributionSummary | null = null
) {
  return renderMdxMarkdown(HomeContent, githubSummary);
}

export function renderWorkMarkdown() {
  const experience = workEntries
    .map((entry) => {
      const summary = entry.summary.map((item) => `- ${item}`).join("\n");

      const caseStudy = entry.caseStudyHref
        ? `\n\n[Read the Nakafa organic growth case study](${SITE_URL}${entry.caseStudyHref})`
        : "";

      return `## [${entry.company}](${entry.companyUrl})

${entry.role}, ${entry.period}

${summary}${caseStudy}`;
    })
    .join("\n\n");

  const educationSummary = educationEntry.summary
    .map((item) => `- ${item}`)
    .join("\n");

  return `# Work

${AGENT_MARKDOWN_DIRECTIVE}

I build software from early product ideas through production. Here are the products and systems I have worked on.

${experience}

## [${educationEntry.institution}](${educationEntry.institutionUrl})

${educationEntry.program}

${educationSummary}
`;
}

export function renderCollaborateMarkdown() {
  return renderMdxMarkdown(CollaborateContent);
}

export function renderNakafaGrowthMarkdown() {
  return renderMdxMarkdown(GrowthContent);
}

export function renderLlmsText() {
  return `# ${siteConfig.name}

> ${siteConfig.description}

## Portfolio

- [Home](${SITE_URL}/index.md): Introduction and primary profile links.
- [Work](${SITE_URL}/work.md): Professional experience and education.
- [Collaborate](${SITE_URL}/collaborate.md): Product engineering, growth systems, and applied AI support.
- [Nakafa organic growth case study](${SITE_URL}${NAKAFA_GROWTH_MARKDOWN_HREF}): Verified growth evidence and its limits.
- [Privacy](${SITE_URL}/privacy.md): Analytics, performance measurement, and contact details.

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
  return `${renderHomeMarkdown(githubSummary)}\n\n${renderWorkMarkdown()}\n\n${renderCollaborateMarkdown()}\n\n${renderNakafaGrowthMarkdown()}\n\n${renderPrivacyMarkdown()}`;
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
  const markdown = markdownCompiler.translate(html).trim();

  return `${markdown}\n`;
}
