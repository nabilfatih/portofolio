import {
  collaborationCapabilities,
  collaborationContact,
  collaborationLoop,
  collaborationPage,
  collaborationProof,
  collaborationWorkingModel,
} from "@/lib/collaboration";
import {
  NAKAFA_GROWTH_CASE_STUDY_HREF,
  NAKAFA_GROWTH_CASE_STUDY_LABEL,
  nakafaGrowthCaseStudy,
  nakafaGrowthEvidence,
  nakafaGrowthSummary,
  nakafaMonthlyOrganicClicks,
} from "@/lib/nakafa-growth";
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

## ${nakafaGrowthSummary.eyebrow}

### ${nakafaGrowthSummary.heading}

${nakafaGrowthSummary.description}

${nakafaGrowthCaseStudy.resultsDescription}

- ${nakafaGrowthEvidence.searchConsole.clicks.toLocaleString("en")} organic clicks.
- ${nakafaGrowthEvidence.searchConsole.impressions.toLocaleString("en")} search impressions in the same period.
- ${nakafaGrowthEvidence.googleAi.impressions.toLocaleString("en")} impressions across ${nakafaGrowthEvidence.googleAi.pages.toLocaleString("en")} pages in Google Search Console's Generative AI features report.

[Read the Nakafa organic growth case study](${SITE_URL}${NAKAFA_GROWTH_CASE_STUDY_HREF})

## ${collaborationCta.eyebrow}

### ${collaborationCta.heading}

${collaborationCta.description}

[${collaborationCta.actionLabel}](${CONTACT_HREF})

## Explore

- [Work](${SITE_URL}/work.md): Current product engineering experience and education.
- [Collaborate](${SITE_URL}/collaborate.md): Ways I can help as a contractor or B2B partner.
- [Nakafa organic growth case study](${SITE_URL}/work/nakafa-organic-growth.md): Search architecture, measurement, results, and evidence limits.
- [Email](mailto:${CONTACT_EMAIL}): Contract and B2B collaboration.
- [GitHub](${siteConfig.social.github}): Open-source projects and source code.
- [LinkedIn](${siteConfig.social.linkedin}): Professional profile.
`;
}

export function renderWorkMarkdown() {
  const experience = workEntries
    .map((entry) => {
      const summary = entry.summary.map((item) => `- ${item}`).join("\n");

      const caseStudy = entry.caseStudyHref
        ? `\n\n[${NAKAFA_GROWTH_CASE_STUDY_LABEL}](${SITE_URL}${entry.caseStudyHref})`
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
  const capabilities = collaborationCapabilities
    .map((capability) => {
      const examples = capability.examples
        .map((example) => `- ${example}`)
        .join("\n");

      return `### ${capability.title}

${capability.description}

${examples}`;
    })
    .join("\n\n");
  const workingModel = collaborationWorkingModel
    .map((item) => `- ${item}`)
    .join("\n");
  const growthLoop = collaborationLoop.steps
    .map((step) => `- ${step.title}: ${step.description}`)
    .join("\n");

  return `# ${collaborationPage.heading}

${AGENT_MARKDOWN_DIRECTIVE}

${collaborationPage.eyebrow}

${collaborationPage.description}

[Discuss a project](${CONTACT_HREF})

## ${collaborationPage.capabilitiesHeading}

${capabilities}

## ${collaborationLoop.eyebrow}

### ${collaborationLoop.heading}

${collaborationLoop.description}

${growthLoop}

## ${collaborationProof.eyebrow}

### ${collaborationProof.heading}

${collaborationProof.description}

- ${nakafaGrowthEvidence.searchConsole.clicks.toLocaleString("en")} organic clicks
- ${nakafaGrowthEvidence.searchConsole.impressions.toLocaleString("en")} search impressions
- ${nakafaGrowthEvidence.googleAi.impressions.toLocaleString("en")} Google AI impressions

#### ${nakafaGrowthCaseStudy.trend.chartTitle}

${nakafaGrowthCaseStudy.trend.chartDescription}

${nakafaGrowthCaseStudy.trend.sourceNote}

[${collaborationProof.actionLabel}](${SITE_URL}${NAKAFA_GROWTH_CASE_STUDY_HREF})

## ${collaborationPage.workingModelHeading}

${workingModel}

## ${collaborationContact.heading}

${collaborationContact.description}

[${collaborationContact.actionLabel}](${CONTACT_HREF})
`;
}

export function renderNakafaGrowthMarkdown() {
  const { searchConsole } = nakafaGrowthEvidence;
  const monthlyClicks = nakafaMonthlyOrganicClicks
    .map(
      (point) => `- ${point.month}: ${point.clicks.toLocaleString("en")} clicks`
    )
    .join("\n");

  return `# ${nakafaGrowthCaseStudy.heading}

${AGENT_MARKDOWN_DIRECTIVE}

${nakafaGrowthCaseStudy.eyebrow}

${nakafaGrowthCaseStudy.description}

## ${nakafaGrowthCaseStudy.resultsHeading}

${nakafaGrowthCaseStudy.resultsDescription}

- ${searchConsole.clicks.toLocaleString("en")} organic clicks
- ${searchConsole.impressions.toLocaleString("en")} search impressions
- ${searchConsole.ctrPercent}% average CTR
- ${searchConsole.averagePosition} average position

## ${nakafaGrowthCaseStudy.problem.heading}

${nakafaGrowthCaseStudy.problem.paragraphs.join("\n\n")}

## ${nakafaGrowthCaseStudy.ownershipHeading}

${nakafaGrowthCaseStudy.ownership
  .map((step) => `### ${step.title}\n\n${step.description}`)
  .join("\n\n")}

## ${nakafaGrowthCaseStudy.trend.heading}

${nakafaGrowthCaseStudy.trend.description}

### ${nakafaGrowthCaseStudy.trend.chartTitle}

${nakafaGrowthCaseStudy.trend.chartDescription}

${monthlyClicks}

${nakafaGrowthCaseStudy.trend.sourceNote}

## ${nakafaGrowthCaseStudy.googleAi.heading}

${nakafaGrowthCaseStudy.googleAi.description}

## ${nakafaGrowthCaseStudy.postHog.heading}

${nakafaGrowthCaseStudy.postHog.description}

## ${nakafaGrowthCaseStudy.evidenceLimits.heading}

${nakafaGrowthCaseStudy.evidenceLimits.paragraphs.join("\n\n")}

${nakafaGrowthCaseStudy.clientValue.eyebrow}

## ${nakafaGrowthCaseStudy.clientValue.heading}

${nakafaGrowthCaseStudy.clientValue.description}

[${nakafaGrowthCaseStudy.clientValue.primaryActionLabel}](${CONTACT_HREF})[${nakafaGrowthCaseStudy.clientValue.secondaryActionLabel}](${SITE_URL}/collaborate)

${nakafaGrowthCaseStudy.evidenceSnapshot}
`;
}

export function renderLlmsText() {
  return `# ${siteConfig.name}

> ${siteConfig.description}

## Portfolio

- [Home](${SITE_URL}/index.md): Introduction and primary profile links.
- [Work](${SITE_URL}/work.md): Professional experience and education.
- [Collaborate](${SITE_URL}/collaborate.md): Product engineering, growth systems, and applied AI support.
- [Nakafa organic growth case study](${SITE_URL}/work/nakafa-organic-growth.md): Verified growth evidence and its limits.
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
  return `${renderHomeMarkdown()}\n\n${renderWorkMarkdown()}\n\n${renderCollaborateMarkdown()}\n\n${renderNakafaGrowthMarkdown()}\n\n${renderPrivacyMarkdown()}`;
}
