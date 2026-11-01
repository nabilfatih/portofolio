import { Particles } from "@repo/design-system/components/ui/particles";
import { createFileRoute } from "@tanstack/react-router";
import CollaborateContent from "@/content/collaborate.mdx";
import { pageHead } from "@/lib/head";
import { serializeJsonLd } from "@/lib/json-ld";
import { SITE_URL, siteConfig } from "@/lib/site";
import { createSocialImage } from "@/lib/social";

const COLLABORATE_DESCRIPTION =
  "Work with Nabil Fatih as a contractor or B2B partner on product engineering, organic growth systems, internal tools, and applied AI.";
const COLLABORATE_IMAGE = createSocialImage(
  ["collaborate"],
  "Work with Nabil Fatih on product engineering, applied AI, platform systems, and growth."
);

export const Route = createFileRoute("/collaborate")({
  component: CollaboratePage,
  head: () =>
    pageHead({
      description: COLLABORATE_DESCRIPTION,
      image: COLLABORATE_IMAGE,
      markdownPath: "/collaborate.md",
      path: "/collaborate",
      socialTitle: "Collaborate with Nabil Fatih",
      title: "Product and growth collaboration",
    }),
});

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

function CollaboratePage() {
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
