import { Particles } from "@repo/design-system/components/ui/particles";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { caseStudies, getCaseStudy } from "@/lib/cases";
import { serializeJsonLd } from "@/lib/json-ld";
import { SITE_URL, SOCIAL_IMAGE, siteConfig } from "@/lib/site";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  return {
    alternates: {
      canonical: study.href,
      types: {
        "text/markdown": study.markdownHref,
      },
    },
    description: study.description,
    openGraph: {
      description: study.description,
      images: [SOCIAL_IMAGE],
      title: study.title,
      type: "article",
      url: study.href,
    },
    title: study.title,
    twitter: {
      card: "summary_large_image",
      description: study.description,
      images: [SOCIAL_IMAGE.url],
      title: study.title,
    },
  };
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  return (
    <div className="relative">
      <Particles
        className="pointer-events-none absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <Suspense fallback={<CaseStudyFallback />}>
        <CaseStudyContent params={params} />
      </Suspense>
    </div>
  );
}

async function CaseStudyContent({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  const Content = study.content;
  const url = `${SITE_URL}${study.href}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    about: study.discipline,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: SITE_URL,
    },
    description: study.description,
    headline: study.title,
    isPartOf: {
      "@id": `${SITE_URL}/case-studies`,
      "@type": "CollectionPage",
    },
    mainEntityOfPage: url,
    url,
  };

  return (
    <>
      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is serialized from trusted local metadata and escapes HTML delimiters.
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(structuredData),
        }}
        type="application/ld+json"
      />
      <article className="py-24">
        <div className="mx-auto max-w-2xl px-4">
          <Content />
        </div>
      </article>
    </>
  );
}

function CaseStudyFallback() {
  return (
    <article aria-hidden="true" className="py-24">
      <div className="mx-auto max-w-2xl space-y-6 px-4">
        <div className="h-4 w-20 animate-pulse rounded-full bg-muted" />
        <div className="h-9 w-4/5 animate-pulse rounded-lg bg-muted" />
        <div className="space-y-3">
          <div className="h-4 w-full animate-pulse rounded-full bg-muted" />
          <div className="h-4 w-11/12 animate-pulse rounded-full bg-muted" />
        </div>
      </div>
    </article>
  );
}
