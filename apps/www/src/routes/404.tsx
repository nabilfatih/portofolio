import { createFileRoute } from "@tanstack/react-router";
import NotFound from "@/components/main/not-found";
import { siteConfig } from "@/lib/site";

/** Prerendered to 404.html, which Cloudflare answers for every unknown path. */
export const Route = createFileRoute("/404")({
  component: NotFound,
  head: () => ({
    meta: [
      { title: `Not found | ${siteConfig.shortName}` },
      { content: "noindex, nofollow", name: "robots" },
    ],
  }),
});
