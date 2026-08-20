import type { MDXContent } from "mdx/types";
import AksaraContent, {
  caseStudy as aksaraMetadata,
} from "@/content/work/aksara.mdx";
import GrowthContent, {
  caseStudy as growthMetadata,
} from "@/content/work/growth.mdx";
import NinaContent, {
  caseStudy as ninaMetadata,
} from "@/content/work/nina.mdx";
import StrategyContent, {
  caseStudy as strategyMetadata,
} from "@/content/work/strategy.mdx";
import type { CaseSlug } from "@/lib/case-slugs";

export interface CaseStudyMetadata {
  company: string;
  description: string;
  discipline: string;
  slug: CaseSlug;
  title: string;
}

export interface CaseStudy extends CaseStudyMetadata {
  content: MDXContent;
  href: `/work/${CaseSlug}`;
  markdownHref: `/work/${CaseSlug}.md`;
}

function defineCaseStudy(
  metadata: CaseStudyMetadata,
  content: MDXContent
): CaseStudy {
  return {
    ...metadata,
    content,
    href: `/work/${metadata.slug}`,
    markdownHref: `/work/${metadata.slug}.md`,
  };
}

export const caseStudies = [
  defineCaseStudy(strategyMetadata, StrategyContent),
  defineCaseStudy(ninaMetadata, NinaContent),
  defineCaseStudy(aksaraMetadata, AksaraContent),
  defineCaseStudy(growthMetadata, GrowthContent),
] as const satisfies readonly CaseStudy[];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
