export const SITE_URL = "https://nabilfatih.com";

export const CONTACT_EMAIL = "nabilakbarazzima@gmail.com";

const CONTACT_SUBJECT = "Project collaboration";
const CONTACT_BODY = `Hi Nabil,

I found your portfolio and would like to discuss a contract or B2B project.

Company:
Project:
What I need help with:
Timeline:
Budget range:

Best,
[Your name]`;

export const CONTACT_HREF = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  CONTACT_SUBJECT
)}&body=${encodeURIComponent(CONTACT_BODY)}`;

export const SOCIAL_IMAGE = {
  alt: "Nabil Fatih, Product Engineer",
  height: 630,
  url: "/opengraph-image",
  width: 1200,
} as const;

export const siteConfig = {
  description:
    "Portfolio of Nabil Fatih, a product engineer building thoughtful web products with TypeScript, Next.js, React, and applied AI, including Nakafa.",
  name: "Nabil Akbarazzima Fatih",
  shortName: "Nabil Fatih",
  social: {
    github: "https://github.com/nabilfatih",
    instagram: "https://www.instagram.com/nabilfatih_",
    linkedin: "https://www.linkedin.com/in/nabilfatih",
    tiktok: "https://www.tiktok.com/@fibonacciku",
    twitter: "https://twitter.com/nabilfatih_",
  },
  title: "Nabil Fatih | Product Engineer",
} as const;
