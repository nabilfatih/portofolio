export interface WorkEntry {
  company: string;
  logo: string;
  logoFallback: string;
  period: string;
  role: string;
  summary: readonly string[];
}

export const workEntries = [
  {
    company: "StrategyBridgeAI GmbH",
    logo: "/company-logos/strategybridge.svg",
    logoFallback: "SB",
    period: "Jul 2024 - Jul 2026",
    role: "Product Engineer, Full-Stack",
    summary: [
      "Took the Strategy Console from an early concept to a production SaaS product, owning the Next.js interface, FastAPI services, shared TypeScript contracts, and release work.",
      "Built editable spreadsheet-style financial views, then shipped LLM features and product analytics used in production.",
    ],
  },
  {
    company: "Schneider Electric GmbH",
    logo: "/company-logos/schneider-electric.svg",
    logoFallback: "SE",
    period: "Jan 2024 - Jun 2024",
    role: "Application Developer, Internal Tools",
    summary: [
      "Built internal tools with Power Apps, Power Automate, and Dataverse, including forms, validation, and automated record updates.",
      "Worked directly with users on onboarding and testing, then wrote the documentation teams needed to keep the tools useful.",
    ],
  },
  {
    company: "Wemakefuture AG",
    logo: "/company-logos/wemakefuture.svg",
    logoFallback: "WMF",
    period: "Mar 2022 - Dec 2023",
    role: "Full-Stack Developer",
    summary: [
      "Built data-sync and payment workflows for SaaS products with PostgreSQL, Azure Functions, Stripe, Zapier, and n8n.",
      "Moved production code from JavaScript to TypeScript, added Supabase row-level security, and built an OpenAI-powered code generation flow.",
    ],
  },
  {
    company: "Nakafa",
    logo: "/company-logos/nakafa.svg",
    logoFallback: "N",
    period: "Feb 2021 - Present",
    role: "Founder and Lead Product Engineer",
    summary: [
      "Founded and built a source-available education product used by roughly 1,000 to 2,000 people each week, owning the product from interface and data model through billing, analytics, testing, and releases.",
      "Built Nina, a tool-using AI tutor with source-backed retrieval and evaluations, plus interactive 3D lessons and Aksara's signed content release system.",
    ],
  },
  {
    company: "eco2050 Institute for Sustainability",
    logo: "/company-logos/eco2050.svg",
    logoFallback: "e50",
    period: "Aug 2021 - Sep 2022",
    role: "AI and Data Science Research",
    summary: [
      "Used Python, Pandas, NumPy, and Matplotlib to research questions across artificial intelligence, data science, and sustainability.",
      "Turned the findings into published explanations for readers without a technical background.",
    ],
  },
] as const satisfies readonly WorkEntry[];
