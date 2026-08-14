import { Particles } from "@repo/design-system/components/ui/particles";
import type { Metadata } from "next";
import CollaborateContent from "@/content/collaborate.mdx";
import { SOCIAL_IMAGE } from "@/lib/site";

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

export default function CollaboratePage() {
  return (
    <div className="relative">
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
