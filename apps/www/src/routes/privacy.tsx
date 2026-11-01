import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { privacyContent } from "@/lib/privacy";
import { createSocialImage } from "@/lib/social";

const PRIVACY_DESCRIPTION =
  "How this portfolio is hosted, what it does not collect, and how to get in touch.";
const PRIVACY_IMAGE = createSocialImage(
  ["privacy"],
  "How Nabil Fatih's portfolio handles hosting and data."
);

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () =>
    pageHead({
      description: PRIVACY_DESCRIPTION,
      image: PRIVACY_IMAGE,
      markdownPath: "/privacy.md",
      path: "/privacy",
      socialTitle: "Privacy and Data | Nabil Fatih",
      title: "Privacy and Data",
    }),
});

function PrivacyPage() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="mb-8 font-medium text-2xl tracking-tight">privacy</h1>

        <div className="prose max-w-none break-words prose-p:leading-relaxed">
          <p>
            Last updated{" "}
            <time dateTime={privacyContent.updatedIso}>
              {privacyContent.updated}
            </time>
            .
          </p>
          <p>{privacyContent.analytics}</p>
          <p>{privacyContent.hosting}</p>
          <p>{privacyContent.data}</p>
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
