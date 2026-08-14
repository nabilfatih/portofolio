export const COLLABORATE_HREF = "/collaborate";

export const collaborationPage = {
  capabilitiesHeading: "Where I can help",
  description:
    "I am available as a contractor or B2B partner when a team needs hands-on ownership across product decisions, implementation, and measurement.",
  eyebrow: "Work with me",
  heading: "I help teams turn product problems into working software.",
  workingModelHeading: "A useful engagement starts with",
} as const;

export const collaborationCapabilities = [
  {
    description:
      "I take ownership of the product work behind organic growth. That includes search architecture, reusable content routes, measurement, and the releases needed to improve them.",
    examples: [
      "Search and content architecture",
      "Programmatic page systems",
      "Analytics and attribution",
    ],
    title: "Growth engineering",
  },
  {
    description:
      "I turn an unclear brief into a production release. Depending on the problem, I can own the interface, API, data model, internal workflow, or the whole slice.",
    examples: [
      "Web products and APIs",
      "Internal workflows and automation",
      "Production delivery and maintenance",
    ],
    title: "Product engineering",
  },
  {
    description:
      "I build AI features people can use in production, with retrieval, tools, evaluations, and product controls designed into the system.",
    examples: [
      "Retrieval and tool use",
      "Evaluation systems",
      "AI product integration",
    ],
    title: "Applied AI systems",
  },
] as const;

export const collaborationLoop = {
  description:
    "I work through one loop so search demand, software, and product data inform the next decision.",
  eyebrow: "How the work connects",
  heading: "The product and its growth loop should share one system.",
  steps: [
    {
      description:
        "Start with search demand, user behavior, or a product bottleneck.",
      title: "Find the signal",
    },
    {
      description:
        "Turn the evidence into a clear product and content architecture.",
      title: "Shape the system",
    },
    {
      description: "Build the interface, API, workflow, or page system.",
      title: "Ship the change",
    },
    {
      description:
        "Use search and product analytics to decide what changes next.",
      title: "Measure what happened",
    },
  ],
} as const;

export const collaborationWorkingModel = [
  "A focused product or growth problem with a clear owner on your side.",
  "Access to the people, product context, and measurement needed to make sound decisions.",
  "A practical first scope, followed by continued delivery when the partnership is working well.",
] as const;

export const collaborationProof = {
  actionLabel: "Open the case study",
  description:
    "You can inspect the architecture, monthly click trend, measured results, and evidence limits in the case study.",
  eyebrow: "Proof of work",
  heading: "Nakafa shows how I connect product work with organic growth.",
} as const;

export const collaborationContact = {
  actionLabel: "Start a conversation",
  description:
    "The email draft asks for the project, timeline, and budget range so we can quickly see whether the fit is right.",
  heading: "Tell me what you are trying to build or improve.",
} as const;
