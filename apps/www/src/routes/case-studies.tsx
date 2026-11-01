import { Particles } from "@repo/design-system/components/ui/particles";
import { createFileRoute } from "@tanstack/react-router";
import CaseStudiesContent from "@/content/case-studies/index.mdx";
import { caseStudies } from "@/lib/cases";
import { pageHead } from "@/lib/head";
import { serializeJsonLd } from "@/lib/json-ld";
import { SITE_URL } from "@/lib/site";
import { createSocialImage } from "@/lib/social";

const CASE_STUDIES_DESCRIPTION =
  "Technical case studies from Nabil Fatih across product engineering, applied AI, platform systems, and growth engineering.";
const CASE_STUDIES_IMAGE = createSocialImage(
  ["case-studies"],
  "Technical case studies from Nabil Fatih across product engineering, applied AI, platform systems, and growth."
);

export const Route = createFileRoute("/case-studies")({
  component: CaseStudiesPage,
  head: () =>
    pageHead({
      description: CASE_STUDIES_DESCRIPTION,
      image: CASE_STUDIES_IMAGE,
      markdownPath: "/case-studies.md",
      path: "/case-studies",
      socialTitle: "Technical case studies | Nabil Fatih",
      title: "Technical case studies",
    }),
});

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  description: CASE_STUDIES_DESCRIPTION,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: caseStudies.map((study, index) => ({
      "@type": "ListItem",
      item: {
        "@type": "Article",
        headline: study.title,
        url: `${SITE_URL}${study.href}`,
      },
      position: index + 1,
    })),
  },
  name: "Technical case studies",
  url: `${SITE_URL}/case-studies`,
};

function CaseStudiesPage() {
  return (
    <div className="relative">
      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is serialized from trusted local metadata and escapes HTML delimiters.
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(structuredData),
        }}
        type="application/ld+json"
      />
      <Particles
        className="pointer-events-none absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <section className="py-24">
        <div className="mx-auto max-w-2xl px-4">
          <CaseStudiesContent />
        </div>
      </section>
    </div>
  );
}
