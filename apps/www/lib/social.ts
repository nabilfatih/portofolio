export const SOCIAL_IMAGE_SIZE = {
  height: 630,
  width: 1200,
} as const;

export interface SocialCard {
  description: string;
  path: readonly string[];
  title: string;
}

export const socialCards = [
  {
    description:
      "Product, applied AI, platforms, and growth, connected from decision to production.",
    path: ["home"],
    title: "From unclear idea to working system.",
  },
  {
    description:
      "The experience behind the products, AI systems, platforms, and growth work.",
    path: ["work"],
    title: "Hands-on ownership across the whole system.",
  },
  {
    description:
      "The problem, the decisions, the implementation, and the evidence behind each result.",
    path: ["case-studies"],
    title: "A closer look at how the work was built.",
  },
  {
    description:
      "Contract and B2B support for product engineering, applied AI, platforms, and growth.",
    path: ["collaborate"],
    title: "Bring the problem. I’ll help build the system.",
  },
  {
    description:
      "A plain-language account of analytics, performance measurement, and data handling.",
    path: ["privacy"],
    title: "Clear about what this portfolio measures.",
  },
] as const satisfies readonly SocialCard[];

function normalizeSocialPath(path: readonly string[]) {
  if (path.at(-1) === "image.png") {
    return path.slice(0, -1);
  }

  return [...path];
}

export function getSocialCard(path: readonly string[]) {
  const key = normalizeSocialPath(path).join("/");
  return socialCards.find((card) => card.path.join("/") === key);
}

export function createCaseSocialCard(study: {
  description: string;
  slug: string;
  title: string;
}): SocialCard {
  return {
    description: study.description,
    path: ["work", study.slug],
    title: study.title,
  };
}

export function createSocialImage(path: readonly string[], alt: string) {
  return {
    alt,
    height: SOCIAL_IMAGE_SIZE.height,
    type: "image/png",
    url: `/og/${path.join("/")}/image.png`,
    width: SOCIAL_IMAGE_SIZE.width,
  } as const;
}
