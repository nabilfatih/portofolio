import { Particles } from "@repo/design-system/components/ui/particles";
import type { Metadata } from "next";
import GrowthContent from "@/content/growth.mdx";
import { NAKAFA_GROWTH_MARKDOWN_HREF } from "@/lib/nakafa-growth";
import { SOCIAL_IMAGE } from "@/lib/site";

const CASE_STUDY_DESCRIPTION =
  "How Nabil Fatih built Nakafa's product, technical SEO, content system, and measurement into one organic growth loop, with verified results.";

export const metadata: Metadata = {
  alternates: {
    canonical: "/work/nakafa-organic-growth",
    types: {
      "text/markdown": NAKAFA_GROWTH_MARKDOWN_HREF,
    },
  },
  description: CASE_STUDY_DESCRIPTION,
  openGraph: {
    description: CASE_STUDY_DESCRIPTION,
    images: [SOCIAL_IMAGE],
    title: "Nakafa organic growth case study",
    url: "/work/nakafa-organic-growth",
  },
  title: "Nakafa organic growth case study",
  twitter: {
    card: "summary_large_image",
    description: CASE_STUDY_DESCRIPTION,
    images: [SOCIAL_IMAGE.url],
    title: "Nakafa organic growth case study",
  },
};

export default function NakafaOrganicGrowthPage() {
  return (
    <div className="relative">
      <Particles
        className="pointer-events-none absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <article className="py-24">
        <div className="mx-auto max-w-2xl px-4">
          <GrowthContent />
        </div>
      </article>
    </div>
  );
}
