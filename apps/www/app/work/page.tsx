import { Particles } from "@repo/design-system/components/ui/particles";
import type { Metadata } from "next";
import WorkContent from "@/content/work/index.mdx";
import { serializeJsonLd } from "@/lib/json-ld";
import { SITE_URL, siteConfig } from "@/lib/site";
import { createSocialImage } from "@/lib/social";

const WORK_DESCRIPTION =
  "Professional experience and education from Nabil Fatih across product engineering, applied AI, platform systems, internal tools, data workflows, and growth.";
const WORK_IMAGE = createSocialImage(
  ["work"],
  "Nabil Fatih's professional experience across product engineering, applied AI, platform systems, and growth."
);

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
    images: [WORK_IMAGE],
    title: "Work experience | Nabil Fatih",
    url: "/work",
  },
  title: "Work experience",
  twitter: {
    card: "summary_large_image",
    description: WORK_DESCRIPTION,
    images: [WORK_IMAGE.url],
    title: "Work experience | Nabil Fatih",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  description: WORK_DESCRIPTION,
  mainEntity: {
    "@type": "Person",
    jobTitle: "Product Engineer",
    knowsAbout: [
      "Product engineering",
      "Applied AI",
      "Platform systems",
      "Data workflows",
      "Growth engineering",
    ],
    name: siteConfig.name,
    url: SITE_URL,
  },
  name: "Work experience",
  url: `${SITE_URL}/work`,
};

export default function WorkPage() {
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
