import { Particles } from "@repo/design-system/components/ui/particles";
import type { Metadata } from "next";
import WorkContent from "@/content/work/index.mdx";
import { caseStudies } from "@/lib/cases";
import { serializeJsonLd } from "@/lib/json-ld";
import { SITE_URL, SOCIAL_IMAGE } from "@/lib/site";

const WORK_DESCRIPTION =
  "Case studies and experience from Nabil Fatih across product engineering, applied AI, platform systems, internal tools, data workflows, and growth.";

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
    title: "Case studies and experience | Nabil Fatih",
    url: "/work",
  },
  title: "Case studies and experience",
  twitter: {
    card: "summary_large_image",
    description: WORK_DESCRIPTION,
    images: [SOCIAL_IMAGE.url],
    title: "Case studies and experience | Nabil Fatih",
  },
};

export default function WorkPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    description: WORK_DESCRIPTION,
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
    name: "Case studies and experience",
    url: `${SITE_URL}/work`,
  };

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
          <WorkContent />
        </div>
      </section>
    </div>
  );
}
