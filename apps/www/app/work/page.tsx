import { Particles } from "@repo/design-system/components/ui/particles";
import { Separator } from "@repo/design-system/components/ui/separator";
import type { Metadata } from "next";
import { Fragment } from "react";
import { SOCIAL_IMAGE } from "@/lib/site";
import { workEntries } from "@/lib/work";

const WORK_DESCRIPTION =
  "A clear look at Nabil Fatih's product engineering work across full-stack systems, applied AI, education products, and enterprise tools.";

export const metadata: Metadata = {
  alternates: {
    canonical: "/work",
    types: {
      "text/markdown": "/work.md",
    },
  },
  description: WORK_DESCRIPTION,
  openGraph: {
    description: WORK_DESCRIPTION,
    images: [SOCIAL_IMAGE],
    title: "Work and Experience | Nabil Fatih",
    url: "/work",
  },
  title: "Work and Experience",
  twitter: {
    card: "summary_large_image",
    description: WORK_DESCRIPTION,
    images: [SOCIAL_IMAGE.url],
    title: "Work and Experience | Nabil Fatih",
  },
};

export default function WorkPage() {
  return (
    <div className="relative">
      <Particles
        className="pointer-events-none absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <section className="py-24">
        <div className="mx-auto max-w-2xl px-4">
          <h1 className="mb-8 font-medium text-2xl tracking-tighter">
            my work ✨
          </h1>

          <div className="prose max-w-none break-words prose-pre:p-0 prose-p:leading-relaxed">
            <p>
              I like building products that make difficult work feel simpler.
              This is what I&apos;ve worked on so far.
            </p>

            {workEntries.map((entry) => (
              <Fragment key={entry.company}>
                <Separator className="my-8" />
                <article>
                  <h2 className="mt-0 mb-1 font-medium text-xl tracking-tighter">
                    {entry.company}
                  </h2>
                  <p className="mt-0 text-muted-foreground text-sm">
                    {entry.role}, {entry.period}
                  </p>
                  <ul>
                    {entry.summary.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </Fragment>
            ))}

            <Separator className="my-8" />
            <section aria-labelledby="education-heading">
              <h2
                className="mt-0 mb-1 font-medium text-xl tracking-tighter"
                id="education-heading"
              >
                OTH Regensburg
              </h2>
              <p className="mt-0 text-muted-foreground text-sm">
                B.Sc. Artificial Intelligence and Data Science, completed Feb
                2025
              </p>
              <p>
                Completed a 210 ECTS degree with a bachelor thesis grade of 1.3.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
