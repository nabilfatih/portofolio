import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/design-system/components/ui/avatar";
import { Badge } from "@repo/design-system/components/ui/badge";
import { HugeIcons } from "@repo/design-system/components/ui/huge-icons";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  BackLink,
  Eyebrow,
  PageHeader,
  PageTitle,
} from "@/components/mdx/content";
import type { CaseStudyMetadata } from "@/lib/cases";
import { caseStudies } from "@/lib/cases";

export function CaseHeader({
  eyebrow,
  metadata,
}: {
  readonly eyebrow: string;
  readonly metadata: CaseStudyMetadata;
}) {
  return (
    <PageHeader>
      <BackLink href="/work">All work</BackLink>
      <Eyebrow>{eyebrow}</Eyebrow>
      <PageTitle>{metadata.title}</PageTitle>
      <p className="text-pretty text-foreground/80 leading-relaxed">
        {metadata.description}
      </p>
    </PageHeader>
  );
}

export function CaseStudies() {
  return (
    <ul className="not-prose mt-8 grid gap-3 sm:grid-cols-2">
      {caseStudies.map((study) => (
        <li key={study.slug}>
          <Link
            className="group flex h-full flex-col rounded-xl bg-muted/50 p-5 transition-colors hover:bg-muted"
            href={study.href}
            prefetch={true}
          >
            <div className="flex items-center justify-between gap-3">
              <Badge variant="secondary">{study.discipline}</Badge>
              <span className="text-muted-foreground text-sm">
                {` at ${study.company}`}
              </span>
            </div>
            <h3 className="mt-5 text-balance font-medium text-lg tracking-tight">
              {study.title}
            </h3>
            <p className="mt-3 text-pretty text-foreground/80 text-sm leading-relaxed">
              {study.description}
            </p>
            <span className="mt-auto flex items-center gap-2 pt-5 text-primary text-sm">
              Read the case study
              <HugeIcons
                className="transition-transform group-hover:translate-x-0.5"
                icon={ArrowRight02Icon}
              />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function ExperienceList({ children }: { readonly children: ReactNode }) {
  return <div className="mt-8 space-y-12">{children}</div>;
}

export function Experience({
  children,
  company,
  companyUrl,
  logo,
  logoFallback,
  period,
  role,
}: {
  readonly children: ReactNode;
  readonly company: string;
  readonly companyUrl: string;
  readonly logo: string;
  readonly logoFallback: string;
  readonly period: string;
  readonly role: string;
}) {
  return (
    <article className="space-y-5">
      <div className="not-prose flex items-center gap-3">
        <Avatar aria-hidden="true" size="lg">
          <AvatarImage
            alt=""
            className="bg-white object-contain p-1"
            src={logo}
          />
          <AvatarFallback>{logoFallback}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <h3 className="font-medium text-lg tracking-tight">
            <a
              className="underline-offset-4 hover:underline"
              href={companyUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {company}
            </a>
          </h3>
          <p className="text-muted-foreground text-sm">
            {role}, {period}
          </p>
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </article>
  );
}

export function Education({
  children,
  institution,
  institutionUrl,
  logo,
  logoFallback,
  program,
}: {
  readonly children: ReactNode;
  readonly institution: string;
  readonly institutionUrl: string;
  readonly logo: string;
  readonly logoFallback: string;
  readonly program: string;
}) {
  return (
    <article className="mt-8 space-y-5">
      <div className="not-prose flex items-center gap-3">
        <Avatar aria-hidden="true" size="lg">
          <AvatarImage
            alt=""
            className="bg-white object-contain p-1"
            src={logo}
          />
          <AvatarFallback>{logoFallback}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <h3 className="font-medium text-lg tracking-tight">
            <a
              className="underline-offset-4 hover:underline"
              href={institutionUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {institution}
            </a>
          </h3>
          <p className="text-muted-foreground text-sm">{program}</p>
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </article>
  );
}
