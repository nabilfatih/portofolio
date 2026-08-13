export const COLLABORATE_HREF = "/collaborate";

export const collaborationPage = {
  capabilitiesHeading: "Where I can help",
  description:
    "I am available as a contractor or B2B partner for teams that need one person to connect product decisions, implementation, and measurement.",
  eyebrow: "Work with me",
  heading: "I help teams turn product problems into working software.",
  workingModelHeading: "A useful engagement starts with",
} as const;

export const collaborationCapabilities = [
  {
    description:
      "I can own technical SEO, programmatic content systems, localization, search measurement, and the product work needed to support them.",
    examples: [
      "Search and content architecture",
      "Programmatic page systems",
      "Analytics and attribution",
    ],
    title: "Growth engineering",
  },
  {
    description:
      "I can take a product from an unclear brief to a production release across the interface, API, data model, internal tools, and operations.",
    examples: [
      "Web products and APIs",
      "Internal workflows and automation",
      "Production delivery and maintenance",
    ],
    title: "Product engineering",
  },
  {
    description:
      "I can build applied AI features with retrieval, tool use, evaluations, and the product controls required to make them useful in production.",
    examples: [
      "Retrieval and tool use",
      "Evaluation systems",
      "AI product integration",
    ],
    title: "Applied AI systems",
  },
] as const;

export const collaborationWorkingModel = [
  "A focused product or growth problem with a clear owner on your side.",
  "Access to the people, product context, and measurement needed to make sound decisions.",
  "A practical first scope, followed by continued delivery when the partnership is working well.",
] as const;

export const collaborationProof = {
  actionLabel: "Read the Nakafa growth case study",
  description:
    "I own the learning product, its technical foundations, and the search system around it. The case study explains the work, the measured results, and the limits of the data.",
  eyebrow: "Proof of work",
  heading: "Nakafa combines product ownership with measurable organic growth.",
} as const;

export const collaborationContact = {
  actionLabel: "Start a conversation",
  description:
    "The email draft asks for the project, timeline, and budget range so we can quickly see whether the fit is right.",
  heading: "Tell me what you are trying to build or improve.",
} as const;
