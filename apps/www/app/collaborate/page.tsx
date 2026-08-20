import { Particles } from "@repo/design-system/components/ui/particles";
import type { Metadata } from "next";
import CollaborateContent from "@/content/collaborate.mdx";
import { serializeJsonLd } from "@/lib/json-ld";
import { SITE_URL, SOCIAL_IMAGE, siteConfig } from "@/lib/site";

const COLLABORATE_DESCRIPTION =
  "Work with Nabil Fatih as a contractor or B2B partner on product engineering, organic growth systems, internal tools, and applied AI.";

export const metadata: Metadata = {
  alternates: {
    canonical: "/collaborate",
    types: {
      "text/markdown": "/collaborate.md",
    },
  },
  description: COLLABORATE_DESCRIPTION,
  openGraph: {
    description: COLLABORATE_DESCRIPTION,
    images: [SOCIAL_IMAGE],
    title: "Collaborate with Nabil Fatih",
    url: "/collaborate",
  },
  title: "Product and growth collaboration",
  twitter: {
    card: "summary_large_image",
    description: COLLABORATE_DESCRIPTION,
    images: [SOCIAL_IMAGE.url],
    title: "Collaborate with Nabil Fatih",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  description: COLLABORATE_DESCRIPTION,
  mainEntity: {
    "@type": "Service",
    name: "Product engineering collaboration",
    provider: {
      "@type": "Person",
      name: siteConfig.name,
      url: SITE_URL,
    },
    serviceType: [
      "Product engineering",
      "Applied AI systems",
      "Growth engineering",
    ],
  },
  name: "Collaborate with Nabil Fatih",
  url: `${SITE_URL}/collaborate`,
};

export default function CollaboratePage() {
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
      <article className="py-24">
        <div className="mx-auto max-w-2xl px-4">
          <CollaborateContent />
        </div>
      </article>
    </div>
  );
}
