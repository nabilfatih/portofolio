export interface WorkEntry {
  company: string;
  companyUrl: string;
  logo: string;
  logoFallback: string;
  period: string;
  role: string;
  summary: readonly string[];
}

export interface EducationEntry {
  institution: string;
  institutionUrl: string;
  logo: string;
  logoFallback: string;
  program: string;
  summary: readonly string[];
}

export const workEntries = [
  {
    company: "StrategyBridgeAI GmbH",
    companyUrl: "https://www.strategybridge.ai/",
    logo: "/company-logos/strategybridge.svg",
    logoFallback: "SB",
    period: "Jul 2024 - Jul 2026",
    role: "Product Engineer, Full-Stack",
    summary: [
      "Took Strategy Console from an early concept to production and shaped the workflows used for financial and business analysis.",
      "Owned delivery across the Next.js interface, Python and FastAPI services, REST APIs, shared TypeScript contracts, and releases.",
      "Built editable spreadsheet-style views, integrated production LLM features, and added product analytics and technical documentation as the system grew.",
    ],
  },
  {
    company: "Schneider Electric GmbH",
    companyUrl: "https://www.se.com/de/de/",
    logo: "/company-logos/schneider-electric.svg",
    logoFallback: "SE",
    period: "Jan 2024 - Jun 2024",
    role: "Application Developer, Internal Tools",
    summary: [
      "Built an internal operations app with Power Apps, Power Automate, and Dataverse so non-technical staff could manage records directly.",
      "Created forms, validation, and automated update flows that reduced repetitive data entry and dependence on manual IT support.",
      "Refined the interface through user testing and documented the workflow for onboarding and handover.",
    ],
  },
  {
    company: "Wemakefuture AG",
    companyUrl: "https://www.wemakefuture.com/",
    logo: "/company-logos/wemakefuture.svg",
    logoFallback: "WMF",
    period: "Mar 2022 - Dec 2023",
    role: "Full-Stack Developer",
    summary: [
      "Built SaaS workflows that synchronized data between applications using PostgreSQL, Azure Functions, Zapier, and n8n.",
      "Worked across frontend, backend, database, and external integrations, including a Stripe payment flow and OpenAI-powered code generation.",
      "Migrated a large JavaScript codebase to TypeScript and added Supabase row-level security for customer data.",
    ],
  },
  {
    company: "Nakafa",
    companyUrl: "https://nakafa.com",
    logo: "/company-logos/nakafa.svg",
    logoFallback: "N",
    period: "Feb 2021 - Present",
    role: "Founder and Lead Product Engineer",
    summary: [
      "Founded and built a source-available education platform used by roughly 1,000 to 2,000 people each week.",
      "Own the product across learning and assessment flows, school tools, billing, analytics, localization, backend systems, and production releases.",
      "Built Nina, a tool-using AI tutor with source-backed retrieval and deterministic evaluations, plus interactive 3D math lessons.",
      "Built Aksara, a signed content release system with hash verification, staged activation, recovery, and rollback.",
    ],
  },
  {
    company: "eco2050 Institute for Sustainability",
    companyUrl: "https://eco2050.de/en/",
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

export const educationEntry = {
  institution: "OTH Regensburg",
  institutionUrl: "https://www.oth-regensburg.de/en/",
  logo: "/company-logos/oth-regensburg.svg",
  logoFallback: "OTH",
  program: "B.Sc. Artificial Intelligence and Data Science",
  summary: [
    "Completed a 210 ECTS degree covering machine learning, deep learning, natural language processing, computer vision, data mining, statistical modeling, and big data analytics.",
    "Wrote a bachelor thesis on retrieval-augmented generation for conversational agents, graded 1.3.",
  ],
} as const satisfies EducationEntry;
