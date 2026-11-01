import { caseStudies } from "@/lib/cases";
import { SITE_URL } from "@/lib/site";

const routes = [
  { changeFrequency: "weekly", path: "", priority: 1 },
  { changeFrequency: "monthly", path: "/case-studies", priority: 0.9 },
  { changeFrequency: "monthly", path: "/collaborate", priority: 0.9 },
  { changeFrequency: "monthly", path: "/work", priority: 0.9 },
  ...caseStudies.map((study) => ({
    changeFrequency: "monthly" as const,
    path: study.href,
    priority: 0.8,
  })),
  { changeFrequency: "yearly", path: "/privacy", priority: 0.2 },
] as const;

export function sitemapEntries() {
  return routes.map((route) => ({
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    url: `${SITE_URL}${route.path}`,
  }));
}

export function renderSitemap() {
  const urls = sitemapEntries()
    .map(
      (entry) =>
        `<url>\n<loc>${entry.url}</loc>\n<changefreq>${entry.changeFrequency}</changefreq>\n<priority>${entry.priority}</priority>\n</url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
