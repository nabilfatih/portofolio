import type { MetadataRoute } from "next";
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

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    url: `${SITE_URL}${route.path}`,
  }));
}
