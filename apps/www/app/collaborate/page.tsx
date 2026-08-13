import { Mail01Icon } from "@hugeicons/core-free-icons";
import { HugeIcons } from "@repo/design-system/components/ui/huge-icons";
import { Particles } from "@repo/design-system/components/ui/particles";
import { buttonVariants } from "@repo/design-system/lib/button";
import type { Metadata } from "next";
import Link from "next/link";
import {
  collaborationCapabilities,
  collaborationContact,
  collaborationPage,
  collaborationProof,
  collaborationWorkingModel,
} from "@/lib/collaboration";
import { NAKAFA_GROWTH_CASE_STUDY_HREF } from "@/lib/nakafa-growth";
import { CONTACT_HREF, SOCIAL_IMAGE } from "@/lib/site";

const COLLABORATE_DESCRIPTION =
  "Work with Nabil Fatih on product engineering, growth systems, and applied AI as a contractor or B2B partner.";

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
        <div className="mx-auto max-w-2xl px-4">
          <header className="space-y-4">
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
              <HugeIcons icon={Mail01Icon} />
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
            <div className="mt-8 space-y-12">
              {collaborationCapabilities.map((capability) => (
                <section className="space-y-3" key={capability.title}>
                  <h3 className="font-medium text-xl tracking-tight">
                    {capability.title}
                  </h3>
                  <p className="text-pretty text-muted-foreground leading-relaxed">
                    {capability.description}
                  </p>
                  <ul className="grid gap-2 text-sm sm:grid-cols-2">
                    {capability.examples.map((example) => (
                      <li key={example}>{example}</li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </section>

          <section aria-labelledby="proof-heading" className="mt-20 space-y-4">
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
            <Link
              className="inline-flex font-medium text-primary underline-offset-4 hover:underline"
              href={NAKAFA_GROWTH_CASE_STUDY_HREF}
            >
              {collaborationProof.actionLabel}
            </Link>
          </section>

          <section
            aria-labelledby="working-model-heading"
            className="mt-20 space-y-4"
          >
            <h2
              className="font-medium text-2xl tracking-tighter"
              id="working-model-heading"
            >
              {collaborationPage.workingModelHeading}
            </h2>
            <ul className="space-y-3 text-pretty text-muted-foreground leading-relaxed">
              {collaborationWorkingModel.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="contact-heading"
            className="mt-20 space-y-4"
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
              <HugeIcons icon={Mail01Icon} />
              {collaborationContact.actionLabel}
            </a>
          </section>
        </div>
      </article>
    </div>
  );
}
