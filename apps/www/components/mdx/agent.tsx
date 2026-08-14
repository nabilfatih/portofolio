import type { MDXComponents } from "mdx/types";
import type { ComponentProps, ReactNode } from "react";
import type {
  GrowthChartProps,
  ReferralChartProps,
} from "@/components/mdx/growth";
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

function GrowthMetrics() {
  return (
    <ul>
      <li>
        {nakafaGrowthEvidence.searchConsole.clicks.toLocaleString("en")} organic
        clicks
      </li>
      <li>
        {nakafaGrowthEvidence.searchConsole.impressions.toLocaleString("en")}{" "}
        search impressions
      </li>
      <li>
        {nakafaGrowthEvidence.googleAi.impressions.toLocaleString("en")} Google
        AI impressions
      </li>
    </ul>
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
    a: AgentAnchor,
    BackLink: Action,
    Capability,
    CapabilityList: ({ children }: { readonly children?: ReactNode }) => (
      <ul>{children}</ul>
    ),
    ChartSection: Section,
    ContactAction,
    ContactRow: Container,
    EvidenceNote: Container,
    Eyebrow: Container,
    GhostAction: Action,
    GitHubActivity: () => <AgentGitHubActivity summary={githubSummary} />,
    GrowthChart,
    GrowthMetrics,
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
    ProofMetrics: GrowthMetrics,
    ProofPanel: Section,
    ReferralChart,
    Section,
  } satisfies MDXComponents;
}
