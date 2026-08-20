import type { MDXComponents } from "mdx/types";
import type { ComponentProps, ReactNode } from "react";
import type { ArchitectureDiagramProps } from "@/components/mdx/diagram";
import type {
  GrowthChartProps,
  ReferralChartProps,
} from "@/components/mdx/growth";
import type { CaseStudyMetadata } from "@/lib/cases";
import { caseStudies } from "@/lib/cases";
import type { GitHubContributionSummary } from "@/lib/github";
import {
  nakafaCumulativeOrganicClicks,
  nakafaGrowthEvidence,
  nakafaMonthlyGooglePageviews,
  nakafaMonthlyOrganicClicks,
} from "@/lib/nakafa-growth";
import { CONTACT_HREF, SITE_URL, siteConfig } from "@/lib/site";

function Container({ children }: { readonly children?: ReactNode }) {
  return <div>{children}</div>;
}

function Section({ children }: { readonly children?: ReactNode }) {
  return <section>{children}</section>;
}

function Hidden() {
  return null;
}

function AgentGitHubActivity({
  summary,
}: {
  readonly summary: GitHubContributionSummary | null;
}) {
  if (!summary) {
    return null;
  }

  return (
    <p>
      <a href={siteConfig.social.github}>
        {summary.total.toLocaleString("en-US")} contributions in the last year
      </a>
    </p>
  );
}

function AgentDirective() {
  return (
    <blockquote>
      <p>
        For AI agents: use <a href={`${SITE_URL}/llms.txt`}>llms.txt</a> for the
        site index. Markdown versions are available at the .md routes or by
        sending Accept: text/markdown.
      </p>
    </blockquote>
  );
}

function Heading1({ children }: { readonly children?: ReactNode }) {
  return <h1>{children}</h1>;
}

function AgentAnchor({ children, href }: ComponentProps<"a">) {
  if (!href) {
    return <span>{children}</span>;
  }

  return <a href={resolveHref(href)}>{children}</a>;
}

function Action({
  children,
  href,
}: {
  readonly children?: ReactNode;
  readonly href: string;
}) {
  return <a href={resolveHref(href)}>{children}</a>;
}

function ContactAction({ children }: { readonly children?: ReactNode }) {
  return <a href={CONTACT_HREF}>{children}</a>;
}

function Capability({
  children,
  title,
}: {
  readonly children?: ReactNode;
  readonly title: string;
}) {
  return (
    <li>
      <h3>{title}</h3>
      {children}
    </li>
  );
}

function ProcessStep({
  children,
  number,
  title,
}: {
  readonly children?: ReactNode;
  readonly number: string;
  readonly title: string;
}) {
  return (
    <li>
      <h3>
        {number}. {title}
      </h3>
      {children}
    </li>
  );
}

function CaseStudies() {
  return (
    <ul>
      {caseStudies.map((study) => (
        <li key={study.slug}>
          <a href={`${SITE_URL}${study.href}`}>{study.title}</a>
          {`. ${study.discipline} at ${study.company}. ${study.description}`}
        </li>
      ))}
    </ul>
  );
}

function CaseHeader({
  eyebrow,
  metadata,
}: {
  readonly eyebrow: string;
  readonly metadata: CaseStudyMetadata;
}) {
  return (
    <header>
      <a href={`${SITE_URL}/work`}>All work</a>
      <p>{eyebrow}</p>
      <h1>{metadata.title}</h1>
      <AgentDirective />
      <p>{metadata.description}</p>
    </header>
  );
}

function Experience({
  children,
  company,
  companyUrl,
  period,
  role,
}: {
  readonly children?: ReactNode;
  readonly company: string;
  readonly companyUrl: string;
  readonly period: string;
  readonly role: string;
}) {
  return (
    <article>
      <h3>
        <a href={companyUrl}>{company}</a>
      </h3>
      <p>
        {role}, {period}
      </p>
      {children}
    </article>
  );
}

function Education({
  children,
  institution,
  institutionUrl,
  program,
}: {
  readonly children?: ReactNode;
  readonly institution: string;
  readonly institutionUrl: string;
  readonly program: string;
}) {
  return (
    <article>
      <h3>
        <a href={institutionUrl}>{institution}</a>
      </h3>
      <p>{program}</p>
      {children}
    </article>
  );
}

function ArchitectureDiagram({
  chart,
  description,
  title,
}: ArchitectureDiagramProps) {
  return (
    <figure>
      <figcaption>
        <strong>{title}</strong>. {description}
      </figcaption>
      <pre>
        <code>{chart}</code>
      </pre>
    </figure>
  );
}

function GrowthResults() {
  const { searchConsole } = nakafaGrowthEvidence;

  return (
    <ul>
      <li>{searchConsole.clicks.toLocaleString("en")} organic clicks</li>
      <li>
        {searchConsole.impressions.toLocaleString("en")} search impressions
      </li>
      <li>{searchConsole.ctrPercent}% average CTR</li>
      <li>{searchConsole.averagePosition} average position</li>
    </ul>
  );
}

function GrowthChart({ description, sourceNote, title }: GrowthChartProps) {
  return (
    <figure>
      <h3>{title}</h3>
      <p>{description}</p>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Monthly clicks</th>
            <th>Cumulative clicks</th>
          </tr>
        </thead>
        <tbody>
          {nakafaMonthlyOrganicClicks.map((point, index) => (
            <tr key={point.month}>
              <td>{point.month}</td>
              <td>{point.clicks}</td>
              <td>{nakafaCumulativeOrganicClicks[index]?.clicks}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption>{sourceNote}</figcaption>
    </figure>
  );
}

function ReferralChart({ description, sourceNote, title }: ReferralChartProps) {
  return (
    <figure>
      <h3>{title}</h3>
      <p>{description}</p>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Pageviews</th>
          </tr>
        </thead>
        <tbody>
          {nakafaMonthlyGooglePageviews.map((point) => (
            <tr key={point.month}>
              <td>{point.month}</td>
              <td>{point.pageviews}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption>{sourceNote}</figcaption>
    </figure>
  );
}

function resolveHref(href: string) {
  if (href.startsWith("/")) {
    return `${SITE_URL}${href}`;
  }

  return href;
}

export function createAgentMdxComponents(
  githubSummary: GitHubContributionSummary | null
) {
  return {
    ActionRow: Container,
    AgentDirective,
    ArchitectureDiagram,
    a: AgentAnchor,
    BackLink: Action,
    Capability,
    CapabilityList: ({ children }: { readonly children?: ReactNode }) => (
      <ul>{children}</ul>
    ),
    CaseHeader,
    CaseStudies,
    ChartSection: Section,
    ContactAction,
    ContactRow: Container,
    Education,
    Experience,
    ExperienceList: Container,
    Eyebrow: Container,
    GhostAction: Action,
    GitHubActivity: () => <AgentGitHubActivity summary={githubSummary} />,
    GrowthChart,
    GrowthResults,
    HeaderAction: Container,
    HomeSection: Section,
    HomeTitle: Heading1,
    Intro: Container,
    PageHeader: Container,
    PageTitle: Heading1,
    PrimaryAction: Action,
    ProcessList: ({ children }: { readonly children?: ReactNode }) => (
      <ol>{children}</ol>
    ),
    ProcessStep,
    ProfileGallery: Hidden,
    ProofAction: Container,
    ProofPanel: Section,
    ReferralChart,
    Section,
    table: "table",
    tbody: "tbody",
    td: "td",
    th: "th",
    thead: "thead",
    tr: "tr",
  } satisfies MDXComponents;
}
