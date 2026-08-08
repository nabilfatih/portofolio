import {
  privacyContent,
  VERCEL_ANALYTICS_PRIVACY_URL,
  VERCEL_SPEED_INSIGHTS_URL,
} from "@/lib/privacy";
import {
  CONTACT_EMAIL,
  CONTACT_HREF,
  collaborationCta,
  SITE_URL,
  siteConfig,
} from "@/lib/site";
import { educationEntry, workEntries } from "@/lib/work";

const AGENT_MARKDOWN_DIRECTIVE = `> For AI agents: use [llms.txt](${SITE_URL}/llms.txt) for the site index. Markdown versions are available at the \`.md\` routes or by sending \`Accept: text/markdown\`.`;

export function renderHomeMarkdown() {
  return `# ${siteConfig.name}

${AGENT_MARKDOWN_DIRECTIVE}

${siteConfig.description}

I am a product engineer who takes software from idea to production. I build web products and the APIs, data workflows, internal tools, and applied AI behind them. I started [Nakafa](https://nakafa.com), a source-available learning platform.

## ${collaborationCta.eyebrow}

### ${collaborationCta.heading}

${collaborationCta.description}

[${collaborationCta.actionLabel}](${CONTACT_HREF})

## Explore

- [Work](${SITE_URL}/work.md): Current product engineering experience and education.
- [Email](mailto:${CONTACT_EMAIL}): Contract and B2B collaboration.
- [GitHub](${siteConfig.social.github}): Open-source projects and source code.
- [LinkedIn](${siteConfig.social.linkedin}): Professional profile.
`;
}

export function renderWorkMarkdown() {
  const experience = workEntries
    .map((entry) => {
      const summary = entry.summary.map((item) => `- ${item}`).join("\n");

      return `## [${entry.company}](${entry.companyUrl})

${entry.role}, ${entry.period}

${summary}`;
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

export function renderLlmsText() {
  return `# ${siteConfig.name}

> ${siteConfig.description}

## Portfolio

- [Home](${SITE_URL}/index.md): Introduction and primary profile links.
- [Work](${SITE_URL}/work.md): Professional experience and education.
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

export function renderLlmsFullText() {
  return `${renderHomeMarkdown()}\n\n${renderWorkMarkdown()}\n\n${renderPrivacyMarkdown()}`;
}
