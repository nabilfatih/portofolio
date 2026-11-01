import { Particles } from "@repo/design-system/components/ui/particles";
import { createFileRoute } from "@tanstack/react-router";
import HomeContent from "@/content/home.mdx";
import { pageHead } from "@/lib/head";
import { SOCIAL_IMAGE, siteConfig } from "@/lib/site";

export const Route = createFileRoute("/")({
  component: Home,
  head: () =>
    pageHead({
      description: siteConfig.description,
      image: SOCIAL_IMAGE,
      markdownPath: "/index.md",
      path: "/",
      socialTitle: siteConfig.title,
    }),
});

function Home() {
  return (
    <div className="relative">
      <Particles
        className="pointer-events-none absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <section className="py-24">
        <div className="mx-auto max-w-2xl px-4">
          <HomeContent />
        </div>
      </section>
    </div>
  );
}
