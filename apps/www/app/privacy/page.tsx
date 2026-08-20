import type { Metadata } from "next";
import {
  privacyContent,
  VERCEL_ANALYTICS_PRIVACY_URL,
  VERCEL_SPEED_INSIGHTS_URL,
} from "@/lib/privacy";
import { SOCIAL_IMAGE } from "@/lib/site";

const PRIVACY_DESCRIPTION =
  "How this portfolio uses Vercel Web Analytics and Speed Insights, what information is collected, and how to get in touch.";

export const metadata: Metadata = {
  alternates: {
    canonical: "/privacy",
    types: {
      "text/markdown": "/privacy.md",
    },
  },
  description: PRIVACY_DESCRIPTION,
  openGraph: {
    description: PRIVACY_DESCRIPTION,
    images: [SOCIAL_IMAGE],
    title: "Privacy and Data | Nabil Fatih",
    url: "/privacy",
  },
  title: "Privacy and Data",
  twitter: {
    card: "summary_large_image",
    description: PRIVACY_DESCRIPTION,
    images: [SOCIAL_IMAGE.url],
    title: "Privacy and Data | Nabil Fatih",
  },
};

export default function PrivacyPage() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="mb-8 font-medium text-2xl tracking-tight">privacy</h1>

        <div className="prose max-w-none break-words prose-p:leading-relaxed">
          <p>
            Last updated{" "}
            <time dateTime="2026-08-08">{privacyContent.updated}</time>.
          </p>
          <p>{privacyContent.analytics}</p>
          <p>{privacyContent.performance}</p>
          <p>{privacyContent.data}</p>
          <p>
            You can read Vercel&apos;s{" "}
            <a
              href={VERCEL_ANALYTICS_PRIVACY_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              Web Analytics privacy documentation
            </a>{" "}
            and its{" "}
            <a
              href={VERCEL_SPEED_INSIGHTS_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              Speed Insights metrics documentation
            </a>{" "}
            for more detail.
          </p>
          <p>
            {privacyContent.contact}{" "}
            <a
              href="https://www.linkedin.com/in/nabilfatih"
              rel="noopener noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
