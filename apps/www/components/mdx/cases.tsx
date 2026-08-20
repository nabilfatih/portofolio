import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/design-system/components/ui/avatar";
import { Badge } from "@repo/design-system/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
import { HugeIcons } from "@repo/design-system/components/ui/huge-icons";
import { buttonVariants } from "@repo/design-system/lib/button";
import { cn } from "@repo/design-system/lib/utils";
import Link from "next/link";
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
      <BackLink href="/case-studies">All case studies</BackLink>
      <Eyebrow>{eyebrow}</Eyebrow>
      <PageTitle>{metadata.title}</PageTitle>
      <p className="text-pretty text-foreground/80 leading-relaxed">
        {metadata.description}
      </p>
    </PageHeader>
  );
}

export function CaseStudies({
  headingLevel = 3,
  limit,
}: {
  readonly headingLevel?: 2 | 3;
  readonly limit?: number;
}) {
  const studies =
    limit === undefined ? caseStudies : caseStudies.slice(0, limit);
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <ul className="not-prose mt-8 grid min-w-0 gap-3 sm:grid-cols-2">
      {studies.map((study) => (
        <li className="min-w-0" key={study.slug}>
          <Card className="group h-full min-w-0 bg-muted/50 shadow-none ring-0">
            <CardHeader className="min-w-0 gap-4">
              <div className="flex min-w-0 items-center justify-between gap-3">
                <Badge variant="secondary">{study.discipline}</Badge>
                <div className="shrink-0">
                  <Avatar aria-hidden="true" size="sm">
                    <AvatarImage
                      alt=""
                      className="bg-white object-contain p-0.5"
                      src={study.logo}
                    />
                    <AvatarFallback>{study.company.slice(0, 1)}</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">{study.company}</span>
                </div>
              </div>
              <CardTitle>
                <Heading className="text-balance text-lg tracking-tight">
                  {study.title}
                </Heading>
              </CardTitle>
            </CardHeader>
            <CardContent className="min-w-0 flex-1">
              <p className="text-pretty break-words text-foreground/80 leading-relaxed">
                {study.description}
              </p>
            </CardContent>
            <CardFooter>
              <Link
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "-ml-3 max-w-full text-primary"
                )}
                href={study.href}
                prefetch={true}
              >
                <span className="truncate">Read the case study</span>
                <HugeIcons
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  icon={ArrowRight02Icon}
                />
              </Link>
            </CardFooter>
          </Card>
        </li>
      ))}
    </ul>
  );
}
