export const CASE_SLUGS = {
  aksara: "aksara-system",
  growth: "nakafa-growth",
  nina: "nina-tutor",
  strategy: "strategy-console",
} as const;

export type CaseSlug = (typeof CASE_SLUGS)[keyof typeof CASE_SLUGS];

const caseSlugSet = new Set<string>(Object.values(CASE_SLUGS));

export function isCaseSlug(value: string): value is CaseSlug {
  return caseSlugSet.has(value);
}
