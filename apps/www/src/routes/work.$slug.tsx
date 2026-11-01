import { Particles } from "@repo/design-system/components/ui/particles";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { getCaseStudy } from "@/lib/cases";
import { pageHead } from "@/lib/head";
import { serializeJsonLd } from "@/lib/json-ld";
import { SITE_URL, siteConfig } from "@/lib/site";
import { createSocialImage } from "@/lib/social";

export const Route = createFileRoute("/work/$slug")({
  component: CaseStudyPage,
  head: ({ params }) => {
    const study = getCaseStudy(params.slug);

    if (!study) {
      return {};
    }

    return pageHead({
      description: study.description,
      image: createSocialImage(
        ["work", study.slug],
        `${study.title}, a ${study.discipline.toLowerCase()} case study by Nabil Fatih.`
      ),
      markdownPath: study.markdownHref,
      path: study.href,
      socialTitle: study.title,
      title: study.title,
      type: "article",
    });
  },
  loader: ({ params }) => {
    if (!getCaseStudy(params.slug)) {
      throw notFound();
    }
  },
});

function CaseStudyPage() {
  const { slug } = Route.useParams();
  const study = getCaseStudy(slug);

  if (!study) {
    return null;
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
    <div className="relative">
      <Particles
        className="pointer-events-none absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
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
    </div>
  );
}
