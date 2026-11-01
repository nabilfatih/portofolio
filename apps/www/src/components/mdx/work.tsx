import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/design-system/components/ui/avatar";
import type { ReactNode } from "react";

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
