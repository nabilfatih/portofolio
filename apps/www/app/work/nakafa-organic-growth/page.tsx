import { Mail01Icon } from "@hugeicons/core-free-icons";
import { HugeIcons } from "@repo/design-system/components/ui/huge-icons";
import { Particles } from "@repo/design-system/components/ui/particles";
import { buttonVariants } from "@repo/design-system/lib/button";
import type { Metadata } from "next";
import Link from "next/link";
import { NakafaOrganicGrowthChart } from "@/components/work/nakafa-organic-growth-chart";
import { COLLABORATE_HREF } from "@/lib/collaboration";
import {
  nakafaGrowthCaseStudy,
  nakafaGrowthEvidence,
} from "@/lib/nakafa-growth";
import { CONTACT_HREF, SOCIAL_IMAGE } from "@/lib/site";

const CASE_STUDY_DESCRIPTION =
  "How Nabil Fatih built Nakafa's product, technical SEO, content system, and measurement around one organic growth loop.";

export const metadata: Metadata = {
  alternates: {
    canonical: "/work/nakafa-organic-growth",
    types: {
      "text/markdown": "/work/nakafa-organic-growth.md",
    },
  },
  description: CASE_STUDY_DESCRIPTION,
  openGraph: {
    description: CASE_STUDY_DESCRIPTION,
    images: [SOCIAL_IMAGE],
    title: "Nakafa organic growth case study",
    url: "/work/nakafa-organic-growth",
  },
  title: "Nakafa organic growth case study",
  twitter: {
    card: "summary_large_image",
    description: CASE_STUDY_DESCRIPTION,
    images: [SOCIAL_IMAGE.url],
    title: "Nakafa organic growth case study",
  },
};

export const revalidate = 3600;

export default function NakafaOrganicGrowthPage() {
  const { searchConsole } = nakafaGrowthEvidence;

  return (
    <div className="relative">
      <Particles
        className="pointer-events-none absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <article className="py-24">
        <div className="mx-auto max-w-2xl px-4">
          <header className="space-y-4">
            <Link
              className="inline-flex text-muted-foreground text-sm underline-offset-4 hover:text-foreground hover:underline"
              href="/work"
            >
              Work
            </Link>
            <p className="font-medium text-primary text-sm">
              {nakafaGrowthCaseStudy.eyebrow}
            </p>
            <h1 className="text-balance font-medium text-3xl tracking-tighter">
              {nakafaGrowthCaseStudy.heading}
            </h1>
            <p className="text-pretty text-muted-foreground leading-relaxed">
              {nakafaGrowthCaseStudy.description}
            </p>
          </header>

          <section aria-labelledby="results-heading" className="mt-16">
            <h2
              className="font-medium text-2xl tracking-tighter"
              id="results-heading"
            >
              {nakafaGrowthCaseStudy.resultsHeading}
            </h2>
            <p className="mt-3 text-pretty text-muted-foreground leading-relaxed">
              {nakafaGrowthCaseStudy.resultsDescription}
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8">
              <Metric
                label="organic clicks"
                value={searchConsole.clicks.toLocaleString("en")}
              />
              <Metric
                label="search impressions"
                value={searchConsole.impressions.toLocaleString("en")}
              />
              <Metric
                label="average CTR"
                value={`${searchConsole.ctrPercent}%`}
              />
              <Metric
                label="average position"
                value={searchConsole.averagePosition.toString()}
              />
            </dl>
          </section>

          <section
            aria-labelledby="problem-heading"
            className="mt-20 space-y-4"
          >
            <h2
              className="font-medium text-2xl tracking-tighter"
              id="problem-heading"
            >
              {nakafaGrowthCaseStudy.problem.heading}
            </h2>
            {nakafaGrowthCaseStudy.problem.paragraphs.map((paragraph) => (
              <p
                className="text-pretty text-muted-foreground leading-relaxed"
                key={paragraph}
              >
                {paragraph}
              </p>
            ))}
          </section>

          <section
            aria-labelledby="ownership-heading"
            className="mt-20 space-y-6"
          >
            <h2
              className="font-medium text-2xl tracking-tighter"
              id="ownership-heading"
            >
              {nakafaGrowthCaseStudy.ownershipHeading}
            </h2>
            <div className="space-y-8">
              {nakafaGrowthCaseStudy.ownership.map((step) => (
                <CaseStudyStep key={step.title} {...step} />
              ))}
            </div>
          </section>

          <section aria-labelledby="trend-heading" className="mt-20 space-y-8">
            <div className="space-y-3">
              <h2
                className="font-medium text-2xl tracking-tighter"
                id="trend-heading"
              >
                {nakafaGrowthCaseStudy.trend.heading}
              </h2>
              <p className="text-pretty text-muted-foreground leading-relaxed">
                {nakafaGrowthCaseStudy.trend.description}
              </p>
            </div>
            <NakafaOrganicGrowthChart />
          </section>

          <section aria-labelledby="ai-heading" className="mt-20 space-y-4">
            <h2
              className="font-medium text-2xl tracking-tighter"
              id="ai-heading"
            >
              {nakafaGrowthCaseStudy.googleAi.heading}
            </h2>
            <p className="text-pretty text-muted-foreground leading-relaxed">
              {nakafaGrowthCaseStudy.googleAi.description}
            </p>
          </section>

          <section
            aria-labelledby="supporting-heading"
            className="mt-20 space-y-4"
          >
            <h2
              className="font-medium text-2xl tracking-tighter"
              id="supporting-heading"
            >
              {nakafaGrowthCaseStudy.postHog.heading}
            </h2>
            <p className="text-pretty text-muted-foreground leading-relaxed">
              {nakafaGrowthCaseStudy.postHog.description}
            </p>
          </section>

          <section aria-labelledby="limits-heading" className="mt-20 space-y-4">
            <h2
              className="font-medium text-2xl tracking-tighter"
              id="limits-heading"
            >
              {nakafaGrowthCaseStudy.evidenceLimits.heading}
            </h2>
            <p className="text-pretty text-muted-foreground leading-relaxed">
              {nakafaGrowthCaseStudy.evidenceLimits.paragraphs[0]}
            </p>
            <p className="text-pretty text-muted-foreground leading-relaxed">
              {nakafaGrowthCaseStudy.evidenceLimits.paragraphs[1]}
            </p>
          </section>

          <section
            aria-labelledby="client-value-heading"
            className="mt-20 space-y-4"
          >
            <p className="font-medium text-primary text-sm">
              {nakafaGrowthCaseStudy.clientValue.eyebrow}
            </p>
            <h2
              className="text-balance font-medium text-2xl tracking-tighter"
              id="client-value-heading"
            >
              {nakafaGrowthCaseStudy.clientValue.heading}
            </h2>
            <p className="text-pretty text-muted-foreground leading-relaxed">
              {nakafaGrowthCaseStudy.clientValue.description}
            </p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
              <a
                className={buttonVariants({
                  className: "w-full sm:w-fit",
                })}
                href={CONTACT_HREF}
              >
                <HugeIcons icon={Mail01Icon} />
                {nakafaGrowthCaseStudy.clientValue.primaryActionLabel}
              </a>
              <Link
                className={buttonVariants({
                  className: "w-full sm:w-fit",
                  variant: "ghost",
                })}
                href={COLLABORATE_HREF}
              >
                {nakafaGrowthCaseStudy.clientValue.secondaryActionLabel}
              </Link>
            </div>
          </section>

          <p className="mt-20 text-pretty text-muted-foreground text-sm leading-relaxed">
            {nakafaGrowthCaseStudy.evidenceSnapshot}
          </p>
        </div>
      </article>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <dt className="order-2 mt-1 text-muted-foreground text-sm">{label}</dt>
      <dd className="order-1 font-medium text-2xl tracking-tight">{value}</dd>
    </div>
  );
}

function CaseStudyStep({
  description,
  title,
}: {
  description: string;
  title: string;
}) {
  return (
    <section className="space-y-2">
      <h3 className="font-medium text-lg tracking-tight">{title}</h3>
      <p className="text-pretty text-muted-foreground leading-relaxed">
        {description}
      </p>
    </section>
  );
}
