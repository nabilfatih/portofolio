import { ArrowRight02Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import { HugeIcons } from "@repo/design-system/components/ui/huge-icons";
import { Particles } from "@repo/design-system/components/ui/particles";
import { buttonVariants } from "@repo/design-system/lib/button";
import { Effect, Option } from "effect";
import Image from "next/image";
import Link from "next/link";
import { GitHubContributions } from "@/components/home/github-contributions";
import { COLLABORATE_HREF } from "@/lib/collaboration";
import {
  GitHubContributionSourceLive,
  getGitHubContributionSummary,
} from "@/lib/github";
import {
  NAKAFA_GROWTH_CASE_STUDY_HREF,
  nakafaGrowthEvidence,
  nakafaGrowthSummary,
} from "@/lib/nakafa-growth";
import { CONTACT_HREF, collaborationCta } from "@/lib/site";
import nabilCat from "@/public/nabil-cat.webp";
import nabilLake from "@/public/nabil-lake.webp";
import nabilMountain from "@/public/nabil-mountain.webp";
import nabilSwiss from "@/public/nabil-swiss.webp";
import nabilUlm from "@/public/nabil-ulm.webp";
import sunset from "@/public/sunset.webp";

const compactMetricFormatter = new Intl.NumberFormat("en", {
  maximumFractionDigits: 2,
  notation: "compact",
});

const profileImages = [
  {
    alt: "Nabil at Eibsee in Bavaria, Germany",
    className: "mb-4 h-64",
    imageClassName: "object-cover",
    src: nabilMountain,
  },
  {
    alt: "Nabil in Ulm, Germany",
    className: "mb-4 h-80 sm:mb-0",
    imageClassName: "object-cover",
    src: nabilUlm,
  },
  {
    alt: "Nabil with his cat Floki at Eibsee, Germany",
    className: "h-64 sm:mb-4 sm:h-80",
    imageClassName: "object-cover object-top sm:object-center",
    src: nabilCat,
  },
  {
    alt: "Nabil sitting on a quiet road in Grindelwald, Switzerland",
    className: "mb-4 h-64 sm:mb-0",
    imageClassName: "object-cover",
    src: nabilSwiss,
  },
  {
    alt: "Nabil by a lake in Interlaken, Switzerland",
    className: "mb-4 h-64",
    imageClassName: "object-cover",
    src: nabilLake,
  },
  {
    alt: "Sunset at Eibsee, Germany",
    className: "h-80",
    imageClassName: "object-cover",
    src: sunset,
  },
] as const;

export default async function Home() {
  const githubContributionSummary = Option.getOrNull(
    await Effect.runPromise(
      getGitHubContributionSummary().pipe(
        Effect.provide(GitHubContributionSourceLive),
        Effect.option
      )
    )
  );

  return (
    <div className="relative">
      <Particles
        className="pointer-events-none absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <section className="py-24">
        <div className="mx-auto max-w-2xl px-4">
          <h1 className="mb-8 font-medium text-2xl tracking-tighter">
            hey, I&apos;m Nabil 👋
          </h1>

          <p className="prose max-w-none break-words leading-relaxed">
            I&apos;m a product engineer who takes software from idea to
            production. I build web products and the APIs, data workflows,
            internal tools, and applied AI behind them. Read more about{" "}
            <Link
              className="text-primary underline-offset-4 hover:underline"
              href="/work"
            >
              my work
            </Link>{" "}
            or visit{" "}
            <a
              className="text-primary underline-offset-4 hover:underline"
              href="https://nakafa.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              Nakafa
            </a>
            , the source-available learning platform I started. Outside work, I
            love Maine Coon cats, traveling, and being with my{" "}
            <a
              className="text-primary underline-offset-4 hover:underline"
              href="https://instagram.com/nisrinahn_"
              rel="noopener noreferrer"
              target="_blank"
            >
              lovely person
            </a>
            .
          </p>

          {githubContributionSummary ? (
            <GitHubContributions summary={githubContributionSummary} />
          ) : null}

          <div className="my-8 columns-2 gap-4 sm:columns-3">
            {profileImages.map((image, index) => (
              <div className={`relative ${image.className}`} key={image.alt}>
                <Image
                  alt={image.alt}
                  className={`h-full w-full rounded-xl border bg-muted/90 shadow ${image.imageClassName}`}
                  preload={index < 3}
                  sizes="(max-width: 639px) calc((100vw - 3rem) / 2), 213px"
                  src={image.src}
                />
              </div>
            ))}
          </div>

          <section
            aria-labelledby="selected-work-heading"
            className="mt-16 py-12"
          >
            <div className="space-y-3">
              <p className="font-medium text-primary text-sm">
                {nakafaGrowthSummary.eyebrow}
              </p>
              <h2
                className="text-balance font-medium text-2xl tracking-tighter"
                id="selected-work-heading"
              >
                {nakafaGrowthSummary.heading}
              </h2>
              <p className="text-pretty text-muted-foreground leading-relaxed">
                {nakafaGrowthSummary.description}
              </p>
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
              <div className="flex flex-col">
                <dt className="order-2 mt-1 text-muted-foreground text-sm">
                  organic clicks
                </dt>
                <dd className="order-1 font-medium text-2xl tracking-tight">
                  {nakafaGrowthEvidence.searchConsole.clicks.toLocaleString(
                    "en"
                  )}
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="order-2 mt-1 text-muted-foreground text-sm">
                  search impressions
                </dt>
                <dd className="order-1 font-medium text-2xl tracking-tight">
                  {compactMetricFormatter.format(
                    nakafaGrowthEvidence.searchConsole.impressions
                  )}
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="order-2 mt-1 text-muted-foreground text-sm">
                  Google AI impressions
                </dt>
                <dd className="order-1 font-medium text-2xl tracking-tight">
                  {compactMetricFormatter.format(
                    nakafaGrowthEvidence.googleAi.impressions
                  )}
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                className={buttonVariants({
                  className: "w-full sm:w-fit",
                })}
                href={NAKAFA_GROWTH_CASE_STUDY_HREF}
              >
                Read the case study
                <HugeIcons data-icon="inline-end" icon={ArrowRight02Icon} />
              </Link>
              <Link
                className={buttonVariants({
                  className: "w-full sm:w-fit",
                  variant: "ghost",
                })}
                href={COLLABORATE_HREF}
              >
                See how I can help
              </Link>
            </div>
          </section>

          <section
            aria-labelledby="collaboration-heading"
            className="mt-16 py-12"
          >
            <div className="space-y-3">
              <p className="font-medium text-primary text-sm">
                {collaborationCta.eyebrow}
              </p>
              <h2
                className="text-balance font-medium text-2xl tracking-tighter"
                id="collaboration-heading"
              >
                {collaborationCta.heading}
              </h2>
              <p className="text-pretty text-muted-foreground leading-relaxed">
                {collaborationCta.description}
              </p>
            </div>
            <a
              className={buttonVariants({
                className: "mt-6 w-full sm:w-fit",
              })}
              href={CONTACT_HREF}
            >
              <HugeIcons data-icon="inline-start" icon={Mail01Icon} />
              {collaborationCta.actionLabel}
            </a>
          </section>
        </div>
      </section>
    </div>
  );
}
