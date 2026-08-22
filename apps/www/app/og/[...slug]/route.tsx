import type { NextRequest } from "next/server";
import { caseStudies, getCaseStudy } from "@/lib/cases";
import { generateSocialImage } from "@/lib/og";
import { createCaseSocialCard, getSocialCard, socialCards } from "@/lib/social";

export function generateStaticParams() {
  return [
    ...socialCards.map((card) => [...card.path, "image.png"]),
    ...caseStudies.map((study) => ["work", study.slug, "image.png"]),
  ].map((slug) => ({ slug }));
}

export async function GET(
  _request: NextRequest,
  context: RouteContext<"/og/[...slug]">
) {
  const { slug } = await context.params;
  const study = slug[0] === "work" ? getCaseStudy(slug[1] ?? "") : undefined;
  const card = study ? createCaseSocialCard(study) : getSocialCard(slug);

  if (!card) {
    return new Response("Social image not found", { status: 404 });
  }

  return await generateSocialImage(card);
}
