import { ArrowRight02Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import { HugeIcons } from "@repo/design-system/components/ui/huge-icons";
import { Particles } from "@repo/design-system/components/ui/particles";
import { buttonVariants } from "@repo/design-system/lib/button";
import type { Metadata } from "next";
import Link from "next/link";
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
  nakafaGrowthEvidence,
} from "@/lib/nakafa-growth";
import { CONTACT_HREF, SOCIAL_IMAGE } from "@/lib/site";

const COLLABORATE_DESCRIPTION =
  "Work with Nabil Fatih on product engineering, growth systems, and applied AI as a contractor or B2B partner.";

const compactMetricFormatter = new Intl.NumberFormat("en", {
  maximumFractionDigits: 2,
  notation: "compact",
});

export const metadata: Metadata = {
  alternates: {
    canonical: "/collaborate",
    types: {
      "text/markdown": "/collaborate.md",
    },
  },
  description: COLLABORATE_DESCRIPTION,
  openGraph: {
    description: COLLABORATE_DESCRIPTION,
    images: [SOCIAL_IMAGE],
    title: "Collaborate with Nabil Fatih",
    url: "/collaborate",
  },
  title: "Collaborate",
  twitter: {
    card: "summary_large_image",
    description: COLLABORATE_DESCRIPTION,
    images: [SOCIAL_IMAGE.url],
    title: "Collaborate with Nabil Fatih",
  },
};

export const revalidate = 3600;

export default function CollaboratePage() {
  return (
    <div className="relative">
      <Particles
        className="pointer-events-none absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <article className="py-24">
        <div className="mx-auto max-w-3xl px-4">
          <header className="flex max-w-2xl flex-col gap-4">
            <p className="font-medium text-primary text-sm">
              {collaborationPage.eyebrow}
            </p>
            <h1 className="text-balance font-medium text-3xl tracking-tighter">
              {collaborationPage.heading}
            </h1>
            <p className="text-pretty text-muted-foreground leading-relaxed">
              {collaborationPage.description}
            </p>
            <a
              className={buttonVariants({
                className: "mt-2 w-full sm:w-fit",
              })}
              href={CONTACT_HREF}
            >
              <HugeIcons data-icon="inline-start" icon={Mail01Icon} />
              Discuss a project
            </a>
          </header>

          <section aria-labelledby="capabilities-heading" className="mt-20">
            <h2
              className="font-medium text-2xl tracking-tighter"
              id="capabilities-heading"
            >
              {collaborationPage.capabilitiesHeading}
            </h2>
            <ul className="mt-8 flex flex-col gap-10">
              {collaborationCapabilities.map((capability) => (
                <li
                  className="grid gap-3 sm:grid-cols-[12rem_1fr] sm:gap-8"
                  key={capability.title}
                >
                  <h3 className="font-medium text-xl tracking-tight">
                    {capability.title}
                  </h3>
                  <div>
                    <p className="text-pretty text-muted-foreground text-sm leading-relaxed">
                      {capability.description}
                    </p>
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm">
                      {capability.examples.map((example) => (
                        <li key={example}>{example}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="loop-heading" className="mt-20">
            <div className="flex max-w-2xl flex-col gap-3">
              <p className="font-medium text-primary text-sm">
                {collaborationLoop.eyebrow}
              </p>
              <h2
                className="text-balance font-medium text-2xl tracking-tighter"
                id="loop-heading"
              >
                {collaborationLoop.heading}
              </h2>
              <p className="text-pretty text-muted-foreground leading-relaxed">
                {collaborationLoop.description}
              </p>
            </div>
            <ol className="mt-8 grid gap-3 sm:grid-cols-2">
              {collaborationLoop.steps.map((step, index) => (
                <li
                  className="flex flex-col gap-4 rounded-xl bg-muted/50 p-4"
                  key={step.title}
                >
                  <span className="text-muted-foreground text-sm tabular-nums">
                    {index + 1}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-medium text-sm">{step.title}</h3>
                    <p className="text-pretty text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section
            aria-labelledby="proof-heading"
            className="mt-20 rounded-2xl bg-muted/40 p-5 sm:p-8"
          >
            <div className="flex max-w-2xl flex-col gap-4">
              <p className="font-medium text-primary text-sm">
                {collaborationProof.eyebrow}
              </p>
              <h2
                className="text-balance font-medium text-2xl tracking-tighter"
                id="proof-heading"
              >
                {collaborationProof.heading}
              </h2>
              <p className="text-pretty text-muted-foreground leading-relaxed">
                {collaborationProof.description}
              </p>
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
              <Metric
                label="organic clicks"
                value={nakafaGrowthEvidence.searchConsole.clicks.toLocaleString(
                  "en"
                )}
              />
              <Metric
                label="search impressions"
                value={compactMetricFormatter.format(
                  nakafaGrowthEvidence.searchConsole.impressions
                )}
              />
              <Metric
                label="Google AI impressions"
                value={compactMetricFormatter.format(
                  nakafaGrowthEvidence.googleAi.impressions
                )}
              />
            </dl>

            <Link
              className={buttonVariants({
                className: "mt-10 w-full sm:w-fit",
              })}
              href={NAKAFA_GROWTH_CASE_STUDY_HREF}
            >
              {collaborationProof.actionLabel}
              <HugeIcons data-icon="inline-end" icon={ArrowRight02Icon} />
            </Link>
          </section>

          <section
            aria-labelledby="working-model-heading"
            className="mt-20 max-w-2xl"
          >
            <h2
              className="font-medium text-2xl tracking-tighter"
              id="working-model-heading"
            >
              {collaborationPage.workingModelHeading}
            </h2>
            <ul className="mt-6 list-disc space-y-4 pl-5 text-muted-foreground">
              {collaborationWorkingModel.map((item) => (
                <li className="pl-1" key={item}>
                  <p className="text-pretty leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="contact-heading"
            className="mt-20 flex max-w-2xl flex-col gap-4"
          >
            <h2
              className="text-balance font-medium text-2xl tracking-tighter"
              id="contact-heading"
            >
              {collaborationContact.heading}
            </h2>
            <p className="text-pretty text-muted-foreground leading-relaxed">
              {collaborationContact.description}
            </p>
            <a
              className={buttonVariants({
                className: "w-full sm:w-fit",
              })}
              href={CONTACT_HREF}
            >
              <HugeIcons data-icon="inline-start" icon={Mail01Icon} />
              {collaborationContact.actionLabel}
            </a>
          </section>
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
