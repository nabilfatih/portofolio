import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/design-system/components/ui/avatar";
import { Particles } from "@repo/design-system/components/ui/particles";
import { Separator } from "@repo/design-system/components/ui/separator";
import type { Metadata } from "next";
import { Fragment } from "react";
import { SOCIAL_IMAGE } from "@/lib/site";
import { educationEntry, workEntries } from "@/lib/work";

const WORK_DESCRIPTION =
  "Nabil Fatih's work across full-stack products, internal tools, data workflows, and applied AI.";

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
              I build software from early product ideas through production. Here
              are the products and systems I&apos;ve worked on.
            </p>

            {workEntries.map((entry) => (
              <Fragment key={entry.company}>
                <Separator className="my-8" />
                <article>
                  <div className="not-prose flex items-center gap-3">
                    <Avatar aria-hidden="true" size="lg">
                      <AvatarImage
                        alt=""
                        className="bg-white object-contain p-1"
                        src={entry.logo}
                      />
                      <AvatarFallback>{entry.logoFallback}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <h2 className="font-medium text-xl tracking-tighter">
                        <a
                          className="underline-offset-4 hover:underline"
                          href={entry.companyUrl}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {entry.company}
                        </a>
                      </h2>
                      <p className="text-muted-foreground text-sm">
                        {entry.role}, {entry.period}
                      </p>
                    </div>
                  </div>
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
              <div className="not-prose flex items-center gap-3">
                <Avatar aria-hidden="true" size="lg">
                  <AvatarImage
                    alt=""
                    className="bg-white object-contain p-1"
                    src={educationEntry.logo}
                  />
                  <AvatarFallback>{educationEntry.logoFallback}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <h2
                    className="font-medium text-xl tracking-tighter"
                    id="education-heading"
                  >
                    <a
                      className="underline-offset-4 hover:underline"
                      href={educationEntry.institutionUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {educationEntry.institution}
                    </a>
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    {educationEntry.program}
                  </p>
                </div>
              </div>
              <ul>
                {educationEntry.summary.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
