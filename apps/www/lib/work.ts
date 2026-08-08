export interface WorkEntry {
  company: string;
  period: string;
  role: string;
  summary: readonly string[];
}

export const workEntries = [
  {
    company: "StrategyBridgeAI GmbH",
    period: "Jul 2024 - Present",
    role: "Product Engineer, Full-Stack",
    summary: [
      "Built the Strategy Console from zero, including spreadsheet-style workflows, product navigation, and reusable React, Tailwind CSS, and shadcn components.",
      "Kept the frontend and backend in sync with shared TypeScript contracts, then integrated LLM features used in production.",
    ],
  },
  {
    company: "Schneider Electric GmbH",
    period: "Jan 2024 - Jun 2024",
    role: "Application Developer Intern",
    summary: [
      "Built internal tools with Microsoft Power Apps, Power Automate, and Dataverse so non-technical teams could manage their data.",
      "Handled onboarding, user testing, and documentation so the tools were easier to use and maintain.",
    ],
  },
  {
    company: "Wemakefuture AG",
    period: "Mar 2022 - Dec 2023",
    role: "Full-Stack Developer, Part-Time",
    summary: [
      "Built data synchronization and payment workflows with Next.js, Azure Functions, PostgreSQL, Supabase, Stripe, and Zapier.",
      "Migrated production code from JavaScript to TypeScript, added row-level security to the database, and shipped an AI endpoint using the OpenAI API.",
    ],
  },
  {
    company: "Nakafa",
    period: "Feb 2021 - Present",
    role: "Founder and Lead Product Engineer",
    summary: [
      "Built an open-source education product used by about 1,000 to 2,000 learners each week. It includes typed real-time interfaces, school workflows, payments, and access controls.",
      "Developed multi-agent tutoring with the Vercel AI SDK and AI Gateway. The product also has interactive 3D lessons, MDX content, and a Turborepo monorepo.",
    ],
  },
  {
    company: "Institute for Sustainability",
    period: "Aug 2021 - Sep 2022",
    role: "Working Student in Artificial Intelligence",
    summary: [
      "Researched artificial intelligence, data science, and sustainability, then wrote public articles about the findings.",
    ],
  },
] as const satisfies readonly WorkEntry[];
